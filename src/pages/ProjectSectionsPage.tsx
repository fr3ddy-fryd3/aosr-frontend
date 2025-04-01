import { Section } from "@/entities/section";
import { Project } from "@/entities/project";
import { SectionTable } from "@/features/projectSections/components/SectionTable";
import { sectionApi } from "@/shared/api/section";
import { CreateSectionDTO, UpdateSectionDTO } from "@/shared/model/dto/section";
import { Button } from "@/shared/ui/Button";
import { TextInput } from "@/shared/ui/Input";
import { SmallModal } from "@/shared/ui/Modal";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { projectApi } from "@/shared/api/project";

export function ProjectSectionsPage() {
  const { projectId } = useParams();

  const [sections, setSections] = useState<Section[]>([]);
  const [project, setProject] = useState<Project>({} as Project);

  // Состояния модалок
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Состояния проектов
  const [createData, setCreateData] = useState<CreateSectionDTO>({} as CreateSectionDTO);
  const [updateData, setUpdateData] = useState<UpdateSectionDTO>({} as UpdateSectionDTO);
  const [sectionToUpdate, setSectionToUpdate] = useState<Section>({} as Section);
  const [sectionToDelete, setSectionToDelete] = useState<Section>({} as Section)

  createData.projectId = Number(projectId);

  // Загрузка проектов
  useEffect(() => {
    const fetchData = async () => {
      const sectionsData = await sectionApi.getByProjectId(Number(projectId));
      const projectData = await projectApi.getById(Number(projectId));
      if (sectionsData !== undefined) setSections(sectionsData);
      if (projectData !== undefined) setProject(projectData);
    };
    console.log(sections);
    fetchData();
  }, [])

  // Запрос на создание проекта
  const onCreate = async () => {
    const created = await sectionApi.create(createData);
    if (created !== undefined) {
      setSections([...sections, created]);
      setCreateData({} as Section);
      setIsCreateModalOpen(false);
    }
  }

  // Состояние редактирования
  const editMode = (section: Section) => {
    setSectionToUpdate(section);
    setIsUpdateModalOpen(true);
  }

  // Запрос на обновление материала и проверка его обновления
  const onEdit = async () => {
    const updated = await sectionApi.update(sectionToUpdate.id, updateData);
    if (updated !== undefined) {
      setSections(sections.map((s) => (s.id === updated.id ? updated : s)));
      setUpdateData({} as UpdateSectionDTO);
      setSectionToUpdate({} as Section);
      setIsUpdateModalOpen(false);
    }
  }

  // Состояние удаления
  const deleteMode = (material: Section) => {
    setSectionToDelete(material);
    setIsDeleteModalOpen(true);
  }

  // Запрос на удаление материала и проверка его удаления
  const confirmDelete = async (id: number) => {
    const deleted = await sectionApi.delete(id);
    if (deleted == 204) {
      setSections(sections.filter((p) => (p.id !== id)));
      setSectionToDelete({} as Section);
      setIsDeleteModalOpen(false);
    }
  };


  return (
    <div className="p-4">

      <h1 className="text-gray-800 text-center font-sans text-2xl mb-8">Проект "{project.name}"</h1>

      <div className="flex justify-between mb-4">

        {/* Заголовок таблицы*/}
        <div className="flex flex-col">
          <h1 className="text-gray-800 font-sans text-xl">Разделы</h1>
          <p className="text-gray-500 font-sans text-lg">Таблица</p>
        </div>

        {/* Кнопка создания материала */}
        <Button onClick={() => { setIsCreateModalOpen(true) }} variant="primary">
          Создать
        </Button>
      </div>

      {/* Таблица проектов */}
      <SectionTable sections={sections} editMode={editMode} deleteMode={deleteMode} />

      {/* Модальное окно создания проекта */}
      <SmallModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)}>
        <h2 className="text-xl text-gray-800 mb-4">Создание раздела</h2>
        <div className="space-y-4">

          <TextInput
            value={createData.name}
            onChange={(value) => setCreateData({ ...createData, name: value })}
            placeholder="Название"
            error=""
          />
          <Button onClick={onCreate} variant="modal">
            Сохранить
          </Button>
        </div>
      </SmallModal>

      {/* Модальное окно редактирования проекта */}
      <SmallModal isOpen={isUpdateModalOpen} onClose={() => setIsUpdateModalOpen(false)}>
        <h2 className="text-xl text-gray-800 mb-4">Редактирование раздела</h2>
        <div className="space-y-4">

          <TextInput
            value={updateData.name || ''}
            onChange={(value) => setUpdateData({ ...updateData, name: value })}
            placeholder={sectionToUpdate.name}
            error=""
          />
          <Button onClick={onEdit} variant="modal">
            Сохранить
          </Button>
        </div>
      </ SmallModal >

      {/* Модальное окно подтверждения удаления проекта */}
      <SmallModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
        <h2 className="text-xl text-gray-700">Вы уверены, что хотите удалить следующий раздел: "{sectionToDelete.name}"?</h2>
        <p className="text-gray-400 mb-8">Действие будет невозможно отменить</p>
        <div className="flex gap-4">
          <Button onClick={() => confirmDelete(sectionToDelete.id)} variant="danger">Удалить</Button>
          <Button onClick={() => setIsDeleteModalOpen(false)} variant="modal">Отмена</Button>
        </div>
      </SmallModal>

    </div>
  );
};
