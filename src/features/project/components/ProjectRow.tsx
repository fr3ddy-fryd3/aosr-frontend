import { Project } from "@/entities/project";
import { ActionButtons } from "@/shared/ui/ActionButtons";
import { TableCell } from "@/shared/ui/TableCell";

type ProjectRowProps = {
  project: Project;
  editMode: (project: Project) => void;
  deleteMode: (project: Project) => void;
}

export function ProjectRow({ project, editMode: editMode, deleteMode: deleteMode }: ProjectRowProps) {

  return (
    <tr>
      <TableCell>{project.name}</TableCell>
      <th className="p-4 border-b border-slate-200 w-fit">
        <ActionButtons editMode={() => editMode(project)} deleteMode={() => deleteMode(project)} />
      </th>
    </tr>
  )
}
