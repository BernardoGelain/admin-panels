import { useController } from "react-hook-form";
import { Input, InputProps } from "~/components/ui/input";

export type ControlledTextInputProps = {
  name: string;
} & InputProps;

export function ControlledTextInput({
  name,
  ...props
}: ControlledTextInputProps) {
  const { field, fieldState } = useController({
    name,
    defaultValue: "",
  });

  return (
    <Input
      {...props}
      onChange={field.onChange}
      onBlur={field.onBlur}
      value={field.value}
      name={field.name}
      invalid={fieldState.invalid}
      errorMessage={fieldState.error?.message}
    />
  );
}
