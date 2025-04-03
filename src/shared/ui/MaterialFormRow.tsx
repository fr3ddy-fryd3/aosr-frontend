import Select from "react-select/base";
import { isUnitTranslatable } from "../utils/material";
import { VolumeAndCapacityInput, NumberInput } from "./Input";
import { ActionButtons } from "./ActionButtons";
import { Material } from "@/entities/material";
import { ChildrenMaterial } from "@/entities/childrenMaterial";
import { Option } from "@/entities/option";
import { useEffect, useState } from "react";


type MaterialFormProps = {
  materials: Material[];
  materialOptions: Option[];
  data: ChildrenMaterial;
  isEdit: boolean;
  onSave: (childrenMaterial: ChildrenMaterial) => void;
  onCancel: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function MaterialFormRow(
  {
    materials,
    materialOptions,
    data,
    isEdit,
    onSave,
    onCancel,
    onEdit,
    onDelete,
  }: MaterialFormProps
) {
  const [childrenMaterial, setChildrenMaterial] = useState<ChildrenMaterial>(data);
  const [selectedMaterial, setSelectedMaterial] = useState<Material>(data.material);
  const [materialInputValue, setMaterialInputValue] = useState('');
  const [isMaterialMenuOpen, setIsMaterialMenuOpen] = useState(false);

  useEffect(() => {
    setChildrenMaterial(data);
    setSelectedMaterial(data.material);
  }, [data])

  const handleCancel = () => {
    setChildrenMaterial(data);
    setSelectedMaterial(data.material);
    onCancel(); // Уведомляем родитель о отмене
  };

  return (
    <div className={`transition rounded-lg border border-gray-200 inline-flex space-x-4 p-4 mb-4 w-full ${isEdit && "shadow-lg"}`} >
      <div className="w-3/8">
        <Select<Option>
          isDisabled={!isEdit}
          options={materialOptions}
          value={materialOptions.find((option) => option.value === childrenMaterial.materialId) || null}
          onChange={(option) => {
            setChildrenMaterial({ ...childrenMaterial, materialId: option?.value || 0 })
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
          (isUnitTranslatable(materials, childrenMaterial.materialId)) ? (
            <VolumeAndCapacityInput
              isDisabled={!isEdit}
              volumeValue={childrenMaterial.volume}
              material={selectedMaterial || {} as Material}
              onChange={(value: string) => setChildrenMaterial({ ...childrenMaterial, volume: value })}
              error=""
            />

          ) : (
            <NumberInput
              isDisabled={!isEdit}
              value={childrenMaterial.volume}
              onChange={(value: string) => setChildrenMaterial({ ...childrenMaterial, volume: value })}
              placeholder={`Объем, ${selectedMaterial.units || ''}`}
              error=""
            />
          )
        }
      </div>
      <div className="min-w-fit flex items-center justify-center">
        <ActionButtons isEdit={isEdit} onSave={() => onSave(childrenMaterial)} onCancel={handleCancel} onEdit={onEdit} onDelete={onDelete}></ActionButtons>
      </div>
    </div>
  )
}
