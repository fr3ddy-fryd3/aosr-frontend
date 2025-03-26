import api from ".";
import { AxiosResponse } from "axios";
import { Passport } from "../../entities/passport";
import { CreatePassportDTO, UpdatePassportDTO } from "../dto/passport";

export const passportApi = {
  get: async () => {
    try {
      let response: AxiosResponse<Passport> = await api.get("/passport");
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },
  getById: async (id: number) => {
    try {
      let response: AxiosResponse<Passport> = await api.get(`/passport?id=${id}`);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },
  create: async (data: CreatePassportDTO) => {
    try {
      let response: AxiosResponse<Passport> = await api.post(`/passport`, data);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },
  update: async (id: number, data: UpdatePassportDTO) => {
    try {
      let response: AxiosResponse<Passport> = await api.patch(`/passport/${id}`, data);
      return response.data;
    } catch (err) {
      console.error(err)
    }
  },
  delete: async (id: number) => {
    try {
      let response = await api.delete(`/passport/${id}`);
      return response.status;
    } catch (err) {
      console.error(err);
    }
  }
}

