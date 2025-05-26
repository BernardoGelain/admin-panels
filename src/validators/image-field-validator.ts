"use client";

import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const requiredImageFieldValidator = () => {
  if (typeof window === "undefined") {
    return z.any();
  }
  return z.union([
    z
      .instanceof(File, { message: "Arquivo de imagem é obrigatório" })
      .refine((file) => file.size <= MAX_FILE_SIZE, "Tamanho máximo do arquivo é 5MB")
      .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), "Formato de arquivo não suportado. Use PNG, JPEG, JPG ou WEBP"),
    z.string().url("URL de imagem inválida"),
  ]);
};

export const optionalImageFieldValidator = () => {
  if (typeof window === "undefined") {
    return z.any();
  }
  return z.union([
    z
      .instanceof(File)
      .optional()
      .nullable()
      .refine((file) => !file || file.size <= MAX_FILE_SIZE, "Tamanho máximo do arquivo é 5MB")
      .refine((file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type), "Formato de arquivo não suportado. Use PNG, JPEG, JPG ou WEBP"),
    z.string().url("URL de imagem inválida").optional().nullable(),
  ]);
};
