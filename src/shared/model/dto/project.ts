/**
 * Интерфейс создания проекта
  * @property {string} name
  * @property {CreateProjectMaterialDTO[]}
  */
export interface CreateProjectDTO {
  name: string;
  materials: CreateProjectMaterialDTO[];
}

/**
 * Интерфейс обновления проекта
  * @property {string} name?
  */
export interface UpdateProjectDTO {
  name?: string;
}

/**
 * Интерфейс создания материалов привязанных к проекту
  * @property {number} materialId
  * @property {string} volume
  */
interface CreateProjectMaterialDTO {
  materialId: number;
  volume: string;
}

/**
 * Интерфейс обновления материалов привязанных к проекту
  * @property {string} volume?
  */
export interface UpdateProjectMaterialDTO {
  volume?: string;
}
