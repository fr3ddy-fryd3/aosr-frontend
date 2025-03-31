/**
 * Интерфейс создания раздела
  * @property {number} projectId
  * @property {string} name
  * @property {CreateSectionMaterialDTO[]}
  */
export interface CreateSectionDTO {
  projectId: number;
  name: string;
  materials: CreateSectionMaterialDTO[];
}

/**
 * Интерфейс обновления раздела
  * @property {string} name?
  */
export interface UpdateSectionDTO {
  name?: string;
}

/**
 * Интерфейс создания материала привязанного к разделу
  * @property {number} materialId
  * @property {string} volume
  */
interface CreateSectionMaterialDTO {
  materialId: number;
  volume: string;
}

/**
 * Интерфейс обновления материала привязанного к разделу
  * @property {string} volume?
  */
export interface UpdateSectionMaterialDTO {
  volume?: string;
}
