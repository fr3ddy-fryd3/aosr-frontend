import { Material } from "@/entities/material";

/**
 * Интерфейс для разделов
  * @property {number} id
  * @property {number} projectId
  * @property {string} name
  * @property {SectionMaterial[]} materials
  */
export interface Section {
  id: number;
  projectId: number;
  name: string;
  materials: SectionMaterial[];
}

/**
 * Интерфейс для материалов привязанных к разделов
  * @property {number} id
  * @property {number} sectionId
  * @property {number} materialId
  * @property {string} volume
  * @property {Material} material
  */
export interface SectionMaterial {
  id: number;
  sectionId: number;
  materialId: number;
  volume: string;
  material: Material;
}
