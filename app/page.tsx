'use client';

import { useState } from 'react';
import { Search, TrendingUp, Clock, Sparkles, ExternalLink, Play } from 'lucide-react';

interface PodcastClip {
  id: string;
  title: string;
  podcast: string;
  duration: string;
  hook: string;
  viralScore: number;
  timestamp: string;
  topic: string;
  thumbnail: string;
  url: string;
  reason: string;
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [clips, setClips] = useState<PodcastClip[]>([]);
  const [loading, setLoading] = useState(false);

  const categories = [
    'all',
    'business',
    'motivation',
    'comedy',
    'technology',
    'health',
    'true crime',
    'interviews'
  ];

  const generateClips = () => {
    setLoading(true);

    // Simulating API call with curated podcast clips
    setTimeout(() => {
      const sampleClips: PodcastClip[] = [
        {
          id: '1',
          title: 'Elon Musk on AI Taking Over Jobs',
          podcast: 'Joe Rogan Experience',
          duration: '45s',
          hook: '"AI will replace 80% of jobs in 5 years"',
          viralScore: 98,
          timestamp: '2:15:30',
          topic: 'Technology',
          thumbnail: '🤖',
          url: 'https://youtube.com/watch?v=example1',
          reason: 'Controversial statement with high engagement potential'
        },
        {
          id: '2',
          title: 'David Goggins: The Mind Controls Everything',
          podcast: 'Huberman Lab',
          duration: '52s',
          hook: '"Your mind is lying to you every single day"',
          viralScore: 96,
          timestamp: '1:45:12',
          topic: 'Motivation',
          thumbnail: '💪',
          url: 'https://youtube.com/watch?v=example2',
          reason: 'Powerful motivational content with strong emotional appeal'
        },
        {
          id: '3',
          title: 'Mark Cuban on Making Your First Million',
          podcast: 'The Diary of a CEO',
          duration: '38s',
          hook: '"I made my first million doing this one thing..."',
          viralScore: 95,
          timestamp: '0:42:08',
          topic: 'Business',
          thumbnail: '💰',
          url: 'https://youtube.com/watch?v=example3',
          reason: 'Money-making advice from billionaire - high curiosity factor'
        },
        {
          id: '4',
          title: 'Andrew Huberman: Sleep Hack Nobody Talks About',
          podcast: 'Huberman Lab',
          duration: '41s',
          hook: '"This one trick doubled my sleep quality overnight"',
          viralScore: 94,
          timestamp: '0:15:45',
          topic: 'Health',
          thumbnail: '😴',
          url: 'https://youtube.com/watch?v=example4',
          reason: 'Practical health advice with immediate value'
        },
        {
          id: '5',
          title: 'Kevin Hart: How I Became Fearless',
          podcast: 'Club Shay Shay',
          duration: '47s',
          hook: '"Fear is just a decision you make"',
          viralScore: 93,
          timestamp: '1:22:33',
          topic: 'Comedy',
          thumbnail: '😂',
          url: 'https://youtube.com/watch?v=example5',
          reason: 'Celebrity wisdom mixed with humor - highly shareable'
        },
        {
          id: '6',
          title: 'Naval Ravikant: Get Rich Without Getting Lucky',
          podcast: 'Tim Ferriss Show',
          duration: '49s',
          hook: '"Wealth is not about working hard, it\'s about..."',
          viralScore: 92,
          timestamp: '0:58:20',
          topic: 'Business',
          thumbnail: '🎯',
          url: 'https://youtube.com/watch?v=example6',
          reason: 'Counter-intuitive wealth advice from successful entrepreneur'
        },
        {
          id: '7',
          title: 'Jordan Peterson: Why Modern Men Are Lost',
          podcast: 'Lex Fridman Podcast',
          duration: '54s',
          hook: '"Men today have forgotten this ancient principle"',
          viralScore: 91,
          timestamp: '2:05:15',
          topic: 'Psychology',
          thumbnail: '🧠',
          url: 'https://youtube.com/watch?v=example7',
          reason: 'Addresses trending societal issue with strong opinions'
        },
        {
          id: '8',
          title: 'Alex Hormozi: How to Sell Anything',
          podcast: 'My First Million',
          duration: '43s',
          hook: '"I close 90% of deals using this 3-word phrase"',
          viralScore: 90,
          timestamp: '1:10:25',
          topic: 'Business',
          thumbnail: '📈',
          url: 'https://youtube.com/watch?v=example8',
          reason: 'Specific, actionable sales technique with mystery element'
        },
        {
          id: '9',
          title: 'Chris Williamson: The Loneliness Epidemic',
          podcast: 'Modern Wisdom',
          duration: '46s',
          hook: '"This generation is the loneliest in human history"',
          viralScore: 89,
          timestamp: '0:33:50',
          topic: 'Culture',
          thumbnail: '😔',
          url: 'https://youtube.com/watch?v=example9',
          reason: 'Relatable emotional topic affecting millions'
        },
        {
          id: '10',
          title: 'Gary Vee: Stop Caring What Others Think',
          podcast: 'The GaryVee Audio Experience',
          duration: '39s',
          hook: '"Your opinion of me is none of my business"',
          viralScore: 88,
          timestamp: '0:12:18',
          topic: 'Motivation',
          thumbnail: '🔥',
          url: 'https://youtube.com/watch?v=example10',
          reason: 'Bold statement challenging social norms - high engagement'
        },
        {
          id: '11',
          title: 'Dr. Peter Attia: Why You\'re Aging Faster',
          podcast: 'The Drive',
          duration: '50s',
          hook: '"These 3 foods are secretly destroying your cells"',
          viralScore: 87,
          timestamp: '1:35:40',
          topic: 'Health',
          thumbnail: '⚕️',
          url: 'https://youtube.com/watch?v=example11',
          reason: 'Fear-based health information with practical takeaway'
        },
        {
          id: '12',
          title: 'Iman Gadzhi: Drop Shipping is Dead',
          podcast: 'The Iced Coffee Hour',
          duration: '44s',
          hook: '"Here\'s what replaced drop shipping in 2024"',
          viralScore: 86,
          timestamp: '0:28:15',
          topic: 'Business',
          thumbnail: '💻',
          url: 'https://youtube.com/watch?v=example12',
          reason: 'Challenges popular belief and offers alternative solution'
        }
      ];

      // Filter by category if not 'all'
      let filteredClips = sampleClips;
      if (selectedCategory !== 'all') {
        filteredClips = sampleClips.filter(clip =>
          clip.topic.toLowerCase().includes(selectedCategory.toLowerCase())
        );
      }

      // Filter by search query
      if (searchQuery) {
        filteredClips = filteredClips.filter(clip =>
          clip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          clip.podcast.toLowerCase().includes(searchQuery.toLowerCase()) ||
          clip.hook.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      setClips(filteredClips);
      setLoading(false);
    }, 800);
  };

  const handleSearch = () => {
    generateClips();
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400">
            🎙️ Podcast Clip Finder
          </h1>
          <p className="text-xl text-gray-300">
            Discover viral-worthy podcast clips perfect for YouTube Shorts
          </p>
        </div>

        {/* Search Section */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-8 shadow-2xl">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search for topics, podcasts, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
            <button
              onClick={handleSearch}
              className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl font-semibold hover:from-pink-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
            >
              Find Clips
            </button>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-purple-500 text-white'
                    : 'bg-white/20 text-gray-200 hover:bg-white/30'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
            <p className="mt-4 text-gray-300">Finding the best clips for you...</p>
          </div>
        )}

        {/* Results Grid */}
        {!loading && clips.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clips.map((clip) => (
              <div
                key={clip.id}
                className="bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden shadow-xl hover:transform hover:scale-105 transition-all duration-300 border border-white/20"
              >
                {/* Thumbnail */}
                <div className="relative bg-gradient-to-br from-purple-600 to-pink-600 h-48 flex items-center justify-center">
                  <span className="text-6xl">{clip.thumbnail}</span>
                  <div className="absolute top-3 right-3 bg-black/70 px-3 py-1 rounded-full flex items-center gap-1">
                    <Clock size={14} />
                    <span className="text-sm">{clip.duration}</span>
                  </div>
                  <div className="absolute top-3 left-3 bg-green-500 px-3 py-1 rounded-full flex items-center gap-1">
                    <TrendingUp size={14} />
                    <span className="text-sm font-bold">{clip.viralScore}</span>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-black/50 transition-opacity">
                    <Play size={48} className="text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-bold line-clamp-2">{clip.title}</h3>
                  </div>

                  <p className="text-sm text-gray-300 mb-2">{clip.podcast}</p>

                  <div className="bg-yellow-500/20 border border-yellow-500/40 rounded-lg p-3 mb-3">
                    <div className="flex items-start gap-2">
                      <Sparkles size={16} className="text-yellow-400 flex-shrink-0 mt-1" />
                      <p className="text-sm italic text-yellow-100">{clip.hook}</p>
                    </div>
                  </div>

                  <div className="mb-3">
                    <p className="text-xs text-gray-400 mb-2">Why this will go viral:</p>
                    <p className="text-sm text-gray-300">{clip.reason}</p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-white/20">
                    <span className="text-xs bg-purple-500/30 px-3 py-1 rounded-full">
                      {clip.topic}
                    </span>
                    <span className="text-xs text-gray-400">{clip.timestamp}</span>
                  </div>

                  <button className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all flex items-center justify-center gap-2">
                    <ExternalLink size={16} />
                    View Original
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && clips.length === 0 && searchQuery === '' && (
          <div className="text-center py-20 bg-white/5 rounded-2xl backdrop-blur-lg">
            <Sparkles size={64} className="mx-auto mb-4 text-purple-400" />
            <h2 className="text-2xl font-bold mb-2">Ready to Find Viral Clips?</h2>
            <p className="text-gray-300 mb-6">
              Click "Find Clips" or search for specific topics to discover the best podcast moments for YouTube Shorts
            </p>
            <button
              onClick={handleSearch}
              className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl font-semibold hover:from-pink-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
            >
              Get Started
            </button>
          </div>
        )}

        {/* No Results */}
        {!loading && clips.length === 0 && searchQuery !== '' && (
          <div className="text-center py-20 bg-white/5 rounded-2xl backdrop-blur-lg">
            <p className="text-xl text-gray-300">No clips found for "{searchQuery}"</p>
            <p className="text-gray-400 mt-2">Try a different search term or category</p>
          </div>
        )}

        {/* Footer Info */}
        <div className="mt-12 text-center text-sm text-gray-400">
          <p className="mb-2">💡 Pro Tip: Look for clips with viral scores above 90 for maximum engagement</p>
          <p>🎬 All clips are optimized for 30-60 second YouTube Shorts format</p>
        </div>
      </div>
    </main>
  );
}
