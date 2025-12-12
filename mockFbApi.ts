import { VideoData } from '../types';

// Simulates a backend API call to extract video data from a URL
export const fetchVideoData = async (url: string): Promise<VideoData> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Basic validation simulation
      if (!url.includes('facebook.com') && !url.includes('fb.watch')) {
        reject(new Error('Invalid Facebook URL. Please check the link and try again.'));
        return;
      }

      // Mock successful response
      resolve({
        id: Math.random().toString(36).substring(7),
        title: "Amazing Myanmar Traditional Dance Festival 2024 Highlight",
        thumbnail: `https://picsum.photos/seed/${Math.floor(Math.random() * 1000)}/640/360`,
        duration: "03:45",
        author: "Myanmar Culture Club",
        qualities: [
          {
            label: "SD Quality",
            resolution: "480p",
            size: "12.5 MB",
            url: "#",
            type: "MP4"
          },
          {
            label: "HD Quality",
            resolution: "720p",
            size: "45.2 MB",
            url: "#",
            type: "MP4"
          },
          {
            label: "Full HD",
            resolution: "1080p",
            size: "112.8 MB",
            url: "#",
            type: "MP4"
          }
        ]
      });
    }, 1500); // Simulate network delay
  });
};