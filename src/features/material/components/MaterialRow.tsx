import { Material } from "../../../entities/material";
import ActionButtons from "../../../shared/ui/ActionButtons";
import TableCell from "../../../shared/ui/TableCell";

type MaterialRowProps = {
  material: Material;
  onEdit: () => void;
  onDelete: () => void;
}

export default function MaterialRow({ material, onEdit, onDelete }: MaterialRowProps) {
  return (
    <tr>
      <TableCell>{material.name}</TableCell>
      <TableCell>{material.units}</TableCell>
      <TableCell>{material.id}</TableCell>
      <th className="p-4 border-b border-slate-200 w-fit">
        <ActionButtons onEdit={onEdit} onDelete={onDelete} />
      </th>
    </tr>
  )
}
