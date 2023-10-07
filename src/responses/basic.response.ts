export interface BasicResponse {
    success: boolean;
}

export function basicResponse(success: boolean): BasicResponse {
    return {
        success
    }
}