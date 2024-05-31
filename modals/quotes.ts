export class Quote {
  id: string;
  imageUrl: string;
  quote: string;
  is_favorite: boolean;

  constructor(
    id: string,
    imageUrl: string,
    quote: string,
    is_favorite: boolean
  ) {
    this.id = id;
    this.imageUrl = imageUrl;
    this.quote = quote;
    this.is_favorite = is_favorite;
  }
}
