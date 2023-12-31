"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphQLSchemaValidationError = void 0;
class GraphQLSchemaValidationError extends Error {
    constructor(errors) {
        super();
        this.errors = errors;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
        this.message = errors.map((error) => error.message).join("\n\n");
    }
}
exports.GraphQLSchemaValidationError = GraphQLSchemaValidationError;
//# sourceMappingURL=GraphQLSchemaValidationError.js.map