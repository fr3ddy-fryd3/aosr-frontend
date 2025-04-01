import { Aosr } from "@/entities/aosr";
import { ActionButtons } from "@/shared/ui/ActionButtons";
import { TableCell } from "@/shared/ui/TableCell";
import { useNavigate } from "react-router-dom";

type AosrRowProps = {
  aosr: Aosr;
  editMode: (aosr: Aosr) => void;
  deleteMode: (aosr: Aosr) => void;
}

export function AosrRow({ aosr, editMode, deleteMode }: AosrRowProps) {
  const url = `/aosr/${aosr.id}`.toString();
  const navigate = useNavigate();

  return (
    <tr className="hover:shadow-lg hover:rounded-lg" onClick={() => navigate(url)}>

      <TableCell navigate={() => navigate(url)}>{aosr.name}</TableCell>

      <th className="p-4 border-b border-slate-200 w-fit">
        <ActionButtons editMode={() => editMode(aosr)} deleteMode={() => deleteMode(aosr)} />
      </th>
    </tr >
  )
}
