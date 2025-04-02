import { Project } from "@/entities/project";
import { ActionButtons } from "@/shared/ui/ActionButtons";
import { TableCell } from "@/shared/ui/TableCell";
import { useNavigate } from "react-router-dom";

type ProjectRowProps = {
  project: Project;
  editMode: (project: Project) => void;
  deleteMode: (project: Project) => void;
}

export function ProjectRow({ project, editMode, deleteMode }: ProjectRowProps) {
  const url = `/project/${project.id}`.toString();
  const navigate = useNavigate();

  return (
    <tr className="hover:shadow-lg hover:rounded-lg">

      <TableCell navigate={() => navigate(url)}>{project.name}</TableCell>

      <th className="p-4 border-b border-slate-200 w-fit">
        <div className="flex justify-end items-center">
          <ActionButtons onEdit={() => editMode(project)} onDelete={() => deleteMode(project)} />
        </div>
      </th>
    </tr >
  )
}
