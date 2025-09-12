    export type JsonPrimitive = string | number | boolean | null;
    export type JsonValue = JsonPrimitive | JsonObject | JsonArray;
    export interface JsonObject { [key: string]: JsonValue }
    export interface JsonArray extends Array<JsonValue> {}
