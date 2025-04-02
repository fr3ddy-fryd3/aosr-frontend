import Select from "react-select/base";
import { isUnitTranslatable } from "../utils/material";
import { VolumeAndCapacityInput, NumberInput } from "./Input";
import { ActionButtons } from "./ActionButtons";
import { Material } from "@/entities/material";
import { Option } from "@/entities/option";
import { useState } from "react";

type MaterialFormProps = {
  materials: Material[];
  materialOptions: Option[];
  data: any;
  setData: (data: any) => void;
  isEdit: boolean;
  onSave: () => void;
  onCancel: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function MaterialFormRow(
  {
    materials,
    materialOptions,
    data,
    setData,
    isEdit,
    onSave,
    onCancel,
    onEdit,
    onDelete,
  }: MaterialFormProps
) {
  const [selectedMaterial, setSelectedMaterial] = useState<Material>({} as Material);
  const [materialInputValue, setMaterialInputValue] = useState('');
  const [isMaterialMenuOpen, setIsMaterialMenuOpen] = useState(false);

  return (
    <div className="shadow-lg rounded-lg inline-flex space-x-4 p-4 w-full" >
      <div className="w-3/8">
        <Select<Option>
          options={materialOptions}
          value={materialOptions.find((option) => option.value === data.materialId) || null}
          onChange={(option) => {
            setData({ ...data, materialId: option?.value || '' });
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
          (isUnitTranslatable(materials, data.materialId)) ? (
            <VolumeAndCapacityInput
              volumeValue={data.volume}
              material={selectedMaterial || {} as Material}
              onChange={(value: string) => setData({ ...data, volume: value })}
              error=""
            />

          ) : (
            <NumberInput
              value={data.volume}
              onChange={(value: string) => setData({ ...data, volume: value })}
              placeholder={`Объем, ${selectedMaterial.units || ''}` || ''}
              error=""
            />
          )
        }
      </div>
      <div className="min-w-fit flex items-center justify-center">
        <ActionButtons isEdit={isEdit} onSave={onSave} onCancel={onCancel} onEdit={onEdit} onDelete={onDelete}></ActionButtons>
      </div>
    </div>
  )
}
