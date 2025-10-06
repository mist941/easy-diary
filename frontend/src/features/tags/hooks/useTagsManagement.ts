import { useState, useCallback, useEffect } from 'react';
import { tagsServices } from '@/api';
import { handleError } from '@/utils/errors';
import { ITagRequest, ITag } from '../types';

function useTagsManagement() {
  const [tags, setTags] = useState<ITag[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTags = useCallback(async (query: string = '') => {
    const fetchedTags = await tagsServices.getTags(query);
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

  const createTag = useCallback(async (values: ITagRequest) => {
    try {
      await tagsServices.createTag(values);
      await fetchTags();
    } catch (error) {
      handleError(error);
    }
  }, []);

  const updateTag = useCallback(async (id: number, values: ITagRequest) => {
    try {
      await tagsServices.updateTag(id, values);
      await fetchTags();
    } catch (error) {
      handleError(error);
    }
  }, []);

  const deleteTag = useCallback(async (id: number) => {
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
    createTag,
    updateTag,
    deleteTag,
    fetchTags,
  };
}

export { useTagsManagement };
