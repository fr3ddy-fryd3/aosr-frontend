import api from ".";
import { AxiosResponse } from "axios";
import { Aosr } from "@/entities/aosr";
import { CreateAosrDTO, UpdateAosrDTO } from "../model/dto/aosr";

export const aosrApi = {
  get: async () => {
    try {
      let response: AxiosResponse<Aosr[]> = await api.get("/aosr");
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },
  getById: async (id: number) => {
    try {
      let response: AxiosResponse<Aosr> = await api.get(`/aosr?id=${id}`);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },
  getBySection: async (sectionId: number) => {
    try {
      let response: AxiosResponse<Aosr[]> = await api.get(`/aosr/by-section/${sectionId}`);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },
  create: async (data: CreateAosrDTO) => {
    try {
      let response: AxiosResponse<Aosr> = await api.post(`/aosr`, data);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },
  update: async (id: number, data: UpdateAosrDTO) => {
    try {
      let response: AxiosResponse<Aosr> = await api.patch(`/aosr/${id}`, data);
      return response.data;
    } catch (err) {
      console.error(err)
    }
  },
  delete: async (id: number) => {
    try {
      let response = await api.delete(`/aosr/${id}`);
      return response.status;
    } catch (err) {
      console.error(err);
    }
  }
}

