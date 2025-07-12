export interface PageResponse<T> {
    totalElements: number;
    totalPages: number;
    pages: number[];
    content: T[];
}
