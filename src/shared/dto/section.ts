export interface CreateSectionDTO {
  projectId: number;
  name: string;
  materials: CreateSectionMaterialDTO[];
}

export interface UpdateSectionDTO {
  name?: string;
}

interface CreateSectionMaterialDTO {
  materialId: number;
  volume: number;
}

export interface UpdateSectionMaterialDTO {
  volume?: number;
}
