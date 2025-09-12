    /*
    <!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
-->

    */
    
     type JsonPrimitive = string | number | boolean | null;
     type JsonObject = { [key: string]: JsonValue };
     type JsonArray = JsonValue[];

    export type JsonValue = JsonPrimitive | JsonObject | JsonArray;