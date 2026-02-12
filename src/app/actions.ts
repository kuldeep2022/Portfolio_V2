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
    console.log("MAKE_WEBHOOK_URL not set. Payload:", payload);
  }

  return {
    success: true,
    message: "Message sent successfully! I'll get back to you soon.",
  };
}
