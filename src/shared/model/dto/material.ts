export interface CreateMaterialDTO {
  name: string;
  units: string;
  density: string;
}

export interface UpdateMaterialDTO {
  name?: string;
  units?: string;
  density?: number;
}
