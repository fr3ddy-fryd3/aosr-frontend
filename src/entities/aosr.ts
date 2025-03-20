import { Material } from "./material";


export interface Aosr {
  id: number;
  section_id: number;
  name: string;
  materials: AosrMaterial[];
}

export interface AosrMaterial {
  id: number;
  aosrId: number;
  materialId: number;
  volume: number;
  usedVolume: number;
  material: Material;
}
