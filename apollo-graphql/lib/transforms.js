"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.printWithReducedWhitespace = exports.removeAliases = exports.sortAST = exports.dropUnusedDefinitions = exports.hideStringAndNumericLiterals = exports.hideLiterals = void 0;
const visitor_1 = require("graphql/language/visitor");
const printer_1 = require("graphql/language/printer");
const utilities_1 = require("graphql/utilities");
const lodash_sortby_1 = __importDefault(require("lodash.sortby"));
function hideLiterals(ast) {
    return (0, visitor_1.visit)(ast, {
        IntValue(node) {
            return Object.assign(Object.assign({}, node), { value: "0" });
        },
        FloatValue(node) {
            return Object.assign(Object.assign({}, node), { value: "0" });
        },
        StringValue(node) {
            return Object.assign(Object.assign({}, node), { value: "", block: false });
        },
        ListValue(node) {
            return Object.assign(Object.assign({}, node), { values: [] });
        },
        ObjectValue(node) {
            return Object.assign(Object.assign({}, node), { fields: [] });
        },
    });
}
exports.hideLiterals = hideLiterals;
function hideStringAndNumericLiterals(ast) {
    return (0, visitor_1.visit)(ast, {
        IntValue(node) {
            return Object.assign(Object.assign({}, node), { value: "0" });
        },
        FloatValue(node) {
            return Object.assign(Object.assign({}, node), { value: "0" });
        },
        StringValue(node) {
            return Object.assign(Object.assign({}, node), { value: "", block: false });
        },
    });
}
exports.hideStringAndNumericLiterals = hideStringAndNumericLiterals;
function dropUnusedDefinitions(ast, operationName) {
    const separated = (0, utilities_1.separateOperations)(ast)[operationName];
    if (!separated) {
        return ast;
    }
    return separated;
}
exports.dropUnusedDefinitions = dropUnusedDefinitions;
function sorted(items, ...iteratees) {
    if (items) {
        return (0, lodash_sortby_1.default)(items, ...iteratees);
    }
    return undefined;
}
function sortAST(ast) {
    return (0, visitor_1.visit)(ast, {
        Document(node) {
            return Object.assign(Object.assign({}, node), { definitions: (0, lodash_sortby_1.default)(node.definitions, "kind", "name.value") });
        },
        OperationDefinition(node) {
            return Object.assign(Object.assign({}, node), { variableDefinitions: sorted(node.variableDefinitions, "variable.name.value") });
        },
        SelectionSet(node) {
            return Object.assign(Object.assign({}, node), { selections: (0, lodash_sortby_1.default)(node.selections, "kind", "name.value") });
        },
        Field(node) {
            return Object.assign(Object.assign({}, node), { arguments: sorted(node.arguments, "name.value") });
        },
        FragmentSpread(node) {
            return Object.assign(Object.assign({}, node), { directives: sorted(node.directives, "name.value") });
        },
        InlineFragment(node) {
            return Object.assign(Object.assign({}, node), { directives: sorted(node.directives, "name.value") });
        },
        FragmentDefinition(node) {
            return Object.assign(Object.assign({}, node), { directives: sorted(node.directives, "name.value"), variableDefinitions: sorted(node.variableDefinitions, "variable.name.value") });
        },
        Directive(node) {
            return Object.assign(Object.assign({}, node), { arguments: sorted(node.arguments, "name.value") });
        },
    });
}
exports.sortAST = sortAST;
function removeAliases(ast) {
    return (0, visitor_1.visit)(ast, {
        Field(node) {
            return Object.assign(Object.assign({}, node), { alias: undefined });
        },
    });
}
exports.removeAliases = removeAliases;
function printWithReducedWhitespace(ast) {
    const sanitizedAST = (0, visitor_1.visit)(ast, {
        StringValue(node) {
            return Object.assign(Object.assign({}, node), { value: Buffer.from(node.value, "utf8").toString("hex"), block: false });
        },
    });
    const withWhitespace = (0, printer_1.print)(sanitizedAST);
    const minimizedButStillHex = withWhitespace
        .replace(/\s+/g, " ")
        .replace(/([^_a-zA-Z0-9]) /g, (_, c) => c)
        .replace(/ ([^_a-zA-Z0-9])/g, (_, c) => c);
    return minimizedButStillHex.replace(/"([a-f0-9]+)"/g, (_, hex) => JSON.stringify(Buffer.from(hex, "hex").toString("utf8")));
}
exports.printWithReducedWhitespace = printWithReducedWhitespace;
//# sourceMappingURL=transforms.js.map