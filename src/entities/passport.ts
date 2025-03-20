import { Material } from "./material";

export interface Passport {
  id: number;
  number: string;
  materialId: number;
  volume: number;
  availableVolume: number;
  material: Material;
}

export interface PassportUsage {
  id: number;
  aosrMaterialId: number;
  passportId: number;
  usedVolume: number;
}
