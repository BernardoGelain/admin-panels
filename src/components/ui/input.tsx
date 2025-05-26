import * as React from "react";
import { cn } from "~/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  invalid?: boolean;
  errorMessage?: string;
  helperText?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      label,
      invalid = undefined,
      errorMessage,
      helperText,
      ...props
    },
    ref
  ) => {
    return (
      <div className="flex flex-col gap-2">
        {!!label && <label className="text-md text-foreground">{label}</label>}
        <input
          data-error={invalid ? true : undefined}
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border  border-primary dark:border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[error]:border-red-600 data-[error]:placeholder-red-600 data-[error]:ring-red-600",
            className
          )}
          ref={ref}
          {...props}
        />
        {!!helperText && (
          <span className="text-xs text-muted-foreground">{helperText}</span>
        )}
        {invalid && (
          <span className="text-xs text-red-600" data-error-message>
            {errorMessage}
          </span>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
