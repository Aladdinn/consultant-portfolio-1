import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import ProjectCard from "@/components/ProjectCard";
import TestimonialCard from "@/components/TestimonialCard";
import { ArrowRight, Mail, Linkedin } from "lucide-react";

const projects = [
  {
    title: "Transformation PLM Aéronautique",
    sector: "Aéronautique & Défense",
    challenge: "Modernisation complète du système PLM legacy pour un groupe aéronautique européen avec 15 000+ utilisateurs. Migration vers une architecture cloud-native tout en maintenant la continuité opérationnelle.",
    impact: "Réduction de 35% du time-to-market, optimisation des coûts de R&D de 22%, amélioration de 40% de la collaboration inter-sites.",
    technologies: ["Siemens Teamcenter", "Azure", "SAP S/4HANA", "IoT"]
  },
  {
    title: "Déploiement ERP Industrie 4.0",
    sector: "Automobile",
    challenge: "Implémentation d'un ERP nouvelle génération pour un équipementier automobile avec intégration IoT et analytics en temps réel sur 8 sites de production internationaux.",
    impact: "Augmentation de 28% de l'efficacité opérationnelle, réduction de 45% des stocks, visibilité temps réel sur toute la supply chain.",
    technologies: ["SAP S/4HANA", "MES", "Big Data", "Machine Learning"]
  },
  {
    title: "Stratégie Data & IA Manufacturing",
    sector: "Industrie Manufacturière",
    challenge: "Conception et mise en œuvre d'une stratégie data-driven pour un industriel multi-sites. Création d'un data lake centralisé et déploiement de modèles prédictifs pour la maintenance.",
    impact: "Réduction de 50% des arrêts non planifiés, économies de 3,5M€/an sur la maintenance, ROI atteint en 14 mois.",
    technologies: ["Azure Data Lake", "Power BI", "Python", "TensorFlow"]
  },
  {
    title: "Transformation Digitale Supply Chain",
    sector: "Énergie & Utilities",
    challenge: "Refonte complète de la chaîne logistique d'un acteur énergétique avec digitalisation end-to-end, de la planification à la livraison, incluant la gestion de 200+ fournisseurs critiques.",
    impact: "Amélioration de 32% de la précision des prévisions, réduction de 18% des coûts logistiques, délais de livraison réduits de 25%.",
    technologies: ["SAP IBP", "Blockchain", "RPA", "Analytics"]
  },
  {
    title: "Architecture Cloud PLM/ERP",
    sector: "High-Tech & Electronics",
    challenge: "Conception d'une architecture cloud hybride intégrant PLM et ERP pour un fabricant d'électronique avec contraintes de sécurité élevées et conformité internationale (RGPD, ITAR).",
    impact: "Migration réussie de 100% des processus critiques, scalabilité x5, conformité certifiée, coûts infrastructure -40%.",
    technologies: ["PTC Windchill", "Oracle Cloud", "Kubernetes", "DevSecOps"]
  }
];

const testimonials = [
  {
    quote: "Alaeddine a orchestré notre transformation PLM avec une expertise remarquable. Sa capacité à comprendre nos enjeux métier tout en maîtrisant les aspects techniques a été déterminante pour le succès du projet.",
    author: "Jean-Marc Dubois",
    role: "Directeur des Systèmes d'Information",
    company: "Groupe Aéronautique International"
  },
  {
    quote: "L'approche structurée d'Alaeddine et sa vision stratégique nous ont permis de déployer notre ERP dans des délais record. Son accompagnement sur la conduite du changement a été un facteur clé d'adoption.",
    author: "Sophie Laurent",
    role: "VP Operations",
    company: "Équipementier Automobile Européen"
  },
  {
    quote: "Grâce à l'expertise d'Alaeddine en IA et Big Data, nous avons transformé notre approche de la maintenance. Les résultats dépassent nos attentes initiales avec un ROI exceptionnel.",
    author: "Pierre Moreau",
    role: "Directeur Industriel",
    company: "Leader Manufacturing France"
  },
  {
    quote: "Alaeddine combine une rare maîtrise technique avec une excellente compréhension des enjeux business. Son accompagnement sur notre transformation supply chain a créé une valeur mesurable et durable.",
    author: "Marie-Claire Fontaine",
    role: "Chief Supply Chain Officer",
    company: "Groupe Énergétique"
  },
  {
    quote: "La conception de notre architecture cloud par Alaeddine a posé les fondations de notre croissance future. Sa vision à long terme et son pragmatisme ont parfaitement répondu à nos contraintes de sécurité.",
    author: "Thomas Chen",
    role: "CTO",
    company: "Electronics Innovation Corp"
  },
  {
    quote: "Un consultant d'exception qui allie vision stratégique et excellence opérationnelle. Alaeddine a su fédérer nos équipes autour d'objectifs ambitieux et les accompagner jusqu'au succès.",
    author: "Isabelle Bertrand",
    role: "Directrice de la Transformation",
    company: "Groupe Industriel International"
  }
];

