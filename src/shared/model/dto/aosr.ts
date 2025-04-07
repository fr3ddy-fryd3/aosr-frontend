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
  * @property {number} aosrId
  * @property {number} sectionMaterialId
  * @property {string} volume
  */
export interface CreateAosrMaterialDTO {
  aosrId: number;
  sectionMaterialId: number;
  volume: string;
}

/**
 * Интерфейс обновления материалов привязанных к АОСР
  * @property {string} volume?
  * @property {number} sectionMaterialId?
  */
export interface UpdateAosrMaterialDTO {
  sectionMaterialId: number;
  volume?: string;
}
