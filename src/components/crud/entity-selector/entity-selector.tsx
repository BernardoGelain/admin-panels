"use client";

import { useFormContext } from "react-hook-form";
import { useState } from "react";

import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSkeleton,
} from "~/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { CheckIcon, ChevronDown, ChevronUp } from "lucide-react";

export type EntitySelectorProps = {
  options: {
    value: string;
    label: string;
  }[];
  fieldName: string;
  label: string;
  onSearch: (search: string) => void;
  search: string;
  helperText?: string;
  isLoading?: boolean;
};

export function EntitySelector({
  options,
  fieldName,
  label,
  onSearch,
  search,
  isLoading,
  helperText,
}: EntitySelectorProps) {
  const form = useFormContext();
  const [open, setOpen] = useState(false);

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name={fieldName}
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>{label}</FormLabel>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    role="combobox"
                    className={cn(
                      "max-w-[600px] justify-between",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value
                      ? options.find((option) => option.value === field.value)
                          ?.label
                      : "Selecione uma opção"}
                    {open ? (
                      <ChevronUp className="ml-2" size={16} />
                    ) : (
                      <ChevronDown className="ml-2" size={16} />
                    )}
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="max-w-[600px] p-0">
                <Command shouldFilter={false}>
                  <CommandInput
                    placeholder="Search..."
                    value={search}
                    onValueChange={onSearch}
                  />
                  {isLoading ? (
                    <CommandSkeleton />
                  ) : (
                    <CommandList>
                      <CommandEmpty>Nada encontrado...</CommandEmpty>
                      <CommandGroup>
                        {options.map((option) => (
                          <CommandItem
                            value={option.label}
                            key={option.value}
                            onSelect={() => {
                              form.setValue(fieldName, option.value);
                              setOpen(false);
                            }}
                          >
                            {option.label}
                            <CheckIcon
                              className={cn(
                                "ml-auto",
                                option.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  )}
                </Command>
              </PopoverContent>
            </Popover>
            {!!helperText && (
              <span className="text-xs text-muted-foreground">
                {helperText}
              </span>
            )}
            <FormMessage />
          </FormItem>
        )}
      />
    </Form>
  );
}
