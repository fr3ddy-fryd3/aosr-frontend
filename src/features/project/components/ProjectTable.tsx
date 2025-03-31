import { Project } from "@/entities/project";
import { Table } from "@/shared/ui/Table";
import { TableHeaderCell } from "@/shared/ui/TableHeaderCell";
import { ProjectRow } from "@/features/project/components/ProjectRow"


type ProjectTableProps = {
  projects: Project[];
  editMode: (project: Project) => void;
  deleteMode: (project: Project) => void;
}

export function projectTable({ projects, editMode: editMode, deleteMode: deleteMode }: ProjectTableProps) {
  return (
    <Table>
      <thead>
        <tr>
          <TableHeaderCell>Название</TableHeaderCell>
          <TableHeaderCell> </TableHeaderCell>
        </tr>
      </thead>
      <tbody>
        {projects.map((project) => (
          <ProjectRow key={project.id} project={project} editMode={editMode} deleteMode={deleteMode} />
        ))}
      </tbody>
    </Table>
  )
}
