import { Passport } from "@/entities/passport"
import { ActionButtons } from "@/shared/ui/ActionButtons";
import { TableCell } from "@/shared/ui/TableCell";

type PassportRowProps = {
  passport: Passport;
  editMode: (passport: Passport) => void;
  deleteMode: (passport: Passport) => void;
}

export function PassportRow({ passport, editMode: editMode, deleteMode: deleteMode }: PassportRowProps) {
  const units = passport.material.units.split('/');

  const getWeight = (vol: string) => {
    let volume = Number(vol);
    let density = Number(passport.material.density);
    return (volume * density).toFixed(3);
  }

  const volumeCell = (vol: string) => {
    return `${vol} ${units[0]} / ${getWeight(vol)} ${units[1]}`
  }
  return (
    <tr>
      <TableCell>{passport.number}</TableCell>
      <TableCell>{passport.material.name + ", " + passport.material.units}</TableCell>
      <TableCell>{volumeCell(passport.volume)}</TableCell>
      <TableCell>{volumeCell(passport.availableVolume)}</TableCell>
      <th className="p-4 border-b border-slate-200 w-fit">
        <ActionButtons editMode={() => editMode(passport)} deleteMode={() => deleteMode(passport)} />
      </th>
    </tr>
  )
}
