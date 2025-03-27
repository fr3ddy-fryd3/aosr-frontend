import { useEffect, useState } from "react"
import { Passport } from "@/entities/passport"
import { Material } from "@/entities/material"
import { CreatePassportDTO, UpdatePassportDTO } from "@/shared/model/dto/passport"
import { passportApi } from "@/shared/api/passport"
import Modal from "@/shared/ui/Modal"
import Button from "@/shared/ui/Button"
import PassportTable from "@/features/passport/components/PassportTable"
import { materialApi } from "@/shared/api/material"
import { Option } from "@/entities/option"

export default function PassportPage() {
  const [passports, setPassports] = useState<Passport[]>([])
  const [materials, setMaterials] = useState<Material[]>([])

  // Состояния для выпадающего списка
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Состояния для паспортов
  const [newPassport, setNewPassport] = useState<CreatePassportDTO>({} as CreatePassportDTO);
  const [updatePassport, setUpdatePassport] = useState<UpdatePassportDTO>({} as UpdatePassportDTO);
  const [passportToEdit, setPassportToEdit] = useState<Passport>({} as Passport);
  const [passportToDelete, setPassportToDelete] = useState<Passport>({} as Passport)


  // Загрузка материалов и паспортов
  useEffect(() => {
    const fetchData = async () => {
      const passportData = await passportApi.get();
      const materialData = await materialApi.get();
      if (passportData !== undefined) setPassports(passportData);
      if (materialData !== undefined) setMaterials(materialData);
    }
    fetchData();
  }, [])

  // Данные для выпадающего списка
  const materialOptions: Option[] = materials.map((material) => ({
    value: material,
    label: material.name,
  }));

  const onEdit = async (passport: Passport) => { };
  const onDelete = async (passport: Passport) => { };

  return (

    <div className="p-4">

      {/*Заголовок страницы*/}
      <div className="flex justify-between mb-4">
        <div className="flex flex-col">
          <h1 className="text-gray-800 font-sans text-xl">Паспорта</h1>
          <p className="text-gray-500 font-sans text-lg">Таблица</p>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)} variant="primary">
          Создать
        </Button>
      </div>

      {/* Таблица паспортов */}
      <PassportTable passports={passports} onEdit={onEdit} onDelete={onDelete} />

      {/* Модальное окно создания пасспорта */}
      <Modal

    </div>
  )
}
