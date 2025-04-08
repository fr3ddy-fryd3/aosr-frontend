import { Material } from "@/entities/material";
import { Option } from "@/entities/option";
import { Aosr, AosrMaterial } from "@/entities/aosr";
import { SectionMaterial } from "@/entities/section";
import { Passport } from "@/entities/passport";
import { materialApi } from "@/shared/api/material";
import { aosrApi } from "@/shared/api/aosr";
import { aosrMaterialApi } from "@/shared/api/aosrMaterial";
import { CreateAosrMaterialDTO, UpdateAosrMaterialDTO } from "@/shared/model/dto/aosr";
import { CreatePassportUsageDTO, UpdatePassportUsageDTO } from "@/shared/model/dto/passport";
import { Button } from "@/shared/ui/Button";
import { AosrMaterialFormRow } from "@/features/aosrMaterials/components/AosrMaterialFormRow";
import { SmallModal } from "@/shared/ui/Modal";
import { getFreeId, isUnitTranslatable } from "@/shared/utils/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { sectionApi } from "@/shared/api/section";
import { PassportUsage } from "@/entities/passport";
import { passportApi } from "@/shared/api/passport";
import Select from "react-select/base";
import { NumberInput, VolumeAndCapacityInput, } from "@/shared/ui/Input";
import { passportUsageApi } from "@/shared/api/passportUsage";


