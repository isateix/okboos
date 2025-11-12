// utils/slugify.ts
// Apenas para URLs
export const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD")                // separa acentos
    .replace(/[\u0300-\u036f]/g, "") // remove acentos
    .replace(/\s+/g, "-")           // substitui espaços por -
    .replace(/[^\w\-]+/g, "")       // remove caracteres não alfanuméricos
    .replace(/\-\-+/g, "-")         // substitui múltiplos - por um único
    .replace(/^-+/, "")              // remove - do início
    .replace(/-+$/, "");             // remove - do final
};
