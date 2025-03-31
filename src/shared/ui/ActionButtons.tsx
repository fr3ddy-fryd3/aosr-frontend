type ActionButtonsProps = {
  editMode: () => void;
  deleteMode: () => void;
}

export function ActionButtons({ editMode: editMode, deleteMode: deleteMode }: ActionButtonsProps) {
  return (
    <div className="flex justify-end gap-2">
      <button className="flex items-center" onClick={editMode}>
        <img src="../../../../public/edit.svg" alt="Edit" className="w-6 h-6 p-1 bg-green-400 hover:bg-green-500 rounded-full transition" />
      </button>
      <button className="flex items-center" onClick={deleteMode}>
        <img src="../../../../public/delete.svg" alt="Delete" className="w-6 h-6 p-1 bg-red-400 hover:bg-red-500 rounded-full transition" />
      </button>
    </div>
  )
}
