
// func for converting grpc status codes to http
export const grpcToHttpCodes = (grpcCode: number): number => {
    const mapping: Record<number, number> = {
        1: 500,   // CANCELLED → 500 Internal Server Error
        2: 500,   // UNKNOWN → 500
        3: 400,   // INVALID_ARGUMENT → 400 Bad Request
        4: 504,   // DEADLINE_EXCEEDED → 504 Gateway Timeout
        5: 404,   // NOT_FOUND → 404 Not Found
        6: 409,   // ALREADY_EXISTS → 409 Conflict
        7: 403,   // PERMISSION_DENIED → 403 Forbidden
        8: 429,   // RESOURCE_EXHAUSTED → 429 Too Many Requests
        9: 400,   // FAILED_PRECONDITION → 400
        10: 409,  // ABORTED → 409
        11: 400,  // OUT_OF_RANGE → 400
        12: 501,  // UNIMPLEMENTED → 501 Not Implemented
        13: 500,  // INTERNAL → 500
        14: 503,  // UNAVAILABLE → 503 Service Unavailable
        15: 500,  // DATA_LOSS → 500
        16: 401,  // UNAUTHENTICATED → 401 Unauthorized
    };

    return mapping[grpcCode] || 500; // По умолчанию 500, если код неизвестен
};