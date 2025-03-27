import { Material } from "@/entities/material";

/**
  * Интерфейс для актов освидетельствования скрытых работ
  * @property {number} id 
  * @property {number} sectionId
  * @property {string} name
  * @property {AosrMaterial[]} materials
  */
export interface Aosr {
  id: number;
  sectionId: number;
  name: string;
  materials: AosrMaterial[];
}

/**
  * Интерфейс для материалов АОСР
  * @property {number} id
  * @property {number} aosrId
  * @property {number} materialId
  * @property {string} volume
  * @property {string} usedVolume
  * @property {Material} material
  */
export interface AosrMaterial {
  id: number;
  aosrId: number;
  materialId: number;
  volume: string;
  usedVolume: string;
  material: Material;
}
