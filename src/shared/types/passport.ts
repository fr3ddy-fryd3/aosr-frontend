export interface CreatePassportDTO {
  number: string;
  volume: number;
}

export interface UpdatePassportDTO {
  number?: string;
  volume?: string;
}

export interface CreatePassportUsageDTO {
  usedVolume: number;
}

export interface UpdatePassportUsageDTO {
  usedVolume?: number;
}
