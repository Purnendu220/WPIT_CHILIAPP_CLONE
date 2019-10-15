export class ExplorerRequestModel {
  userId: number;
  page: number;
  filterType: string;
  papularCategory: string; // least or most
  excludeUsers: any;
}
