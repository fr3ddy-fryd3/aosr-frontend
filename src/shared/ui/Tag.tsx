type TagProps = {
  name: string;
  value: string;
  onClick: () => void;
}

export function Tag({ name, value, onClick }: TagProps) {
  return (
    <div className="bg-blue-300 hover:bg-blue-400 cursor-pointer text-blue-800 items-center rounded-full h-7 min-w-fit py-1 px-2 max-w-16 text-sm" onClick={onClick}>
      {name} - {value}
    </div>
  )
}
