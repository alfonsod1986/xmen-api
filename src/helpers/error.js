class CustomError extends Error {
    constructor(error, status) {
        super(error.message);

        this.name = this.constructor.name;
        this.status = status;
        this.statusCode = status;
        this.message = error.message;

        Error.captureStackTrace(this)
    }
}

module.exports = CustomError;