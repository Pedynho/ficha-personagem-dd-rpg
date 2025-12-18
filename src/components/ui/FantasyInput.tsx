import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface FantasyInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const FantasyInput = forwardRef<HTMLInputElement, FantasyInputProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label className="text-xs text-muted-foreground uppercase tracking-wide font-display">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            "input-fantasy w-full px-3 py-2 rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none text-base",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

FantasyInput.displayName = 'FantasyInput';
