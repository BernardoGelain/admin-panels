"use client";

import { useFormContext } from "react-hook-form";

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
import { CheckIcon, XIcon } from "lucide-react";

type Props = {
  options: {
    value: string;
    label: string;
  }[];
  name: string;
  label: string;
  onSearch: (search: string) => void;
  search: string;
  isLoading?: boolean;
  max?: number;
};

export function MultiEntitySelector({
  options,
  name,
  label,
  onSearch,
  search,
  isLoading,
  max,
}: Props) {
  const form = useFormContext();

  const selectedValues: string[] = form.watch(name) || [];

  const toggleSelection = (optionValue: string) => {
    const currentValues = selectedValues || [];

    const isSelected = currentValues.includes(optionValue);

    let newValues: string[];
    if (isSelected) {
      newValues = currentValues.filter((v) => v !== optionValue);
    } else {
      if (max && currentValues.length >= max) {
        return;
      }
      newValues = [...currentValues, optionValue];
    }

    form.setValue(name, newValues, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const displayText =
    selectedValues.length > 0
      ? selectedValues
          .map((val) => options.find((option) => option.value === val)?.label)
          .filter(Boolean)
          .join(", ")
      : "Selecione uma ou mais opções";

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name={name}
        render={() => (
          <FormItem className="flex flex-col">
            <FormLabel>{label}</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    role="combobox"
                    className={cn(
                      "max-w-[600px] justify-between",
                      selectedValues.length === 0 && "text-muted-foreground"
                    )}
                  >
                    <span className="truncate">{displayText}</span>
                    {selectedValues.length > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="ml-2 p-0 hover:bg-transparent"
                        onClick={(e) => {
                          e.stopPropagation();
                          form.setValue(name, [], {
                            shouldValidate: true,
                            shouldDirty: true,
                          });
                        }}
                      >
                        <XIcon className="h-4 w-4" />
                      </Button>
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
                            onSelect={() => toggleSelection(option.value)}
                          >
                            {option.label}
                            <CheckIcon
                              className={cn(
                                "ml-auto",
                                selectedValues.includes(option.value)
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
            <FormMessage />
            {max && (
              <div className="text-sm text-muted-foreground">
                Máximo de {max} seleções permitidas
              </div>
            )}
          </FormItem>
        )}
      />
    </Form>
  );
}
