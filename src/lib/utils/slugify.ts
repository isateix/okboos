export const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")       // substitui espaços por -
    .replace(/[^\w\-]+/g, "")   // remove caracteres não alfanuméricos
    .replace(/\-\-+/g, "-")     // substitui múltiplos - por um único
    .replace(/^-+/, "")          // remove - do início
    .replace(/-+$/, "");         // remove - do final
};
