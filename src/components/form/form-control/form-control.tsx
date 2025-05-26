import { cn } from "~/lib/utils";
import React from "react";

export type FormControlProps = {
  label?: string;
  errorMessage?: string;
  children?: React.ReactNode;
  textWhite?: boolean;
};

export const FormControl = ({
  label,
  errorMessage,
  children,
  textWhite,
}: FormControlProps) => {
  return (
    <div className="flex w-full flex-col gap-2">
      {label && (
        <label
          className={cn({
            "!text-alert_negative-1": !!errorMessage,
            "!text-white": textWhite,
          })}
        >
          {label}
        </label>
      )}
      {children}
      {!!errorMessage && (
        <span className="text-xs text-red-600">{errorMessage}</span>
      )}
    </div>
  );
};
