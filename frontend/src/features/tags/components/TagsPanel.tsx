'use client';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { TagsTable } from './TagsTable';
import { Dialog, DialogTrigger } from '@/components/ui/Dialog';
import { TagForm } from './TagForm';
import { ITag, ITagRequest } from '../types';
import { useTagsManagement } from '../hooks/useTagsManagement';
import { useCallback, useEffect, useState } from 'react';

function TagsPanel() {
  const [openTagForm, setOpenTagForm] = useState<boolean>(false);
  const [selectedTag, setSelectedTag] = useState<ITag | null>(null);
  const { tags, createTag, deleteTag, updateTag, fetchTags } =
    useTagsManagement();

  const handleSubmit = useCallback((values: ITagRequest) => {
    if (selectedTag) {
      updateTag(selectedTag.id, values);
      setSelectedTag(null);
    } else {
      createTag(values);
    }
    setOpenTagForm(false);
  }, []);

  const handleUpdateTag = useCallback((tag: ITag) => {
    setSelectedTag(tag);
    setOpenTagForm(true);
  }, []);

  const handleSearch = useCallback((query: string) => {
    fetchTags(query);
  }, []);

  useEffect(() => {
    if (!openTagForm) {
      setSelectedTag(null);
    }
  }, [openTagForm]);

  return (
    <Dialog open={openTagForm} onOpenChange={setOpenTagForm}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row gap-4 justify-between">
          <Input
            className="w-1/3"
            placeholder="Search"
            onChange={(e) => handleSearch(e.target.value)}
          />
          <DialogTrigger asChild>
            <Button variant="outline">Add Tag</Button>
          </DialogTrigger>
        </div>
        <TagsTable
          tags={tags}
          handleDeleteTag={deleteTag}
          handleUpdateTag={handleUpdateTag}
        />
      </div>
      {openTagForm && (
        <TagForm onSubmit={handleSubmit} defaultValues={selectedTag} />
      )}
    </Dialog>
  );
}

export { TagsPanel };
