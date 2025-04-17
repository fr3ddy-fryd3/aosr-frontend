/**
 * Интерфейс создания материала
  * @property {string} name
  * @property {string} units
  */
export interface CreateMaterialDTO {
  name: string;
  units: string;
}

/**
 * Интерфейс обновления материала
  * @property {string} name?
  * @property {string} units?
  */
export interface UpdateMaterialDTO {
  name?: string;
  units?: string;
}
