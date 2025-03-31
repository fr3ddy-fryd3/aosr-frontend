/**
 * Интерфейс создания материала
  * @property {string} name
  * @property {string} units
  * @property {string} density
  */
export interface CreateMaterialDTO {
  name: string;
  units: string;
  density: string;
}

/**
 * Интерфейс обновления материала
  * @property {string} name?
  * @property {string} units?
  * @property {string} density?
  */
export interface UpdateMaterialDTO {
  name?: string;
  units?: string;
  density?: string;
}
