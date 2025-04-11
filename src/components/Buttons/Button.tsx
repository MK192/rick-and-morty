import { ReactNode } from "react";

type Props = {
  type?: "submit" | "reset" | "button";
  disabled?: boolean;
  variant?: "content" | "small" | "medium" | "large";
  children: ReactNode;
};
export default function Button({
  type = "button",
  disabled = false,
  variant = "medium",
  children,
  ...props
}: Props) {
  let style = `bg-blue-500 text-white rounded-sm py-2 px-12 text-wrap `;
  switch (variant) {
    case "content":
      style = `bg-blue-500 text-white rounded-sm py-2 px-0 text-wrap`;
      break;
    case "small":
      style = `bg-blue-500 text-white rounded-sm py-2 px-8 text-wrap`;
      break;
    case "large":
      style = `bg-blue-500text-white rounded-sm py-2 px-20  text-wrap`;
      break;
    default:
      style = `bg-blue-500 text-white rounded-sm py-2 px-12 text-wrap `;
  }
  return (
    <button type={type} className={style} disabled={disabled} {...props}>
      {children}
    </button>
  );
}
