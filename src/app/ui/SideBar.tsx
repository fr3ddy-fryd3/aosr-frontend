import { NavLink } from "react-router-dom"

export default function Sidebar() {
  return (
    <aside className="flex flex-col h-fit bg-white rounded-lg shadow-lg p-2">
      <NavLink
        to="/materials"
        className="text-gray-800 font-sans p-2 hover:bg-gray-100 transition">
        <span className="text-lg">Материалы</span>
      </NavLink>
      <NavLink
        to="/passports"
        className="text-gray-800 font-sans p-2 hover:bg-gray-100 transition">
        <span className="text-lg">Паспорта</span>
      </NavLink>
      <NavLink
        to="/"
        className="text-gray-800 font-sans p-2 hover:bg-gray-100 transition">
        <span className="text-lg">Проекты</span>
      </NavLink>
    </aside>
  )
}
