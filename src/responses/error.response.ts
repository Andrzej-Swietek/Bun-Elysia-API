export interface ErrorResponse {
    success: false;
    message: string;
}

export function errorResponse(message: string): ErrorResponse {
    return {
        success: false,
        message
    }
}