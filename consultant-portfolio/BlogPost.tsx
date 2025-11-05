import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import { trpc } from "@/lib/trpc";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { useLocation, useRoute } from "wouter";
import { Streamdown } from "streamdown";

export default function BlogPost() {
  const [, params] = useRoute("/blog/:slug");
  const [, setLocation] = useLocation();
  const slug = params?.slug || "";

  const { data: post, isLoading, error } = trpc.blog.getBySlug.useQuery(
    { slug },
    { enabled: !!slug }
  );

  const formatDate = (date: Date | string | null) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container px-6 py-32">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-muted-foreground">Chargement de l'article...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container px-6 py-32">
          <Card className="max-w-2xl mx-auto p-12 text-center">
            <h2 className="text-2xl font-bold mb-4">Article non trouvé</h2>
            <p className="text-muted-foreground mb-6">
              L'article que vous recherchez n'existe pas ou a été supprimé.
            </p>
            <Button onClick={() => setLocation("/blog")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour au blog
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <article className="py-32">
        <div className="container px-6">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Button
              variant="ghost"
              className="mb-8"
              onClick={() => setLocation("/blog")}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour au blog
            </Button>

            {/* Article Header */}
            <header className="mb-12">
              {post.category && (
                <div className="flex items-center gap-2 mb-4">
                  <Tag className="w-4 h-4 text-primary" />
                  <span className="text-sm text-primary font-semibold uppercase tracking-wide">
                    {post.category}
                  </span>
                </div>
              )}

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 leading-tight">
                {post.title}
              </h1>

              {post.excerpt && (
                <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
                  {post.excerpt}
                </p>
              )}

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(post.publishedAt || post.createdAt)}</span>
                </div>
              </div>
            </header>

            {/* Cover Image */}
            {post.coverImage && (
              <div className="mb-12 rounded-lg overflow-hidden">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-auto"
                />
              </div>
            )}

            {/* Article Content */}
            <div className="prose prose-lg prose-invert max-w-none mb-12">
              <Streamdown>{post.content}</Streamdown>
            </div>

            {/* Tags */}
            {post.tags && (
              <div className="border-t border-border pt-8 mb-12">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-sm font-semibold text-muted-foreground">
                    Tags:
                  </span>
                  {post.tags.split(",").map((tag, index) => (
                    <span
                      key={index}
                      className="text-sm px-3 py-1 bg-primary/10 text-primary rounded-full"
                    >
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <Card className="p-8 bg-card/50 border-primary/20">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">
                  Intéressé par ces sujets ?
                </h3>
                <p className="text-muted-foreground mb-6">
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
            </Card>
          </div>
        </div>
      </article>
    </div>
  );
}
