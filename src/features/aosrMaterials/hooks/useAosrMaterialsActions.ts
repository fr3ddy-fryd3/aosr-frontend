import { useState } from "react";
import { AosrMaterial } from "@/entities/aosr";
import { aosrMaterialApi } from "@/shared/api/aosrMaterial";
import { CreateAosrMaterialDTO, UpdateAosrMaterialDTO } from "@/shared/model/dto/aosr";

export function useAosrMaterialsActions(
  aosrMaterials: AosrMaterial[],
  setAosrMaterials: (materials: AosrMaterial[]) => void
) {
  const [editingAosrId, setEditingAosrId] = useState<number | null>(null);
  const [aosrMaterialToDelete, setAosrMaterialToDelete] = useState<AosrMaterial>({} as AosrMaterial);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleAosrMaterialSave = async (aosrMaterial: AosrMaterial) => {
    setEditingAosrId(null);
    if (aosrMaterial.id <= 0) {
      const createData: CreateAosrMaterialDTO = {
        aosrId: aosrMaterial.aosrId,
        sectionMaterialId: aosrMaterial.sectionMaterialId,
        volume: aosrMaterial.volume,
      };
      const created = await aosrMaterialApi.create(createData);
      if (created) {
        setAosrMaterials([
          ...aosrMaterials.map((am) => (am.id === aosrMaterial.id ? created : am)),
        ]);
      }
    } else {
      const updateData: UpdateAosrMaterialDTO = {
        sectionMaterialId: aosrMaterial.sectionMaterialId,
        volume: aosrMaterial.volume,
      };
      const updated = await aosrMaterialApi.update(aosrMaterial.id, updateData);
      if (updated) {
        setAosrMaterials([
          ...aosrMaterials.map((am) => (am.id === aosrMaterial.id ? updated : am)),
        ]);
      }
    }
  };

  const handleCancelEdit = () => setEditingAosrId(null);

  const deleteMode = (aosrMaterial: AosrMaterial) => {
    setAosrMaterialToDelete(aosrMaterial);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async (id: number) => {
    const deleted = await aosrMaterialApi.delete(id);
    if (deleted === 204) {
      setAosrMaterials([...aosrMaterials.filter((sm) => sm.id !== id)]);
      setAosrMaterialToDelete({} as AosrMaterial);
      setIsDeleteModalOpen(false);
    } else {
      setAosrMaterialToDelete({} as AosrMaterial);
      setIsDeleteModalOpen(false);
    }
  };

  return {
    editingAosrId,
    setEditingAosrId,
    handleAosrMaterialSave,
    handleCancelEdit,
    deleteMode,
    confirmDelete,
    aosrMaterialToDelete,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
  };
}
