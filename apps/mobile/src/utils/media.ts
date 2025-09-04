// Media utilities

// Format file size
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Get file extension
export const getFileExtension = (filename: string): string => {
  return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2).toLowerCase();
};

// Check if file is image
export const isImageFile = (filename: string): boolean => {
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg'];
  const extension = getFileExtension(filename);
  return imageExtensions.includes(extension);
};

// Check if file is video
export const isVideoFile = (filename: string): boolean => {
  const videoExtensions = ['mp4', 'mov', 'avi', 'mkv', 'wmv', 'flv', 'webm'];
  const extension = getFileExtension(filename);
  return videoExtensions.includes(extension);
};

// Check if file is audio
export const isAudioFile = (filename: string): boolean => {
  const audioExtensions = ['mp3', 'wav', 'ogg', 'flac', 'aac', 'm4a'];
  const extension = getFileExtension(filename);
  return audioExtensions.includes(extension);
};

// Check if file is document
export const isDocumentFile = (filename: string): boolean => {
  const documentExtensions = ['pdf', 'doc', 'docx', 'txt', 'rtf', 'odt'];
  const extension = getFileExtension(filename);
  return documentExtensions.includes(extension);
};

// Generate thumbnail URL
export const generateThumbnailUrl = (url: string, width: number, height: number): string => {
  // This is a placeholder implementation
  // In a real app, you would use a service like Cloudinary or ImageKit
  return `${url}?w=${width}&h=${height}&fit=crop`;
};

// Validate image dimensions
export const validateImageDimensions = (
  width: number, 
  height: number, 
  maxWidth: number, 
  maxHeight: number
): boolean => {
  return width <= maxWidth && height <= maxHeight;
};

// Calculate aspect ratio
export const calculateAspectRatio = (width: number, height: number): number => {
  return width / height;
};

// Format duration (seconds) as HH:MM:SS
export const formatMediaDuration = (seconds: number): string => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  
  if (h > 0) {
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }
  
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
};