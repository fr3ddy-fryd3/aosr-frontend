import { ReactNode } from "react";

export function Table({ children }: { children: ReactNode }) {
  return (
    <table className="w-full mt-4 text-left table-auto">{children}</table>
  );
}
