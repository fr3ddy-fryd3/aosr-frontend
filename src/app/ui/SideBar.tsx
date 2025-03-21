import { NavLink } from "react-router-dom"

export default function Sidebar() {
  return (
    <aside className="h-fit bg-white rounded-lg shadow-lg p-4">
      <NavLink
        to="/materials"
        className="text-blue-500 hover:text-blue-600">
        <span className="text-xl">📦 Материалы</span>
      </NavLink>
    </aside>
  )
}
