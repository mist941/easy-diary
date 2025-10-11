'use client';

import { useState, useEffect } from 'react';
import { ITag } from '@/features/tags/types';
import { tagsServices } from '@/api';
import { Button } from '@/components/ui/Button';
import { X, Plus } from 'lucide-react';
import { ColorPeview } from '@/components/ui/ColorPeview';

interface TagSelectorProps {
  selectedTags: ITag[];
  onTagsChange: (tags: ITag[]) => void;
  className?: string;
}

function TagSelector({
  selectedTags,
  onTagsChange,
  className,
}: TagSelectorProps) {
  const [availableTags, setAvailableTags] = useState<ITag[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    setLoading(true);
    try {
      const tags = await tagsServices.getTags();
      setAvailableTags(tags);
    } catch (error) {
      console.error('Failed to fetch tags:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleTag = (tag: ITag) => {
    const isSelected = selectedTags.find((t) => t.id === tag.id);
    if (isSelected) {
      onTagsChange(selectedTags.filter((t) => t.id !== tag.id));
    } else {
      onTagsChange([...selectedTags, tag]);
    }
  };

  return (
    <div className={`flex flex-col gap-2 ${className || ''}`}>
      <span className="text-sm font-medium">Tags:</span>

      <div className="border-input dark:bg-input/30 flex flex-wrap gap-2 min-h-[32px] w-full rounded-md border bg-transparent px-3 py-2 shadow-xs transition-[color,box-shadow] outline-none">
        {selectedTags.map((tag) => (
          <div
            key={tag.id}
            className="flex items-center gap-2 px-2 py-1 rounded-md border bg-sidebar text-sm"
          >
            <ColorPeview color={tag.color} size="xxs" className="mt-0.5" />
            <span>{tag.name}</span>
            <Button
              size="sm"
              variant="ghost"
              className="h-4 w-4 p-0 hover:bg-destructive/20"
              onClick={() => toggleTag(tag)}
            >
              <X className="h-3 w-3 mt-0.5" />
            </Button>
          </div>
        ))}

        <Button
          size="sm"
          variant="ghost"
          className="h-8 px-2 border-dashed border"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Plus className="h-3 w-3 mr-1" />
          Add Tag
        </Button>
      </div>

      {isOpen && (
        <div className="border-input dark:bg-input/30 flex flex-wrap gap-1 w-full rounded-md border bg-transparent px-3 py-2 shadow-xs max-h-24 overflow-y-auto">
          {loading ? (
            <div className="text-sm text-muted-foreground py-2">Loading...</div>
          ) : (
            availableTags
              .filter(
                (tag) =>
                  !selectedTags.find((selected) => selected.id === tag.id),
              )
              .map((tag) => (
                <Button
                  key={tag.id}
                  size="sm"
                  variant="ghost"
                  className="h-7 px-2 text-sm flex items-center hover:bg-primary/10 bg-sidebar  border"
                  onClick={() => {
                    toggleTag(tag);
                  }}
                >
                  <ColorPeview
                    color={tag.color}
                    size="xxs"
                    className="mt-0.5"
                  />
                  <span>{tag.name}</span>
                </Button>
              ))
          )}
        </div>
      )}
    </div>
  );
}

export { TagSelector };
