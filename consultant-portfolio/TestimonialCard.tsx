import { Card } from "@/components/ui/card";

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  company: string;
}

export default function TestimonialCard({
  quote,
  author,
  role,
  company,
}: TestimonialCardProps) {
  return (
    <Card className="bg-card border-border p-8 hover:border-primary/50 transition-all duration-300">
      <div className="mb-6">
        <p className="text-lg leading-relaxed text-foreground italic">
          "{quote}"
        </p>
      </div>
      
      <div className="border-t border-border pt-4">
        <p className="font-bold text-foreground mb-1">{author}</p>
        <p className="text-sm text-muted-foreground">
          {role} • {company}
        </p>
      </div>
    </Card>
  );
}
