import api from ".";
import { AxiosResponse } from "axios";
import { Section } from "@/entities/section";
import { CreateSectionDTO, UpdateSectionDTO } from "../model/dto/section";

export const sectionApi = {
  get: async () => {
    try {
      let response: AxiosResponse<Section[]> = await api.get("/section");
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },
  getById: async (id: number) => {
    try {
      let response: AxiosResponse<Section> = await api.get(`/section?id=${id}`);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },
  getByProjectId: async (id: number) => {
    try {
      let response: AxiosResponse<Section[]> = await api.get(`/section/by-project/${id}`);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },
  create: async (data: CreateSectionDTO) => {
    try {
      let response: AxiosResponse<Section> = await api.post(`/section`, data);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },
  update: async (id: number, data: UpdateSectionDTO) => {
    try {
      let response: AxiosResponse<Section> = await api.patch(`/section/${id}`, data);
      return response.data;
    } catch (err) {
      console.error(err)
    }
  },
  delete: async (id: number) => {
    try {
      let response = await api.delete(`/section/${id}`);
      return response.status;
    } catch (err) {
      console.error(err);
    }
  }
}

