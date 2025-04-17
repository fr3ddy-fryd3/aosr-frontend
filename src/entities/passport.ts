import { Material } from "@/entities/material";

/**
 * Интерфейс для паспортов
  * @property {number} id
  * @property {string} number
  * @property {number} materialId
  * @property {string} volume
  * @property {string} density
  * @property {string} availableVolume
  * @property {Material} material
  * @property {PassportUsage[]}
  */
export interface Passport {
  id: number;
  number: string;
  materialId: number;
  volume: string;
  density: string;
  availableVolume: string;
  material: Material;
  passportUsages: PassportUsage[];
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
