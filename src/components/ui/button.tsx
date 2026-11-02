import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "quiet" | "destructive";
type ButtonSize = "default" | "icon";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function Button({
  variant = "secondary",
  size = "default",
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  const classes = ["ui-button", `ui-button-${variant}`, size === "icon" ? "ui-icon-button" : "", className]
    .filter(Boolean)
    .join(" ");

  return <button type={type} className={classes} {...props} />;
}
