import { IDailyReflection } from '../types/entities';
import { getHumanReadableDate } from '@/utils/time';
import { MoodIcon } from './MoodIcon';
import { useState } from 'react';
import { Mood } from '../types/enums';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { dailyReflectionServices } from '@/api';
import { getDateForRequest } from '@/utils/time';
import { getMoodDisplayName } from '../utils';

interface ReflectionItemProps {
  reflection: IDailyReflection;
  onUpdate?: (updatedReflection: IDailyReflection) => void;
}

function ReflectionItem({ reflection, onUpdate }: ReflectionItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedMood, setEditedMood] = useState<Mood | undefined>(
    reflection.mood,
  );
  const [editedContent, setEditedContent] = useState(reflection.content);
  const [isLoading, setIsLoading] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedMood(reflection.mood);
    setEditedContent(reflection.content);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedMood(reflection.mood);
    setEditedContent(reflection.content);
  };

  const handleSave = async () => {
    if (reflection.id === 0) {
      if (!editedMood || !editedContent.trim()) return;

      setIsLoading(true);
      try {
        const newReflection =
          await dailyReflectionServices.createDailyReflection({
            date: getDateForRequest(reflection.date),
            mood: editedMood,
            content: editedContent,
            tags: reflection.tags.map((tag) => tag.name),
          });
        onUpdate?.(newReflection);
        setIsEditing(false);
      } catch (error) {
        console.error('Failed to create reflection:', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      if (!editedMood || !editedContent.trim()) return;

      setIsLoading(true);
      try {
        const updatedReflection =
          await dailyReflectionServices.updateDailyReflection(reflection.id, {
            date: getDateForRequest(reflection.date),
            mood: editedMood,
            content: editedContent,
            tags: reflection.tags.map((tag) => tag.name),
          });
        onUpdate?.(updatedReflection);
        setIsEditing(false);
      } catch (error) {
        console.error('Failed to update reflection:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div
      className={`bg-sidebar p-3 rounded-md hover:bg-sidebar/80 transition-all duration-300 ease-in-out cursor-pointer flex flex-col gap-2 ${
        reflection.id === 0
          ? 'opacity-50 hover:bg-sidebar hover:opacity-100 hover:border-none'
          : ''
      } ${isEditing ? 'ring-2 ring-primary/20 bg-sidebar/90' : ''}`}
      onClick={!isEditing ? handleEdit : undefined}
    >
      <header className="flex justify-between items-center border-b pb-2">
        <h1 className="text-lg font-bold">
          {getHumanReadableDate(reflection.date)}
        </h1>
        {isEditing && (
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                handleCancel();
              }}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleSave();
              }}
              disabled={
                isLoading ||
                (!editedMood && reflection.id === 0) ||
                !editedContent.trim()
              }
            >
              {isLoading ? 'Saving...' : 'Save'}
            </Button>
          </div>
        )}
      </header>

      <main
        className={`transition-all duration-300 ease-in-out ${isEditing ? 'gap-4' : 'gap-2'} flex ${isEditing ? 'flex-col' : 'flex-row'}`}
      >
        {isEditing ? (
          <>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium min-w-[60px]">Mood:</span>
              <Select
                value={editedMood || ''}
                onValueChange={(value) => setEditedMood(value as Mood)}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select mood">
                    <div className="flex items-center gap-2">
                      <MoodIcon mood={editedMood} />
                      {getMoodDisplayName(editedMood)}
                    </div>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {Object.values(Mood).map((mood) => (
                    <SelectItem key={mood} value={mood}>
                      <div className="flex items-center gap-2">
                        <MoodIcon mood={mood} />
                        {getMoodDisplayName(mood)}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium">Content:</span>
              <Textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                placeholder="Describe your day..."
                className="min-h-[100px] resize-none"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </>
        ) : (
          <>
            <MoodIcon mood={reflection.mood} />
            <p className="text-sm text-gray-500 flex-1">
              {reflection.content || 'Click to edit...'}
            </p>
          </>
        )}
      </main>

      {!isEditing && (
        <footer>
          <p className="text-sm text-gray-500">
            Tags:{' '}
            {reflection.tags.map((tag) => tag.name).join(', ') || 'No tags'}
          </p>
        </footer>
      )}
    </div>
  );
}

export { ReflectionItem };
