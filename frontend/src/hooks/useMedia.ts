import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as mediaService from '../api/media.service';
import { useNotification } from './useNotification';

/**
 * Upload media mutation hook
 * @returns Mutation for uploading a media file
 */
export const useUploadMedia = () => {
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useNotification();

  return useMutation({
    mutationFn: mediaService.uploadMedia,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['media'] });
      showSuccess('Media uploaded successfully');
    },
    onError: (error: any) => {
      showError(error?.response?.data?.message || 'Failed to upload media');
    },
  });
};

/**
 * Get media query hook
 * @param params - Pagination parameters
 * @returns Query for fetching media list
 */
export const useMedia = (params?: mediaService.PaginationParams) => {
  return useQuery({
    queryKey: ['media', params],
    queryFn: () => mediaService.getMedia(params),
  });
};

/**
 * Delete media mutation hook
 * @returns Mutation for deleting a media file
 */
export const useDeleteMedia = () => {
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useNotification();

  return useMutation({
    mutationFn: mediaService.deleteMedia,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['media'] });
      showSuccess('Media deleted successfully');
    },
    onError: (error: any) => {
      showError(error?.response?.data?.message || 'Failed to delete media');
    },
  });
};

/**
 * Get orphaned media query hook
 * @returns Query for fetching orphaned media
 */
export const useOrphanedMedia = () => {
  return useQuery({
    queryKey: ['media', 'orphaned'],
    queryFn: mediaService.getOrphanedMedia,
  });
};
