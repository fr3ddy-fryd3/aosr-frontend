// src/shared/api/index.ts
import axios from 'axios';
import camelCase from 'camelcase-keys';
import snakeCase from 'snakecase-keys';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/v1',
});

// Преобразование ответа (snake_case -> camelCase)
api.interceptors.response.use(
  (response) => {
    response.data = camelCase(response.data, { deep: true });
    return response;
  },
  (error) => Promise.reject(error)
);

// Преобразование запроса (camelCase -> snake_case)
api.interceptors.request.use(
  (config) => {
    if (config.data) {
      config.data = snakeCase(config.data, { deep: true });
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
