import axiosInstance from './axiosInstance';
import type { Media, PaginatedResponse } from '../types';

/**
 * Pagination parameters
 */
export interface PaginationParams {
  page?: number;
  limit?: number;
}

/**
 * Media upload response
 */
export interface MediaUploadResponse {
  mediaId: string;
  url: string;
}

/**
 * Upload a media file (image)
 * @param file - File to upload
 * @returns Uploaded media info with URL
 */
export const uploadMedia = async (file: File): Promise<MediaUploadResponse> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axiosInstance.post<MediaUploadResponse>('/media', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

/**
 * Get list of uploaded media
 * @param params - Pagination parameters (optional)
 * @returns Paginated list of media
 */
export const getMedia = async (params?: PaginationParams): Promise<PaginatedResponse<Media>> => {
  const response = await axiosInstance.get<PaginatedResponse<Media>>('/media', {
    params,
  });
  return response.data;
};

/**
 * Delete a media file
 * @param id - Media UUID
 */
export const deleteMedia = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/media/${id}`);
};

/**
 * Get list of orphaned media (not used by any question)
 * @returns List of orphaned media
 */
export const getOrphanedMedia = async (): Promise<Media[]> => {
  const response = await axiosInstance.get<Media[]>('/media/orphaned');
  return response.data;
};
