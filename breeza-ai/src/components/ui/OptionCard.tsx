import { Link } from "react-router-dom";
import React from "react";

interface OptionCardProps {
  title: string;
  subtitle: string;
  link: string;
  children: React.ReactNode;
  extraClass?: string; // ✅ nueva prop
}

export const OptionCard: React.FC<OptionCardProps> = ({ title, subtitle, link, children, extraClass }) => {
  return (
    <Link to={link} className={`w-full ${extraClass ?? ""}`}>
      <div className="w-full flex items-center gap-4 bg-white rounded-xl shadow-md p-5 transition-all duration-200 cursor-pointer">
        {children}
        <div className="text-left">
          <p className="font-semibold text-teal-700">{title}</p>
          <p className="text-gray-500 text-sm">{subtitle}</p>
        </div>
      </div>
    </Link>
  );
};
