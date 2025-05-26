import { useController } from "react-hook-form";
import { Textarea, TextareaProps } from "~/components/ui/textarea";

export type ControlledTextAreaProps = {
  name: string;
} & TextareaProps;

export function ControlledTextArea({
  name,
  ...props
}: ControlledTextAreaProps) {
  const { field, fieldState } = useController({
    name,
    defaultValue: "",
  });

  return (
    <Textarea
      className="h-32"
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
