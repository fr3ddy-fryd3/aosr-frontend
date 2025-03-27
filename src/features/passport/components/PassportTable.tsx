import { Passport } from "@/entities/passport"
import Table from "@/shared/ui/Table";
import TableHeaderCell from "@/shared/ui/TableHeaderCell";
import PassportRow from "@/features/passport/components/PassportRow";

type PassportTableProps = {
  passports: Passport[];
  onEdit: (passport: Passport) => void;
  onDelete: (passport: Passport) => void;
}

export default function PassportTable({ passports, onEdit, onDelete }: PassportTableProps) {
  return (
    <Table>
      <thead>
        <tr>
          <TableHeaderCell>№ паспорта</TableHeaderCell>
          <TableHeaderCell>Материал</TableHeaderCell>
          <TableHeaderCell>Общий объем</TableHeaderCell>
          <TableHeaderCell>Доступный объем</TableHeaderCell>
          <TableHeaderCell> </TableHeaderCell>
        </tr>
      </thead>
      <tbody>
        {passports.map((passport) => (
          <PassportRow key={passport.id} passport={passport} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </tbody>
    </Table>
  )
}
