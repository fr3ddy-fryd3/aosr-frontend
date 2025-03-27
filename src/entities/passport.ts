import { Material } from "@/entities/material";

/**
 * Интерфейс для паспортов
  * @property {number} id
  * @property {string} number
  * @property {number} materialId
  * @property {string} volume
  * @property {string} availableVolume
  * @property {Material} material
  */
export interface Passport {
  id: number;
  number: string;
  materialId: number;
  volume: string;
  availableVolume: string;
  material: Material;
}

/**
 * Интерфейс для использований паспортов в разных АОСР
  * @property {number} id
  * @property {number} aosrMaterialId
  * @property {number} passportId
  * @property {number} usedVolume
  */
export interface PassportUsage {
  id: number;
  aosrMaterialId: number;
  passportId: number;
  usedVolume: number;
}
