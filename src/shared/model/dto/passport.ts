/**
 * Интефейс создания паспорта
  * @property {number} materialId
  * @property {string} number
  * @property {string} volume
  * @property {string} density
  */
export interface CreatePassportDTO {
  materialId: number;
  number: string;
  volume: string;
  density: string;
}

/**
 * Интефейс обновления паспорта
  * @property {number} materialId?
  * @property {string} number?
  * @property {string} volume?
  * @property {string} density?
  */
export interface UpdatePassportDTO {
  materialId?: number;
  number?: string;
  volume?: string;
  density?: string;
}

/**
 * Интефейс создания записи использования объемов по паспорту
  * @property {number} aosrId
  * @property {number} aosrMaterialId
  * @property {number} passportId
  * @property {string} usedVolume
  */
export interface CreatePassportUsageDTO {
  aosrId: number;
  aosrMaterialId: number;
  passportId: number;
  usedVolume: string;
}

/**
 * Интефейс обновления записи использования объемов по паспорту
  * @property {number} id
  * @property {number} aosrId?
  * @property {number} aosrMaterialId?
  * @property {number} passportId?
  * @property {number} usedVolume?
  */
export interface UpdatePassportUsageDTO {
  id: number;
  aosrId?: number;
  aosrMaterialId?: number;
  passportId?: number;
  usedVolume?: number;
}
