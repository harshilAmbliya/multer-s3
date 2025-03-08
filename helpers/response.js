const prepareSuccessResponse = (data, message) => {
    return {
        data: data,
        message: message,
        success: true,
    };
}

const prepareErrorResponse = (message) => {
    return {
        message: message,
        success: false,
    };
}

export {
    prepareSuccessResponse,
    prepareErrorResponse
};