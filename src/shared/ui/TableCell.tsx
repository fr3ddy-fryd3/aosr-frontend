import { ReactNode } from "react";

export default function TableCell({ children }: { children: string | ReactNode }) {
  return (
    <td className="p-4 border-b border-slate-200">
      <p className="text-base text-slate-500">{children}</p>
    </td>
  )
}
