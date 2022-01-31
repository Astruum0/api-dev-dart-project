class ApiError {
    constructor(type, message = null) {
        this.type = type;
        this.message = message;
    }

    json() {
        return {
            error: {
                type: this.type,
                message: this.message,
            },
        };
    }
}

module.exports = ApiError;