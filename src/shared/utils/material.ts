import { Material } from "@/entities/material";

// По ID материала определяет могут ли ед.изм. быть переведены (м³ <-> т)
export const isUnitTranslatable = (materials: Material[], id: number) => {
  if (materials === undefined || id === undefined) return false;
  let material = materials.find((m) => m.id === id)

  if (material?.units.search('/') !== -1) return true;
  else return false;
}

