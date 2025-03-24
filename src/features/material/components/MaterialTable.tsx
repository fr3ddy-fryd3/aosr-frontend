import { Material } from "../../../entities/material"
import Table from "../../../shared/ui/Table";
import TableHeaderCell from "../../../shared/ui/TableHeaderCell";
import MaterialRow from "./MaterialRow";

type MaterialTableProps = {
  materials: Material[];
};

const onCreate = () => { };
const onEdit = () => { };
const onDelete = () => { };

export function MaterialTable({ materials }: MaterialTableProps) {
  return (
    <Table>
      <thead>
        <tr>
          <TableHeaderCell>Название</TableHeaderCell>
          <TableHeaderCell>Ед. измерения</TableHeaderCell>
          <TableHeaderCell>Удельный вес</TableHeaderCell>
          <TableHeaderCell> </TableHeaderCell>
        </tr>
      </thead>
      <tbody>
        {materials.map((material) => (
          <MaterialRow key={material.id} onEdit={onEdit} onDelete={onDelete} material={material} />
        ))}
      </tbody>
    </Table>
  );
}
