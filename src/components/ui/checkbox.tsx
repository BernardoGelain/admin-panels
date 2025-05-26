"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

import { cn } from "~/lib/utils";

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

interface CheckboxWithTextProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
    "onChange"
  > {
  label: string;
  name: string;
  labelClassName?: string;
  onChange?: (checked: boolean) => void;
}

const CheckboxWithText = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxWithTextProps
>(({ label, name, labelClassName, onChange, ...props }, ref) => {
  return (
    <div className="flex items-end space-x-2">
      <Checkbox
        id={name}
        ref={ref}
        onCheckedChange={(checked) => {
          if (onChange) {
            onChange(checked as boolean);
          }
        }}
        {...props}
      />
      <div className="grid gap-1.5 leading-none">
        <label
          htmlFor={name}
          className={cn(
            "cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
            labelClassName
          )}
        >
          {label}
        </label>
      </div>
    </div>
  );
});

CheckboxWithText.displayName = "CheckboxWithText";

CheckboxWithText.displayName = "CheckboxWithText";
export { Checkbox, CheckboxWithText };
