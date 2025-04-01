import { ReactNode } from "react";

export function TableCell({ children, navigate }: { children: string | ReactNode, navigate?: () => void; }) {
  return (
    <td className="p-4 border-b border-slate-200" onClick={navigate}>
      <p className="text-base text-slate-500">{children}</p>
    </td>
  )
}
