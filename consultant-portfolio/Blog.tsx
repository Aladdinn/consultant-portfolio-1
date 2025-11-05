import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Header from "@/components/Header";
import { trpc } from "@/lib/trpc";
import { Calendar, Search, Tag } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

const categories = [
  "Tous",
  "Transformation Digitale",
  "PLM",
  "ERP",
  "Industrie 4.0",
  "Intelligence Artificielle",
  "Big Data",
  "IoT",
  "Cloud",
  "Cybersécurité",
];

export default function Blog() {
  const [, setLocation] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tous");

  const { data: allPosts } = trpc.blog.list.useQuery({ publishedOnly: true });

  const filteredPosts = allPosts?.filter((post) => {
    const matchesSearch =
      searchTerm === "" ||
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "Tous" || post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const formatDate = (date: Date | string | null) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-orange-600/20 via-red-600/20 to-orange-500/20">
        <div className="container px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black mb-6 tracking-tight">
              Blog
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Réflexions et analyses sur la transformation digitale, l'Industrie 4.0 et les technologies émergentes
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Rechercher un article..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-14 text-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters & Content */}
      <section className="py-16">
        <div className="container px-6">
          <div className="max-w-6xl mx-auto">
            {/* Category Filter */}
            <div className="mb-12">
              <div className="flex items-center gap-4 flex-wrap">
                <span className="text-sm font-semibold text-muted-foreground">
                  Catégorie:
                </span>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-64">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts?.map((post) => (
                <Card
                  key={post.id}
                  className="overflow-hidden hover:border-primary/50 transition-all duration-300 cursor-pointer group"
                  onClick={() => setLocation(`/blog/${post.slug}`)}
                >
                  {post.coverImage && (
                    <div className="aspect-video bg-muted overflow-hidden">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}

                  <div className="p-6">
                    {post.category && (
                      <div className="flex items-center gap-2 mb-3">
                        <Tag className="w-4 h-4 text-primary" />
                        <span className="text-sm text-primary font-medium">
                          {post.category}
                        </span>
                      </div>
                    )}

                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    {post.excerpt && (
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}

                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(post.publishedAt)}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {filteredPosts?.length === 0 && (
              <Card className="p-12 text-center">
                <p className="text-muted-foreground text-lg">
                  Aucun article trouvé pour cette recherche.
                </p>
              </Card>
            )}

            {!allPosts && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Chargement des articles...</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-card/30">
        <div className="container px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-black mb-6">
              Besoin d'accompagnement ?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Discutons de vos projets de transformation digitale
            </p>
            <Button
              size="lg"
              onClick={() => {
                const element = document.getElementById("contact");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                } else {
                  setLocation("/#contact");
                }
              }}
            >
              Me contacter
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
