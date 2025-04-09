import { Material } from "@/entities/material";
import { Option } from "@/entities/option";
import { Passport } from "@/entities/passport";
import { CreatePassportUsageDTO } from "@/shared/model/dto/passport";
import { Button } from "@/shared/ui/Button";
import { NumberInput, VolumeAndCapacityInput } from "@/shared/ui/Input";
import { SmallModal } from "@/shared/ui/Modal";
import { isUnitTranslatable } from "@/shared/utils/material";
import { useState } from "react";
import Select from "react-select/base";

interface BindPassportModalProps {
  isOpen: boolean;
  onClose: () => void;
  passports: Passport[];
  materials: Material[];
  createPassportUsageData: CreatePassportUsageDTO;
  setCreatePassportUsageData: (data: CreatePassportUsageDTO) => void;
  onSave: (aosrId: number) => void;
  aosrId: number;
  aosrMaterialId: number;
}

export function BindPassportModal({
  isOpen,
  onClose,
  passports,
  materials,
  createPassportUsageData,
  setCreatePassportUsageData,
  onSave,
  aosrId,
  aosrMaterialId,
}: BindPassportModalProps) {
  const [passportInputValue, setPassportInputValue] = useState("");
  const [isPassportMenuOpen, setIsPassportMenuOpen] = useState(false);
  const [selectedPassport, setSelectedPassport] = useState<Passport>({} as Passport);

  const passportOptions: Option[] = passports.map((passport) => ({
    value: passport,
    label: `№${passport.number}`,
  }));

  return (
    <SmallModal isOpen={isOpen} onClose={() => {
      onClose();
      setSelectedPassport({} as Passport);
    }}>
      <div className="space-y-4">
        <Select<Option>
          options={passportOptions}
          value={passportOptions.find((po) => po.value.id === createPassportUsageData.passportId) || null}
          onChange={(option) => {
            setCreatePassportUsageData({ ...createPassportUsageData, passportId: option?.value.id || 0 });
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
            volumeValue={createPassportUsageData.usedVolume}
            material={selectedPassport.material}
            onChange={(value) => setCreatePassportUsageData({ ...createPassportUsageData, usedVolume: value })}
            error=""
            info={selectedPassport.availableVolume}
          />
        ) : (
          <NumberInput
            value={createPassportUsageData.usedVolume}
            onChange={(value) => setCreatePassportUsageData({ ...createPassportUsageData, usedVolume: value })}
            error=""
            placeholder={`Объем, ${selectedPassport.material?.units || ""}`}
          />
        )}
        <Button onClick={() => onSave(aosrId)} variant="modal">Сохранить</Button>
      </div>
    </SmallModal>
  );
}
