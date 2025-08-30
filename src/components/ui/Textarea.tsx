import { ComponentProps } from "react";

function Textarea({
  rows,
  id,
  className,
  ...props
}: ComponentProps<"textarea">) {
  return <textarea id={id} className={className} rows={rows} {...props} />;
}

export { Textarea };
