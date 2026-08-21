import { AlertTriangle } from 'lucide-react';
import Button from '@/components/ui/Button';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export default function ErrorState({
  title = 'Something went wrong',
  message = 'We could not load the requested content. Please try again.',
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
      <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-error">
        <AlertTriangle className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-semibold text-charcoal">{title}</h3>
      <p className="text-text-muted text-sm max-w-md">{message}</p>
      {onRetry && (
        <Button variant="outline" size="md" onClick={onRetry}>
          Try Again
        </Button>
      )}
    </div>
  );
}
