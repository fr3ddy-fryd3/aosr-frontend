import { Material } from "@/entities/material";
import { ActionButtons } from "@/shared/ui/ActionButtons";
import { TableCell } from "@/shared/ui/TableCell";

type MaterialRowProps = {
  material: Material;
  editMode: (material: Material) => void;
  deleteMode: (material: Material) => void;
}

export function MaterialRow({ material, editMode: editMode, deleteMode: deleteMode }: MaterialRowProps) {
  return (
    <tr>
      <TableCell>{material.name}</TableCell>
      <TableCell>{material.units}</TableCell>
      <TableCell>{material.density}</TableCell>
      <th className="p-4 border-b border-slate-200 w-fit">
        <ActionButtons editMode={() => editMode(material)} deleteMode={() => deleteMode(material)} />
      </th>
    </tr>
  )
}
