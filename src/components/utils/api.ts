// api.ts
import axios from "axios";
import { keycloak } from "@/auth/keycloak";
import { AxiosHeaders } from "axios";


const api = axios.create({
  baseURL: "https://tourism.api.opendatahub.testingmachine.eu/v1/",
});

// Interceptor per aggiungere sempre il token
api.interceptors.request.use(async (config) => {
  await keycloak.updateToken(30);

  if (keycloak.token) {
    if (!config.headers) {
      config.headers = new AxiosHeaders();
    }
    (config.headers as AxiosHeaders).set(
      "Authorization",
      `Bearer ${keycloak.token}`
    );
  }

  return config;
});


export default api;