import { Material } from "@/entities/material"
import { Table } from "@/shared/ui/Table";
import { TableHeaderCell } from "@/shared/ui/TableHeaderCell";
import { MaterialRow } from "@/features/material/components/MaterialRow";

type MaterialTableProps = {
  materials: Material[];
  editMode: (material: Material) => void;
  deleteMode: (material: Material) => void;
};

export function MaterialTable({ materials, editMode: editMode, deleteMode: deleteMode }: MaterialTableProps) {
  return (
    <Table>
      <thead>
        <tr>
          <TableHeaderCell>Название</TableHeaderCell>
          <TableHeaderCell>Ед. измерения</TableHeaderCell>
          <TableHeaderCell> </TableHeaderCell>
        </tr>
      </thead>
      <tbody>
        {materials.map((material) => (
          <MaterialRow key={material.id} editMode={editMode} deleteMode={deleteMode} material={material} />
        ))}
      </tbody>
    </Table>
  );
}
