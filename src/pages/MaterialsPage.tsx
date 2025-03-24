import { useEffect, useState } from "react"
import { Material } from "../entities/material"
import { materialApi } from "../shared/api/material"
import { MaterialTable } from "../features/material/components/MaterialTable"

export default function MaterialsPage() {
  const [materials, setMaterials] = useState<Material[]>([])

  useEffect(() => {
    const fetchMaterials = async () => {
      const data = await materialApi.get();
      if (data != undefined) {
        setMaterials(data)
      }
    }
    fetchMaterials();
  }, [])

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <div className="flex flex-col">
          <h1 className="text-gray-800 font-sans text-xl">Материалы</h1>
          <p className="text-gray-500 font-sans text-lg">Таблица</p>
        </div>
        <button className="rounded-lg border border-gray-700 h-fit w-fit px-8 py-2 hover:text-white hover:bg-gray-700 transition-all">Создать</button>
      </div>
      <MaterialTable materials={materials} />
    </div>
  )
}
