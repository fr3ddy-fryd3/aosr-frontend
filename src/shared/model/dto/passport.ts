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
  * @property {number} usedVolume
  */
export interface CreatePassportUsageDTO {
  usedVolume: number;
}

/**
 * Интефейс обновления записи использования объемов по паспорту
  * @property {number} usedVolume?
  */
export interface UpdatePassportUsageDTO {
  usedVolume?: number;
}