const expertiseAreas = [
  {
    title: "PLM (Product Lifecycle Management)",
    description: "Stratégie et déploiement de solutions PLM end-to-end. Expertise Siemens Teamcenter, PTC Windchill, Dassault 3DEXPERIENCE. Intégration avec écosystèmes CAO/ERP."
  },
  {
    title: "ERP & Systèmes d'Information",
    description: "Implémentation SAP S/4HANA, Oracle Cloud, Microsoft Dynamics. Architecture d'intégration, migration de données, optimisation des processus métier."
  },
  {
    title: "Industrie 4.0 & Smart Manufacturing",
    description: "Stratégie de transformation digitale industrielle. IoT, MES, digital twin, automatisation. Accompagnement vers l'usine connectée et intelligente."
  },
  {
    title: "Intelligence Artificielle & Big Data",
    description: "Stratégie data, architecture data lake/warehouse. Machine learning pour maintenance prédictive, optimisation de production, quality analytics."
  },
  {
    title: "Conseil en Organisation & Change Management",
    description: "Accompagnement stratégique des transformations. Conduite du changement, formation, adoption utilisateurs. Alignement IT/Business."
  },
  {
    title: "Architecture & Intégration",
    description: "Conception d'architectures SI complexes. Cloud hybride, microservices, API management. Sécurité, scalabilité, performance."
  }
];

export default function Home() {
  // The userAuth hooks provides authentication state
  // To implement login/logout functionality, simply call logout() or redirect to getLoginUrl()
  let { user, loading, error, isAuthenticated, logout } = useAuth();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Gradient Background - Bleu/Teal */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-600 via-blue-600 to-teal-500 opacity-85" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        
        <div className="container relative z-10 text-center px-6 py-32">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-5xl sm:text-7xl md:text-9xl font-black mb-8 tracking-tight leading-none">
              ALAEDDINE DEHIMI
            </h1>
            
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 mb-12 text-xs md:text-sm uppercase tracking-widest text-foreground/80">
              <span>©2025</span>
              <span>Basé en France</span>
              <span>Consultant Senior</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-6 leading-tight">
              Architecte de Solutions PLM/ERP & <br />
              <span className="italic text-cyan-300">Catalyseur de l'Industrie 4.0</span>
            </h2>
            
            <p className="text-base sm:text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto mb-12 leading-relaxed px-4">
              Transformation digitale des systèmes industriels complexes. Expertise en PLM, ERP, IA et stratégie data pour l'industrie manufacturière de demain.
            </p>
            
            <Button
              size="lg"
              onClick={() => scrollToSection("contact")}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 text-lg group"
            >
              Commencer une discussion
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projets" className="py-32 bg-background">
        <div className="container px-6">
          <div className="mb-20">
            <h2 className="text-4xl sm:text-6xl md:text-8xl font-black mb-8 tracking-tight">
              Projets & Références
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl">
              Transformation de systèmes industriels critiques pour des leaders mondiaux. Résultats mesurables, impact durable.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section id="expertise" className="py-32 bg-gradient-to-b from-background via-blue-950/10 to-background">
        <div className="container px-6">
          <div className="mb-20">
            <h2 className="text-4xl sm:text-6xl md:text-8xl font-black mb-8 tracking-tight">
              Domaines d'Expertise
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl">
              Une expertise transverse au service de vos transformations industrielles et digitales.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {expertiseAreas.map((area, index) => (
              <div
                key={index}
                className="bg-card border border-border p-8 hover:border-primary/50 transition-all duration-300 group"
              >
                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                  {area.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {area.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="temoignages" className="py-32 bg-background">
        <div className="container px-6">
          <div className="mb-20 text-center">
            <p className="text-sm uppercase tracking-widest text-primary mb-4 font-semibold">
              Témoignages
            </p>
            <h2 className="text-4xl sm:text-6xl md:text-8xl font-black mb-8 tracking-tight">
              Retours d'Expérience
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              La confiance de mes clients, la mesure de mon engagement.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 bg-card/30">
        <div className="container px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-12">
              <h2 className="text-5xl sm:text-7xl md:text-9xl font-black mb-8 tracking-tight leading-none">
                DISCUTONS
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-12">
                Prêt à transformer vos systèmes industriels ?<br />
                Échangeons sur vos enjeux et objectifs.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 text-lg w-full sm:w-auto"
                onClick={() => window.location.href = "mailto:alaeddine.dehimi@example.com"}
              >
                <Mail className="mr-2" />
                alaeddine.dehimi@example.com
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                className="font-semibold px-8 py-6 text-lg w-full sm:w-auto"
                onClick={() => window.open("https://linkedin.com/in/alaeddine-dehimi", "_blank")}
              >
                <Linkedin className="mr-2" />
                LinkedIn
              </Button>
            </div>
            
            <div className="border-t border-border pt-12 mt-12">
              <p className="text-sm text-muted-foreground">
                Consultant Senior en Transformation Digitale & Architecte de Solution
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Spécialisé en PLM, ERP, Industrie 4.0, IA & Big Data
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-background border-t border-border">
        <div className="container px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm text-muted-foreground mb-4 md:mb-0">
              © 2025 Alaeddine Dehimi. Tous droits réservés.
            </p>
            <div className="flex items-center gap-6">
              <button
                onClick={() => scrollToSection("hero")}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Retour en haut
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
