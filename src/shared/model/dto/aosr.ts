/**
 * Интерфейс создания АОСР
  * @property {number} sectionId
  * @property {string} name
  * @property {CreateAosrMaterialDTO[]}
  */
export interface CreateAosrDTO {
  sectionId: number;
  name: string;
  materials: CreateAosrMaterialDTO[];
}

/**
 * Интерфейс обновления АОСР
  * @property {string} name?
  */
export interface UpdateAosrDTO {
  name?: string;
}

/**
 * Интерфейс создания материалов привязанных к АОСР
  * @property {number} materialId
  * @property {string} volume
  */
interface CreateAosrMaterialDTO {
  materialId: number;
  volume: string;
}

/**
 * Интерфейс обновления материалов привязанных к АОСР
  * @property {string} volume?
  * @property {number} materialId?
  */
export interface UpdateAosrMaterialDTO {
  materialId: number;
  volume?: string;
}
