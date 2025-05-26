import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Separator } from "~/components/ui/separator";
import { Skeleton } from "~/components/ui/skeleton";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "~/lib/utils";

type Props = {
  options: {
    value: string;
    label: string;
  }[];
  label: string;
  queryParam: string;
  selectTriggerClassName?: string;
  loading?: boolean;
};

export const DataTableSelector = ({
  options,
  label,
  queryParam,
  selectTriggerClassName,
  loading,
}: Props) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  useEffect(() => {
    if (searchParams) {
      setSelectedValue(searchParams.get(queryParam) ?? null);
    } else {
      setSelectedValue(null);
    }
  }, [searchParams, queryParam]);

  const handleChange = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set(queryParam, term);
    } else {
      params.delete(queryParam);
    }

    replace(`${pathname}?${params.toString()}`);
  };

  if (loading) {
    return (
      <Skeleton className={cn("w-full lg:w-[180px]", selectTriggerClassName)} />
    );
  }

  return (
    // @ts-expect-error - not sure why it does not accept null, since the doc says it should
    <Select onValueChange={(e) => handleChange(e)} value={selectedValue}>
      <SelectTrigger
        className={cn("w-full lg:w-[180px]", selectTriggerClassName)}
      >
        <Label htmlFor="terms">{label}</Label>
        <Separator orientation="vertical" />
        <SelectValue placeholder={`Selecione o ${label}`} />
      </SelectTrigger>
      <SelectContent>
        {/* @ts-expect-error - not sure why it does not accept null, since the doc says it should */}
        <SelectItem value={null}>Todos</SelectItem>
        {options?.map((option, index) => (
          <SelectItem value={option.value} key={index}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
