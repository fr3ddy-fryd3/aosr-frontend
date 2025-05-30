import { Material } from "@/entities/material";
import { ProgressBar } from "@/shared/ui/ProgressBar";

interface ProgressBarRow {
  material: Material;
  volume: number;
  usedVolume: number;
}

interface DashboardProps {
  data: ProgressBarRow[];
}

// Компонент Dashboard
export const Dashboard = ({ data }: DashboardProps) => {
  return (
    <div className="mb-16">
      <h1 className="text-xl mb-4">Использование объемов</h1>
      <div className="space-y-6">
        {
          data.map((item, index) => (
            <div key={index} className="flex flex-col space-y-2">
              {/* Название материала */}
              <h2 className="text-lg font-semibold text-gray-800">{item.material.name}</h2>
              {/* Прогресс-бар */}
              <ProgressBar
                current={item.usedVolume || 0}
                max={item.volume || 0}
                units={item.material.units || ''}
              />
            </div>
          ))
        }
        {data.length == 0 && (
          <p className="text-gray-700 text-center">Отсутствует информация об объемах актов</p>
        )}
      </div>
    </div>
  );
};
