import React from "react";

function Footer() {
  return (
    <footer className="border-t border-gray-300 py-8 text-center text-sm text-muted-foreground">
      <p>© {new Date().getFullYear()} PlanItAI. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
