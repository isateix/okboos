// actions.js
export const fetchProducts = async () => {
  try {
    // Aqui você pode buscar do seu backend ou de um JSON local
    const response = await fetch("/path/para/seus/produtos.json");
    if (!response.ok) {
      throw new Error("Erro ao buscar produtos");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
