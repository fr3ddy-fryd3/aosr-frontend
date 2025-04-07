import api from ".";
import { AxiosResponse } from "axios";
import { AosrMaterial } from "@/entities/aosr";
import { CreateAosrMaterialDTO, UpdateAosrMaterialDTO } from "../model/dto/aosr";

export const aosrMaterialApi = {
  get: async () => {
    try {
      let response: AxiosResponse<AosrMaterial[]> = await api.get("/aosr/material");
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },
  getById: async (id: number) => {
    try {
      let response: AxiosResponse<AosrMaterial> = await api.get(`/aosr/material/${id}`);
      return response.data;
    } catch (err) {
      console.error(err);
      return false;
    }
  },
  create: async (data: CreateAosrMaterialDTO) => {
    try {
      let response: AxiosResponse<AosrMaterial> = await api.post(`/aosr/material`, data);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },
  update: async (id: number, data: UpdateAosrMaterialDTO) => {
    try {
      let response: AxiosResponse<AosrMaterial> = await api.patch(`/aosr/material/${id}`, data);
      return response.data;
    } catch (err) {
      console.error(err)
    }
  },
  delete: async (id: number) => {
    try {
      let response = await api.delete(`/aosr/material/${id}`);
      return response.status;
    } catch (err) {
      console.error(err);
    }
  }
}
