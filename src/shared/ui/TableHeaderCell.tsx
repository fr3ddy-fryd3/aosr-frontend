export default function TableHeaderCell({ children }: { children: string }) {
  return (
    <th className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
      <p className="flex items-center justify-between gap-2 font-sans text-base font-normal leading-none text-slate-500">{children}</p>
    </th>
  )
}
