import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import { Lock, Unlock, Zap, Brain, Box, Wifi } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

const labIdeas = [
  {
    id: 1,
    title: "IA Générative & PLM",
    description: "Intégration de modèles LLM pour l'automatisation de la documentation technique, la génération de spécifications et l'analyse prédictive des cycles de développement produit.",
    icon: Brain,
    color: "from-violet-600 to-purple-600",
    status: "En développement",
    accessLevel: "premium"
  },
  {
    id: 2,
    title: "Blockchain Industrielle",
    description: "Chaîne d'approvisionnement transparente et immuable avec smart contracts pour la traçabilité des composants, la gestion des fournisseurs et l'authentification des pièces critiques.",
    icon: Box,
    color: "from-cyan-600 to-blue-600",
    status: "Concept",
    accessLevel: "premium"
  },
  {
    id: 3,
    title: "Digital Twin Avancé",
    description: "Jumeaux numériques temps réel intégrant IoT, simulation physique et IA pour l'optimisation prédictive, la maintenance préventive et la simulation de scénarios complexes.",
    icon: Zap,
    color: "from-emerald-600 to-teal-600",
    status: "En développement",
    accessLevel: "premium"
  },
  {
    id: 4,
    title: "ERP 5.0 Autonome",
    description: "Systèmes ERP auto-optimisants utilisant l'IA pour l'allocation dynamique des ressources, la prévision de demande et l'adaptation automatique aux changements du marché.",
    icon: Wifi,
    color: "from-orange-600 to-red-600",
    status: "Recherche",
    accessLevel: "premium"
  },
  {
    id: 5,
    title: "Industrie 5.0 Humain-Centrique",
    description: "Stratégies de transformation plaçant l'humain au cœur : cobotique intelligente, interfaces intuitives, augmentation des compétences et bien-être des collaborateurs.",
    icon: Zap,
    color: "from-pink-600 to-rose-600",
    status: "En développement",
    accessLevel: "premium"
  },
];

export default function Labs() {
  const { user, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const hasAccess = isAuthenticated && user?.role === "admin";

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-violet-950/30 via-background to-background">
        <div className="container px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm uppercase tracking-widest text-violet-400 mb-4 font-semibold">
              Innovations
            </p>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black mb-6 tracking-tight">
              LABS
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Idées prospectives et projets innovants en transformation digitale, IA et Industrie 4.0/5.0
            </p>
            
            {!hasAccess && (
              <p className="text-sm text-muted-foreground">
                Connectez-vous pour accéder aux contenus premium
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Labs Grid */}
      <section className="py-16">
        <div className="container px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {labIdeas.map((lab) => {
                const IconComponent = lab.icon;
                const isLocked = !hasAccess && lab.accessLevel === "premium";
                
                return (
                  <Card
                    key={lab.id}
                    className={`relative overflow-hidden border-border transition-all duration-300 cursor-pointer hover:border-violet-500/50 group ${
                      isLocked ? "opacity-75" : ""
                    }`}
                    onClick={() => setExpandedId(expandedId === lab.id ? null : lab.id)}
                  >
                    {/* Gradient Background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${lab.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
                    
                    <div className="relative p-8">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <div className={`p-3 rounded-lg bg-gradient-to-br ${lab.color} text-white`}>
                              <IconComponent className="w-5 h-5" />
                            </div>
                            {isLocked && (
                              <Lock className="w-5 h-5 text-violet-400" />
                            )}
                          </div>
                          <h3 className="text-2xl font-bold mb-2">{lab.title}</h3>
                        </div>
                      </div>

                      {/* Status Badge */}
                      <div className="mb-4">
                        <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                          lab.status === "En développement"
                            ? "bg-blue-500/20 text-blue-300"
                            : lab.status === "Concept"
                            ? "bg-purple-500/20 text-purple-300"
                            : "bg-orange-500/20 text-orange-300"
                        }`}>
                          {lab.status}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        {lab.description}
                      </p>

                      {/* Access Info */}
                      {isLocked ? (
                        <div className="flex items-center gap-2 text-sm text-violet-400 bg-violet-500/10 p-3 rounded-lg">
                          <Lock className="w-4 h-4" />
                          <span>Contenu réservé aux abonnés premium</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-sm text-emerald-400 bg-emerald-500/10 p-3 rounded-lg">
                          <Unlock className="w-4 h-4" />
                          <span>Vous avez accès à ce contenu</span>
                        </div>
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* CTA for Non-Authenticated Users */}
            {!hasAccess && (
              <Card className="mt-16 p-12 bg-gradient-to-r from-violet-950/30 to-purple-950/30 border-violet-500/30 text-center">
                <h3 className="text-3xl font-bold mb-4">Accès Premium</h3>
                <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Débloquez l'accès complet à tous les projets innovants, analyses détaillées et stratégies prospectives en transformation digitale et Industrie 4.0/5.0.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-violet-600 hover:bg-violet-700 text-white"
                    onClick={() => setLocation("/#contact")}
                  >
                    Demander l'accès
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => window.open("https://calendly.com/alaeddine-dehimi", "_blank")}
                  >
                    Prendre un RDV
                  </Button>
                </div>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-card/30">
        <div className="container px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">À propos des Labs</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="p-6 border-border">
                <h3 className="text-xl font-bold mb-3 text-cyan-400">Innovation</h3>
                <p className="text-muted-foreground">
                  Exploration des technologies émergentes et des approches novatrices en transformation digitale.
                </p>
              </Card>
              <Card className="p-6 border-border">
                <h3 className="text-xl font-bold mb-3 text-blue-400">Prospective</h3>
                <p className="text-muted-foreground">
                  Anticipation des tendances futures et préparation des organisations aux défis de demain.
                </p>
              </Card>
              <Card className="p-6 border-border">
                <h3 className="text-xl font-bold mb-3 text-violet-400">Stratégie</h3>
                <p className="text-muted-foreground">
                  Développement de stratégies d'adoption et de roadmaps d'implémentation pour vos projets.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
