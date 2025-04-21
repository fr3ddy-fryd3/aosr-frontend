import { Material } from "@/entities/material";
import { useState, useEffect, SetStateAction, Dispatch } from "react";
import { ModalError } from "./ModalError";

type BaseInputProps = {
  isDisabled?: boolean;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  placeholder: string;
  halfWidth?: boolean;
  isError?: boolean;
};

type VolumeInputProps = {
  isDisabled?: boolean;
  volumeValue: string;
  material: Material;
  error: string;
  setError: Dispatch<SetStateAction<string>>;
  onChange: (value: string) => void;
  onBlur?: () => void;
  availableVolume?: string;
}

type VolumeAndCapacityInputProps = {
  isDisabled?: boolean;
  volumeValue: string;
  material: Material;
  density: string;
  onChange: (value: string) => void;
  availableVolume?: string;
  currentVolume?: string;
  error: string;
  setError: Dispatch<SetStateAction<string>>;
};

const getInputClasses = (
  isDisabled?: boolean,
  halfWidth?: boolean,
  isError?: boolean,
) => {
  return [
    "p-2",
    "h-10",
    "transition",
    "border",
    "rounded-md",
    halfWidth ? "w-1/2" : "w-full",
    isError ? "border-red-400" : "border-gray-300",
    isDisabled ? "bg-gray-100 text-gray-400" : ""
  ].join(" ");
};

export function TextInput({
  isDisabled,
  value,
  onChange,
  placeholder
}: BaseInputProps) {
  return (
    <>
      <input
        disabled={isDisabled}
        className={getInputClasses(isDisabled)}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </>
  );
}

export function NumberInput({
  isDisabled,
  value,
  onChange,
  onBlur,
  placeholder,
  halfWidth,
  isError,
}: BaseInputProps) {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9.,]/g, '');
    const normalizedValue = rawValue.replace(/,/g, ".");

    if (rawValue === "" || /^[0-9]*[.,]?[0-9]*$/.test(rawValue)) {
      onChange(normalizedValue);
    }
  };

  return (
    <>
      <input
        disabled={isDisabled}
        className={getInputClasses(isDisabled, halfWidth, isError)}
        value={value}
        onChange={handleChange}
        onBlur={onBlur}
        placeholder={placeholder}
      />
    </>
  );
}

export function VolumeInput({
  isDisabled,
  volumeValue,
  onChange,
  availableVolume,
  material,
  error,
  setError,
}: VolumeInputProps) {
  const [localVolume, setLocalVolume] = useState(volumeValue);

  useEffect(() => {
    const handleError = () => {
      if (Number(localVolume) > Number(availableVolume)) {
        setError("Недостаточно доступного объема");
      } else {
        setError('');
      }
    }
    handleError();
  }, [localVolume])

  const handleChange = (volume: string) => {
    setLocalVolume(volume);
    onChange(volume);
  };

  const getPlaceholder = () => {
    if (availableVolume) {
      return `Доступно: ${Number(availableVolume)} ${material.units}`
    } else {
      return `Объем${material?.units ? ", " + material?.units : ''}`
    }
  };

  return (
    <>
      <NumberInput
        isDisabled={isDisabled}
        onChange={handleChange}
        value={localVolume}
        placeholder={getPlaceholder()}
        isError={error ? true : false}
      />
      {error && <ModalError>{error}</ModalError>}
    </>
  )
}

// Инпут объема и массы
export function VolumeAndCapacityInput({
  isDisabled,
  volumeValue,
  material,
  density,
  onChange,
  availableVolume,
  currentVolume,
  error,
  setError,
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

  useEffect(() => {
    const handleError = () => {
      if (Number(localVolume) > Number(availableVolume)) {
        setError("Недостаточно доступного объема")
      } else {
        setError('')
      }
    }
    handleError();
  }, [localVolume])

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
          placeholder={getPlaceholder(availableVolume, currentVolume, "Объем", volumeUnit)}
          halfWidth
        />
        <NumberInput
          isDisabled={isDisabled}
          value={localWeight}
          onChange={handleWeightChange}
          onBlur={handleBlur}
          placeholder={getPlaceholder(availableVolume, currentVolume, "Вес", weightUnit, capacityToWeight)}
          halfWidth
        />
      </div>
      {error && <ModalError>{error}</ModalError>}
    </>
  );
}

