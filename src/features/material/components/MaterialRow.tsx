import { Material } from "../../../entities/material";
import ActionButtons from "../../../shared/ui/ActionButtons";
import TableCell from "../../../shared/ui/TableCell";

type MaterialRowProps = {
  material: Material;
  onEdit: (material: Material) => void;
  onDelete: (material: Material) => void;
}

export default function MaterialRow({ material, onEdit, onDelete }: MaterialRowProps) {
  return (
    <tr>
      <TableCell>{material.name}</TableCell>
      <TableCell>{material.units}</TableCell>
      <TableCell>{material.density}</TableCell>
      <th className="p-4 border-b border-slate-200 w-fit">
        <ActionButtons onEdit={() => onEdit(material)} onDelete={() => onDelete(material)} />
      </th>
    </tr>
  )
}
