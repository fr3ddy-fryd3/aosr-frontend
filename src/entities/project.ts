import { Material } from "./material";

export interface ProjectMaterial {
  id: number;
  projectId: number;
  materialId: number;
  volume: number;
  material: Material;
}

export interface Project {
  id: number;
  name: string;
  materials: ProjectMaterial[];
}
