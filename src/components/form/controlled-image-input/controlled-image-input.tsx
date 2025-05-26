import React, { useCallback, useState, useEffect } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Camera, X } from "lucide-react";
import Image from "next/image";
import { Label } from "~/components/ui/label";
import { cn } from "~/lib/utils";

export const ControlledImageInput = ({
  name,
  label,
  className,
  defaultValue,
  ...props
}: {
  name: string;
  label?: string;
  className?: string;
  defaultValue?: string | File | null;
}) => {
  const formContext = useFormContext();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const errorMessage = formContext.formState.errors[name]?.message as
    | string
    | undefined;

  // Handle default value on initial render
  useEffect(() => {
    if (defaultValue) {
      if (typeof defaultValue === "string") {
        setPreviewUrl(defaultValue);
      } else if (defaultValue instanceof File) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(defaultValue);
      }
    }
  }, [defaultValue]);

  const handleImageChange = useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement>,
      onChange: (file: File | null) => void
    ) => {
      const file = e.target.files?.[0];
      if (file) {
        onChange(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    },
    []
  );

  const handleRemoveImage = useCallback(
    (e: React.MouseEvent, onChange: (file: File | null) => void) => {
      e.preventDefault();
      e.stopPropagation();
      onChange(null);
      setPreviewUrl(null);
    },
    []
  );

  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}

      <Controller
        name={name}
        control={formContext.control}
        render={({ field: { onChange } }) => (
          <div className={cn("relative", className)}>
            <label
              className={cn(
                "border-2 border-dashed rounded-lg p-4 hover:border-primary/50 transition-colors",
                "flex flex-col items-center justify-center gap-2",
                "min-h-[200px] w-full cursor-pointer bg-muted/50",
                previewUrl && "border-primary",
                errorMessage && "border-destructive hover:border-destructive",
                "focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
              )}
            >
              {previewUrl ? (
                <div className="relative w-[200px]">
                  <Image
                    height={100}
                    width={100}
                    src={previewUrl}
                    alt="Preview"
                    className="rounded object-contain w-full h-full"
                  />
                  <button
                    type="button"
                    onClick={(e) => handleRemoveImage(e, onChange)}
                    className="absolute top-2 right-2 p-1 rounded-full bg-destructive/90 hover:bg-destructive text-destructive-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <>
                  <Camera
                    className={cn(
                      "h-8 w-8",
                      errorMessage
                        ? "text-destructive"
                        : "text-muted-foreground"
                    )}
                  />
                  <p
                    className={cn(
                      "text-sm",
                      errorMessage
                        ? "text-destructive"
                        : "text-muted-foreground"
                    )}
                  >
                    Clique ou arraste uma imagem
                  </p>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageChange(e, onChange)}
                {...props}
              />
            </label>
            {errorMessage && (
              <p className="text-sm text-destructive mt-2">{errorMessage}</p>
            )}
          </div>
        )}
      />
    </div>
  );
};
