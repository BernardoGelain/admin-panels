import * as React from "react";

import { cn } from "~/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  invalid?: boolean;
  errorMessage?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, invalid, errorMessage, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        {label && <label className="text-md text-foreground">{label}</label>}
        <textarea
          className={cn(
            "flex min-h-[80px] border-primary dark:border-input w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[error]:border-red-600 data-[error]:placeholder-red-600 data-[error]:ring-red-600",
            className
          )}
          data-error={invalid ? true : undefined}
          ref={ref}
          {...props}
        />
        {invalid && (
          <span className="text-xs text-red-600" data-error-message>
            {errorMessage}
          </span>
        )}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
