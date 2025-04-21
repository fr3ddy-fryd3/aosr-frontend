import { Material } from "@/entities/material"
import { Option } from "@/entities/option"
import { Passport } from "@/entities/passport"
import { AosrUsedVolumeForPassport } from "@/entities/aosr"
import { PassportTable } from "@/features/passport/components/PassportTable"
import { materialApi } from "@/shared/api/material"
import { passportApi } from "@/shared/api/passport"
import { CreatePassportDTO, UpdatePassportDTO } from "@/shared/model/dto/passport"
import { Button } from "@/shared/ui/Button"
import { TextInput, NumberInput, VolumeAndCapacityInput } from "@/shared/ui/Input"
import { SmallModal } from "@/shared/ui/Modal"
import { useEffect, useState } from "react"
import { isUnitTranslatable } from "@/shared/utils/material"
import Select from "react-select/base"
import { aosrApi } from "@/shared/api/aosr"
import { AosrTag } from "@/features/passport/components/aosrTag"

export function PassportsPage() {
  const [passports, setPassports] = useState<Passport[]>([])
  const [materials, setMaterials] = useState<Material[]>([])

  // Состояния для выпадающих списков
  const [materialInputValue, setMaterialInputValue] = useState("");
  const [isMaterialMenuOpen, setIsMaterialMenuOpen] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState({} as Material);

  // Состояния для модальных окон
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAosrsListModalOpen, setIsAosrsListModalOpen] = useState(false);

  // Состояния для паспортов
  const [createData, setCreateData] = useState<CreatePassportDTO>({} as CreatePassportDTO);
  const [updateData, setUpdateData] = useState<UpdatePassportDTO>({} as UpdatePassportDTO);
  const [passportToUpdate, setPassportToUpdate] = useState<Passport>({} as Passport);
  const [passportToDelete, setPassportToDelete] = useState<Passport>({} as Passport)
  const [selectedPassport, setSelectedPassport] = useState<Passport>({} as Passport);

  // Акты для отображения
  const [aosrsToShow, setAosrsToShow] = useState<AosrUsedVolumeForPassport[]>([]);

  // Состояние для ошибок
  const [error, setError] = useState('');

  // Загрузка материалов и паспортов
  useEffect(() => {
    const fetchData = async () => {
      const passportData = await passportApi.get();
      const materialData = await materialApi.get();
      if (passportData !== undefined) setPassports(passportData);
      if (materialData !== undefined) setMaterials(materialData);
    }
    fetchData();
  }, [])

  // Данные для выпадающего списка
  const materialOptions: Option[] = materials.map((material) => ({
    value: material.id,
    label: material.name,
  }));

  // Запрос на создание паспорта и проверка его создания
  const onCreate = async () => {
    createData.density = createData.density ? createData.density : '0';
    const created = await passportApi.create(createData);
    if (created !== undefined) {
      setPassports([...passports, created]);

      setCreateData({} as CreatePassportDTO);

      setIsCreateModalOpen(false);
      setSelectedMaterial({} as Material);
    }
  }

  // Состояние редактирования
  const editMode = (passport: Passport) => {
    setPassportToUpdate({ ...passport });
    setIsUpdateModalOpen(true);
    setSelectedMaterial(passport.material);
  };

  // Запрос на обновление материала и проверка его обновления
  const onEdit = async (id: number) => {
    const updated = await passportApi.update(id, updateData);
    if (updated !== undefined) {
      setPassports(passports.map((p) => (p.id === id ? updated : p)));

      setUpdateData({} as UpdatePassportDTO);
      setPassportToUpdate({} as Passport);

      setIsUpdateModalOpen(false);
      setSelectedMaterial({} as Material);
    }
  }

  // Состояние удаления
  const deleteMode = (passport: Passport) => {
    setPassportToDelete(passport);
    setIsDeleteModalOpen(true);
  };

  // Запрос на удаление паспорта и проверка его удаления
  const confirmDelete = async (id: number) => {
    const deleted = await passportApi.delete(id);
    if (deleted == 204) {
      setPassports(passports.filter((p) => (p.id !== id)));
      setPassportToDelete({} as Passport);
      setIsDeleteModalOpen(false);
    }
  }

  // Состояние просмотра связанных актов
  const aosrsListMode = async (passport: Passport) => {
    setIsAosrsListModalOpen(true);
    const aosrs = await aosrApi.getByPassport(passport.id);
    if (aosrs && aosrs?.length > 0) {
      setAosrsToShow(aosrs);
      setSelectedPassport(passport);
    }
  }

  return (

    <div className="p-4">
      <div className="flex justify-between mb-4">

        {/* Заголовок */}
        <div className="flex flex-col">
          <h1 className="text-gray-800 font-sans text-xl">Паспорта</h1>
          <p className="text-gray-500 font-sans text-lg">Таблица</p>
        </div>

        {/* Кнопка создания проекта */}
        <Button onClick={() => setIsCreateModalOpen(true)} variant="primary">
          Создать
        </Button>
      </div>

      {/* Таблица паспортов */}
      <PassportTable passports={passports} aosrsListMode={aosrsListMode} editMode={editMode} deleteMode={deleteMode} />

      {/* Модальное окно создания паспорта */}
      <SmallModal isOpen={isCreateModalOpen} onClose={() => {
        setIsCreateModalOpen(false);
        setSelectedMaterial({} as Material)
      }}>
        <h2 className="text-xl text-gray-800 mb-4">Создание паспорта</h2>
        <div className="space-y-4">

          <TextInput
            value={createData.number}
            onChange={(value) => setCreateData({ ...createData, number: value })}
            placeholder="Номер паспорта"
          />

          <Select<Option>
            options={materialOptions}
            value={materialOptions.find((option) => option.value === createData.materialId) || null}
            onChange={(option) => {
              setCreateData({ ...createData, materialId: option?.value || '' });
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
            placeholder="Материал паспорта" />


          {
            (isUnitTranslatable(materials, createData.materialId)) ? (
              <>
                <NumberInput
                  value={createData.density}
                  onChange={(value) => setCreateData({ ...createData, density: value })}
                  placeholder="Удельный вес"
                />

                <VolumeAndCapacityInput
                  volumeValue={createData.volume}
                  material={selectedMaterial || {} as Material}
                  density={createData.density || '0'}
                  onChange={(value: string) => setCreateData({ ...createData, volume: value })}
                  error={error}
                  setError={setError}
                />
              </>
            ) : (
              <NumberInput
                value={createData.volume}
                onChange={(value: string) => setCreateData({ ...createData, volume: value })}
                placeholder={`Объем${selectedMaterial.units ? ', ' + selectedMaterial.units : ''}`}
              />
            )
          }

          <Button onClick={onCreate} variant="modal">
            Сохранить
          </Button>
        </div>
      </SmallModal>

      {/* Модальное окно для редактирования паспорта */}
      <SmallModal isOpen={isUpdateModalOpen} onClose={() => {
        setIsUpdateModalOpen(false);
        setSelectedMaterial({} as Material);
      }}>
        <h2 className="text-xl text-gray-800 mb-4">Редактирование паспорта</h2>
        <div className="space-y-4">

          <TextInput
            value={updateData.number || ''}
            onChange={(value) => setUpdateData({ ...updateData, number: value })}
            placeholder={passportToUpdate.number}
          />

          <Select<Option>
            options={materialOptions}
            value={materialOptions.find((option) => option.value === updateData.materialId) || null}
            onChange={(option) => {
              setUpdateData({ ...updateData, materialId: option?.value || '' });
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
            placeholder={passportToUpdate.material?.name || ''} />

          <NumberInput
            value={updateData.density || ''}
            onChange={(value) => setUpdateData({ ...updateData, density: value })}
            placeholder={passportToUpdate.density}
          />

          {
            (isUnitTranslatable(materials, updateData.materialId || passportToUpdate.materialId)) ? (
              <VolumeAndCapacityInput
                volumeValue={updateData.volume || ''}
                material={selectedMaterial}
                onChange={(value: string) => setUpdateData({ ...updateData, volume: value })}
                density={passportToUpdate.density || '0'}
                error={error}
                setError={setError}
                currentVolume={passportToUpdate.volume}
              />
            ) : (
              <NumberInput
                value={updateData.volume || ''}
                onChange={(value: string) => setUpdateData({ ...updateData, volume: value })}
                placeholder={passportToUpdate.volume}
              />
            )
          }
          <Button onClick={() => onEdit(passportToUpdate.id)} variant="modal">
            Сохранить
          </Button>
        </div>
      </SmallModal>

      {/* Модальное окно просмотра связанных актов */}
      <SmallModal
        isOpen={isAosrsListModalOpen}
        onClose={() => {
          setIsAosrsListModalOpen(false);
          setAosrsToShow([]);
          setSelectedPassport({} as Passport);
        }}>

        <h2 className="text-xl text-gray-700">Связанные акты</h2>
        <div className="flex flex-wrap gap-2 my-4">
          {aosrsToShow.length > 0 ?
            aosrsToShow.map((aosr: AosrUsedVolumeForPassport) => (
              <AosrTag aosr={aosr} unit={selectedPassport.material.units} />
            ))
            : (
              <p className="text-gray-500">Отсутствуют связанные акты</p>
            )}
        </div>

      </SmallModal>

      {/* Модальное окно подтверждения удаления паспорта */}
      <SmallModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
        <h2 className="text-xl text-gray-700">Вы уверены, что хотите удалить паспорт №{passportToDelete.number}?</h2>
        <p className="text-gray-400 mb-8">Действие будет невозможно отменить</p>
        <div className="flex gap-4">
          <Button onClick={() => confirmDelete(passportToDelete.id)} variant="danger">Удалить</Button>
          <Button onClick={() => setIsDeleteModalOpen(false)} variant="modal">Отмена</Button>
        </div>
      </SmallModal>

    </div>
  )
}
