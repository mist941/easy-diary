import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { TagsTable } from './TagsTable';

function TagsPanel() {
  return (
    <div>
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Tags</h1>
        <div className="flex flex-row gap-4">
          <Input placeholder="Search" />
          <Button>Add Tag</Button>
        </div>
        <TagsTable />
      </div>
    </div>
  );
}

export { TagsPanel };
