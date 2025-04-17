import { ReactNode } from "react";

export function TableCell({ children, navigate, onClick }: { children: string | ReactNode, navigate?: () => void, onClick?: (value: any) => void }) {
  return (
    <td className="p-4 border-b border-slate-200 cursor-pointer" onClick={onClick || navigate}>
      <p className="text-base text-slate-500">{children}</p>
    </td>
  )
}
