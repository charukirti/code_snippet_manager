import { ComponentProps } from "react";

function Input({ type, className, ...props }: ComponentProps<"input">) {
  return (
    <>
      <input type={type} data-slot="input" className={className} {...props} />
    </>
  );
}

export { Input };
