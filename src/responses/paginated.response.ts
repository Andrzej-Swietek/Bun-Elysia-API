export interface PaginatedResponse<T> {
    success: boolean;
    data: T[];
    totalItems: number;
    currentPage: number;
    totalPages: number;
}

export function paginatedResponse<T>(data: T[], totalItems: number, currentPage: number=1, totalPages: number=1) {
    return {
        success: data.length > 0,
        data,
        totalItems,
        currentPage,
        totalPages
    }
}