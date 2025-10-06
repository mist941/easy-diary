import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
} from '@/components/ui/Table';

function TagsTable() {
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
          {['1', '2', '3'].map((row) => (
            <TableRow key={row}>
              <TableCell>1</TableCell>
              <TableCell>2</TableCell>
              <TableCell>3</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export { TagsTable };
