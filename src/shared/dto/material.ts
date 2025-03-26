export interface CreateMaterialDTO {
  name: string;
  units: string;
  density: number;
}

export interface UpdateMaterialDTO {
  name?: string;
  units?: string;
  density?: number;
}
