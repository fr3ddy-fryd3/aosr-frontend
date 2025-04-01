import { Routes, Route } from "react-router-dom"
import { MaterialsPage } from "@/pages/MaterialsPage"
import { PassportsPage } from "@/pages/PassportsPage"
import { ProjectsPage } from "@/pages/ProjectsPage"
import { ProjectSectionsPage } from "@/pages/ProjectSectionsPage"

export default function ContentContainer() {
  return (
    <main className="w-5/6 bg-white rounded-lg shadow-lg p-5 mx-4">
      <Routes>
        <Route path="/project/:projectId" element={<ProjectSectionsPage />} />
        <Route path="/materials" element={<MaterialsPage />} />
        <Route path="/passports" element={<PassportsPage />} />
        <Route path="/" element={<ProjectsPage />} />
      </Routes>
    </main>
  )
}
