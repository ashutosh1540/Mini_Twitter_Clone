"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hideLiterals = exports.hideStringAndNumericLiterals = exports.printWithReducedWhitespace = exports.defaultEngineReportingSignature = exports.operationHash = exports.operationRegistrySignature = exports.defaultUsageReportingSignature = exports.defaultOperationRegistrySignature = void 0;
var operationId_1 = require("./operationId");
Object.defineProperty(exports, "defaultOperationRegistrySignature", { enumerable: true, get: function () { return operationId_1.defaultOperationRegistrySignature; } });
Object.defineProperty(exports, "defaultUsageReportingSignature", { enumerable: true, get: function () { return operationId_1.defaultUsageReportingSignature; } });
Object.defineProperty(exports, "operationRegistrySignature", { enumerable: true, get: function () { return operationId_1.operationRegistrySignature; } });
Object.defineProperty(exports, "operationHash", { enumerable: true, get: function () { return operationId_1.operationHash; } });
Object.defineProperty(exports, "defaultEngineReportingSignature", { enumerable: true, get: function () { return operationId_1.defaultUsageReportingSignature; } });
__exportStar(require("./schema"), exports);
var transforms_1 = require("./transforms");
Object.defineProperty(exports, "printWithReducedWhitespace", { enumerable: true, get: function () { return transforms_1.printWithReducedWhitespace; } });
Object.defineProperty(exports, "hideStringAndNumericLiterals", { enumerable: true, get: function () { return transforms_1.hideStringAndNumericLiterals; } });
Object.defineProperty(exports, "hideLiterals", { enumerable: true, get: function () { return transforms_1.hideLiterals; } });
//# sourceMappingURL=index.js.map