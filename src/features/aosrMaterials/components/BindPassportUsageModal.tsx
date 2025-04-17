import { AosrMaterial } from "@/entities/aosr";
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
  aosrMaterial: AosrMaterial;
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
  aosrMaterial,
}: BindPassportModalProps) {
  const [passportInputValue, setPassportInputValue] = useState("");
  const [isPassportMenuOpen, setIsPassportMenuOpen] = useState(false);
  const [selectedPassport, setSelectedPassport] = useState<Passport>({} as Passport);

  const passportOptions: Option[] = passports.map((passport) => ({
    value: passport,
    label: `№${passport.number} - ${passport.material.name}`,
  }));

  return (
    <SmallModal isOpen={isOpen} onClose={() => {
      onClose();
    }}>
      <div className="space-y-4">
        <Select<Option>
          options={passportOptions.filter((pu) => pu.value.materialId === aosrMaterial.sectionMaterial?.materialId)}
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
            density={selectedPassport.density}
            onChange={(value) => setCreatePassportUsageData({ ...createPassportUsageData, usedVolume: value })}
            error={createPassportUsageData.usedVolume > selectedPassport.availableVolume ?
              "Доступного объема недостаточно" :
              ""
            }
            availableVolumeInfo={selectedPassport.availableVolume || '0'}
          />
        ) : (
          <NumberInput
            value={createPassportUsageData.usedVolume}
            onChange={(value) => setCreatePassportUsageData({ ...createPassportUsageData, usedVolume: value })}
            error={createPassportUsageData.usedVolume > selectedPassport.availableVolume ?
              "Доступного объема недостаточно" :
              ""
            }
            placeholder={`Объем${selectedPassport.material?.units ? ', ' + selectedPassport.material.units : ''}`}
            info={selectedPassport.material ? `${selectedPassport.availableVolume} ${selectedPassport.material?.units}` : ''}
          />
        )}
        <Button
          onClick={() => {
            onSave(aosrId);
            setSelectedPassport({} as Passport);
          }}
          variant="modal"
        >
          Сохранить
        </Button>
      </div>
    </SmallModal>
  );
}
