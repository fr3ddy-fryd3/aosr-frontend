import { PassportUsage } from "./passport";
import { SectionMaterial } from "./section";

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
  * @property {number} sectionMaterialId
  * @property {string} volume
  * @property {string} usedVolume
  * @property {Material} material
  * @property {PassportUsage[]} passportUsages
  */
export interface AosrMaterial {
  id: number;
  aosrId: number;
  sectionMaterialId: number;
  volume: string;
  usedVolume: string;
  sectionMaterial: SectionMaterial;
  passportUsages: PassportUsage[];
}
