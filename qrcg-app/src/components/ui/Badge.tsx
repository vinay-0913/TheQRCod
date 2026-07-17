interface BadgeProps {
  variant?: "default" | "success" | "warning" | "error" | "info" | "accent";
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<string, string> = {
  default: "bg-surface-card text-ink",
  success: "bg-success-light text-success",
  warning: "bg-warning-light text-warning",
  error: "bg-error-light text-error",
  info: "bg-info-light text-info",
  accent: "bg-accent-light text-accent",
};

export default function Badge({
  variant = "default",
  children,
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center px-3 py-0.5
        rounded-full text-xs font-medium
        ${variantStyles[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}
