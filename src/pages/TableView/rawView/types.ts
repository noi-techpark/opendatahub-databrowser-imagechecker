    /*
    <!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

    */
    
    export type JsonPrimitive = string | number | boolean | null;
    export type JsonValue = JsonPrimitive | JsonObject | JsonArray;
    export type JsonObject = { [key: string]: JsonValue };
    export type JsonArray = JsonValue[];
