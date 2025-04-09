import { Routes, Route } from "react-router-dom"
import { MaterialsPage } from "@/pages/MaterialsPage"
import { PassportsPage } from "@/pages/PassportsPage"
import { ProjectsPage } from "@/pages/ProjectsPage"
import { ProjectSectionsPage } from "@/pages/ProjectSectionsPage"
import { SectionAosrsPage } from "@/pages/SectionAosrsPage"
import { SectionMaterialsPage } from "@/pages/SectionMaterialsPage"
import { AosrMaterialsPage } from "@/pages/AosrMaterialsPage"
import { BackButton } from "@/shared/ui/BackButton"


export default function ContentContainer() {
  return (
    <main className="w-5/6 bg-white rounded-lg shadow-lg p-5 mx-4">
      <BackButton />
      <Routes>
        <Route path="/materials" element={<MaterialsPage />} />
        <Route path="/passports" element={<PassportsPage />} />
        <Route path="/" element={<ProjectsPage />} />
        <Route path="/project/:projectId" element={<ProjectSectionsPage />} />
        <Route path="/section/:sectionId" element={<SectionAosrsPage />} />
        <Route path="/section/:sectionId/materials" element={<SectionMaterialsPage />} />
        <Route path="/aosr/:aosrId" element={<AosrMaterialsPage />} />
      </Routes>
    </main>
  )
}
