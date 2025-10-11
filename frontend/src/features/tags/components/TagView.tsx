import { ColorPeview } from '@/components/ui/ColorPeview';
import { ITag } from '../types';
import { memo } from 'react';

interface TagViewProps {
  tag: ITag;
}

const TagView = memo(({ tag }: TagViewProps) => {
  return (
    <div
      key={tag.id}
      className="flex items-center gap-2 px-2 py-1 rounded-md border text-sm"
    >
      <ColorPeview color={tag.color} size="xxs" className="mt-0.5" />
      <span>{tag.name}</span>
    </div>
  );
});

TagView.displayName = 'TagView';

export { TagView };
