import { Material } from "@/entities/material";
import { Option } from "@/entities/option";
import { Section, SectionMaterial } from "@/entities/section";
import { materialApi } from "@/shared/api/material";
import { sectionApi } from "@/shared/api/section";
import { CreateSectionMaterialDTO, UpdateSectionMaterialDTO } from "@/shared/model/dto/section";
import { ActionButtons } from "@/shared/ui/ActionButtons";
import { NumberInput, VolumeAndCapacityInput } from "@/shared/ui/Input";
import { isUnitTranslatable } from "@/shared/utils/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Select from "react-select/base";


export function SectionMaterialsPage() {
  const { sectionId } = useParams();

  const [section, setSection] = useState<Section>({} as Section);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [sectionMaterials, setSectionMaterials] = useState<SectionMaterial[]>([]);

  // Состояния для материалов раздела
  const [createData, setCreateData] = useState<CreateSectionMaterialDTO>({} as CreateSectionMaterialDTO);
  const [updateData, setUpdateData] = useState<UpdateSectionMaterialDTO>({} as UpdateSectionMaterialDTO);
  const [sectionMaterialToUpdate, setSectionMaterialToUpdate] = useState<SectionMaterial>({} as SectionMaterial);
  const [sectionMaterialToDelete, setSectinMaterialToDelete] = useState<SectionMaterial>({} as SectionMaterial)

  // Состояния для выпадающих списков
  const [materialInputValue, setMaterialInputValue] = useState("");
  const [isMaterialMenuOpen, setIsMaterialMenuOpen] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState({} as Material);


  // Данные для выпадающего списка
  const materialOptions: Option[] = materials.map((material) => ({
    value: material.id,
    label: material.name,
  }));

  // Загрузка раздела и материалов
  useEffect(() => {
    const fetchData = async () => {
      const sectionData = await sectionApi.getById(Number(sectionId));
      const materialsData = await materialApi.get();
      if (materialsData !== undefined) setMaterials(materialsData);
      if (sectionData !== undefined) {
        setSection(sectionData);
        setSectionMaterials(sectionData.materials);
      }
    };
    fetchData();
  }, [])

  const editMode = () => { };
  const deleteMode = () => { };

  return (
    <div className="p-4">
      <h1 className="text-gray-800 text-center font-sans text-2xl mb-8">Объемы раздела "{section.name}"</h1>

      <div className="shadow-lg rounded-lg inline-flex space-x-4 p-4 w-full" >
        <div className="w-3/8">
          <Select<Option>
            options={materialOptions}
            value={materialOptions.find((option) => option.value === createData.materialId) || null}
            onChange={(option) => {
              setCreateData({ ...createData, materialId: option?.value || '' });
              setSelectedMaterial(materials.find((m) => m.id === option?.value) || {} as Material);
            }}
            inputValue={materialInputValue}
            onInputChange={(value) => setMaterialInputValue(value)}
            onMenuOpen={() => {
              setIsMaterialMenuOpen(true);
              setMaterialInputValue('');
            }}
            onMenuClose={() => {
              setIsMaterialMenuOpen(false);
              setMaterialInputValue('');
            }}
            menuIsOpen={isMaterialMenuOpen}
            isSearchable={true}
            isMulti={false}
            className="h-10"
            placeholder="Материал раздела" />
        </div>
        <div className="w-full">
          {
            (isUnitTranslatable(materials, createData.materialId)) ? (
              <VolumeAndCapacityInput
                volumeValue={createData.volume}
                material={selectedMaterial || {} as Material}
                onChange={(value: string) => setCreateData({ ...createData, volume: value })}
                error=""
              />

            ) : (
              <NumberInput
                value={createData.volume}
                onChange={(value: string) => setCreateData({ ...createData, volume: value })}
                placeholder={`Объем, ${selectedMaterial.units || ''}` || ''}
                error=""
              />
            )
          }
        </div>
        <div className="min-w-fit flex items-center justify-center">
          <ActionButtons onEdit={editMode} onDelete={deleteMode}></ActionButtons>
        </div>
      </div>
    </div>
  )
}
