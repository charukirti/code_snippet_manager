interface FormActionsProps {
  isSubmitting?: boolean;
  submitText: string;
  onClear: () => void;
}

export function FormActions({
  isSubmitting = false,
  submitText,
  onClear,
}: FormActionsProps) {
  return (
    <footer className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200 dark:border-slate-600">
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 dark:disabled:bg-blue-500 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
      >
        {isSubmitting ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
            Saving...
          </>
        ) : (
          <>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            {submitText}
          </>
        )}
      </button>

      <button
        type="button"
        onClick={onClear}
        className="bg-gray-100 hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-gray-700 dark:text-slate-200 px-6 py-3 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500/20 dark:focus:ring-slate-400/20 cursor-pointer"
      >
        Clear Form
      </button>
    </footer>
  );
}
