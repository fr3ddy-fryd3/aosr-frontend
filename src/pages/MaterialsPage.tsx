import { useEffect, useState } from "react"
import { Material } from "../entities/material"
import { CreateMaterialDTO, UpdateMaterialDTO } from "../shared/dto/material"
import { materialApi } from "../shared/api/material"
import { MaterialTable } from "../features/material/components/MaterialTable"
import Modal from "../shared/ui/Modal"
import Input from "../shared/ui/Input"
import Button from "../shared/ui/Button"

export default function MaterialsPage() {
  const [materials, setMaterials] = useState<Material[]>([])

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [newMaterial, setNewMaterial] = useState<CreateMaterialDTO>({ name: "", units: "", density: 0 });
  const [updateMaterial, setUpdateMaterial] = useState<UpdateMaterialDTO>({});
  const [materialToEdit, setMaterialToEdit] = useState<Material>({ id: 0, name: "", units: "", density: 0 });
  const [materialToDelete, setMaterialToDelete] = useState<Material>({ id: 0, name: "", units: "", density: 0 })

  useEffect(() => {
    const fetchMaterials = async () => {
      const data = await materialApi.get();
      if (data !== undefined) setMaterials(data);
    }
    fetchMaterials();
  }, [])

  const onCreate = async () => {
    const created = await materialApi.create(newMaterial);
    if (created !== undefined) {
      setMaterials([...materials, created]);
      setNewMaterial({ name: "", units: "", density: 0 });
      setIsCreateModalOpen(false);
    }
  }

  const onEdit = (material: Material) => {
    setMaterialToEdit(material);
    setIsUpdateModalOpen(true);
  }

  const onUpdate = async (id: number) => {
    const updated = await materialApi.update(id, updateMaterial);
    if (updated !== undefined) {
      setMaterials(materials.map((m) => (m.id === updated.id ? updated : m)));
      setUpdateMaterial({});
      setIsUpdateModalOpen(false);
    }
  }

  const onDelete = (material: Material) => {
    setMaterialToDelete(material);
    setIsDeleteModalOpen(true);
  }

  const confirmDelete = async (id: number) => {
    const deleted = await materialApi.delete(id);
    if (deleted == 204) {
      setMaterials(materials.filter((m) => (m.id !== id)));
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
        <Button onClick={() => setIsCreateModalOpen(true)} variant="primary">
          Создать
        </Button>
      </div>

      <MaterialTable materials={materials} onEdit={onEdit} onDelete={onDelete} />

      <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)}>
        <h2 className="text-xl text-gray-800 mb-4">Создание материала</h2>
        <div className="space-y-4">
          <Input
            value={newMaterial.name}
            onChange={(e) => setNewMaterial({ ...newMaterial, name: e.target.value })}
            placeholder="Название"
          />
          <Input
            value={newMaterial.units}
            onChange={(e) => setNewMaterial({ ...newMaterial, units: e.target.value })}
            placeholder="Ед. измерения"
          />
          <Input
            value={newMaterial.density.toString()}
            onChange={(e) => setNewMaterial({ ...newMaterial, density: Number(e.target.value) })}
            placeholder="Удельный вес"
          />
          <Button onClick={onCreate} variant="modal">
            Сохранить
          </Button>
        </div>
      </Modal>

      <Modal isOpen={isUpdateModalOpen} onClose={() => setIsUpdateModalOpen(false)}>
        <h2 className="text-xl text-gray-800 mb-4">Редактирование материала</h2>
        <div className="space-y-4">
          <Input
            value={updateMaterial.name ?? ''}
            onChange={(e) => setUpdateMaterial({ ...updateMaterial, name: e.target.value })}
            placeholder={materialToEdit.name}
          />
          <Input
            value={updateMaterial.units ?? ''}
            onChange={(e) => setUpdateMaterial({ ...updateMaterial, units: e.target.value })}
            placeholder={materialToEdit.units}
          />
          <Input
            value={updateMaterial.density?.toString() ?? ''}
            onChange={(e) => setUpdateMaterial({ ...updateMaterial, density: Number(e.target.value) })}
            placeholder={materialToEdit.density.toString()}
          />
          <Button onClick={() => onUpdate(materialToEdit.id)} variant="modal">
            Сохранить
          </Button>
        </div>
      </Modal>

      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
        <h2 className="text-xl text-gray-700">Вы уверены, что хотите удалить "{materialToDelete.name}"?</h2>
        <p className="text-gray-400 mb-8">Действие будет невозможно отменить</p>
        <div className="flex gap-4">
          <Button onClick={() => confirmDelete(materialToDelete.id)} variant="danger">Удалить</Button>
          <Button onClick={() => setIsDeleteModalOpen(false)} variant="modal">Отмена</Button>
        </div>
      </Modal>

    </div>
  )
}
