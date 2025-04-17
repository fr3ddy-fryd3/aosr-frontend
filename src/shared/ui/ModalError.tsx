import { ReactNode } from "react";

export function ModalError({ children }: { children: ReactNode }) {
  return (
    <div className="bg-red-100 border border-red-400 p-2 rounded">
      <p className="text-red-400 text-sm m-0">{children}</p>
    </div>
  )
}
