import React, { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "~/components/ui/input";
import { useDebounce } from "~/hooks/use-debounce";

export const DataTableApiInputSearch = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [inputValue, setInputValue] = useState(
    searchParams.get("search") || ""
  );
  const debouncedValue = useDebounce(inputValue);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const updateQueryParams = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set("search", value);
      } else {
        params.delete("search");
      }
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  useEffect(() => {
    updateQueryParams(debouncedValue);
  }, [debouncedValue, updateQueryParams]);

  return (
    <Input
      placeholder="Digite sua busca..."
      className="w-full"
      value={inputValue}
      onChange={handleInputChange}
      type="search"
    />
  );
};
