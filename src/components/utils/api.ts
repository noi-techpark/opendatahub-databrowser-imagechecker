/*
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: AGPL-3.0-or-later
*/

// api.ts
import axios from "axios";
import { AxiosHeaders } from "axios";
import { useAuth } from "@/auth/authStores/auth";


//TODOO this doesnt use the keycloak token, but its copy in the auth store
//as of now, the token seems to expire, should the token keep refreshing? or is it okay like this
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


export default api;
