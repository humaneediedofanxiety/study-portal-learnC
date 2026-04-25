import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getArchiveDirectUrl(url: string | null | undefined) {
  if (!url) return '';
  
  if (url.includes('archive.org/')) {
    if (url.includes('/download/') || url.includes('/embed/')) return url;
    
    if (url.includes('/details/')) {
      const parts = url.split('/');
      const identifier = parts[parts.indexOf('details') + 1];
      
      if (url.match(/\.(pdf|mp4|jpg|png|webp|zip)$/i)) {
        return url.replace('/details/', '/download/');
      }
      
      return `https://archive.org/embed/${identifier}`;
    }
  }
  return url;
}

export function getArchiveThumbnailUrl(url: string | null | undefined) {
  if (!url) return '';

  if (url.includes('archive.org/')) {
    // If it's a details or download link, convert to the services/img link which works in <img> tags
    let identifier = '';
    if (url.includes('/details/')) {
      const parts = url.split('/');
      identifier = parts[parts.indexOf('details') + 1];
    } else if (url.includes('/download/')) {
      const parts = url.split('/');
      identifier = parts[parts.indexOf('download') + 1];
    } else if (url.includes('/embed/')) {
      const parts = url.split('/');
      identifier = parts[parts.indexOf('embed') + 1];
    }

    if (identifier) {
      return `https://archive.org/services/img/${identifier}`;
    }
  }
  return url;
}
