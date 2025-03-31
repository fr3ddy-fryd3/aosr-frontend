import api from ".";
import { AxiosResponse } from "axios";
import { Project } from "@/entities/project";
import { CreateProjectDTO, UpdateProjectDTO } from "../model/dto/project";

export const projectApi = {
  get: async () => {
    try {
      let response: AxiosResponse<Project[]> = await api.get("/project");
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },
  getById: async (id: number) => {
    try {
      let response: AxiosResponse<Project> = await api.get(`/project?id=${id}`);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },
  create: async (data: CreateProjectDTO) => {
    try {
      let response: AxiosResponse<Project> = await api.post(`/project`, data);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },
  update: async (id: number, data: UpdateProjectDTO) => {
    try {
      let response: AxiosResponse<Project> = await api.patch(`/project/${id}`, data);
      return response.data;
    } catch (err) {
      console.error(err)
    }
  },
  delete: async (id: number) => {
    try {
      let response = await api.delete(`/project/${id}`);
      return response.status;
    } catch (err) {
      console.error(err);
    }
  }
}

