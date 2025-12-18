import { TextareaHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface FantasyTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export const FantasyTextarea = forwardRef<HTMLTextAreaElement, FantasyTextareaProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label className="text-xs text-muted-foreground uppercase tracking-wide font-display">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={cn(
            "input-fantasy w-full px-3 py-2 rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none resize-none text-base min-h-[80px]",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

FantasyTextarea.displayName = 'FantasyTextarea';
