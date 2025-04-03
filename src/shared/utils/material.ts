import { Material } from "@/entities/material";
import { ChildrenMaterial } from "@/entities/childrenMaterial";

// По ID материала определяет могут ли ед.изм. быть переведены (м³ <-> т)
export const isUnitTranslatable = (materials: Material[], id: number) => {
  if (materials === undefined || id === undefined) return false;
  let material = materials.find((m) => m.id === id)

  if (material?.units.search('/') !== -1) return true;
  else return false;
}

export const getFreeId = (childrenMaterials: ChildrenMaterial[]) => {
  let freeId = 0;
  while (true) {
    childrenMaterials.forEach((cm: ChildrenMaterial) => {
      if (cm.id === freeId) freeId--;
    })
    break;
  }
  return freeId;
}

