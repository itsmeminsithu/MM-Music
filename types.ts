export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  coverUrl: string;
  duration: number; // in seconds
  audioUrl?: string; // Optional real URL, otherwise mocked
  isPremium?: boolean;
}

export interface Playlist {
  id: string;
  name: string;
  coverUrl: string;
  description: string;
  songs: Song[];
}

export type ViewState = 'HOME' | 'SEARCH' | 'LIBRARY' | 'AI_DJ';

export interface PlayerState {
  currentSong: Song | null;
  isPlaying: boolean;
  progress: number;
  queue: Song[];
}

export enum AppState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export interface VideoQuality {
  label: string;
  resolution: string;
  size: string;
  url: string;
  type: string;
}

export interface VideoData {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  author: string;
  qualities: VideoQuality[];
}

export interface DownloadHistoryItem {
  id: string;
  url: string;
  thumbnail: string;
  title: string;
  date: string;
}