import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className }: CardProps) {
  return (
    <div
      className={`border rounded-xl shadow-md p-4 bg-white ${className || ""}`}
    >
      {children}
    </div>
  );
}
