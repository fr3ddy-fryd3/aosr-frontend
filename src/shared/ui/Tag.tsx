type TagProps = {
  name: string;
  value: string;
  onClick: () => void;
}

export function Tag({ name, value, onClick }: TagProps) {
  return (
    <div className="bg-blue-300 text-blue-800 rounded-full h-6 min-w-fit max-w-16" onClick={onClick}>
      {name} - {value}
    </div>
  )
}
