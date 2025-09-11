interface FormHeaderProps {
  title: string;
  description: string;
}

export function FormHeader({ title, description }: FormHeaderProps) {
  return (
    <header className="mb-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-slate-100 mb-2">{title}</h1>
      <p className="text-gray-600 dark:text-slate-300">{description}</p>
    </header>
  );
}