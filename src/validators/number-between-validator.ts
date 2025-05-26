import { z } from "zod";

export const numberBetweenValidator = ({
  min,
  max,
}: {
  min: number;
  max: number;
}) => {
  return z.string().refine(
    (value) => {
      if (!value) return false;
      const percentage = parseFloat(value);
      return percentage >= min && percentage <= max;
    },
    { message: "Insira um valor entre 0.00 e 1.00" }
  );
};
