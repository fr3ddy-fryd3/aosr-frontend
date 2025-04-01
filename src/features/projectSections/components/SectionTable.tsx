import { Section } from "@/entities/section";
import { Table } from "@/shared/ui/Table";
import { TableHeaderCell } from "@/shared/ui/TableHeaderCell";
import { SectionRow } from "./SectionRow";

type SectionTableProps = {
  sections: Section[];
  editMode: (section: Section) => void;
  deleteMode: (section: Section) => void;
}

export function SectionTable({ sections, editMode: editMode, deleteMode: deleteMode }: SectionTableProps) {
  return (
    <Table>
      <thead>
        <tr>
          <TableHeaderCell>Название</TableHeaderCell>
          <TableHeaderCell> </TableHeaderCell>
        </tr>
      </thead>
      <tbody>
        {sections.map((section) => (
          <SectionRow key={section.id} section={section} editMode={editMode} deleteMode={deleteMode} />
        ))}
      </tbody>
    </Table>
  )
}
