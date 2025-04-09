import { Material } from "@/entities/material";
import { useState, useEffect } from "react";

type InputProps = {
  isDisabled?: boolean;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error: string;
  placeholder: string;
  halfWidth?: boolean;
  info?: string;
}

type VolumeAndCapacityInputProps = {
  isDisabled?: boolean;
  volumeValue: string;
  material: Material;
  onChange: (value: string) => void;
  availableVolumeInfo?: string;
  currentVolume?: string;
  error: string;
}

export function TextInput({ isDisabled, value, onChange, error, placeholder }: InputProps) {
  return (
    <>
      <input
        disabled={isDisabled}
        className={`w-full transition h-10 p-2 border rounded-md ${error ? 'border-r-red-400' : 'border-gray-300'} ${isDisabled ? 'bg-gray-100 text-gray-400' : ''}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
    </>
  )
}

export function NumberInput({ isDisabled, value, onChange, onBlur, error, placeholder, halfWidth, info }: InputProps) {
  return (
    <>
      <input
        disabled={isDisabled}
        className={`p-2 h-10 transition border rounded-md ${halfWidth ? 'w-1/2' : 'w-full'} ${error ? 'border-r-red-400' : 'border-gray-300'} ${isDisabled ? 'bg-gray-100 text-gray-400' : ''}`}
        value={value}
        onChange={(e) => {
          const rawValue = e.target.value.replace(/[^0-9.,]/g, '');
          const normalizeValue = rawValue.replace(/,/g, ".");

          if (/^[0-9]*[.,]?[0-9]*$/.test(rawValue)) onChange(normalizeValue);
        }}
        onBlur={onBlur}
        placeholder={info ? `Доступно: ${info}` : placeholder}
      />
      {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
    </>
  )
}

export function VolumeAndCapacityInput({ isDisabled, volumeValue, material, onChange, availableVolumeInfo, currentVolume, error }: VolumeAndCapacityInputProps) {

  const capacityToWeight = (capacity: string) => {
    const result = parseFloat(capacity) * parseFloat(material.density);
    return isNaN(result) ? "" : result.toFixed(3);
  };

  const weightToCapacity = (weight: string) => {
    const result = parseFloat(weight) / parseFloat(material.density);
    return isNaN(result) ? "" : result.toFixed(3);
  };

  const [localVolume, setLocalVolume] = useState(volumeValue);
  const [localWeight, setLocalWeight] = useState(capacityToWeight(volumeValue));
  const [isEditingVolume, setIsEditingVolume] = useState(false);
  const [isEditingWeight, setIsEditingWeight] = useState(false);

  // Синхронизация с внешним состоянием при изменении volumeValue
  useEffect(() => {
    if (!isEditingVolume && !isEditingWeight) {
      setLocalVolume(volumeValue);
      setLocalWeight(capacityToWeight(volumeValue));
    }
  }, [volumeValue]);

  const handleVolumeChange = (newCapacity: string) => {
    setLocalVolume(newCapacity);
    setIsEditingVolume(true);
    if (!isEditingWeight) {
      const newWeight = capacityToWeight(newCapacity);
      setLocalWeight(newWeight);
    }
    onChange(newCapacity); // Отправляем изменения в родительский компонент
  };

  const handleWeightChange = (newWeight: string) => {
    setLocalWeight(newWeight);
    setIsEditingWeight(true);
    if (!isEditingVolume) {
      const newCapacity = weightToCapacity(newWeight);
      setLocalVolume(newCapacity);
      onChange(newCapacity); // Отправляем изменения в родительский компонент
    }
  };

  // Сброс флагов редактирования после завершения ввода
  const handleBlur = () => {
    setIsEditingVolume(false);
    setIsEditingWeight(false);
  };

  if (!material.units) return null;

  const units = material.units.split('/');

  return (
    <div className="flex space-x-4">
      <NumberInput
        isDisabled={isDisabled}
        value={localVolume}
        onChange={handleVolumeChange}
        onBlur={handleBlur}
        placeholder={
          availableVolumeInfo ?
            `Доступно: ${availableVolumeInfo} ${units[0]}` :
            currentVolume ?
              `${currentVolume} ${units[0]}` :
              `Объем, ${units[0]}`
        }
        error={error}
        halfWidth={true}
      />
      <p className="absolute mt-10 text-sm text-gray-500"></p>

      <NumberInput
        isDisabled={isDisabled}
        value={localWeight}
        onChange={handleWeightChange}
        onBlur={handleBlur}
        placeholder={
          availableVolumeInfo ?
            `Доступно: ${capacityToWeight(availableVolumeInfo || '')} ${units[1]}` :
            currentVolume ?
              `${capacityToWeight(currentVolume)} ${units[1]}` :
              `Вес, ${units[1]}`
        }
        error={error}
        halfWidth={true}
      />
    </div>
  );
}
