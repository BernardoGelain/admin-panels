import { useFormContext } from "react-hook-form";
import { ComponentProps } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { FormControl } from "../form-control/form-control";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";

export type ControlledSelectProps = {
  name: string;
  placeholder: string;
  label: string;
  options: {
    label: string;
    value: string;
  }[];
  defaultValue?: string;
} & ComponentProps<typeof Select>;

export function ControlledSelect(props: ControlledSelectProps) {
  const form = useFormContext();
  const { defaultValue, ...rest } = props;

  return (
    <FormField
      control={form.control}
      name={props.name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{props.label}</FormLabel>
          <Select
            onValueChange={field.onChange}
            value={field.value || defaultValue}
            {...rest}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={props.placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {props.options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
