import { ChildrenMaterial } from "@/entities/childrenMaterial";
import { Material } from "@/entities/material";
import { Option } from "@/entities/option";
import { useEffect, useState } from "react";
import Select from "react-select/base";
import { isUnitTranslatable } from "../utils/material";
import { ActionButtons } from "./ActionButtons";
import { NumberInput, VolumeAndCapacityInput } from "./Input";


type AosrMaterialFormProps = {
  materials: Material[];
  materialOptions: Option[];
  data: ChildrenMaterial;
  isEdit: boolean;
  onSave: (childrenMaterial: ChildrenMaterial) => void;
  onCancel: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function AosrMaterialFormRow(
  {
    materials,
    materialOptions,
    data,
    isEdit,
    onSave,
    onCancel,
    onEdit,
    onDelete,
  }: AosrMaterialFormProps
) {
  // Объект редактирования
  const [childrenMaterial, setChildrenMaterial] = useState<ChildrenMaterial>(data);

  // Состояния для выпадающего списка
  const [selectedMaterial, setSelectedMaterial] = useState<Material>(data.sectionMaterial.material);
  const [materialInputValue, setMaterialInputValue] = useState('');
  const [isMaterialMenuOpen, setIsMaterialMenuOpen] = useState(false);

  // Обновление данных при изменении списка материалов
  // в родительском компоненте
  useEffect(() => {
    setChildrenMaterial(data);
    setSelectedMaterial(data.sectionMaterial.material);
  }, [data])

  // Обработка отмены редактирования
  const handleCancel = () => {
    setChildrenMaterial(data);
    setSelectedMaterial(data.sectionMaterial.material);
    onCancel(); // Уведомляем родитель о отмене
  };

  const getValueOfSelect = () => {
    let value: Option | undefined;
    value = materialOptions.find((option) => option.value === childrenMaterial.sectionMaterial.materialId)

    return value;
  }

  return (
    <div className={`transition rounded-lg border border-gray-200 inline-flex space-x-4 p-4 mb-4 w-full ${isEdit && "shadow-lg"}`} >
      <div className="w-3/8">

        {/* Селектор материала */}
        <Select<Option>
          isDisabled={true}
          options={materialOptions}
          value={materialOptions.find((option) =>
            option.value === childrenMaterial.sectionMaterial.materialId
          ) || null}
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

        {/* Поле ввода объемов (веса) */}
        {
          (isUnitTranslatable(materials, childrenMaterial.sectionMaterial.materialId)) ? (
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

      {/* Кнопки редактирования/сохранения/отмены редактирования/удаления */}
      <div className="min-w-fit flex items-center justify-center">
        <ActionButtons isAosrMaterial={true} isEdit={isEdit} onSave={() => onSave(childrenMaterial)} onCancel={handleCancel} onEdit={onEdit} onDelete={onDelete}></ActionButtons>
      </div>
    </div>
  )
}
