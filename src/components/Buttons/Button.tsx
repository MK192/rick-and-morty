import { ComponentProps, forwardRef, ReactNode } from "react";

type Props = {
  type?: "submit" | "reset" | "button";
  disabled?: boolean;
  variant?: "content" | "small" | "medium" | "large";
  children: ReactNode;
};
export default forwardRef<HTMLButtonElement, ComponentProps<"button"> & Props>(
  function Button(
    {
      type = "button",
      disabled = false,
      variant = "medium",
      children,
      ...props
    }: Props,
    ref
  ) {
    let style = `bg-blue-500 text-white rounded-sm py-2 px-12 cursor-pointer text-wrap `;
    switch (variant) {
      case "content":
        style = `bg-transparenttext-blue-600 rounded-sm px-0 cursor-pointer text-wrap`;
        break;
      case "small":
        style = `bg-blue-500 text-white rounded-sm py-2 px-8 cursor-pointer text-wrap`;
        break;
      case "large":
        style = `bg-blue-500text-white rounded-sm py-2 px-20 cursor-pointer text-wrap`;
        break;
      default:
        style = `bg-blue-500 text-white rounded-sm py-2 px-12 cursor-pointer text-wrap `;
    }
    return (
      <button
        ref={ref}
        type={type}
        className={style}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);
