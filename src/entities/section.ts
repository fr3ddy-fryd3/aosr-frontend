import { Material } from "./material";

export interface Section {
  id: number;
  projectId: number;
  name: string;
  materials: SectionMaterial[];
}

export interface SectionMaterial {
  id: number;
  sectionId: number;
  materialId: number;
  volume: number;
  material: Material;
}
