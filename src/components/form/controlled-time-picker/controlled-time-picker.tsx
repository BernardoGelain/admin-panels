import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { TimePicker } from "~/components/ui/time-picker";

type Props = {
  name: string;
  label: string;
};

export function ControlledTimePicker({ name, label }: Props) {
  const formContext = useFormContext();

  return (
    <FormField
      control={formContext.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col gap-2 justify-start items-start">
          <FormLabel>{label}</FormLabel>
          <TimePicker
            date={field.value}
            onChange={field.onChange}
            granularity="minute"
          />
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
