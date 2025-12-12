import React, { useState, useEffect, useRef } from 'react';
import Layout from './components/Layout';
import Home from './components/Home';
import PlayerBar from './components/PlayerBar';
import AiDj from './components/AiDj';
import { ViewState, Song, Playlist, PlayerState } from './types';
import { getTrendingSongs, getPlaylists, searchSongs } from './services/musicApi';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('HOME');
  const [songs, setSongs] = useState<Song[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [searchResults, setSearchResults] = useState<Song[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Player State
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  // Audio Ref (Mocking audio behavior)
  const audioIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const t = await getTrendingSongs();
      const p = await getPlaylists();
      setSongs(t);
      setPlaylists(p);
    };
    loadData();
  }, []);

  // Mock Audio Player Logic
  useEffect(() => {
    if (isPlaying) {
      audioIntervalRef.current = window.setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
             setIsPlaying(false);
             return 0;
          }
          return prev + 0.5; // Simulate progress
        });
      }, 100);
    } else {
      if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
    }
    return () => {
      if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
    };
  }, [isPlaying]);

  const handlePlaySong = (song: Song) => {
    if (currentSong?.id === song.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentSong(song);
      setIsPlaying(true);
      setProgress(0);
    }
  };

  const handleNext = () => {
    // Simple next logic based on trending list
    if (!currentSong) return;
    const currentIndex = songs.findIndex(s => s.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % songs.length;
    handlePlaySong(songs[nextIndex]);
  };

  const handlePrev = () => {
    if (!currentSong) return;
    const currentIndex = songs.findIndex(s => s.id === currentSong.id);
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
    handlePlaySong(songs[prevIndex]);
  };
  
  const handlePlayPlaylist = (playlistSongs: Song[]) => {
     if(playlistSongs.length > 0) {
       handlePlaySong(playlistSongs[0]);
       // In a real app, we'd queue the rest
     }
  };

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    setSearchQuery(q);
    if(q.length > 1) {
      const res = await searchSongs(q);
      setSearchResults(res);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <Layout activeView={view} onNavigate={setView}>
      
      {view === 'HOME' && (
        <Home trending={songs} playlists={playlists} onPlaySong={handlePlaySong} />
      )}

      {view === 'SEARCH' && (
        <div className="p-6 md:p-8">
           <div className="sticky top-0 bg-sonic-bg/95 backdrop-blur-md z-30 pb-4">
             <input 
               type="text" 
               placeholder="What do you want to listen to?" 
               className="w-full bg-white text-black rounded-lg px-4 py-3 font-medium focus:outline-none focus:ring-2 focus:ring-sonic-accent"
               value={searchQuery}
               onChange={handleSearch}
             />
           </div>
           
           <div className="mt-6 space-y-2">
              {searchResults.length > 0 ? (
                searchResults.map(song => (
                  <div key={song.id} onClick={() => handlePlaySong(song)} className="flex items-center p-3 rounded-lg hover:bg-white/10 cursor-pointer">
                    <img src={song.coverUrl} className="w-12 h-12 rounded mr-4" />
                    <div>
                      <div className="font-bold">{song.title}</div>
                      <div className="text-sm text-gray-400">{song.artist}</div>
                    </div>
                  </div>
                ))
              ) : (
                searchQuery.length > 0 && <div className="text-center text-gray-500 mt-10">No songs found</div>
              )}
              
              {!searchQuery && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                   {['Pop', 'Rock', 'Indie', 'Hip-Hop', 'Electronic', 'Jazz', 'Classical', 'Mood'].map(genre => (
                     <div key={genre} className="aspect-video bg-white/5 rounded-xl flex items-center justify-center font-bold text-lg hover:bg-sonic-accent/20 transition-colors cursor-pointer border border-white/5">
                        {genre}
                     </div>
                   ))}
                </div>
              )}
           </div>
        </div>
      )}

      {view === 'AI_DJ' && (
        <AiDj onPlayPlaylist={handlePlayPlaylist} />
      )}

      {view === 'LIBRARY' && (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center p-6">
           <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
             <span className="text-4xl">🎵</span>
           </div>
           <h3 className="text-2xl font-bold mb-2">Your Library is Empty</h3>
           <p className="text-gray-400 max-w-sm mb-6">Like songs and playlists to find them here later. It's free!</p>
           <button onClick={() => setView('HOME')} className="px-6 py-2 bg-white text-black rounded-full font-bold">Explore Music</button>
        </div>
      )}

      <PlayerBar 
        currentSong={currentSong} 
        isPlaying={isPlaying} 
        progress={progress}
        onPlayPause={() => setIsPlaying(!isPlaying)}
        onNext={handleNext}
        onPrev={handlePrev}
      />

    </Layout>
  );
};

export default App;