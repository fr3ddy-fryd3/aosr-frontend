import { useParams } from "react-router-dom";
import { useAosrMaterialsData } from "@/features/aosrMaterials/hooks/useAosrMaterialsData";
import { useAosrMaterialsActions } from "@/features/aosrMaterials/hooks/useAosrMaterialsActions";
import { AosrMaterialFormRow } from "@/features/aosrMaterials/components/AosrMaterialFormRow";
import { DeleteAosrMaterialModal } from "@/features/aosrMaterials/components/DeleteAosrMaterialModal";
import { BindPassportModal } from "@/features/aosrMaterials/components/BindPassportUsageModal";
import { EditPassportModal } from "@/features/aosrMaterials/components/EditPassportUsageModal";
import { Option } from "@/entities/option";
import { PassportUsage } from "@/entities/passport";
import { CreatePassportUsageDTO, UpdatePassportUsageDTO } from "@/shared/model/dto/passport";
import { passportUsageApi } from "@/shared/api/passportUsage";
import { useState } from "react";

export function AosrMaterialsPage() {
  const { aosrId } = useParams();
  const { aosr, materials, passports, aosrMaterials, setAosrMaterials } = useAosrMaterialsData(aosrId || "");
  const {
    editingAosrId,
    setEditingAosrId,
    handleAosrMaterialSave,
    handleCancelEdit,
    deleteMode,
    confirmDelete,
    aosrMaterialToDelete,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
  } = useAosrMaterialsActions(aosrMaterials, setAosrMaterials);

  const [isBindPassportModalOpen, setIsBindPassportModalOpen] = useState(false);
  const [isEditPassportModalOpen, setIsEditPassportModalOpen] = useState(false);
  const [createPassportUsageData, setCreatePassportUsageData] = useState<CreatePassportUsageDTO>({} as CreatePassportUsageDTO);
  const [updatePassportUsageData, setUpdatePassportUsageData] = useState<UpdatePassportUsageDTO>({} as UpdatePassportUsageDTO);
  const [selectedAosrMaterialId, setSelectedAosrMaterialId] = useState(0);

  const materialOptions: Option[] = materials.map((material) => ({
    value: material.id,
    label: `${material.name}, ${material.units}`,
  }));

  const onPassportUsageCreate = async () => {
    const created = await passportUsageApi.create(createPassportUsageData);
    if (created) {
      setAosrMaterials([
        ...aosrMaterials.map((material) =>
          material.id === created.aosrMaterialId
            ? { ...material, passportUsages: [...material.passportUsages, created] }
            : material
        )
      ]);
      setIsBindPassportModalOpen(false);
      setCreatePassportUsageData({} as CreatePassportUsageDTO);
    }
  };

  const onPassportUsageUpdate = async () => {
    const updated = await passportUsageApi.update(updatePassportUsageData.id, updatePassportUsageData);
    if (updated) {
      setAosrMaterials([
        ...aosrMaterials.map((material) =>
          material.id === updated.aosrMaterialId
            ? {
              ...material,
              passportUsages: material.passportUsages.map((usage) =>
                usage.id === updated.id ? updated : usage
              ),
            }
            : material
        )
      ]
      );
      setIsEditPassportModalOpen(false);
      setUpdatePassportUsageData({} as UpdatePassportUsageDTO);
    }
  };

  const onPassportUsageDelete = async () => {
    const deleted = await passportUsageApi.delete(updatePassportUsageData.id);
    if (deleted === 204) {
      setAosrMaterials([
        ...aosrMaterials.map((material) =>
          material.id === updatePassportUsageData.aosrMaterialId
            ? {
              ...material,
              passportUsages: material.passportUsages.filter((usage) =>
                usage.id != updatePassportUsageData.id
              ),
            }
            : material
        )
      ]);
      console.log(updatePassportUsageData.id);
      console.log(aosrMaterials);
      setIsEditPassportModalOpen(false);
      setUpdatePassportUsageData({} as UpdatePassportUsageDTO);
    }
  };
  const handlePassportUsageBind = (aosrMaterialId: number) => {
    setSelectedAosrMaterialId(aosrMaterialId);
    setCreatePassportUsageData({ ...createPassportUsageData, aosrMaterialId }); // Устанавливаем aosrMaterialId
    setIsBindPassportModalOpen(true);
  };

  const handlePassportUsageEdit = (aosrMaterialId: number, passportUsage: PassportUsage) => {
    setUpdatePassportUsageData({
      id: passportUsage.id,
      aosrMaterialId: aosrMaterialId,
      passportId: passportUsage.passportId,
      usedVolume: passportUsage.usedVolume, // Приводим к строке, если API требует
    });
    setIsEditPassportModalOpen(true);
  };

  return (
    <div className="p-4">
      <h1 className="text-gray-800 text-center font-sans text-2xl mb-8">Объемы акта №{aosr.name}</h1>
      {aosrMaterials?.map((am) => (
        <AosrMaterialFormRow
          key={am.id}
          materials={materials}
          materialOptions={materialOptions}
          data={am}
          isEdit={am.id === editingAosrId}
          onEdit={() => setEditingAosrId(am.id)}
          onSave={handleAosrMaterialSave}
          onCancel={handleCancelEdit}
          onDelete={() => deleteMode(am)}
          onPassportUsageBind={handlePassportUsageBind}
          onPassportUsageEdit={handlePassportUsageEdit}
        />
      ))}
      <DeleteAosrMaterialModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        aosrMaterial={aosrMaterialToDelete}
        onConfirm={confirmDelete}
      />
      <BindPassportModal
        isOpen={isBindPassportModalOpen}
        onClose={() => {
          setIsBindPassportModalOpen(false);
          setSelectedAosrMaterialId(0);
        }}
        passports={passports}
        materials={materials}
        createPassportUsageData={createPassportUsageData}
        setCreatePassportUsageData={setCreatePassportUsageData}
        onSave={onPassportUsageCreate}
        aosrId={Number(aosrId)}
        aosrMaterialId={selectedAosrMaterialId}
      />
      <EditPassportModal
        isOpen={isEditPassportModalOpen}
        onClose={() => setIsEditPassportModalOpen(false)}
        passports={passports}
        materials={materials}
        updatePassportUsageData={updatePassportUsageData}
        setUpdatePassportUsageData={setUpdatePassportUsageData}
        onSave={onPassportUsageUpdate}
        onDelete={onPassportUsageDelete}
      />
    </div>
  );
}
