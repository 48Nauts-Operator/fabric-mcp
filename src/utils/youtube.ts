/**
 * YouTube Utility Functions
 */

/**
 * Validates if a string is a valid YouTube URL
 * @param url The URL to validate
 * @returns boolean indicating if the URL is a valid YouTube URL
 */
export const isValidYouTubeUrl = (url: string): boolean => {
  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
  return youtubeRegex.test(url);
};

/**
 * Extracts the video ID from a YouTube URL
 * @param url The YouTube URL
 * @returns The video ID or null if not found
 */
export const extractVideoId = (url: string): string | null => {
  if (!isValidYouTubeUrl(url)) {
    return null;
  }

  // Handle youtu.be format
  if (url.includes('youtu.be')) {
    const match = url.match(/youtu\.be\/([^?&]+)/);
    return match ? match[1] : null;
  }

  // Handle youtube.com format
  const urlObj = new URL(url);
  if (urlObj.searchParams.has('v')) {
    return urlObj.searchParams.get('v');
  }

  // Handle youtube.com/embed format
  const pathMatch = urlObj.pathname.match(/\/embed\/([^/]+)/);
  if (pathMatch) {
    return pathMatch[1];
  }

  return null;
};

/**
 * Formats a YouTube video URL from a video ID
 * @param videoId The YouTube video ID
 * @returns A properly formatted YouTube URL
 */
export const formatYouTubeUrl = (videoId: string): string => {
  return `https://www.youtube.com/watch?v=${videoId}`;
}; 