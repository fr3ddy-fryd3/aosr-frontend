import { Project } from "@/entities/project";
import { ProjectTable } from "@/features/project/components/ProjectTable";
import { projectApi } from "@/shared/api/project";
import { CreateProjectDTO, UpdateProjectDTO } from "@/shared/model/dto/project";
import { Button } from "@/shared/ui/Button";
import { TextInput } from "@/shared/ui/Input";
import { SmallModal } from "@/shared/ui/Modal";
import { useEffect, useState } from "react";

export function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);

  // Состояния модалок
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Состояния проектов
  const [createData, setCreateData] = useState<CreateProjectDTO>({} as CreateProjectDTO);
  const [updateData, setUpdateData] = useState<UpdateProjectDTO>({} as UpdateProjectDTO);
  const [projectToUpdate, setProjectToUpdate] = useState<Project>({} as Project);
  const [projectToDelete, setProjectToDelete] = useState<Project>({} as Project)

  // Загрузка проектов
  useEffect(() => {
    const fetchProjects = async () => {
      const data = await projectApi.get();
      if (data !== undefined) setProjects(data);
    };
    fetchProjects();
  }, [])

  // Запрос на создание проекта
  const onCreate = async () => {
    const created = await projectApi.create(createData);
    if (created !== undefined) {
      setProjects([...projects, created]);
      setCreateData({} as Project);
      setIsCreateModalOpen(false);
    }
  }

  // Состояние редактирования
  const editMode = (project: Project) => {
    setProjectToUpdate(project);
    setIsUpdateModalOpen(true);
  }

  // Запрос на обновление материала и проверка его обновления
  const onEdit = async () => {
    const updated = await projectApi.update(projectToUpdate.id, updateData);
    if (updated !== undefined) {
      setProjects(projects.map((p) => (p.id === updated.id ? updated : p)));
      setUpdateData({} as UpdateProjectDTO);
      setProjectToUpdate({} as Project);
      setIsUpdateModalOpen(false);
    }
  }

  // Состояние удаления
  const deleteMode = (material: Project) => {
    setProjectToDelete(material);
    setIsDeleteModalOpen(true);
  }

  // Запрос на удаление материала и проверка его удаления
  const confirmDelete = async (id: number) => {
    const deleted = await projectApi.delete(id);
    if (deleted == 204) {
      setProjects(projects.filter((p) => (p.id !== id)));
      setProjectToDelete({} as Project);
      setIsDeleteModalOpen(false);
    }
  };


  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">

        {/* Заголовок */}
        <div className="flex flex-col">
          <h1 className="text-gray-800 font-sans text-xl">Проекты</h1>
          <p className="text-gray-500 font-sans text-lg">Таблица</p>
        </div>

        {/* Кнопка создания материала */}
        <Button onClick={() => { setIsCreateModalOpen(true) }} variant="primary">
          Создать
        </Button>
      </div>

      {/* Таблица проектов */}
      <ProjectTable projects={projects} editMode={editMode} deleteMode={deleteMode} />

      {/* Модальное окно создания проекта */}
      <SmallModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)}>
        <h2 className="text-xl text-gray-800 mb-4">Создание материала</h2>
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
        <h2 className="text-xl text-gray-800 mb-4">Редактирование материала</h2>
        <div className="space-y-4">

          <TextInput
            value={updateData.name || ''}
            onChange={(value) => setUpdateData({ ...updateData, name: value })}
            placeholder={projectToUpdate.name}
            error=""
          />
          <Button onClick={onEdit} variant="modal">
            Сохранить
          </Button>
        </div>
      </ SmallModal >

      {/* Модальное окно подтверждения удаления проекта */}
      <SmallModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
        <h2 className="text-xl text-gray-700">Вы уверены, что хотите удалить следующий проект: "{projectToDelete.name}"?</h2>
        <p className="text-gray-400 mb-8">Действие будет невозможно отменить</p>
        <div className="flex gap-4">
          <Button onClick={() => confirmDelete(projectToDelete.id)} variant="danger">Удалить</Button>
          <Button onClick={() => setIsDeleteModalOpen(false)} variant="modal">Отмена</Button>
        </div>
      </SmallModal>

    </div>
  );
};
