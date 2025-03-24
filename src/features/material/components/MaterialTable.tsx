import { Material } from "../../../entities/material"

type MaterialTableProps = {
  materials: Material[];
};

export function MaterialTable({ materials }: MaterialTableProps) {
  return (
    <table className="w-full mt-4 text-left table-auto">
      <thead>
        <tr>
          <th className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
            <p className="flex items-center justify-between gap-2 font-sans text-base font-normal leading-none text-slate-500">Название</p>
          </th>
          <th className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
            <p className="flex items-center justify-between gap-2 font-sans text-base font-normal leading-none text-slate-500">Ед. измерения</p>
          </th>
          <th className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
            <p className="flex items-center justify-between gap-2 font-sans text-base font-normal leading-none text-slate-500">Удельный вес</p>
          </th>
          <th className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {materials.map((material) => (
          <tr>
            <th className="p-4 border-b border-slate-200">
              <p className="text-base text-slate-500">{material.name}</p>
            </th>
            <th className="p-4 border-b border-slate-200">
              <p className="text-base text-slate-500">{material.units}</p>
            </th>
            <th className="p-4 border-b border-slate-200">
              <p className="text-base text-slate-500">{material.id}</p>
            </th>
            <th className="p-4 border-b border-slate-200 w-fit">
              <div className="flex justify-end gap-2">
                <button className="flex items-center">
                  <img src="../../../../public/edit.svg" alt="Edit" className="w-6 h-6 p-1 bg-green-400 hover:bg-green-500 rounded-full transition-all" />
                </button>
                <button className="flex items-center">
                  <img src="../../../../public/delete.svg" alt="Delete" className="w-6 h-6 p-1 bg-red-400 hover:bg-red-500 rounded-full transition-all" />
                </button>
              </div>
            </th>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
