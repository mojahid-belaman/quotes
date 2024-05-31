import { SQLiteDatabase } from "expo-sqlite";
import { Category } from "../modals/category";
import { Quote } from "../modals/quotes";

export async function getAllCategories(db: SQLiteDatabase) {
  const categories: Category[] = await db.getAllAsync(
    "SELECT * FROM categories;"
  );

  if (Array.isArray(categories)) {
    return categories;
  } else {
    throw new Error("Error executing SQLite query.");
  }
}

export async function getQuotes(db: SQLiteDatabase, categoryId: number) {
  const quotes: Quote[] = await db.getAllAsync(
    `SELECT quotes.id, quotes.imageUrl, quotes.quote, quotes.is_favorite 
    FROM quotes 
    WHERE quotes.categoryId = ?;`,
    [categoryId]
  );

  if (Array.isArray(quotes)) {
    return quotes;
  } else {
    throw new Error("Error executing SQLite querye.");
  }
}

export async function updateQuoteFavoriteStatus(
  db: SQLiteDatabase,
  quoteId: number,
  isFavorite: boolean
) {
  await db.runAsync(`UPDATE quotes SET is_favorite = ? WHERE id = ?;`, [
    isFavorite,
    quoteId,
  ]);
  const result = await db.getFirstAsync<boolean>(
    `SELECT is_favorite FROM quotes WHERE id = ?;`,
    [quoteId]
  );

  if (!!result) return result;
  else throw new Error("Failed to update the quote's favorite status.");
}

export async function getFavoriteQuotes(db: SQLiteDatabase) {
  const favoriteQuotes: Quote[] = await db.getAllAsync(
    `SELECT * FROM quotes WHERE is_favorite = true;`
  );

  if (Array.isArray(favoriteQuotes)) {
    return favoriteQuotes;
  } else {
    throw new Error("Error executing SQLite query.");
  }
}
