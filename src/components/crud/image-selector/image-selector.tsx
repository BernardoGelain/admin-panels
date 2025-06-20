"use client";
import { ChevronDownIcon, CheckIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "~/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSkeleton } from "~/components/ui/command";
import { FormControl, FormField, FormItem, FormLabel } from "~/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { useGetEntityList } from "~/hooks/api/crud/use-get-entity-list";
import { useDebounce } from "~/hooks/use-debounce";
import { cn } from "~/lib/utils";
import { QUERY_KEYS } from "~/query-keys/query-keys";

export const ImageSelector = () => {
  const form = useFormContext();
  const [isOpen, setIsOpen] = useState(false);
  const [gallerySearch, setGallerySearch] = useState("");

  const debouncedSearch = useDebounce(gallerySearch);

  const galleryName = form.watch("image.galleryName");

  const { data, isLoading, isFetching } = useGetEntityList<{
    id: number;
    createdAt: string;
    updatedAt: string;
    file: string;
    position: number;
    file144: string;
    file276: string;
    file640: string;
    file300: string;
    organizationId: number;
    galleryName: string;
    organization: {
      id: number;
      name: string;
      phone: string;
      email: string;
      site: string;
    };
    fileUrl: string;
  }>({
    keywords: debouncedSearch || galleryName,
    entityBaseUrl: "GROUPS",
    queryKey: QUERY_KEYS.GROUPS.LIST,
  });

  const selectedImage = form.watch("imageId");

  const images = data?.data ?? [];

  const selectedImageObj =
    images.find((img) => String(img.id) === selectedImage) ||
    (selectedImage
      ? {
          fileUrl: form.getValues("image.fileUrl"),
          galleryName: form.getValues("image.galleryName"),
        }
      : null);

  return (
    <FormField
      control={form.control}
      name="imageId"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel className="text-md">Imagem</FormLabel>
          <Popover
            open={isOpen}
            modal
            onOpenChange={(open) => {
              setIsOpen(open);
              if (open) {
                if (!gallerySearch && selectedImage) {
                  const selected = images.find((img) => String(img.id) === selectedImage);
                  setGallerySearch(selected?.galleryName || "");
                }
              } else {
                setGallerySearch("");
              }
            }}
          >
            <PopoverTrigger
              asChild
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              <FormControl>
                <Button className="flex w-full justify-between !overflow-hidden md:max-w-[620px]" role="combobox" variant="outlineSecondary">
                  <div className="flex items-center gap-2">
                    {selectedImage && selectedImageObj && (
                      <Image
                        className="w-6 h-6 rounded-md object-cover"
                        src={selectedImageObj.fileUrl || ""}
                        alt={selectedImageObj.galleryName || ""}
                        width={24}
                        height={24}
                      />
                    )}
                    <span>{selectedImage ? selectedImageObj?.galleryName : "Selecione uma imagem"}</span>
                  </div>
                  <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command shouldFilter={false}>
                <CommandInput value={gallerySearch} onValueChange={setGallerySearch} placeholder="Procurar imagens..." />
                <CommandList className="w-full md:max-w-[620px]">
                  {!isLoading && !isFetching && images.length === 0 && <CommandEmpty>Nenhuma imagem encontrada.</CommandEmpty>}
                  {(isLoading || isFetching) && <CommandSkeleton />}
                  <CommandGroup>
                    {!isLoading &&
                      !isFetching &&
                      images.map((image) => (
                        <CommandItem
                          value={String(image.id)}
                          key={image.id}
                          onSelect={() => {
                            form.setValue("imageId", String(image.id));
                            form.setValue("image.fileUrl", image.fileUrl);
                            form.setValue("image.galleryName", image.galleryName);
                            setIsOpen(false);
                            setGallerySearch("");
                          }}
                        >
                          <div className="flex items-center gap-4">
                            <Image className="w-8 h-8 rounded-md object-cover" src={image.fileUrl} alt={image.galleryName} width={32} height={32} />
                            <span>{image.galleryName}</span>
                          </div>
                          <CheckIcon className={cn("ml-auto h-4 w-4", String(image.id) === field.value ? "opacity-100" : "opacity-0")} />
                        </CommandItem>
                      ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </FormItem>
      )}
    />
  );
};
