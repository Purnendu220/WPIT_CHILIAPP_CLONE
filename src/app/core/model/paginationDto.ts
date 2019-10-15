export class PaginationDto {
    page: number = 0;
    size: number = 20;
    sortBy: string = 'id';    
    sortOrder: string = 'DESC';
    stopPagination: boolean = false;

    createPaginatedUri(): string {
        return 'page=' + this.page + '&size=' + this.size + '&sortBy=' + this.sortBy + '&sortOrder=' + this.sortOrder;
    }
}
