import { useEffect, useState } from "react";
import { fetchItems } from "../api/fetchItems";
import Footer from "../components/footer";
import Header from "../components/header";
import { Item } from "../types/types";
import styles from "./items.module.css";
import LoadingScreen from "../components/loadingScreen";
import { waitFor } from "../utils/utils";

const Items = () => {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchAllItems = async () => {
      setIsLoading(true);
      await waitFor(1000);
      const allItems = await fetchItems();
      setItems(allItems);
      
      // Extraer categorías únicas de los items
      const uniqueCategories = Array.from(new Set(allItems.map(item => item.category)));
      setCategories(uniqueCategories);
      
      setIsLoading(false);
    };
    fetchAllItems();
  }, []);

  const filteredItems = items?.filter((item) => {
    const matchesQuery = item.name.toLowerCase().match(query.toLowerCase());
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    return matchesQuery && matchesCategory;
  });

  if (isLoading || !items) {
    return <LoadingScreen />;
  }

  const formatName = (name: string) => {
    return name.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <>
      <Header query={query} setQuery={setQuery} />
      <main className={styles.mainContainer}>
        <div className={styles.categoryFilter}>
          <button
            className={`${styles.categoryButton} ${
              activeCategory === "all" ? styles.active : ""
            }`}
            onClick={() => setActiveCategory("all")}
          >
            Todos
          </button>
          {categories.map(category => (
            <button
              key={category}
              className={`${styles.categoryButton} ${
                activeCategory === category ? styles.active : ""
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {formatName(category)}
            </button>
          ))}
        </div>
        <div className={styles.itemGrid}>
          {filteredItems?.map((item) => (
            <div key={item.id} className={styles.itemCard}>
              <div className={styles.itemCardContent}>
                <img
                  className={styles.itemIcon}
                  src={item.imgSrc}
                  alt={item.name}
                />
                <div className={styles.itemInfo}>
                  <span className={styles.itemName}>{formatName(item.name)}</span>
                  <span className={styles.itemCategory}>
                    {formatName(item.category)}
                  </span>
                  <span className={styles.itemDescription}>
                    {item.description}
                  </span>
                  <span className={styles.itemCost}>
                    Precio: ₽{item.cost}
                  </span>
                  {item.attributes.length > 0 && (
                    <div className={styles.itemAttributes}>
                      {item.attributes.map((attr, index) => (
                        <span key={index} className={styles.attribute}>
                          {formatName(attr)}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Items;