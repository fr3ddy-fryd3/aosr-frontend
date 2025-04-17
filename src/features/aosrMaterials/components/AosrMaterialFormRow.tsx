import { Material } from "@/entities/material";
import { Option } from "@/entities/option";
import { useEffect, useState } from "react";
import Select from "react-select/base";
import { isUnitTranslatable } from "@/shared/utils/material";
import { ActionButtons } from "@/shared/ui/ActionButtons";
import { NumberInput, VolumeAndCapacityInput } from "@/shared/ui/Input";
import { ProgressBar } from "@/shared/ui/ProgressBar";
import { AosrMaterial } from "@/entities/aosr";
import { Tag } from "@/shared/ui/Tag";
import { Passport, PassportUsage } from "@/entities/passport";


type AosrMaterialFormProps = {
  materials: Material[];
  materialOptions: Option[];
  passportsMap: Map<number, Passport>;
  aosrMaterialsMap: Map<number, AosrMaterial>;
  data: AosrMaterial;
  isEdit: boolean;
  onSave: (aosrMaterial: AosrMaterial) => void;
  onCancel: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onPassportUsageBind: (aosrMaterial: AosrMaterial) => void;
  onPassportUsageEdit: (aosrMaterialId: AosrMaterial, passportUsage: PassportUsage) => void;
}

export function AosrMaterialFormRow(
  {
    materials,
    materialOptions,
    passportsMap,
    aosrMaterialsMap,
    data,
    isEdit,
    onSave,
    onCancel,
    onEdit,
    onDelete,
    onPassportUsageBind,
    onPassportUsageEdit,
  }: AosrMaterialFormProps
) {
  // Объект редактирования
  const [aosrMaterial, setAosrMaterial] = useState<AosrMaterial>(data);

  // Состояния для выпадающего списка
  const [selectedMaterial, setSelectedMaterial] = useState<Material>(data.sectionMaterial.material);

  // Обновление данных при изменении списка материалов
  // в родительском компоненте
  useEffect(() => {
    setAosrMaterial(data);
    setSelectedMaterial(data.sectionMaterial.material);
  }, [data])

  // Обработка отмены редактирования
  const handleCancel = () => {
    setAosrMaterial(data);
    setSelectedMaterial(data.sectionMaterial.material);
    onCancel(); // Уведомляем родитель о отмене
  };

  return (
    <div className={`flex-col rounded-lg border border-gray-200 p-4 mb-4 ${isEdit && "shadow-lg"}`} >
      <div className={"transition  inline-flex space-x-4 mb-8 w-full "}>
        <div className="w-3/8">

          {/* Селектор материала */}
          <Select<Option>
            isDisabled={true}
            options={materialOptions}
            value={materialOptions.find((option) =>
              option.value === aosrMaterial.sectionMaterial.materialId
            ) || null}
            onChange={() => { }}
            inputValue={""}
            onInputChange={() => { }}
            onMenuOpen={() => { }}
            onMenuClose={() => { }}
            menuIsOpen={false}
            className="h-10"
            placeholder="Материал раздела" />
        </div>
        <div className="w-full">

          {/* Поле ввода объемов */}
          <NumberInput
            isDisabled={!isEdit}
            value={aosrMaterial.volume}
            onChange={(value: string) => setAosrMaterial({ ...aosrMaterial, volume: value })}
            placeholder={`Объем${', ' + selectedMaterial.units || ''}`}
            error=""
          />
        </div>

        {/* Кнопки редактирования/сохранения/отмены редактирования/удаления */}
        <div className="min-w-fit flex items-center justify-center">
          <ActionButtons isAosrMaterial={true} isEdit={isEdit} onSave={() => onSave(aosrMaterial)} onCancel={handleCancel} onEdit={onEdit} onDelete={onDelete}></ActionButtons>
        </div>
      </div>

      {/* Прогрес-бар для отображения суммы объемов паспортов от объема акта */}
      <div>
        <ProgressBar
          max={Number(aosrMaterial.volume)}
          current={aosrMaterial.passportUsages.reduce((sum, pu) => sum + pu.usedVolume, 0)}
          units={aosrMaterial.sectionMaterial.material.units} />
      </div>

      {/* Список паспортов в виде тегов */}
      <div className="flex flex-wrap gap-2 my-4">
        {aosrMaterial.passportUsages.map((pu) => (
          <Tag
            key={pu.id}
            name={`№${passportsMap.get(pu.passportId)?.number.toString()}`}
            value={`${pu.usedVolume.toString()} ${aosrMaterialsMap.get(pu.aosrMaterialId)?.sectionMaterial.material.units}`}
            onClick={() => onPassportUsageEdit(aosrMaterial, pu)}
          />
        ))}
        {/* Кнопка привязки паспорта */}
        <button
          className="bg-blue-300 hover:bg-blue-400 text-blue-800 cursor-pointer rounded-full aspect-square h-7"
          onClick={() => onPassportUsageBind(aosrMaterial)}
        >
          +
        </button>
      </div>

    </div >
  )
}
