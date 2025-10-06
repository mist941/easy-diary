'use client';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { TagsTable } from './TagsTable';
import { Dialog, DialogTrigger } from '@/components/ui/Dialog';
import { TagForm } from './TagForm';
import { ITagRequest } from '../types';
import { useTagsManagement } from '../hooks/useTagsManagement';
import { useCallback, useState } from 'react';

function TagsPanel() {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const { tags, createTag } = useTagsManagement();

  const handleSubmit = useCallback((values: ITagRequest) => {
    createTag(values);
    setIsDialogOpen(false);
  }, []);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row gap-4 justify-between">
          <Input className="w-1/3" placeholder="Search" />
          <DialogTrigger asChild>
            <Button variant="outline">Add Tag</Button>
          </DialogTrigger>
        </div>
        <TagsTable tags={tags} />
      </div>
      {isDialogOpen && <TagForm onSubmit={handleSubmit} />}
    </Dialog>
  );
}

export { TagsPanel };
