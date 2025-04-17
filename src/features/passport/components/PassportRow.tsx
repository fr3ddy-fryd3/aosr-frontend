import { Passport } from "@/entities/passport"
import { ActionButtons } from "@/shared/ui/ActionButtons";
import { TableCell } from "@/shared/ui/TableCell";

type PassportRowProps = {
  passport: Passport;
  aosrsListMode: (passport: Passport) => void;
  editMode: (passport: Passport) => void;
  deleteMode: (passport: Passport) => void;
}

export function PassportRow({ passport, aosrsListMode, editMode, deleteMode }: PassportRowProps) {
  let units: string[] | undefined;
  if (passport.material?.units.search('/') !== -1) {
    units = passport.material.units.split('/');
  }

  const getWeight = (vol: string) => {
    let volume = Number(vol);
    let density = Number(passport.density);
    return (volume * density).toFixed(3);
  }

  const volumeCell = (vol: string) => {
    return units ? `${vol} ${units[0]} / ${getWeight(vol)} ${units[1]}` : `${vol} ${passport.material.units}`
  }
  return (
    <tr>
      <TableCell onClick={() => aosrsListMode(passport)}>{passport.number}</TableCell>
      <TableCell onClick={() => aosrsListMode(passport)}>{passport.material.name + ", " + passport.material.units}</TableCell>
      <TableCell onClick={() => aosrsListMode(passport)}>{passport.density.toString() === "0" ? '-' : passport.density}</TableCell>
      <TableCell onClick={() => aosrsListMode(passport)}>{volumeCell(passport.volume)}</TableCell>
      <TableCell onClick={() => aosrsListMode(passport)}>{volumeCell(passport.availableVolume)}</TableCell>
      <th className="p-4 border-b border-slate-200 w-fit">
        <div className="flex justify-end items-center">
          <ActionButtons onEdit={() => editMode(passport)} onDelete={() => deleteMode(passport)} />
        </div>
      </th>
    </tr>
  )
}
