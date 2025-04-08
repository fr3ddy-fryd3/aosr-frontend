import api from ".";
import { AxiosResponse } from "axios";
import { PassportUsage } from "@/entities/passport";
import { CreatePassportUsageDTO, UpdatePassportUsageDTO } from "../model/dto/passport";

export const passportUsageApi = {
  get: async () => {
    try {
      let response: AxiosResponse<PassportUsage[]> = await api.get("/passport-usage");
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },
  getById: async (id: number) => {
    try {
      let response: AxiosResponse<PassportUsage> = await api.get(`/passport-usage/${id}`);
      return response.data;
    } catch (err) {
      console.error(err);
      return false;
    }
  },
  create: async (data: CreatePassportUsageDTO) => {
    try {
      let response: AxiosResponse<PassportUsage> = await api.post(`/passport-usage`, data);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },
  update: async (id: number, data: UpdatePassportUsageDTO) => {
    try {
      let response: AxiosResponse<PassportUsage> = await api.patch(`/passport-usage/${id}`, data);
      return response.data;
    } catch (err) {
      console.error(err)
    }
  },
  delete: async (id: number) => {
    try {
      let response = await api.delete(`/passport-usage/${id}`);
      return response.status;
    } catch (err) {
      console.error(err);
    }
  }
}
