/**
 * Общий интерфейс для дочерних материалов
  * @property (number) materialId
  * @property (volume) volume
  * [key: string]: any
  */
export interface ChildrenMaterial {
  materialId: number,
  volume: string,
  [key: string]: any
}

