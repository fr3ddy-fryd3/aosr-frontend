import { Material } from "@/entities/material"
import { Option } from "@/entities/option"
import { MaterialTable } from "@/features/material/components/MaterialTable"
import { materialApi } from "@/shared/api/material"
import { CreateMaterialDTO, UpdateMaterialDTO } from "@/shared/model/dto/material"
import Button from "@/shared/ui/Button"
import { NumberInput, TextInput } from "@/shared/ui/Input"
import Modal from "@/shared/ui/Modal"
import { useEffect, useState } from "react"
import Select from "react-select/base"

export default function MaterialsPage() {
  const [materials, setMaterials] = useState<Material[]>([])

  // Состояния для выпадающего списка
  const [unitInputValue, setUnitInputValue] = useState('');
  const [isUnitMenuOpen, setIsUnitMenuOpen] = useState(false);

  // Состояния модалок
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Состояния материалов
  const [createData, setCreateData] = useState<CreateMaterialDTO>({} as CreateMaterialDTO);
  const [updateData, setUpdateData] = useState<UpdateMaterialDTO>({} as UpdateMaterialDTO);
  const [materialToUpdate, setMaterialToUpdate] = useState<Material>({} as Material);
  const [materialToDelete, setMaterialToDelete] = useState<Material>({} as Material)

  // Данные для выпадающего списка
  const unitOptions: Option[] = ["м³/т", "см³/г", "м²", "л"].map((unit) => ({
    label: unit,
    value: unit,
  }));

  // Загрузка материалов
  useEffect(() => {
    const fetchMaterials = async () => {
      const data = await materialApi.get();
      if (data !== undefined) setMaterials(data);
    }
    fetchMaterials();
  }, [])

  // Запрос на создание материала и проверка его создания
  const onCreate = async () => {
    const created = await materialApi.create(createData);
    if (created !== undefined) {
      setMaterials([...materials, created]);
      setCreateData({} as CreateMaterialDTO);
      setIsCreateModalOpen(false);
    }
  }

  // Состояние редактирования
  const editMode = (material: Material) => {
    setMaterialToUpdate(material);
    setIsUpdateModalOpen(true);
  }

  // Запрос на обновление материала и проверка его обновления
  const onEdit = async () => {
    const updated = await materialApi.update(materialToUpdate.id, updateData);
    if (updated !== undefined) {
      setMaterials(materials.map((m) => (m.id === updated.id ? updated : m)));
      setUpdateData({} as UpdateMaterialDTO);
      setMaterialToUpdate({} as Material);
      setIsUpdateModalOpen(false);
    }
  }

  // Состояние удаления
  const deleteMode = (material: Material) => {
    setMaterialToDelete(material);
    setIsDeleteModalOpen(true);
  }

  // Запрос на удаление материала и проверка его удаления
  const confirmDelete = async (id: number) => {
    const deleted = await materialApi.delete(id);
    if (deleted == 204) {
      setMaterials(materials.filter((m) => (m.id !== id)));
      setMaterialToDelete({} as Material);
      setIsDeleteModalOpen(false);
    }
  };

  return (

    <div className="p-4">
      <div className="flex justify-between mb-4">
        <div className="flex flex-col">
          <h1 className="text-gray-800 font-sans text-xl">Материалы</h1>
          <p className="text-gray-500 font-sans text-lg">Таблица</p>
        </div>

        {/* Кнопка создания материала */}
        <Button onClick={() => setIsCreateModalOpen(true)} variant="primary">
          Создать
        </Button>
      </div>

      {/* Таблица материалов */}
      <MaterialTable materials={materials} editMode={editMode} deleteMode={deleteMode} />

      {/* Модальное окно создание материала */}
      <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)}>
        <h2 className="text-xl text-gray-800 mb-4">Создание материала</h2>
        <div className="space-y-4">

          <TextInput
            value={createData.name}
            onChange={(value) => setCreateData({ ...createData, name: value })}
            placeholder="Название"
            error=""
          />

          <Select<Option>
            options={unitOptions}
            value={unitOptions.find((option) => option.value === createData.units) || null}
            onChange={(option) => setCreateData({ ...createData, units: option?.value || '' })}
            inputValue={unitInputValue}
            onInputChange={(value) => setUnitInputValue(value)}
            onMenuOpen={() => {
              setIsUnitMenuOpen(true);
              setUnitInputValue('');
            }}
            onMenuClose={() => {
              setIsUnitMenuOpen(false);
              setUnitInputValue('');
            }}
            menuIsOpen={isUnitMenuOpen}
            isSearchable={true}
            isMulti={false}
            placeholder="Ед. измерения" />

          <NumberInput
            value={createData.density}
            onChange={(value: string) => setCreateData({ ...createData, density: value })}
            placeholder="Удельный вес"
            error=""
          />
          <Button onClick={onCreate} variant="modal">
            Сохранить
          </Button>
        </div>
      </Modal>

      {/* Модальное окно редактирования материала */}
      <Modal isOpen={isUpdateModalOpen} onClose={() => setIsUpdateModalOpen(false)}>
        <h2 className="text-xl text-gray-800 mb-4">Редактирование материала</h2>
        <div className="space-y-4">

          <TextInput
            value={updateData.name || ''}
            onChange={(value) => setUpdateData({ ...updateData, name: value })}
            placeholder={materialToUpdate.name}
            error=""
          />

          <Select<Option>
            options={unitOptions}
            value={unitOptions.find((option) => option.value === updateData.units) || null}
            onChange={(option) => setUpdateData({ ...updateData, units: option?.value || '' })}
            inputValue={unitInputValue}
            onInputChange={(value) => setUnitInputValue(value)}
            onMenuOpen={() => {
              setIsUnitMenuOpen(true);
              setUnitInputValue('');
            }}
            onMenuClose={() => {
              setIsUnitMenuOpen(false);
              setUnitInputValue('');
            }}
            menuIsOpen={isUnitMenuOpen}
            isSearchable={true}
            isMulti={false}
            placeholder={materialToUpdate.units} />

          <NumberInput
            value={updateData.density || ''}
            onChange={(value: string) => setUpdateData({ ...updateData, density: value })}
            placeholder={materialToUpdate.density}
            error=""
          />
          <Button onClick={onEdit} variant="modal">
            Сохранить
          </Button>
        </div>
      </Modal>

      {/* Модальное окно подтверждения удаления материала */}
      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
        <h2 className="text-xl text-gray-700">Вы уверены, что хотите удалить следующий материал "{materialToDelete.name}"?</h2>
        <p className="text-gray-400 mb-8">Действие будет невозможно отменить</p>
        <div className="flex gap-4">
          <Button onClick={() => confirmDelete(materialToDelete.id)} variant="danger">Удалить</Button>
          <Button onClick={() => setIsDeleteModalOpen(false)} variant="modal">Отмена</Button>
        </div>
      </Modal>

    </div>
  )
}
