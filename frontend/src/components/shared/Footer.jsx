// src/components/Footer/Footer.js

import React from "react";
import "../../styles/footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { name: "Terms", url: "#" },
    { name: "Privacy", url: "#" },
    { name: "Security", url: "#" },
    { name: "Status", url: "#" },
    { name: "Docs", url: "#" },
    { name: "Contact", url: "#" },
    { name: "Manage cookies", url: "#" },
    { name: "Do not share my personal information", url: "#" },
  ];

  return (
    <footer className="footer-container">
      <div className="footer-copyright">&copy; {currentYear} GitHub, Inc.</div>
      <nav className="footer-links">
        <ul>
          {footerLinks.map((link) => (
            <li key={link.name}>
              <a href={link.url}>{link.name}</a>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
