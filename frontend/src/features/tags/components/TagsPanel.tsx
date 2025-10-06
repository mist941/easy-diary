'use client';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { TagsTable } from './TagsTable';
import { Dialog, DialogTrigger } from '@/components/ui/Dialog';
import { TagForm } from './TagForm';
import { ITagRequest } from '../types/dto';
import { useCallback } from 'react';

function TagsPanel() {
  const handleSubmit = useCallback((values: ITagRequest) => {
    console.log(values);
  }, []);

  return (
    <Dialog>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row gap-4 justify-between">
          <Input className="w-1/3" placeholder="Search" />
          <DialogTrigger asChild>
            <Button variant="outline">Add Tag</Button>
          </DialogTrigger>
        </div>
        <TagsTable />
      </div>
      <TagForm onSubmit={handleSubmit} />
    </Dialog>
  );
}

export { TagsPanel };
