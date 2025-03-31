import { Button } from "@/shared/ui/Button";

export function ProjectPage() {
  const setIsCreateModalOpen = () => { };
  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <div className="flex flex-col">
          <h1 className="text-gray-800 font-sans text-xl">Проекты</h1>
          <p className="text-gray-500 font-sans text-lg">Таблица</p>
        </div>

        {/* Кнопка создания материала */}
        <Button onClick={() => setIsCreateModalOpen()} variant="primary">
          Создать
        </Button>
      </div>
    </div>
  );
};
