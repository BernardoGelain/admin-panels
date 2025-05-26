import { useFormContext } from "react-hook-form";
import { Button } from "~/components/ui/button";

export function FormSubmitButton({ children }: { children: React.ReactNode }) {
  const formContext = useFormContext();

  return (
    <Button
      className="w-full"
      type="submit"
      isLoading={formContext.formState.isSubmitting}
    >
      {children}
    </Button>
  );
}
