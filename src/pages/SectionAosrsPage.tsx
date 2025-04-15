import { Aosr } from "@/entities/aosr";
import { Material } from "@/entities/material";
import { Section } from "@/entities/section";
import { AosrTable } from "@/features/sectionAosrs/components/aosrTable";
import { Dashboard } from "@/features/sectionAosrs/components/sectionMaterialsDashboard";
import { aosrApi } from "@/shared/api/aosr";
import { sectionApi } from "@/shared/api/section";
import { CreateAosrDTO, UpdateAosrDTO } from "@/shared/model/dto/aosr";
import { Button } from "@/shared/ui/Button";
import { TextInput } from "@/shared/ui/Input";
import { SmallModal } from "@/shared/ui/Modal";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export function SectionAosrsPage() {
  const navigate = useNavigate();
  const { sectionId } = useParams();

  const [section, setSection] = useState<Section>({} as Section);
  const [aosrs, setAosrs] = useState<Aosr[]>([]);

  // Состояния модалок
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Состояния актов 
  const [createData, setCreateData] = useState<CreateAosrDTO>({} as CreateAosrDTO);
  const [updateData, setUpdateData] = useState<UpdateAosrDTO>({} as UpdateAosrDTO);
  const [aosrToUpdate, setAosrToUpdate] = useState<Aosr>({} as Aosr);
  const [aosrToDelete, setAosrToDelete] = useState<Aosr>({} as Aosr)

  // Загрузка актов
  useEffect(() => {
    const fetchData = async () => {
      const aosrsData = await aosrApi.getBySection(Number(sectionId));
      const sectionData = await sectionApi.getById(Number(sectionId));
      if (aosrsData !== undefined) setAosrs(aosrsData);
      if (sectionData !== undefined) setSection(sectionData);
    };
    fetchData();
  }, [])

  // Запрос на создание акта
  const onCreate = async () => {
    createData.sectionId = Number(sectionId);

    const created = await aosrApi.create(createData);
    if (created !== undefined) {
      setAosrs([...aosrs, created]);
      setCreateData({} as Aosr);
      setIsCreateModalOpen(false);
    }
  }

  // Состояние редактирования
  const editMode = (aosr: Aosr) => {
    setAosrToUpdate(aosr);
    setIsUpdateModalOpen(true);
  }

  // Запрос на обновление акта и проверка его обновления
  const onEdit = async () => {
    const updated = await aosrApi.update(aosrToUpdate.id, updateData);
    if (updated !== undefined) {
      setAosrs(aosrs.map((a) => (a.id === updated.id ? updated : a)));
      setUpdateData({} as UpdateAosrDTO);
      setAosrToUpdate({} as Aosr);
      setIsUpdateModalOpen(false);
    }
  }

  // Состояние удаления
  const deleteMode = (aosr: Aosr) => {
    setAosrToDelete(aosr);
    setIsDeleteModalOpen(true);
  }

  // Запрос на удаление акта и проверка его удаления
  const confirmDelete = async (id: number) => {
    const deleted = await aosrApi.delete(id);
    if (deleted == 204) {
      setAosrs(aosrs.filter((a) => (a.id !== id)));
      setAosrToDelete({} as Aosr);
      setIsDeleteModalOpen(false);
    }
  };

  interface AosrMaterialVolumeSum {
    sectionMaterialId: number;
    material: Material;
    volume: number;
    usedVolume: number;
  }

  // Функция для подсчёта сумм по материалам
  function calculateMaterialVolumeSums(aosrArray: Aosr[]): AosrMaterialVolumeSum[] {
    // Используем reduce для группировки по sectionMaterialId
    const materialSums = aosrArray.reduce((acc, aosr) => {
      aosr.materials?.forEach(am => {
        const sectionMaterialId = am.sectionMaterialId;
        const material = am.sectionMaterial.material;
        const volume = parseFloat(am.sectionMaterial.volume);
        const usedVolume = parseFloat(am.volume)

        // Если запись для этого материала уже есть, обновляем её
        if (acc[sectionMaterialId]) {
          acc[sectionMaterialId].usedVolume += usedVolume;
        } else {
          // Если нет, создаём новую запись
          acc[sectionMaterialId] = {
            sectionMaterialId,
            material,
            volume: volume,
            usedVolume: usedVolume,
          };
        }
      });
      return acc;
    }, {} as Record<number, AosrMaterialVolumeSum>);

    // Преобразуем объект в массив
    return Object.values(materialSums);
  }

  return (
    <div className="p-4">

      {/* Заголовок страницы */}
      <h1 className="text-gray-800 text-center font-sans text-2xl mb-8">Раздел "{section.name}"</h1>

      <Dashboard data={calculateMaterialVolumeSums(aosrs)} />

      <div className="flex justify-between mb-4">
        {/* Заголовок */}
        <div className="flex flex-col">
          <h1 className="text-gray-800 font-sans text-xl">Акты (АОСР)</h1>
          <p className="text-gray-500 font-sans text-lg">Таблица</p>
        </div>

        <div className="space-x-4">
          {/* Кнопка перехода к объемам раздела */}
          <Button onClick={() => { navigate(`/section/${sectionId}/materials`) }} variant="primary">
            Объемы
          </Button>
          {/* Кнопка создания акта */}
          <Button onClick={() => { setIsCreateModalOpen(true) }} variant="primary">
            Создать
          </Button>
        </div>
      </div>

      {/* Таблица акта */}
      <AosrTable aosrs={aosrs} editMode={editMode} deleteMode={deleteMode} />

      {/* Модальное окно создания акта */}
      <SmallModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)}>
        <h2 className="text-xl text-gray-800 mb-4">Создание акта</h2>
        <div className="space-y-4">

          <TextInput
            value={createData.name}
            onChange={(value) => setCreateData({ ...createData, name: value })}
            placeholder="Номер акта"
            error=""
          />
          <Button onClick={onCreate} variant="modal">
            Сохранить
          </Button>
        </div>
      </SmallModal>

      {/* Модальное окно редактирования акта */}
      <SmallModal isOpen={isUpdateModalOpen} onClose={() => setIsUpdateModalOpen(false)}>
        <h2 className="text-xl text-gray-800 mb-4">Редактирование акта</h2>
        <div className="space-y-4">

          <TextInput
            value={updateData.name || ''}
            onChange={(value) => setUpdateData({ ...updateData, name: value })}
            placeholder={aosrToUpdate.name}
            error=""
          />
          <Button onClick={onEdit} variant="modal">
            Сохранить
          </Button>
        </div>
      </ SmallModal >

      {/* Модальное окно подтверждения удаления акта */}
      <SmallModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
        <h2 className="text-xl text-gray-700">Вы уверены, что хотите удалить акт №{aosrToDelete.name} ?</h2>
        <p className="text-gray-400 mb-8">Действие будет невозможно отменить</p>
        <div className="flex gap-4">
          <Button onClick={() => confirmDelete(aosrToDelete.id)} variant="danger">Удалить</Button>
          <Button onClick={() => setIsDeleteModalOpen(false)} variant="modal">Отмена</Button>
        </div>
      </SmallModal>

    </div>
  );
};
