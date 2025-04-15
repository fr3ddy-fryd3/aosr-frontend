import { useState, useEffect } from "react";
import { Aosr, AosrMaterial } from "@/entities/aosr";
import { Material } from "@/entities/material";
import { Passport } from "@/entities/passport";
import { SectionMaterial } from "@/entities/section";
import { aosrApi } from "@/shared/api/aosr";
import { materialApi } from "@/shared/api/material";
import { passportApi } from "@/shared/api/passport";
import { sectionApi } from "@/shared/api/section";
import { getFreeId } from "@/shared/utils/material";

export function useAosrMaterialsData(aosrId: string) {
  const [aosr, setAosr] = useState<Aosr>({} as Aosr);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [passports, setPassports] = useState<Passport[]>([]);
  const [aosrMaterials, setAosrMaterials] = useState<AosrMaterial[]>([]);
  const [sectionMaterials, setSectionMaterials] = useState<SectionMaterial[]>([]);

  const fetchData = async () => {
    const aosrData = await aosrApi.getById(Number(aosrId));
    const sectionData = await sectionApi.getById(Number(aosrData?.sectionId));
    const materialsData = await materialApi.get();
    const passportsData = await passportApi.get();

    let localMaterialTemplates: AosrMaterial[] = [];
    let localAosrMaterials: AosrMaterial[] = [];

    if (sectionData && aosrData) {
      localMaterialTemplates = getMaterialsTemplates(sectionData.materials);
      setSectionMaterials(sectionData.materials);
    }
    if (aosrData) {
      localAosrMaterials = getProcessedAosrMaterials(localMaterialTemplates, aosrData.materials);
      setAosr(aosrData);
      setAosrMaterials(localAosrMaterials);
    }
    if (materialsData) setMaterials(materialsData);
    if (passportsData) setPassports(passportsData);
  };

  const getMaterialsTemplates = (localSectionMaterials: SectionMaterial[]): AosrMaterial[] => {
    let templates: AosrMaterial[] = [];

    for (const sm of localSectionMaterials) {
      templates.push(
        {
          id: getFreeId(templates),
          aosrId: Number(aosrId),
          sectionMaterialId: sm.id,
          volume: "0",
          usedVolume: "0",
          sectionMaterial: sm,
          passportUsages: [],
        }
      )
    }

    return templates;
  };

  const getProcessedAosrMaterials = (templates: AosrMaterial[], materials: AosrMaterial[]) => {
    const processed: AosrMaterial[] = [];
    const aosrMap = new Map(materials.map((am) => [am.sectionMaterialId, am]));
    templates.forEach((mt) => {
      const matchingAosr = aosrMap.get(mt.sectionMaterialId);
      processed.push(matchingAosr || mt);
    });
    return processed;
  };

  useEffect(() => {
    fetchData();
  }, [aosrId]);

  return {
    aosr,
    materials,
    passports,
    setPassports,
    aosrMaterials,
    sectionMaterials,
    setAosrMaterials,
  };
}
