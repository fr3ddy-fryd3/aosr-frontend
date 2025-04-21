import { SetStateAction, useEffect, useState } from "react";
import { Option } from "@/entities/option";
import { Material } from "@/entities/material";
import { Passport, PassportUsage } from "@/entities/passport";
import { SmallModal } from "@/shared/ui/Modal";
import { Button } from "@/shared/ui/Button";
import { VolumeAndCapacityInput, VolumeInput } from "@/shared/ui/Input";
import Select from "react-select/base";
import { isUnitTranslatable } from "@/shared/utils/material";
import { UpdatePassportUsageDTO } from "@/shared/model/dto/passport";
import { Dispatch } from "react";
import { AosrMaterial } from "@/entities/aosr";

interface EditPassportModalProps {
  isOpen: boolean;
  onClose: () => void;
  passports: Passport[];
  materials: Material[];
  updatePassportUsageData: UpdatePassportUsageDTO;
  selectedPassport: Passport;
  setSelectedPassport: Dispatch<SetStateAction<Passport>>;
  selectedPassportUsage: PassportUsage;
  setUpdatePassportUsageData: (data: UpdatePassportUsageDTO) => void;
  aosrMaterial: AosrMaterial;
  onSave: () => void;
  onDelete: () => void;
}

export function EditPassportModal({
  isOpen,
  onClose,
  passports,
  materials,
  updatePassportUsageData,
  selectedPassport,
  setSelectedPassport,
  selectedPassportUsage,
  setUpdatePassportUsageData,
  aosrMaterial,
  onSave,
  onDelete,
}: EditPassportModalProps) {
  const [passportInputValue, setPassportInputValue] = useState("");
  const [isPassportMenuOpen, setIsPassportMenuOpen] = useState(false);
  const [error, setError] = useState('');

  const passportOptions: Option[] = passports.map((passport) => ({
    value: passport,
    label: `№${passport.number} - ${passport.material.name}`,
  }));

  useEffect(() => {
    setSelectedPassport(
      passportOptions.find((po) => po.value.id === updatePassportUsageData.passportId)?.value || {} as Passport
    );
  }, [updatePassportUsageData])

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
          options={passportOptions.filter((pu) => pu.value.materialId === aosrMaterial.sectionMaterial?.materialId)}
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
            density={selectedPassport.density}
            onChange={(value) => {
              setUpdatePassportUsageData({ ...updatePassportUsageData, usedVolume: Number(value) });
            }}
            error={error}
            setError={setError}
            availableVolume={String(
              Number(selectedPassport.availableVolume) + Number(selectedPassportUsage.usedVolume)
            )}
          />
        ) : (
          <VolumeInput
            volumeValue={updatePassportUsageData.usedVolume?.toString() || ""}
            onChange={(value) => setUpdatePassportUsageData({ ...updatePassportUsageData, usedVolume: Number(value) })}
            availableVolume={selectedPassport.availableVolume}
            error={error}
            setError={setError}
            material={selectedPassport.material}
          />
        )}
        <div className="flex gap-4">
          <Button onClick={onDelete} variant="danger">Удалить</Button>
          <Button
            isDisabled={error === "" ? false : true}
            onClick={() => {
              onSave();
              setSelectedPassport({} as Passport);
            }}
            variant="modal">Сохранить</Button>
        </div>
      </div>
    </SmallModal>
  );
}
