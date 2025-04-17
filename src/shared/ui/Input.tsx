import { Material } from "@/entities/material";
import { useState, useEffect } from "react";
import { ModalError } from "./ModalError";

type BaseInputProps = {
  isDisabled?: boolean;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  placeholder: string;
  halfWidth?: boolean;
  info?: string;
};

type VolumeAndCapacityInputProps = {
  isDisabled?: boolean;
  volumeValue: string;
  material: Material;
  density: string;
  onChange: (value: string) => void;
  availableVolumeInfo?: string;
  currentVolume?: string;
  error?: string;
};

const getInputClasses = (
  isDisabled?: boolean,
  error?: string,
  halfWidth?: boolean
) => {
  return [
    "p-2",
    "h-10",
    "transition",
    "border",
    "rounded-md",
    halfWidth ? "w-1/2" : "w-full",
    error ? "border-red-400" : "border-gray-300",
    isDisabled ? "bg-gray-100 text-gray-400" : ""
  ].join(" ");
};

export function TextInput({
  isDisabled,
  value,
  onChange,
  error,
  placeholder
}: BaseInputProps) {
  return (
    <>
      <input
        disabled={isDisabled}
        className={getInputClasses(isDisabled, error)}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      {error && <ModalError>{error}</ModalError>}
    </>
  );
}

export function NumberInput({
  isDisabled,
  value,
  onChange,
  onBlur,
  error,
  placeholder,
  halfWidth,
  info
}: BaseInputProps) {
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
      onChange(normalizedValue);
    }
  };

  return (
    <>
      <input
        disabled={isDisabled}
        className={getInputClasses(isDisabled, error, halfWidth)}
        value={localValue}
        onChange={handleChange}
        onBlur={onBlur}
        placeholder={info ? `Доступно: ${info}` : placeholder}
      />
      {error && <ModalError>{error}</ModalError>}
    </>
  );
}

// Инпут объема и массы
export function VolumeAndCapacityInput({
  isDisabled,
  volumeValue,
  material,
  density,
  onChange,
  availableVolumeInfo,
  currentVolume,
  error
}: VolumeAndCapacityInputProps) {
  const parseSafe = (val: string) => parseFloat(val) || 0;

  const capacityToWeight = (capacity: string) => {
    const result = parseSafe(capacity) * parseSafe(density);
    return result ? result.toFixed(3) : "";
  };

  const weightToCapacity = (weight: string) => {
    const result = parseSafe(weight) / parseSafe(density);
    return result ? result.toFixed(3) : "";
  };

  const [localVolume, setLocalVolume] = useState(volumeValue);
  const [localWeight, setLocalWeight] = useState(capacityToWeight(volumeValue));
  const [isEditingVolume, setIsEditingVolume] = useState(false);
  const [isEditingWeight, setIsEditingWeight] = useState(false);

  useEffect(() => {
    if (!isEditingVolume && !isEditingWeight) {
      setLocalVolume(volumeValue);
      setLocalWeight(capacityToWeight(volumeValue));
    }
  }, [volumeValue]);

  const handleVolumeChange = (newVolume: string) => {
    setLocalVolume(newVolume);
    setIsEditingVolume(true);
    if (!isEditingWeight) {
      const newWeight = capacityToWeight(newVolume);
      setLocalWeight(newWeight);
    }
    onChange(newVolume);
  };

  const handleWeightChange = (newWeight: string) => {
    setLocalWeight(newWeight);
    setIsEditingWeight(true);
    if (!isEditingVolume) {
      const newVolume = weightToCapacity(newWeight);
      setLocalVolume(newVolume);
      onChange(newVolume);
    }
  };

  const handleBlur = () => {
    setIsEditingVolume(false);
    setIsEditingWeight(false);
  };

  if (!material.units) return null;

  const [volumeUnit, weightUnit] = material.units.split("/");

  const getPlaceholder = (
    available: string | undefined,
    current: string | undefined,
    defaultLabel: string,
    unit: string,
    transform?: (val: string) => string
  ) => {
    if (available) {
      const val = transform ? transform(available) : available;
      return `Доступно: ${val} ${unit}`;
    }
    if (current) {
      const val = transform ? transform(current) : current;
      return `${val} ${unit}`;
    }
    return `${defaultLabel}, ${unit}`;
  };

  return (
    <>
      <div className="flex space-x-4">
        <NumberInput
          isDisabled={isDisabled}
          value={localVolume}
          onChange={handleVolumeChange}
          onBlur={handleBlur}
          placeholder={getPlaceholder(availableVolumeInfo, currentVolume, "Объем", volumeUnit)}
          halfWidth
        />
        <NumberInput
          isDisabled={isDisabled}
          value={localWeight}
          onChange={handleWeightChange}
          onBlur={handleBlur}
          placeholder={getPlaceholder(availableVolumeInfo, currentVolume, "Вес", weightUnit, capacityToWeight)}
          halfWidth
        />
      </div>
      {error && <ModalError>{error}</ModalError>}
    </>
  );
}

