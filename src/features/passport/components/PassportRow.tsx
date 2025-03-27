import { Passport } from "@/entities/passport"
import ActionButtons from "@/shared/ui/ActionButtons";
import TableCell from "@/shared/ui/TableCell";

type PassportRowProps = {
  passport: Passport;
  onEdit: (passport: Passport) => void;
  onDelete: (passport: Passport) => void;
}

export default function PassportRow({ passport, onEdit, onDelete }: PassportRowProps) {
  return (
    <tr>
      <TableCell>{passport.number}</TableCell>
      <TableCell>{passport.material.name}</TableCell>
      <TableCell>{passport.volume}</TableCell>
      <TableCell>{passport.availableVolume}</TableCell>
      <th className="p-4 border-b border-slate-200 w-fit">
        <ActionButtons onEdit={() => onEdit(passport)} onDelete={() => onDelete(passport)} />
      </th>
    </tr>
  )
}
