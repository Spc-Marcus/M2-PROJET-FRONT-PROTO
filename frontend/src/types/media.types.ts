/**
 * Media (file upload) types
 */

/**
 * Media information
 */
export interface Media {
  id: string;
  url: string;
  filename: string;
  mimeType: string;
  uploadedBy: {
    id: string;
    name: string;
  };
  uploadedAt: string;
  isUsed: boolean;
}
