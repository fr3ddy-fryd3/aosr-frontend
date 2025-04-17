import { Passport } from "@/entities/passport"
import { Table } from "@/shared/ui/Table";
import { TableHeaderCell } from "@/shared/ui/TableHeaderCell";
import { PassportRow } from "@/features/passport/components/PassportRow";

type PassportTableProps = {
  passports: Passport[];
  aosrsListMode: (passport: Passport) => void;
  editMode: (passport: Passport) => void;
  deleteMode: (passport: Passport) => void;
}

export function PassportTable({ passports, aosrsListMode, editMode, deleteMode }: PassportTableProps) {
  return (
    <Table>
      <thead>
        <tr>
          <TableHeaderCell>№ паспорта</TableHeaderCell>
          <TableHeaderCell>Материал</TableHeaderCell>
          <TableHeaderCell>Удельный вес</TableHeaderCell>
          <TableHeaderCell>Общий объем</TableHeaderCell>
          <TableHeaderCell>Доступный объем</TableHeaderCell>
          <TableHeaderCell> </TableHeaderCell>
        </tr>
      </thead>
      <tbody>
        {passports.map((passport) => (
          <PassportRow key={passport.id} aosrsListMode={aosrsListMode} passport={passport} editMode={editMode} deleteMode={deleteMode} />
        ))}
      </tbody>
    </Table>
  )
}
