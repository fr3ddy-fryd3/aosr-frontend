import { ChildrenMaterial } from "@/entities/childrenMaterial";
import { Material } from "@/entities/material";
import { Option } from "@/entities/option";
import { Aosr, AosrMaterial } from "@/entities/aosr";
import { SectionMaterial } from "@/entities/section";
import { materialApi } from "@/shared/api/material";
import { aosrApi } from "@/shared/api/aosr";
import { aosrMaterialApi } from "@/shared/api/aosrMaterial";
import { CreateAosrMaterialDTO, UpdateAosrMaterialDTO } from "@/shared/model/dto/aosr";
import { Button } from "@/shared/ui/Button";
import { AosrMaterialFormRow } from "@/shared/ui/AosrMaterialFormRow";
import { SmallModal } from "@/shared/ui/Modal";
import { getFreeId } from "@/shared/utils/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { sectionApi } from "@/shared/api/section";


export function AosrMaterialsPage() {
  const { aosrId } = useParams();

  const [aosr, setAosr] = useState<Aosr>({} as Aosr);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [aosrMaterials, setAosrMaterials] = useState<AosrMaterial[]>([]);
  const [sectionMaterials, setSectionMaterials] = useState<SectionMaterial[]>([]);

  // Состояния для материалов раздела
  const [aosrMaterialToDelete, setSectinMaterialToDelete] = useState<AosrMaterial>({} as AosrMaterial)

  // Состояние для модального окна удаления
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Состояние для редактирования
  const [editingId, setEditingId] = useState<number | null>(null);

  // Данные для выпадающего списка
  const materialOptions: Option[] = materials.map((material) => ({
    value: material.id,
    label: `${material.name}, ${material.units}`,
  }));

  // Загрузка акта, раздела и материалов
  const fetchData = async () => {

    // Блок получения данных
    const aosrData = await aosrApi.getById(Number(aosrId));
    const sectionData = await sectionApi.getById(Number(aosrData?.sectionId))
    const materialsData = await materialApi.get();

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

  };

  // Генератор шаблонов на все материалы раздела
  const getMaterialsTemplates = (localSectionMaterials: SectionMaterial[]) => {
    return localSectionMaterials.map((sm): AosrMaterial => ({
      id: getFreeId(aosrMaterials),
      aosrId: Number(aosrId),
      sectionMaterialId: sm.id,
      volume: '0',
      usedVolume: '0',
      sectionMaterial: sm
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

  // Обработка создания/удаления материалов раздела
  const handleSave = async (aosrMaterial: ChildrenMaterial) => {
    console.log(aosrMaterials);
    console.log(aosrMaterial.id);
    setEditingId(null);
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

  // Обработка отмены действий редактирования
  const handleCancel = () => {
    setEditingId(null);
  }

  // Состояние удаления
  const deleteMode = (aosrMaterial: AosrMaterial) => {
    setSectinMaterialToDelete(aosrMaterial);
    setIsDeleteModalOpen(true);
  };

  // Запрос на удаление материала акта и проверка его удаления
  const confirmDelete = async (id: number) => {
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
            isEdit={am.id === editingId}
            onEdit={() => setEditingId(am.id)}
            onSave={handleSave}
            onCancel={handleCancel}
            onDelete={() => deleteMode(am)}
          />
        )
      })}

      {/* Модальное окно подтверждения удаления материала */}
      <SmallModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
        <h2 className="text-xl text-gray-700">Вы уверены, что хотите удалить следующий материал акта: {aosrMaterialToDelete?.sectionMaterial?.material.name}?</h2>
        <p className="text-gray-400 mb-8">Действие будет невозможно отменить</p>
        <div className="flex gap-4">
          <Button onClick={() => confirmDelete(aosrMaterialToDelete.id)} variant="danger">Удалить</Button>
          <Button onClick={() => setIsDeleteModalOpen(false)} variant="modal">Отмена</Button>
        </div>
      </SmallModal>

    </div>
  )
}
