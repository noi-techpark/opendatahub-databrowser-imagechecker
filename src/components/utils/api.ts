/*
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
*/

import axios from "axios";
import { AxiosHeaders } from "axios";
import { useAuth } from "@/auth/authStores/auth";


//TODOO this doesnt use the keycloak token, but its copy in the auth store
//this is because, as of now, the token refresh always outputs and error
const auth = useAuth()
const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASE_URL,
});

// Interceptor per aggiungere sempre il token
api.interceptors.request.use((config) => {
  if (auth.isAuthenticated) {
    if (!config.headers) {
      config.headers = new AxiosHeaders();
    }

    (config.headers as AxiosHeaders).set(
      "Authorization",
      `Bearer ${auth.accessToken}`
    );
  }
  return config;
});


/*
Example without auth store and using only keycloak token with refresh

api.interceptors.request.use((config) => {
  if (keycloak.authenticated && keycloak.token) {
    if (!config.headers) config.headers = {};
    config.headers["Authorization"] = `Bearer ${keycloak.token}`;
  }
  return config;
});

*/


export default api;
