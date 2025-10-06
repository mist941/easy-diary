import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
} from '@/components/ui/Table';
import { ITag } from '../types';
import { Button } from '@/components/ui/Button';
import { Pencil, Trash } from 'lucide-react';
import { ColorPeview } from '@/components/ui/ColorPeview';

interface TagsTableProps {
  tags: ITag[];
  handleDeleteTag: (id: number) => void;
  handleUpdateTag: (tag: ITag) => void;
}

function TagsTable({ tags, handleDeleteTag, handleUpdateTag }: TagsTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {['Name', 'Color', ''].map((header) => {
              return <TableHead key={header}>{header}</TableHead>;
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {tags.map((tag) => (
            <TableRow key={tag.id}>
              <TableCell>{tag.name}</TableCell>
              <TableCell>
                <ColorPeview color={tag.color} size="sm" />
              </TableCell>
              <TableCell>
                <div className="flex gap-2 justify-end">
                  <Button variant="ghost" onClick={() => handleUpdateTag(tag)}>
                    <Pencil />
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => handleDeleteTag(tag.id)}
                  >
                    <Trash />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export { TagsTable };
