type InputProps = {
  value: string;
  onChange: (value: string) => void;
  error: string;
  placeholder: string;
}

export function TextInput({ value, onChange, error, placeholder }: InputProps) {
  return (
    <>
      <input
        className={`w-full p-2 border rounded-md ${error ? 'border-r-red-400' : 'border-gray-300'}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
    </>
  )
}

export function NumberInput({ value, onChange, error, placeholder }: InputProps) {
  return (
    <>
      <input
        className={`w-full p-2 border rounded-md ${error ? 'border-r-red-400' : 'border-gray-300'}`}
        value={value}
        onChange={(e) => {
          const rawValue = e.target.value.replace(/[^0-9.,]/g, '');
          const normalizeValue = rawValue.replace(/,/g, ".");

          if (/^[0-9]*[.,]?[0-9]*$/.test(rawValue)) onChange(normalizeValue);
        }}
        placeholder={placeholder}
      />
      {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
    </>
  )
}
