export interface Package {
  id: number;
  name: string;
  referenceId: string;
  trackId: string;
  description: string;
  allowImageInPost: number;
  allowBoards: number;
  audioLimit: number;
  videoLimit: number;
  cost: number;
  currencyUnit: string;
  purchaseDate: number;
  expiryDate: number;
}
