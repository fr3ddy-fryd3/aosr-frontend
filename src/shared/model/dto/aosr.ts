export interface CreateAosrDTO {
  sectionId: number;
  name: string;
  materials: CreateAosrMaterialDTO[];
}

export interface UpdateAosrDTO {
  name?: string;
}


interface CreateAosrMaterialDTO {
  materialId: number;
  volume: number;
}

export interface UpdateAosrMaterialDTO {
  volume?: number;
}
