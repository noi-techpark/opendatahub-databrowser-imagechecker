    /*
    <!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

    */
    
    export type JsonPrimitive = string | number | boolean | null;
    export type JsonValue = JsonPrimitive | JsonObject | JsonArray;
    export interface JsonObject { [key: string]: JsonValue }
    export interface JsonArray extends Array<JsonValue> {}
