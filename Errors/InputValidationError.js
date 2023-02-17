
class InputValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "InputValidationError";
        this.statusCode = 400;
    }
}