export function Footer() {
  return (
    <footer className="bg-neutral-950 py-12 px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-neutral-500">
        <div className="mb-4 md:mb-0">
          <p>Copyright © {new Date().getFullYear()} Kuldeep Dave. All rights reserved.</p>
        </div>
        
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
          <a href="#" className="hover:text-white transition-colors">Sales and Refunds</a>
          <a href="#" className="hover:text-white transition-colors">Legal</a>
          <a href="#" className="hover:text-white transition-colors">Site Map</a>
        </div>
      </div>
    </footer>
  );
}
