import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { TagsTable } from './TagsTable';

function TagsPanel() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-4 justify-between">
        <Input className="w-1/3" placeholder="Search" />
        <Button>Add Tag</Button>
      </div>
      <TagsTable />
    </div>
  );
}

export { TagsPanel };
