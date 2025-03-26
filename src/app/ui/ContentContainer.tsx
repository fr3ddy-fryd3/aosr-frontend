import { Routes, Route } from "react-router-dom"
import MaterialsPage from "../../pages/MaterialsPage"
import PassportPage from "../../pages/PassportPage"

export default function ContentContainer() {
  return (
    <main className="w-3/4 bg-white rounded-lg shadow-lg p-5 mx-4">
      <Routes>
        <Route path="/materials" element={<MaterialsPage />} />
        <Route path="/passports" element={<PassportPage />} />
      </Routes>
    </main>
  )
}
