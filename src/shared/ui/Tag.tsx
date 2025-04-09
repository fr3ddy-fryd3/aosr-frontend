type TagProps = {
  name: string;
  value: string;
  onClick: () => void;
}

export function Tag({ name, value, onClick }: TagProps) {
  return (
    <div className="bg-blue-300 text-blue-800 items-center rounded-full h-7 min-w-fit p-1 max-w-16 text-sm" onClick={onClick}>
      {name} - {value}
    </div>
  )
}
