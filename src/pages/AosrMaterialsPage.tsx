import { AosrMaterial } from "@/entities/aosr";
import { Option } from "@/entities/option";
import { Passport, PassportUsage } from "@/entities/passport";
import { AosrMaterialFormRow } from "@/features/aosrMaterials/components/AosrMaterialFormRow";
import { BindPassportModal } from "@/features/aosrMaterials/components/BindPassportUsageModal";
import { DeleteAosrMaterialModal } from "@/features/aosrMaterials/components/DeleteAosrMaterialModal";
import { EditPassportModal } from "@/features/aosrMaterials/components/EditPassportUsageModal";
import { useAosrMaterialsActions } from "@/features/aosrMaterials/hooks/useAosrMaterialsActions";
import { useAosrMaterialsData } from "@/features/aosrMaterials/hooks/useAosrMaterialsData";
import { passportApi } from "@/shared/api/passport";
import { passportUsageApi } from "@/shared/api/passportUsage";
import { CreatePassportUsageDTO, UpdatePassportUsageDTO } from "@/shared/model/dto/passport";
import { Loading } from "@/shared/ui/Loading";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function AosrMaterialsPage() {
  const { aosrId } = useParams();
  const { aosr, materials, passports, setPassports, aosrMaterials, setAosrMaterials } = useAosrMaterialsData(aosrId || "");
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

  const [loading, setLoading] = useState(true);

  const [isBindPassportModalOpen, setIsBindPassportModalOpen] = useState(false);
  const [isEditPassportModalOpen, setIsEditPassportModalOpen] = useState(false);

  const [createPassportUsageData, setCreatePassportUsageData] = useState<CreatePassportUsageDTO>({} as CreatePassportUsageDTO);
  const [updatePassportUsageData, setUpdatePassportUsageData] = useState<UpdatePassportUsageDTO>({} as UpdatePassportUsageDTO);

  const [selectedAosrMaterial, setSelectedAosrMaterial] = useState<AosrMaterial>({} as AosrMaterial);
  const [selectedPassport, setSelectedPassport] = useState<Passport>({} as Passport);
  const [selectedPassportUsage, setSelectedPassportUsage] = useState<PassportUsage>({} as PassportUsage);

  const [passportsMap, setPassportsMap] = useState<Map<number, Passport>>(new Map);

  useEffect(() => {
    const prepareData = () => {
      try {
        setPassportsMap(new Map<number, Passport>(
          passports.map(passport => [passport.id, passport])
        ));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    prepareData();
  }, [passports])

  const aosrMaterialsMap = new Map<number, AosrMaterial>(
    aosrMaterials.map(material => [material.id, material])
  );

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
    const updatedPassportUsage = await passportUsageApi.update(updatePassportUsageData.id, updatePassportUsageData);
    const upToDatePassport = await passportApi.getById(selectedPassport.id)
    if (updatedPassportUsage) {
      setAosrMaterials([
        ...aosrMaterials.map((material) =>
          material.id === updatedPassportUsage.aosrMaterialId
            ? {
              ...material,
              passportUsages: material.passportUsages.map((usage) =>
                usage.id === updatedPassportUsage.id ? updatedPassportUsage : usage
              ),
            }
            : material
        )
      ]
      );

      setIsEditPassportModalOpen(false);
      setUpdatePassportUsageData({} as UpdatePassportUsageDTO);
    }
    console.log(upToDatePassport);
    if (upToDatePassport) {
      setPassports(passports.map((p) => p.id === upToDatePassport.id ? upToDatePassport : p));
      setSelectedPassport(upToDatePassport);
      console.log(passportsMap);
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
      setIsEditPassportModalOpen(false);
      setUpdatePassportUsageData({} as UpdatePassportUsageDTO);
    }
  };
  const handlePassportUsageBind = (aosrMaterial: AosrMaterial) => {
    setSelectedAosrMaterial(aosrMaterial);
    setCreatePassportUsageData({ ...createPassportUsageData, aosrMaterialId: aosrMaterial.id }); // Устанавливаем aosrMaterialId
    setIsBindPassportModalOpen(true);
  };

  const handlePassportUsageEdit = (aosrMaterial: AosrMaterial, passportUsage: PassportUsage) => {
    setUpdatePassportUsageData({
      id: passportUsage.id,
      aosrMaterialId: aosrMaterial.id,
      passportId: passportUsage.passportId,
      usedVolume: passportUsage.usedVolume,
    });
    setSelectedAosrMaterial(aosrMaterial);
    setIsEditPassportModalOpen(true);
    setSelectedPassportUsage(passportUsage);
  };

  if (loading) {
    return (
      <Loading />
    )
  }

  return (
    <div className="p-4">
      <h1 className="text-gray-800 text-center font-sans text-2xl mb-8">Объемы акта №{aosr.name}</h1>
      {aosrMaterials?.map((am) => (
        <AosrMaterialFormRow
          key={am.id}
          materials={materials}
          materialOptions={materialOptions}
          passportsMap={passportsMap}
          aosrMaterialsMap={aosrMaterialsMap}
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
          setSelectedAosrMaterial({} as AosrMaterial);
        }}
        passports={passports}
        materials={materials}
        createPassportUsageData={createPassportUsageData}
        setCreatePassportUsageData={setCreatePassportUsageData}
        onSave={onPassportUsageCreate}
        aosrId={Number(aosrId)}
        aosrMaterial={selectedAosrMaterial}
      />
      <EditPassportModal
        isOpen={isEditPassportModalOpen}
        onClose={() => setIsEditPassportModalOpen(false)}
        passports={passports}
        materials={materials}
        updatePassportUsageData={updatePassportUsageData}
        selectedPassport={selectedPassport}
        setSelectedPassport={setSelectedPassport}
        selectedPassportUsage={selectedPassportUsage}
        setUpdatePassportUsageData={setUpdatePassportUsageData}
        onSave={onPassportUsageUpdate}
        onDelete={onPassportUsageDelete}
      />
    </div>
  );
}
