import { Link } from "react-router-dom";
import { Plane, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  const footerLinks = {
    Platform: [
      { name: "Browse Agents", href: "/browse-agents" },
      { name: "How it Works", href: "/how-it-works" },
      { name: "Become an Agent", href: "/join-as-agent" },
      { name: "Pricing", href: "/pricing" },
    ],
    Support: [
      { name: "Help Center", href: "/help" },
      { name: "Contact Us", href: "/contact" },
      { name: "Safety Guidelines", href: "/safety" },
      { name: "Trust & Safety", href: "/trust" },
    ],
    Company: [
      { name: "About Us", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Press", href: "/press" },
      { name: "Blog", href: "/blog" },
    ],
    Legal: [
      { name: "Terms of Service", href: "/terms" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Cookie Policy", href: "/cookies" },
      { name: "GDPR", href: "/gdpr" },
    ],
  };

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "#" },
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "Instagram", icon: Instagram, href: "#" },
    { name: "LinkedIn", icon: Linkedin, href: "#" },
  ];

  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="relative">
                <Plane className="h-8 w-8 text-primary" />
                <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-accent"></div>
              </div>
              <span className="text-xl font-bold text-foreground">
                Wanderly
              </span>
            </Link>
            <p className="text-muted-foreground max-w-md mb-6">
              Connect with trusted travel agents worldwide. Create unforgettable
              journeys with personalized itineraries crafted by local experts.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label={social.name}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-foreground mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom section */}
        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © 2024 Wanderly. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <span className="text-muted-foreground text-sm">
              🌍 Available in 50+ countries
            </span>
            <div className="flex items-center space-x-2">
              <span className="text-muted-foreground text-sm">
                🔒 Secure payments
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
