import { useState, useCallback, useEffect } from 'react';
import { tagsServices } from '@/api';
import { handleError } from '@/utils/errors';
import { ITagRequest, ITag } from '../types';

function useTagsManagement() {
  const [tags, setTags] = useState<ITag[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTags = useCallback(async () => {
    const fetchedTags = await tagsServices.getTags();
    setTags(fetchedTags);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        await fetchTags();
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const createNote = useCallback(async (values: ITagRequest) => {
    try {
      await tagsServices.createTag(values);
      await fetchTags();
    } catch (error) {
      handleError(error);
    }
  }, []);

  const updateNote = useCallback(async (id: number, values: ITagRequest) => {
    try {
      await tagsServices.updateTag(id, values);
      await fetchTags();
    } catch (error) {
      handleError(error);
    }
  }, []);

  const deleteNote = useCallback(async (id: number) => {
    try {
      await tagsServices.deleteTag(id);
      await fetchTags();
    } catch (error) {
      handleError(error);
    }
  }, []);

  return {
    tags,
    loading,
    createNote,
    updateNote,
    deleteNote,
    fetchTags,
  };
}

export { useTagsManagement };
