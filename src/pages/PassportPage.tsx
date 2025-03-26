import { useEffect, useState } from "react"
import { Passport } from "../entities/passport"
import { CreatePassportDTO, UpdatePassportDTO } from "../shared/dto/passport"
import { passportApi } from "../shared/api/passport"
import Modal from "../shared/ui/Modal"
import Input from "../shared/ui/Input"
import Button from "../shared/ui/Button"
import PassportTable from "../features/passport/components/PassportTable"

export default function PassportPage() {
  const [passports, setPassports] = useState<Passport[]>([])

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [newPassport, setNewPassport] = useState<CreatePassportDTO>({});
  const [updatePassport, setUpdatePassport] = useState<UpdatePassportDTO>({});
  const [passportToEdit, setPassportToEdit] = useState<Passport>({});
  const [passportToDelete, setPassportToDelete] = useState<Passport>({})

  const onEdit = async (passport: Passport) => { };
  const onDelete = async (passport: Passport) => { };

  useEffect(() => {
    const fetchMaterials = async () => {
      const data = await passportApi.get();
      if (data !== undefined) setPassports(data);
    }
    fetchMaterials();
  }, [])

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

      <PassportTable passports={passports} onEdit={onEdit} onDelete={onDelete} />

    </div>
  )
}
