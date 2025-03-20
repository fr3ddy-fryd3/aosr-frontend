export interface CreateProjectDTO {
  name: string;
  materials: CreatePeojectMaterialDTO[];
}

export interface UpdateProjectDTO {
  name?: string;
}

interface CreatePeojectMaterialDTO {
  materialId: number;
  volume: number;
}

export interface UpdateProjectMaterialDTO {
  volume?: number;
}
