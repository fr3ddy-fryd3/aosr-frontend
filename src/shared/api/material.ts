import { AxiosResponse } from "axios";
import api from ".";

import { Material } from "@/entities/material";
import { CreateMaterialDTO, UpdateMaterialDTO } from "@/shared/model/dto/material";

export const materialApi = {
  get: async () => {
    try {
      let response: AxiosResponse<Material[]> = await api.get("/material");
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },
  getById: async (id: number) => {
    try {
      let response: AxiosResponse<Material> = await api.get(`/material?id=${id}`);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },
  create: async (data: CreateMaterialDTO) => {
    try {
      let response: AxiosResponse<Material> = await api.post(`/material`, data);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },
  update: async (id: number, data: UpdateMaterialDTO) => {
    try {
      let response: AxiosResponse<Material> = await api.patch(`/material/${id}`, data);
      return response.data;
    } catch (err) {
      console.error(err)
    }
  },
  delete: async (id: number) => {
    try {
      let response = await api.delete(`/material/${id}`);
      return response.status;
    } catch (err) {
      console.error(err);
    }
  }
}

