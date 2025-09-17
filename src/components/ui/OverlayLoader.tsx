export function OverlayLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
      <div className="flex flex-col items-center justify-center space-y-4 p-8">
        <div className="w-16 h-16 border-4 border-slate-600 dark:border-slate-300 border-t-transparent rounded-full animate-spin"></div>
        <div className="text-base font-medium text-slate-700 dark:text-slate-200 text-center animate-pulse">
          Loading...
        </div>
      </div>
    </div>
  );
}
