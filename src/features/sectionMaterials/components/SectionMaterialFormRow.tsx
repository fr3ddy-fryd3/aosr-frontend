import { Material } from "@/entities/material";
import { SectionMaterial } from "@/entities/section";
import { Option } from "@/entities/option";
import { useEffect, useState } from "react";
import Select from "react-select/base";
import { isUnitTranslatable } from "@/shared/utils/material";
import { ActionButtons } from "@/shared/ui/ActionButtons";
import { NumberInput, VolumeAndCapacityInput } from "@/shared/ui/Input";


type SectionMaterialFormProps = {
  materials: Material[];
  materialOptions: Option[];
  data: SectionMaterial;
  isEdit: boolean;
  onSave: (childrenMaterial: SectionMaterial) => void;
  onCancel: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function SectionMaterialFormRow(
  {
    materials,
    materialOptions,
    data,
    isEdit,
    onSave,
    onCancel,
    onEdit,
    onDelete,
  }: SectionMaterialFormProps
) {
  // Объект редактирования
  const [childrenMaterial, setSectionMaterial] = useState<SectionMaterial>(data);

  // Состояния для выпадающего списка
  const [selectedMaterial, setSelectedMaterial] = useState<Material>(data.material);
  const [materialInputValue, setMaterialInputValue] = useState('');
  const [isMaterialMenuOpen, setIsMaterialMenuOpen] = useState(false);

  // Обновление данных при изменении списка материалов
  // в родительском компоненте
  useEffect(() => {
    setSectionMaterial(data);
    setSelectedMaterial(data.material);
  }, [data])

  // Обработка отмены редактирования
  const handleCancel = () => {
    setSectionMaterial(data);
    setSelectedMaterial(data.material);
    onCancel(); // Уведомляем родитель о отмене
  };

  return (
    <div className={`transition rounded-lg border border-gray-200 inline-flex space-x-4 p-4 mb-4 w-full ${isEdit && "shadow-lg"}`} >
      <div className="w-3/8">

        {/* Селектор материала */}
        <Select<Option>
          isDisabled={!isEdit}
          options={materialOptions}
          value={materialOptions.find((option) =>
            option.value === childrenMaterial.materialId
          ) || null}
          onChange={(option) => {
            setSectionMaterial({ ...childrenMaterial, materialId: option?.value || 0 })
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
          (isUnitTranslatable(materials, childrenMaterial.materialId)) ? (
            <VolumeAndCapacityInput
              isDisabled={!isEdit}
              volumeValue={childrenMaterial.volume}
              material={selectedMaterial || {} as Material}
              onChange={(value: string) => setSectionMaterial({ ...childrenMaterial, volume: value })}
              error=""
            />

          ) : (
            <NumberInput
              isDisabled={!isEdit}
              value={childrenMaterial.volume}
              onChange={(value: string) => setSectionMaterial({ ...childrenMaterial, volume: value })}
              placeholder={`Объем, ${selectedMaterial.units || ''}`}
              error=""
            />
          )
        }
      </div>

      {/* Кнопки редактирования/сохранения/отмены редактирования/удаления */}
      <div className="min-w-fit flex items-center justify-center">
        <ActionButtons isEdit={isEdit} onSave={() => onSave(childrenMaterial)} onCancel={handleCancel} onEdit={onEdit} onDelete={onDelete}></ActionButtons>
      </div>
    </div>
  )
}
