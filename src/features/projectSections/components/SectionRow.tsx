import { Section } from "@/entities/section";
import { ActionButtons } from "@/shared/ui/ActionButtons";
import { TableCell } from "@/shared/ui/TableCell";
import { useNavigate } from "react-router-dom";

type SectionRowProps = {
  section: Section;
  editMode: (section: Section) => void;
  deleteMode: (section: Section) => void;
}

export function SectionRow({ section, editMode, deleteMode }: SectionRowProps) {
  const url = `/section/${section.id}`.toString();
  const navigate = useNavigate();

  return (
    <tr className="hover:shadow-lg hover:rounded-lg">

      <TableCell navigate={() => navigate(url)}>{section.name}</TableCell>

      <th className="p-4 border-b border-slate-200 w-fit">
        <div className="flex justify-end items-center">
          <ActionButtons onEdit={() => editMode(section)} onDelete={() => deleteMode(section)} />
        </div>
      </th>
    </tr >
  )

}
