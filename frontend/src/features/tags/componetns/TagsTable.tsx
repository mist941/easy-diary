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
          {['1', '2', '3'].map((headerGroup) => (
            <TableRow key={headerGroup}>
              {['1', '2', '3'].map((header) => {
                return <TableHead key={header}>{header}</TableHead>;
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {['1', '2', '3'].length ? (
            ['1', '2', '3'].map((row) => (
              <TableRow key={row}>
                {['1', '2', '3'].map((cell) => (
                  <TableCell key={cell}>{cell}</TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export { TagsTable };
