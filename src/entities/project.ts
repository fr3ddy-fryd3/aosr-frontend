import { Material } from "@/entities/material";

/**
 * Интерфейс для проектов
 * @property {number} id 
 * @property {string} name
 * @property {ProjectMaterial[]} materials
 */
export interface Project {
  id: number;
  name: string;
  materials: ProjectMaterial[];
}

/**
 * Интерфейс для материалов привязанных к проекту
  * @property {number} id
  * @property {number} projectId
  * @property {number} materialId
  * @property {string} volume
  * @property {Material} material
  */
export interface ProjectMaterial {
  id: number;
  projectId: number;
  materialId: number;
  volume: string;
  material: Material;
}
