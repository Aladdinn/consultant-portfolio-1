import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

interface ProjectCardProps {
  title: string;
  sector: string;
  challenge: string;
  impact: string;
  technologies: string[];
  image?: string;
  color?: string;
}

export default function ProjectCard({
  title,
  sector,
  challenge,
  impact,
  technologies,
  image,
  color = "from-cyan-600 to-blue-600",
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className="relative overflow-hidden group cursor-pointer h-full transition-all duration-500 hover:shadow-2xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

      {/* Image Section */}
      {image && (
        <div className="relative h-48 overflow-hidden bg-card/50">
          <img
            src={image}
            alt={title}
            className={`w-full h-full object-cover transition-transform duration-500 ${
              isHovered ? "scale-110" : "scale-100"
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>
      )}

      {/* Content Section */}
      <div className="relative p-8">
        {/* Sector Badge */}
        <div className="mb-4">
          <span className={`text-xs uppercase tracking-wider font-semibold px-3 py-1 rounded-full ${
            color.includes('cyan')
              ? 'bg-cyan-500/20 text-cyan-300'
              : color.includes('blue')
              ? 'bg-blue-500/20 text-blue-300'
              : color.includes('teal')
              ? 'bg-teal-500/20 text-teal-300'
              : 'bg-primary/20 text-primary'
          }`}>
            {sector}
          </span>
        </div>

        {/* Title */}
        <h3 className={`text-2xl font-bold mb-4 transition-all duration-300 ${
          isHovered ? 'text-cyan-300 translate-x-1' : 'text-foreground'
        }`}>
          {title}
        </h3>

        {/* Challenge & Impact */}
        <div className={`space-y-4 mb-6 transition-all duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-90'
        }`}>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              Challenge
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {challenge}
            </p>
          </div>

          <div className="pt-2 border-t border-border">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2">
              Impact
            </h4>
            <p className="text-base font-bold text-emerald-300">
              {impact}
            </p>
          </div>
        </div>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-6">
          {technologies.map((tech) => (
            <span
              key={tech}
              className={`text-xs px-3 py-1 rounded-full font-medium transition-all duration-300 ${
                isHovered
                  ? 'bg-cyan-500/30 text-cyan-300 border border-cyan-500/50'
                  : 'bg-primary/10 text-primary border border-transparent'
              }`}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* CTA Arrow */}
        <div className={`flex items-center gap-2 text-sm font-semibold transition-all duration-300 ${
          isHovered ? 'text-cyan-400 translate-x-2' : 'text-muted-foreground'
        }`}>
          <span>En savoir plus</span>
          <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${
            isHovered ? 'translate-x-1' : ''
          }`} />
        </div>
      </div>

      {/* Hover Border Animation */}
      <div className={`absolute inset-0 border-2 rounded-lg transition-all duration-300 pointer-events-none ${
        isHovered
          ? `border-cyan-500/50`
          : 'border-border'
      }`} />
    </Card>
  );
}
