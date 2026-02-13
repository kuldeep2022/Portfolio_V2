"use server";

import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  company: z.string().optional(),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
  source: z.string().optional(),
});

export type ContactState = {
  success: boolean;
  message: string;
  errors?: {
    name?: string[];
    email?: string[];
    message?: string[];
  };
};

import nodemailer from "nodemailer";

export async function sendContactEmail(
  prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  const validatedFields = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    company: formData.get("company"),
    phone: formData.get("phone"),
    message: formData.get("message"),
    source: formData.get("source"),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Please fix the errors below.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const payload = {
    ...validatedFields.data,
    submittedAt: new Date().toISOString(),
    page: "portfolio_v2",
  };

  const emailUser = process.env.CONTACT_EMAIL_USER;
  const emailPass = process.env.CONTACT_EMAIL_PASS;

  if (emailUser && emailPass) {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: emailUser,
          pass: emailPass,
        },
      });

      const mailOptions = {
        from: emailUser,
        to: "davekuldeep98@gmail.com",
        subject: `New Portfolio Contact: ${payload.name}`,
        text: `
Name: ${payload.name}
Email: ${payload.email}
Company: ${payload.company || "N/A"}
Phone: ${payload.phone || "N/A"}
Source: ${payload.source}
Sent At: ${payload.submittedAt}

Message:
${payload.message}
        `,
        replyTo: payload.email,
      };

      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.error("Email delivery failed:", error);
      return {
        success: false,
        message: "Failed to send email. Please try again later.",
      };
    }
  } else {
    // Fallback to webhook if configured, otherwise log
    const webhookUrl = process.env.MAKE_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        const response = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!response.ok) {
          console.error("Webhook error:", response.status);
        }
      } catch (error) {
        console.error("Webhook request failed:", error);
      }
    } else {
      console.log("No email configuration found. Payload:", payload);
    }
  }

  return {
    success: true,
    message: "Message sent successfully! I'll get back to you soon.",
  };
}
