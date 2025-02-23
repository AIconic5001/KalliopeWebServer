//  API configuration
export const API_CONFIG = {
  TEST: '/api/test',
  FILES: '/api/files/files',
  UPLOAD: '/api/files/upload'
};

// Allowed file types matching backend
export const ALLOWED_TYPES = ['pdf'];

export const API_URL = import.meta.env.VITE_API_URL || 'http://kalliope-be-488144718577.us-central1.run.app:8000';
