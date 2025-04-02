import { Material } from "@/entities/material";
import { useState, useEffect } from "react";

type InputProps = {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error: string;
  placeholder: string;
  halfWidth?: boolean;
}

type DoubleInputProps = {
  volumeValue: string;
  material: Material;
  onChange: (value: string) => void;
  error: string;
}

export function TextInput({ value, onChange, error, placeholder }: InputProps) {
  return (
    <>
      <input
        className={`w-full h-10 p-2 border rounded-md ${error ? 'border-r-red-400' : 'border-gray-300'}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
    </>
  )
}

export function NumberInput({ value, onChange, onBlur, error, placeholder, halfWidth }: InputProps) {
  return (
    <>
      <input
        className={`p-2 h-10 border rounded-md ${halfWidth ? 'w-1/2' : 'w-full'} ${error ? 'border-r-red-400' : 'border-gray-300'}`}
        value={value}
        onChange={(e) => {
          const rawValue = e.target.value.replace(/[^0-9.,]/g, '');
          const normalizeValue = rawValue.replace(/,/g, ".");

          if (/^[0-9]*[.,]?[0-9]*$/.test(rawValue)) onChange(normalizeValue);
        }}
        onBlur={onBlur}
        placeholder={placeholder}
      />
      {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
    </>
  )
}

export function VolumeAndCapacityInput({ volumeValue, material, onChange, error }: DoubleInputProps) {

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
        value={localVolume}
        onChange={handleVolumeChange}
        onBlur={handleBlur}
        placeholder={"Объем, " + units[0]}
        error={error}
        halfWidth={true}
      />
      <NumberInput
        value={localWeight}
        onChange={handleWeightChange}
        onBlur={handleBlur}
        placeholder={"Вес, " + units[1]}
        error={error}
        halfWidth={true}
      />
    </div>
  );
}
