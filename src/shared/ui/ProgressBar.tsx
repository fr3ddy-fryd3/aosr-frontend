interface ProgressBarProps {
  current: number;
  max: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, max }) => {
  // Вычисляем процент заполнения
  const percentage = Math.min((current / max) * 100, 100);
  // Определяем цвет: зелёный при 100%, иначе синий
  const fillColor = percentage === 100 ? "bg-green-500" : "bg-blue-500";

  return (
    <div className="relative w-full h-6 bg-gray-200 rounded">
      {/* Заполненная часть */}
      <div
        className={`h-full ${fillColor} rounded transition-all duration-300`}
        style={{ width: `${percentage}%` }}
      />
      {/* Числа слева и справа */}
      <div className="absolute inset-0 flex justify-between items-center px-2 text-sm text-gray-800">
        <span>{current}</span>
        <span>{max}</span>
      </div>
    </div>
  );
};

// Использование
<ProgressBar current={75} max={100} />;
