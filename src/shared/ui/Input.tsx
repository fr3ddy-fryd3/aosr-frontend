import { Material } from "@/entities/material";
import { useState, useEffect } from "react";
import { ModalError } from "./ModalError";

type InputProps = {
  isDisabled?: boolean;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  placeholder: string;
  halfWidth?: boolean;
  info?: string;
}

type VolumeAndCapacityInputProps = {
  isDisabled?: boolean;
  volumeValue: string;
  material: Material;
  density: string;
  onChange: (value: string) => void;
  availableVolumeInfo?: string;
  currentVolume?: string;
  error?: string;
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
      {error && <ModalError>{error}</ModalError>}
    </>
  )
}


export function NumberInput({ isDisabled, value, onChange, onBlur, error, placeholder, halfWidth, info }: InputProps) {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    if (value !== localValue) {
      setLocalValue(value);
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9.,]/g, '');
    const normalizedValue = rawValue.replace(/,/g, ".");

    if (rawValue === "" || /^[0-9]*[.,]?[0-9]*$/.test(rawValue)) {
      setLocalValue(normalizedValue);
      onChange(normalizedValue); // push в родителя
    }
  };

  return (
    <>
      <input
        disabled={isDisabled}
        className={`p-2 h-10 transition border rounded-md ${halfWidth ? 'w-1/2' : 'w-full'} ${error ? 'border-r-red-400' : 'border-gray-300'} ${isDisabled ? 'bg-gray-100 text-gray-400' : ''}`}
        value={localValue}
        onChange={handleChange}
        onBlur={onBlur}
        placeholder={info ? `Доступно: ${info}` : placeholder}
      />
      {error && <ModalError>{error}</ModalError>}
    </>
  );
}


export function VolumeAndCapacityInput({ isDisabled, volumeValue, material, density, onChange, availableVolumeInfo, currentVolume, error }: VolumeAndCapacityInputProps) {

  const capacityToWeight = (capacity: string) => {
    const result = parseFloat(capacity) * parseFloat(density);
    return isNaN(result) ? "" : result.toFixed(3);
  };

  const weightToCapacity = (weight: string) => {
    const result = parseFloat(weight) / parseFloat(density);
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
    <>
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
          halfWidth={true}
        />

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
          halfWidth={true}
        />
      </div>
      {error && (
        <ModalError>{error}</ModalError>
      )}
    </>
  );
}
