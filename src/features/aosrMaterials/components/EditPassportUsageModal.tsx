import { useState } from "react";
import { Option } from "@/entities/option";
import { Material } from "@/entities/material";
import { Passport } from "@/entities/passport";
import { SmallModal } from "@/shared/ui/Modal";
import { Button } from "@/shared/ui/Button";
import { NumberInput, VolumeAndCapacityInput } from "@/shared/ui/Input";
import Select from "react-select/base";
import { isUnitTranslatable } from "@/shared/utils/material";
import { UpdatePassportUsageDTO } from "@/shared/model/dto/passport";

interface EditPassportModalProps {
  isOpen: boolean;
  onClose: () => void;
  passports: Passport[];
  materials: Material[];
  updatePassportUsageData: UpdatePassportUsageDTO;
  setUpdatePassportUsageData: (data: UpdatePassportUsageDTO) => void;
  onSave: () => void;
  onDelete: () => void;
}

export function EditPassportModal({
  isOpen,
  onClose,
  passports,
  materials,
  updatePassportUsageData,
  setUpdatePassportUsageData,
  onSave,
  onDelete,
}: EditPassportModalProps) {
  const [passportInputValue, setPassportInputValue] = useState("");
  const [isPassportMenuOpen, setIsPassportMenuOpen] = useState(false);
  const [selectedPassport, setSelectedPassport] = useState<Passport>({} as Passport);

  const passportOptions: Option[] = passports.map((passport) => ({
    value: passport,
    label: `№${passport.number}`,
  }));

  return (
    <SmallModal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        setSelectedPassport({} as Passport);
      }}
    >
      <div className="space-y-4">
        <Select<Option>
          options={passportOptions}
          value={passportOptions.find((po) => po.value.id === updatePassportUsageData.passportId) || null}
          onChange={(option) => {
            setUpdatePassportUsageData({ ...updatePassportUsageData, passportId: option?.value.id || 0 });
            setSelectedPassport(option?.value || ({} as Passport));
          }}
          inputValue={passportInputValue}
          onInputChange={setPassportInputValue}
          menuIsOpen={isPassportMenuOpen}
          onMenuOpen={() => setIsPassportMenuOpen(true)}
          onMenuClose={() => setIsPassportMenuOpen(false)}
          isSearchable={true}
          placeholder="№ паспорта"
        />
        {isUnitTranslatable(materials, selectedPassport.materialId) ? (
          <VolumeAndCapacityInput
            volumeValue={updatePassportUsageData.usedVolume?.toString() || ""}
            material={selectedPassport.material}
            onChange={(value) => setUpdatePassportUsageData({ ...updatePassportUsageData, usedVolume: Number(value) })}
            error=""
            info={"400"}
          />
        ) : (
          <NumberInput
            value={updatePassportUsageData.usedVolume?.toString() || ""}
            onChange={(value) => setUpdatePassportUsageData({ ...updatePassportUsageData, usedVolume: Number(value) })}
            error=""
            placeholder={`Объем, ${selectedPassport.material?.units || ""}`}
          />
        )}
        <div className="flex gap-4">
          <Button onClick={onDelete} variant="danger">Удалить</Button>
          <Button onClick={onSave} variant="modal">Сохранить</Button>
        </div>
      </div>
    </SmallModal>
  );
}
