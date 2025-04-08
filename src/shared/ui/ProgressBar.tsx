interface ProgressBarProps {
  current: number;
  max: number;
  units: string;
}

export const ProgressBar = ({ current, max, units }: ProgressBarProps) => {
  // Вычисляем процент заполнения
  const percentage = Math.min((current / max) * 100, 100);
  let fillColor;
  let textColor;

  if (current < max) {
    fillColor = "bg-blue-400";
    textColor = "text-blue-800";
  } else if (current === max) {
    fillColor = "bg-green-400";
    textColor = "text-green-800";
  } else {
    fillColor = "bg-red-400";
    textColor = "text-red-800";
  }

  return (
    <>
      {/* Числа слева и справа */}
      <div className={`inset-0 flex justify-between items-center px-2 text ${textColor}`}>
        <span>{current} {units}</span>
        <span>{max} {units}</span>
      </div >
      <div className="relative w-full h-3 bg-gray-200 rounded-full">
        {/* Заполненная часть */}
        <div
          className={`h-3 ${fillColor} rounded-full transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </>
  );
};
