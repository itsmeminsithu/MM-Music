import { Song, Playlist } from '../types';

const MOCK_COVERS = [
  "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=500&q=80",
  "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=500&q=80",
  "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&q=80",
  "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&q=80",
  "https://images.unsplash.com/photo-1514525253440-b393452e8d26?w=500&q=80",
  "https://images.unsplash.com/photo-1459749411177-8c475d41d3bb?w=500&q=80", // Concert
  "https://images.unsplash.com/photo-1501612766622-27c7f92f3e8f?w=500&q=80", // Guitar
  "https://images.unsplash.com/photo-1496293455970-f8581aae0e3c?w=500&q=80"  // Festival
];

const MOCK_SONGS: Song[] = [
  // International Hits
  { id: '1', title: "Midnight City", artist: "M83", album: "Hurry Up, We're Dreaming", duration: 243, coverUrl: MOCK_COVERS[0] },
  { id: '2', title: "Blinding Lights", artist: "The Weeknd", album: "After Hours", duration: 200, coverUrl: MOCK_COVERS[1] },
  { id: '3', title: "Levitating", artist: "Dua Lipa", album: "Future Nostalgia", duration: 203, coverUrl: MOCK_COVERS[2] },
  
  // Myanmar Hits
  { id: 'mm1', title: "Date Girl", artist: "Sai Sai Kham Leng", album: "Date Girl", duration: 215, coverUrl: MOCK_COVERS[4] },
  { id: 'mm2', title: "Chan Khae (ချန်ခဲ့)", artist: "Idiots", album: "Rock Stars", duration: 240, coverUrl: MOCK_COVERS[5] },
  { id: 'mm3', title: "A Chit Myae Swa (အချစ်မြဲစွာ)", artist: "R Zarni", album: "Love Classics", duration: 265, coverUrl: MOCK_COVERS[6] },
  { id: 'mm4', title: "Kyauk Saar (ကျောက်စာ)", artist: "Myo Gyi", album: "Iron Cross Live", duration: 290, coverUrl: MOCK_COVERS[7] },
  { id: 'mm5', title: "Nga Ka Min A Twark (ငါကမင်းအတွက်)", artist: "Lay Phyu", album: "Diary", duration: 230, coverUrl: MOCK_COVERS[3] },
  { id: 'mm6', title: "Moe (မိုး)", artist: "Y3llo", album: "Yangon Night", duration: 195, coverUrl: MOCK_COVERS[0] },
  { id: 'mm7', title: "Hlae Sar (လှည့်စား)", artist: "Phyu Phyu Kyaw Thein", album: "Diva", duration: 210, coverUrl: MOCK_COVERS[2] },
];

export const getTrendingSongs = async (): Promise<Song[]> => {
  return new Promise((resolve) => {
    // Return all songs shuffled
    setTimeout(() => resolve([...MOCK_SONGS].sort(() => 0.5 - Math.random())), 500);
  });
};

export const getPlaylists = async (): Promise<Playlist[]> => {
  return [
    {
      id: 'p1',
      name: "Myanmar Top Hits",
      description: "The most played songs in Yangon right now.",
      coverUrl: MOCK_COVERS[7],
      songs: MOCK_SONGS.filter(s => s.id.startsWith('mm')).slice(0, 4)
    },
    {
      id: 'p2',
      name: "Neon Drive",
      description: "Night time driving essentials.",
      coverUrl: MOCK_COVERS[3],
      songs: MOCK_SONGS.filter(s => !s.id.startsWith('mm')).slice(0, 3)
    },
    {
      id: 'p3',
      name: "Yangon Rock City",
      description: "Legendary rock anthems.",
      coverUrl: MOCK_COVERS[5],
      songs: MOCK_SONGS.filter(s => ['mm2', 'mm4', 'mm5'].includes(s.id))
    }
  ];
};

export const searchSongs = async (query: string): Promise<Song[]> => {
  const lowercaseQuery = query.toLowerCase();
  return MOCK_SONGS.filter(s => 
    s.title.toLowerCase().includes(lowercaseQuery) || 
    s.artist.toLowerCase().includes(lowercaseQuery)
  );
};