import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
} from '@/components/ui/Table';
import { ITag } from '../types';

interface TagsTableProps {
  tags: ITag[];
}

function TagsTable({ tags }: TagsTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {['Name', 'Color', 'Actions'].map((header) => {
              return <TableHead key={header}>{header}</TableHead>;
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {tags.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.color}</TableCell>
              <TableCell>3</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export { TagsTable };
