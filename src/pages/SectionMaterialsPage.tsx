import { Material } from "@/entities/material";
import { Option } from "@/entities/option";
import { Section, SectionMaterial } from "@/entities/section";
import { ChildrenMaterial } from "@/entities/childrenMaterial";
import { materialApi } from "@/shared/api/material";
import { sectionApi } from "@/shared/api/section";
import { CreateSectionMaterialDTO, UpdateSectionMaterialDTO } from "@/shared/model/dto/section";
import { ActionButtons } from "@/shared/ui/ActionButtons";
import { Button } from "@/shared/ui/Button";
import { NumberInput, VolumeAndCapacityInput } from "@/shared/ui/Input";
import { MaterialFormRow } from "@/shared/ui/MaterialFormRow";
import { getFreeId, isUnitTranslatable } from "@/shared/utils/material";
import { ReactNode, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Select from "react-select/base";
import { SmallModal } from "@/shared/ui/Modal";
import { sectionMaterialApi } from "@/shared/api/sectionMaterial";


export function SectionMaterialsPage() {
  const { sectionId } = useParams();

  const [section, setSection] = useState<Section>({} as Section);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [sectionMaterials, setSectionMaterials] = useState<SectionMaterial[]>([]);

  // Состояния для материалов раздела
  const [sectionMaterialToDelete, setSectinMaterialToDelete] = useState<SectionMaterial>({} as SectionMaterial)

  // Состояние для модального окна удаления
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Состояние для редактирования
  const [editingId, setEditingId] = useState<number | null>(null);

  // Данные для выпадающего списка
  const materialOptions: Option[] = materials.map((material) => ({
    value: material.id,
    label: `${material.name}, ${material.units}`,
  }));

  // Загрузка раздела и материалов
  useEffect(() => {
    const fetchData = async () => {
      const sectionData = await sectionApi.getById(Number(sectionId));
      const materialsData = await materialApi.get();
      if (materialsData !== undefined) setMaterials(materialsData);
      if (sectionData !== undefined) {
        setSection(sectionData);
        setSectionMaterials(sectionData.materials);
      }
    };
    fetchData();
  }, [])

  const handleSave = async (sectionMaterial: ChildrenMaterial) => {
    setEditingId(null);
    if (sectionMaterial.id <= 0) {
      const createData: CreateSectionMaterialDTO = {
        sectionId: Number(sectionId),
        materialId: sectionMaterial.materialId,
        volume: sectionMaterial.volume
      }
      const created = await sectionMaterialApi.create(createData)
      if (created !== undefined) {
        setSectionMaterials(
          sectionMaterials.map((sm) => sm.id === sectionMaterial.id ? created : sm)
        );
      }
    }
  }

  const handleCancel = () => {
    setEditingId(null);
  }

  const addSectionMaterial = () => {
    const sectionMaterial: SectionMaterial = {
      id: getFreeId(sectionMaterials),
      sectionId: Number(sectionId),
      materialId: 0,
      volume: '',
      material: {} as Material,
    }
    setSectionMaterials([...sectionMaterials, sectionMaterial]);
    setEditingId(sectionMaterial.id);
  }

  // Состояние удаления
  const deleteMode = (sectionMaterial: SectionMaterial) => {
    console.log(sectionMaterial);
    setSectinMaterialToDelete(sectionMaterial);
    setIsDeleteModalOpen(true);
  };

  // Запрос на удаление паспорта и проверка его удаления
  const confirmDelete = async (id: number) => {
    const deleted = await sectionMaterialApi.delete(id);
    if (deleted == 204) {
      setSectionMaterials(sectionMaterials.filter((sm) => (sm.id !== id)));
      setSectinMaterialToDelete({} as SectionMaterial);
      setIsDeleteModalOpen(false);
    } else {
      setSectinMaterialToDelete({} as SectionMaterial);
      setIsDeleteModalOpen(false);
    }
  }


  return (
    <div className="p-4">
      <h1 className="text-gray-800 text-center font-sans text-2xl mb-8">Объемы раздела "{section.name}"</h1>

      {sectionMaterials.map((sm) => {
        return (
          <MaterialFormRow
            key={sm.id}
            materials={materials}
            materialOptions={materialOptions}
            data={sm}
            isEdit={sm.id === editingId}
            onEdit={() => setEditingId(sm.id)}
            onSave={handleSave}
            onCancel={handleCancel}
            onDelete={() => deleteMode(sm)}
          />
        )
      })}



      <div className="mt-8">
        <Button onClick={addSectionMaterial} variant="modal">
          Добавить материал
        </Button>
      </div>

      {/* Модальное окно подтверждения удаления материала */}
      <SmallModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
        <h2 className="text-xl text-gray-700">Вы уверены, что хотите удалить следующий материал раздела: {sectionMaterialToDelete?.material?.name}?</h2>
        <p className="text-gray-400 mb-8">Действие будет невозможно отменить</p>
        <div className="flex gap-4">
          <Button onClick={() => confirmDelete(sectionMaterialToDelete.id)} variant="danger">Удалить</Button>
          <Button onClick={() => setIsDeleteModalOpen(false)} variant="modal">Отмена</Button>
        </div>
      </SmallModal>

    </div>
  )
}
