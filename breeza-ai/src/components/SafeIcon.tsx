import { ComponentType } from "react";

type SafeIconProps = {
  icon: ComponentType<{ className?: string }>;
  className?: string;
};

export function SafeIcon({ icon: Icon, className }: SafeIconProps) {
  return <Icon className={className} />;
}
