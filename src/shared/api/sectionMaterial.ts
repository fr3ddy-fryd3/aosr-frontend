import api from ".";
import { AxiosResponse } from "axios";
import { SectionMaterial } from "@/entities/section";
import { CreateSectionMaterialDTO, UpdateSectionMaterialDTO } from "../model/dto/section";

export const sectionMaterialApi = {
  get: async () => {
    try {
      let response: AxiosResponse<SectionMaterial[]> = await api.get("/sectionMaterial");
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },
  getById: async (id: number) => {
    try {
      let response: AxiosResponse<SectionMaterial> = await api.get(`/sectionMaterial?id=${id}`);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },
  create: async (data: CreateSectionMaterialDTO) => {
    try {
      let response: AxiosResponse<SectionMaterial> = await api.post(`/sectionMaterial`, data);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },
  update: async (id: number, data: UpdateSectionMaterialDTO) => {
    try {
      let response: AxiosResponse<SectionMaterial> = await api.patch(`/sectionMaterial/${id}`, data);
      return response.data;
    } catch (err) {
      console.error(err)
    }
  },
  delete: async (id: number) => {
    try {
      let response = await api.delete(`/sectionMaterial/${id}`);
      return response.status;
    } catch (err) {
      console.error(err);
    }
  }
}
