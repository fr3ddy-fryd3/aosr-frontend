/**
 * Интефейс создания паспорта
  * @property {number} materialId
  * @property {string} number
  * @property {string} volume
  */
export interface CreatePassportDTO {
  materialId: number;
  number: string;
  volume: string;
}

/**
 * Интефейс обновления паспорта
  * @property {number} materialId?
  * @property {string} number?
  * @property {string} volume?
  */
export interface UpdatePassportDTO {
  materialId?: number;
  number?: string;
  volume?: string;
}

/**
 * Интефейс создания записи использования объемов по паспорту
  * @property {number} aosrMaterialId
  * @property {number} passportId
  * @property {string} usedVolume
  */
export interface CreatePassportUsageDTO {
  aosrMaterialId: number;
  passportId: number;
  usedVolume: string;
}

/**
 * Интефейс обновления записи использования объемов по паспорту
  * @property {number} id
  * @property {number} aosrMaterialId?
  * @property {number} passportId?
  * @property {number} usedVolume?
  */
export interface UpdatePassportUsageDTO {
  id: number;
  aosrMaterialId?: number;
  passportId?: number;
  usedVolume?: number;
}
