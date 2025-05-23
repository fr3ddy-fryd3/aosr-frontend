type ActionButtonsProps = {
  isAosrMaterial?: boolean;
  isEdit?: boolean;
  onSave?: () => void;
  onCancel?: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function ActionButtons({ isAosrMaterial, isEdit, onSave, onCancel, onEdit, onDelete }: ActionButtonsProps) {
  return isEdit ? (
    <div className="flex items-center justify-end gap-2">
      <button className="flex items-center cursor-pointer" onClick={onSave}>
        <img src="/ok.svg" alt="Edit" className="w-6 h-6 p-1 bg-green-400 hover:bg-green-500 rounded-full transition" />
      </button>
      <button className="flex items-center cursor-pointer" onClick={onCancel}>
        <img src="/x.svg" alt="Cancel" className="w-6 h-6 p-1.5 bg-red-400 hover:bg-red-500 rounded-full transition" />
      </button>
    </div>

  ) : (
    <div className="flex items-center justify-end gap-2">
      <button className="flex items-center cursor-pointer" onClick={onEdit}>
        <img src="/edit.svg" alt="Edit" className="w-6 h-6 p-1 bg-green-400 hover:bg-green-500 rounded-full transition" />
      </button>
      <button className="flex items-center cursor-pointer" onClick={onDelete} hidden={isAosrMaterial}>
        <img src="/delete.svg" alt="Delete" className="w-6 h-6 p-1 bg-red-400 hover:bg-red-500 rounded-full transition" />
      </button>
    </div>
  );
}
