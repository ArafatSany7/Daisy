import { ReactNode } from "react";

export default function FadeIn({ 
  children, 
  delay = 0, 
  className = "" 
}: { 
  children: ReactNode, 
  delay?: number, 
  className?: string 
}) {
  return (
    <div
      data-aos="fade-up"
      data-aos-delay={delay ? Math.round(delay * 1000) : 0}
      className={className}
    >
      {children}
    </div>
  );
}