export function AosrMaterialsPage() {
  const { aosrId } = useParams();

  const [aosr, setAosr] = useState<Aosr>({} as Aosr);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [passports, setPassports] = useState<Passport[]>([]);
  const [aosrMaterials, setAosrMaterials] = useState<AosrMaterial[]>([]);
  const [sectionMaterials, setSectionMaterials] = useState<SectionMaterial[]>([]);

  // Состояния для материалов акта
  const [aosrMaterialToDelete, setSectinMaterialToDelete] = useState<AosrMaterial>({} as AosrMaterial)

  // Состояния для связей между паспортами и материалами актов
  const [createPassportUsageData, setCreatePassportUsageData] = useState<CreatePassportUsageDTO>({} as CreatePassportUsageDTO);
  const [updatePassportUsageData, setUpdatePassportUsageData] = useState<UpdatePassportUsageDTO>({} as UpdatePassportUsageDTO);

  // Состояние для модальных окон
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isBindPassportModalOpen, setIsBindPassportModalOpen] = useState(false);
  const [isEditPassportModalOpen, setIsEditPassportModalOpen] = useState(false);

  // Состояние для редактирования акта
  const [editingAosrId, setEditingAosrId] = useState<number | null>(null);

  // Состояния для выпадающего списка с паспортами
  const [passportInputValue, setPassportInputValue] = useState("");
  const [isPassportMenuOpen, setIsPassportMenuOpen] = useState(false);
  const [selectedPassport, setSelectedPassport] = useState({} as Passport);

  // Данные для выпадающего списка с паспортами
  const materialOptions: Option[] = materials.map((material) => ({
    value: material.id,
    label: `${material.name}, ${material.units}`,
  }));
  const passportOptions: Option[] = passports.map((passport) => ({
    value: passport,
    label: `№${passport.number}`,
  }))

  // Загрузка акта, раздела и материалов
  const fetchData = async () => {

    // Блок получения данных
    const aosrData = await aosrApi.getById(Number(aosrId));
    const sectionData = await sectionApi.getById(Number(aosrData?.sectionId))
    const materialsData = await materialApi.get();
    const passportsData = await passportApi.get();

    let localMaterialTemplates: AosrMaterial[] = [];
    let localAosrMaterials: AosrMaterial[] = [];

    // Блок преобразования и присваивания
    // полученных значений
    if (sectionData !== undefined) {
      localMaterialTemplates = getMaterialsTemplates(sectionData.materials);
      setSectionMaterials(sectionData.materials);
    }

    if (aosrData !== undefined) {
      localAosrMaterials = getProcessedAosrMaterials(localMaterialTemplates, aosrData.materials);
      setAosr(aosrData);
      setAosrMaterials(localAosrMaterials);
    }

    if (materialsData !== undefined) {
      setMaterials(materialsData);
    }

    if (passportsData !== undefined) {
      setPassports(passportsData);
    }

  };

  // Генератор шаблонов на все материалы раздела
  const getMaterialsTemplates = (localSectionMaterials: SectionMaterial[]) => {
    return localSectionMaterials.map((sm): AosrMaterial => ({
      id: getFreeId(aosrMaterials),
      aosrId: Number(aosrId),
      sectionMaterialId: sm.id,
      volume: '0',
      usedVolume: '0',
      sectionMaterial: sm,
      passportUsages: [],
    }))
  }

  // Обработка и возврат обработанного списка материалов
  // акта
  const getProcessedAosrMaterials = (
    localMaterialTemplates: AosrMaterial[],
    localAosrMaterials: AosrMaterial[]
  ) => {

    const processedAosrMaterials: AosrMaterial[] = [];
    const aosrMap = new Map();

    // Создаём карту из aosrMaterials для быстрого поиска
    for (const am of localAosrMaterials) {
      aosrMap.set(am.sectionMaterialId, am);
    }

    // Проходим по materialsTemplates один раз
    for (const mt of localMaterialTemplates) {
      const matchingAosr = aosrMap.get(mt.sectionMaterialId);
      if (matchingAosr) {
        processedAosrMaterials.push(matchingAosr); // Совпадение найдено
      } else {
        processedAosrMaterials.push(mt); // Совпадений нет, берём шаблон
      }
    }

    return processedAosrMaterials;
  };

  useEffect(() => {
    fetchData();
  }, [])

  // Обработка создания/обновления материалов акта
  const handleAosrMaterialSave = async (aosrMaterial: AosrMaterial) => {
    setEditingAosrId(null);
    if (aosrMaterial.id <= 0) {
      const createData: CreateAosrMaterialDTO = {
        aosrId: Number(aosrId),
        sectionMaterialId: aosrMaterial.sectionMaterialId,
        volume: aosrMaterial.volume
      }
      const created = await aosrMaterialApi.create(createData)
      if (created !== undefined) {
        setAosrMaterials(
          aosrMaterials.map((am) => am.id === aosrMaterial.id ? created : am)
        );
      }
    } else {
      const updateData: UpdateAosrMaterialDTO = {
        sectionMaterialId: aosrMaterial.sectionMaterialId,
        volume: aosrMaterial.volume,
      }
      const updated = await aosrMaterialApi.update(aosrMaterial.id, updateData);
      if (updated !== undefined) {
        setAosrMaterials(
          aosrMaterials.map((am) => am.id === aosrMaterial.id ? updated : am)
        );
      }
    }
  }

  // Обработка отмены действий редактирования материалов акта
  const handleCancelEditAosrMaterial = () => {
    setEditingAosrId(null);
  }

  // Состояние удаления материала акта
  const deleteModeAosrMaterial = (aosrMaterial: AosrMaterial) => {
    setSectinMaterialToDelete(aosrMaterial);
    setIsDeleteModalOpen(true);
  };

  // Запрос на удаление материала акта и проверка его удаления
  const confirmDeleteAosrMaterial = async (id: number) => {
    const deleted = await aosrMaterialApi.delete(id);
    if (deleted == 204) {
      setAosrMaterials(aosrMaterials.filter((sm) => (sm.id !== id)));
      setSectinMaterialToDelete({} as AosrMaterial);
      setIsDeleteModalOpen(false);
    } else {
      setSectinMaterialToDelete({} as AosrMaterial);
      setIsDeleteModalOpen(false);
    }
  }

  // Запрос на создание связи между паспортом и актом
  const onPassportUsageCreate = async (aosrId: number) => {
    const created = await passportUsageApi.create(createPassportUsageData);
    if (created !== undefined) {
      setAosrMaterials()
    }
  }


  return (
    <div className="p-4">
      {/* Заголовок */}
      <h1 className="text-gray-800 text-center font-sans text-2xl mb-8">Объемы акта №{aosr.name}</h1>

      {/* Список материалов раздела */}
      {aosrMaterials.map((am) => {
        return (
          <AosrMaterialFormRow
            key={am.id}
            materials={materials}
            materialOptions={materialOptions}
            data={am}
            isEdit={am.id === editingAosrId}
            onEdit={() => setEditingAosrId(am.id)}
            onSave={handleAosrMaterialSave}
            onCancel={handleCancelEditAosrMaterial}
            onDelete={() => deleteModeAosrMaterial(am)}
            onPassportUsageBind={() => { }}
            onPassportUsageEdit={() => { }}
          />
        )
      })}

      {/* Модальное окно подтверждения удаления материала */}
      <SmallModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
        <h2 className="text-xl text-gray-700">Вы уверены, что хотите удалить следующий материал акта: {aosrMaterialToDelete?.sectionMaterial?.material.name}?</h2>
        <p className="text-gray-400 mb-8">Действие будет невозможно отменить</p>
        <div className="flex gap-4">
          <Button onClick={() => confirmDeleteAosrMaterial(aosrMaterialToDelete.id)} variant="danger">Удалить</Button>
          <Button onClick={() => setIsDeleteModalOpen(false)} variant="modal">Отмена</Button>
        </div>
      </SmallModal>

      {/* Модальное окно привязки паспорта */}
      <SmallModal isOpen={isBindPassportModalOpen} onClose={() => {
        setIsBindPassportModalOpen(false);
        setSelectedPassport({} as Passport);
      }}>
        <div className="space-y-4">
          <Select<Option>
            options={passportOptions}
            value={passportOptions.find((po) => po.value.id === createPassportUsageData.passportId) || {} as Option}
            onChange={(option) => {
              setCreatePassportUsageData({ ...createPassportUsageData, passportId: option?.value.id });
              setSelectedPassport(option?.value);
            }}
            inputValue={passportInputValue}
            onInputChange={(value) => setPassportInputValue(value)}
            menuIsOpen={isPassportMenuOpen}
            onMenuOpen={() => setIsPassportMenuOpen(true)}
            onMenuClose={() => setIsPassportMenuOpen(false)}
            isSearchable={true}
            placeholder="№ паспорта"
          />
        </div>

        {
          (isUnitTranslatable(materials, selectedPassport.materialId)) ? (
            <VolumeAndCapacityInput
              volumeValue={createPassportUsageData.usedVolume}
              material={selectedPassport.material}
              onChange={(value) => setCreatePassportUsageData({ ...createPassportUsageData, usedVolume: value })}
              error=""
            />
          ) : (
            <NumberInput
              value={createPassportUsageData.usedVolume}
              onChange={(value) => setCreatePassportUsageData({ ...createPassportUsageData, usedVolume: value })}
              error=""
              placeholder={`Объем, ${selectedPassport.material.units}`}
            />
          )
        }

        <Button onClick={ } variant="modal">Сохранить</Button>
      </SmallModal>

      {/* Модальное окно редактирования привязанного паспорта */}
      {/* <SmallModal isOpen={isEditPassportModalOpen} onClose={() => setIsEditPassportModalOpen(false)}> */}
      {/* </SmallModal> */}
    </div>
  )
}
