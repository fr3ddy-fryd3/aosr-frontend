import api from ".";
import { AxiosResponse } from "axios";
import { SectionMaterial } from "@/entities/section";
import { CreateSectionMaterialDTO, UpdateSectionMaterialDTO } from "../model/dto/section";

export const sectionMaterialApi = {
  get: async () => {
    try {
      let response: AxiosResponse<SectionMaterial[]> = await api.get("/section/material");
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },
  getById: async (id: number) => {
    try {
      let response: AxiosResponse<SectionMaterial> = await api.get(`/section/material/${id}`);
      return response.data;
    } catch (err) {
      console.error(err);
      return false;
    }
  },
  create: async (data: CreateSectionMaterialDTO) => {
    try {
      let response: AxiosResponse<SectionMaterial> = await api.post(`/section/material`, data);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },
  update: async (id: number, data: UpdateSectionMaterialDTO) => {
    try {
      let response: AxiosResponse<SectionMaterial> = await api.patch(`/section/material/${id}`, data);
      return response.data;
    } catch (err) {
      console.error(err)
    }
  },
  delete: async (id: number) => {
    try {
      let response = await api.delete(`/section/material/${id}`);
      return response.status;
    } catch (err) {
      console.error(err);
    }
  }
}
