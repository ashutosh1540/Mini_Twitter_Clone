"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformSchema = void 0;
const graphql_1 = require("graphql");
const mapValues_1 = require("../utilities/mapValues");
function transformSchema(schema, transformType) {
    const typeMap = Object.create(null);
    for (const oldType of Object.values(schema.getTypeMap())) {
        if ((0, graphql_1.isIntrospectionType)(oldType))
            continue;
        const result = transformType(oldType);
        if (result === null)
            continue;
        const newType = result || oldType;
        typeMap[newType.name] = recreateNamedType(newType);
    }
    const schemaConfig = schema.toConfig();
    return new graphql_1.GraphQLSchema(Object.assign(Object.assign({}, schemaConfig), { types: Object.values(typeMap), query: replaceMaybeType(schemaConfig.query), mutation: replaceMaybeType(schemaConfig.mutation), subscription: replaceMaybeType(schemaConfig.subscription), directives: replaceDirectives(schemaConfig.directives) }));
    function recreateNamedType(type) {
        if ((0, graphql_1.isObjectType)(type)) {
            const config = type.toConfig();
            return new graphql_1.GraphQLObjectType(Object.assign(Object.assign({}, config), { interfaces: () => config.interfaces.map(replaceNamedType), fields: () => replaceFields(config.fields) }));
        }
        else if ((0, graphql_1.isInterfaceType)(type)) {
            const config = type.toConfig();
            return new graphql_1.GraphQLInterfaceType(Object.assign(Object.assign({}, config), { interfaces: () => config.interfaces.map(replaceNamedType), fields: () => replaceFields(config.fields) }));
        }
        else if ((0, graphql_1.isUnionType)(type)) {
            const config = type.toConfig();
            return new graphql_1.GraphQLUnionType(Object.assign(Object.assign({}, config), { types: () => config.types.map(replaceNamedType) }));
        }
        else if ((0, graphql_1.isInputObjectType)(type)) {
            const config = type.toConfig();
            return new graphql_1.GraphQLInputObjectType(Object.assign(Object.assign({}, config), { fields: () => replaceInputFields(config.fields) }));
        }
        return type;
    }
    function replaceType(type) {
        if ((0, graphql_1.isListType)(type)) {
            return new graphql_1.GraphQLList(replaceType(type.ofType));
        }
        else if ((0, graphql_1.isNonNullType)(type)) {
            return new graphql_1.GraphQLNonNull(replaceType(type.ofType));
        }
        return replaceNamedType(type);
    }
    function replaceNamedType(type) {
        const newType = typeMap[type.name];
        return newType ? newType : type;
    }
    function replaceMaybeType(type) {
        return type ? replaceNamedType(type) : undefined;
    }
    function replaceFields(fieldsMap) {
        return (0, mapValues_1.mapValues)(fieldsMap, (field) => (Object.assign(Object.assign({}, field), { type: replaceType(field.type), args: field.args ? replaceArgs(field.args) : undefined })));
    }
    function replaceInputFields(fieldsMap) {
        return (0, mapValues_1.mapValues)(fieldsMap, (field) => (Object.assign(Object.assign({}, field), { type: replaceType(field.type) })));
    }
    function replaceArgs(args) {
        return (0, mapValues_1.mapValues)(args, (arg) => (Object.assign(Object.assign({}, arg), { type: replaceType(arg.type) })));
    }
    function replaceDirectives(directives) {
        return directives.map((directive) => {
            const config = directive.toConfig();
            return new graphql_1.GraphQLDirective(Object.assign(Object.assign({}, config), { args: replaceArgs(config.args) }));
        });
    }
}
exports.transformSchema = transformSchema;
//# sourceMappingURL=transformSchema.js.map