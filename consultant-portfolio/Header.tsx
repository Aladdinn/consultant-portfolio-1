import { useState, useEffect } from "react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-lg border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          <button
            onClick={() => scrollToSection("hero")}
            className="text-xl font-bold tracking-tight hover:text-primary transition-colors"
          >
            ALAEDDINE DEHIMI
          </button>
          
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("projets")}
              className="text-sm font-medium hover:text-cyan-400 transition-colors uppercase tracking-wide px-2 py-1 rounded hover:bg-cyan-500/10"
            >
              Projets
            </button>
            <button
              onClick={() => scrollToSection("expertise")}
              className="text-sm font-medium hover:text-blue-400 transition-colors uppercase tracking-wide px-2 py-1 rounded hover:bg-blue-500/10"
            >
              Expertise
            </button>
            <button
              onClick={() => window.location.href = '/blog'}
              className="text-sm font-medium hover:text-teal-400 transition-colors uppercase tracking-wide px-2 py-1 rounded hover:bg-teal-500/10"
            >
              Blog
            </button>
            <button
              onClick={() => scrollToSection("labs")}
              className="text-sm font-medium hover:text-violet-400 transition-colors uppercase tracking-wide px-2 py-1 rounded hover:bg-violet-500/10"
            >
              Labs
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-sm font-medium hover:text-emerald-400 transition-colors uppercase tracking-wide px-2 py-1 rounded hover:bg-emerald-500/10"
            >
              Contact
            </button>
          </div>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => scrollToSection("contact")}
            className="md:hidden text-sm font-medium bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Contact
          </button>
        </nav>
      </div>
    </header>
  );
}
