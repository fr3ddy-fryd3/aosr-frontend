import { Aosr } from "@/entities/aosr";
import { Table } from "@/shared/ui/Table";
import { TableHeaderCell } from "@/shared/ui/TableHeaderCell";
import { AosrRow } from "./aosrRow.tsx"


type AosrTableProps = {
  aosrs: Aosr[];
  editMode: (aosr: Aosr) => void;
  deleteMode: (aosr: Aosr) => void;
}

export function AosrTable({ aosrs, editMode: editMode, deleteMode: deleteMode }: AosrTableProps) {
  return (
    <Table>
      <thead>
        <tr>
          <TableHeaderCell>№</TableHeaderCell>
          <TableHeaderCell isActionButtons={true}> </TableHeaderCell>
        </tr>
      </thead>
      <tbody>
        {aosrs.map((aosr) => (
          <AosrRow key={aosr.id} aosr={aosr} editMode={editMode} deleteMode={deleteMode} />
        ))}
      </tbody>
    </Table>
  )
}
