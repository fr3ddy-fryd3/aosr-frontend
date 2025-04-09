import { AosrMaterial } from "@/entities/aosr";
import { SmallModal } from "@/shared/ui/Modal";
import { Button } from "@/shared/ui/Button";

interface DeleteAosrMaterialModalProps {
  isOpen: boolean;
  onClose: () => void;
  aosrMaterial: AosrMaterial;
  onConfirm: (id: number) => void;
}

export function DeleteAosrMaterialModal({ isOpen, onClose, aosrMaterial, onConfirm }: DeleteAosrMaterialModalProps) {
  return (
    <SmallModal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl text-gray-700">
        Вы уверены, что хотите удалить следующий материал акта: {aosrMaterial?.sectionMaterial?.material.name}?
      </h2>
      <p className="text-gray-400 mb-8">Действие будет невозможно отменить</p>
      <div className="flex gap-4">
        <Button onClick={() => onConfirm(aosrMaterial.id)} variant="danger">Удалить</Button>
        <Button onClick={onClose} variant="modal">Отмена</Button>
      </div>
    </SmallModal>
  );
}
