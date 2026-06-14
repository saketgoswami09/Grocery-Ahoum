interface EmptyStateProps {
  icon: string;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center animate-fade-in">
      <div className="text-6xl mb-6">{icon}</div>
      <h3 className="text-xl font-bold text-dark mb-2">{title}</h3>
      <p className="text-gray text-sm max-w-xs mb-6">{description}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="bg-primary text-white font-semibold py-3 px-10 rounded-[var(--radius-lg)] hover:bg-primary-dark transition-colors shadow-button"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
