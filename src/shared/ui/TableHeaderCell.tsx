export function TableHeaderCell({ children, isActionButtons }: { children: string, isActionButtons?: boolean }) {
  return (
    <th className={`p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100 ${isActionButtons ? "w-1/8" : ""}`}>
      < p className="flex items-center justify-between gap-2 font-sans text-base font-normal leading-none text-slate-500" > {children}</p >
    </th >
  )
}
