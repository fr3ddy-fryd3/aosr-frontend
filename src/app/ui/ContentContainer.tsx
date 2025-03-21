import { Routes, Route } from "react-router-dom"
import MaterialsPage from "../../pages/MaterialsPage"

export default function ContentContainer() {
  return (
    <main className="w-3/4 bg-white rounded-lg shadow-lg p-6 mx-4">
      <Routes>
        <Route path="/materials" element={<MaterialsPage />} />
      </Routes>
    </main>
  )
}
