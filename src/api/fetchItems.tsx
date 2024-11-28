import { Item } from "../types/types";

export async function fetchItems(): Promise<Item[]> {
  // Obtenemos primero la lista de items (limitamos a 20 para este ejemplo)
  const response = await fetch(
    "https://pokeapi.co/api/v2/item?limit=20"
  );
  
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  
  // Para cada item, hacemos una llamada para obtener sus detalles
  const itemPromises = data.results.map(async (item: any) => {
    const itemResponse = await fetch(item.url);
    const itemData = await itemResponse.json();
    
    return {
      id: itemData.id.toString(),
      name: itemData.name,
      category: itemData.category.name,
      description: itemData.effect_entries.find((entry: any) => entry.language.name === "en")?.effect || "No description available",
      imgSrc: itemData.sprites.default,
      cost: itemData.cost,
      attributes: itemData.attributes.map((attr: any) => attr.name)
    };
  });

  const items = await Promise.all(itemPromises);
  return items;
}