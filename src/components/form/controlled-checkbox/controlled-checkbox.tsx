import React from "react";
import { useController, UseControllerProps } from "react-hook-form";
import { CheckboxWithText } from "~/components/ui/checkbox";

type Props = {
  name: string;
  label: string;
  onChange?: (checked: boolean) => void;
} & UseControllerProps;

export const ControlledCheckbox: React.FC<Props> = ({ name, label, onChange, control }) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: false,
  });

  const hasError = Boolean(error?.message);

  return (
    <div className="w-full flex justify-center items-start flex-col">
      <div className="flex items-center justify-start w-full gap-3">
        <CheckboxWithText
          name={field.name}
          label={label}
          checked={field.value}
          onCheckedChange={(checked: boolean) => {
            field.onChange(checked);
            if (onChange) {
              onChange(checked);
            }
          }}
          onBlur={field.onBlur}
        />
      </div>
      {hasError && <span className="text-alert_negative-1 typography-secondary-text-small mt-2">{error?.message}</span>}
    </div>
  );
};
