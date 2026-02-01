
import React, { useState, useCallback, useEffect } from 'react';
import HeartBackground from './components/HeartBackground';
import { NO_PHRASES, HeartIcon } from './constants';
import { AppState } from './types';
import { generateLoveLetter } from './services/geminiService';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.ASKING);
  const [noCount, setNoCount] = useState(0);
  const [yesButtonSize, setYesButtonSize] = useState(1);
  const [recipientName, setRecipientName] = useState('');
  const [generatedLetter, setGeneratedLetter] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleNoClick = () => {
    setNoCount((prev) => (prev + 1) % NO_PHRASES.length);
    setYesButtonSize((prev) => prev + 0.2);
  };

  const handleYesClick = () => {
    setAppState(AppState.ACCEPTED);
  };

  const handleGenerateLetter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipientName) return;

    setIsGenerating(true);
    const letter = await generateLoveLetter({
      recipientName,
      relationshipType: 'significant other',
      tone: 'romantic'
    });
    setGeneratedLetter(letter);
    setIsGenerating(false);
  };

  const reset = () => {
    setAppState(AppState.ASKING);
    setNoCount(0);
    setYesButtonSize(1);
    setRecipientName('');
    setGeneratedLetter('');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative">
      <HeartBackground />

      <main className="z-10 w-full max-w-lg bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 text-center border border-pink-100 transition-all duration-500 hover:shadow-pink-200/50">
        
        {appState === AppState.ASKING && (
          <div className="space-y-8">
            <div className="relative inline-block">
              <img 
                src={noCount > 5 ? "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHp1eHN3bjZ0am05ZjJ1bjRmcXU4amU4amV4amV4amV4amV4amV4JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/OPU6wUKARA3NTIBmcy/giphy.gif" : "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHp1eHN3bjZ0am05ZjJ1bjRmcXU4amU4amV4amV4amV4amV4amV4JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/K6m5D6vL0tUnVovt3r/giphy.gif"} 
                alt="Cute animation" 
                className="w-48 h-48 mx-auto rounded-2xl object-cover shadow-lg border-4 border-white"
              />
              <HeartIcon className="absolute -top-4 -right-4 w-12 h-12 text-red-500 animate-bounce" />
            </div>

            <h1 className="text-4xl md:text-5xl font-romantic text-red-600 font-bold leading-tight">
              Will you be my Valentine?
            </h1>

            <div className="flex flex-wrap items-center justify-center gap-4 min-h-[200px]">
              <button
                onClick={handleYesClick}
                style={{ transform: `scale(${yesButtonSize})` }}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-8 rounded-full shadow-lg transition-all duration-300 flex items-center gap-2 active:scale-95"
              >
                <HeartIcon className="w-5 h-5" />
                Yes
              </button>

              <button
                onClick={handleNoClick}
                className="bg-gray-100 hover:bg-gray-200 text-gray-600 font-semibold py-4 px-8 rounded-full shadow-md transition-all duration-300 active:scale-90 text-sm whitespace-nowrap"
              >
                {NO_PHRASES[noCount]}
              </button>
            </div>
          </div>
        )}

        {appState === AppState.ACCEPTED && (
          <div className="space-y-6 animate-in fade-in zoom-in duration-500">
            <div className="relative inline-block">
              <img 
                src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHp1eHN3bjZ0am05ZjJ1bjRmcXU4amU4amV4amV4amV4amV4amV4JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/v96839mK7y3vWnt83w/giphy.gif" 
                alt="Happy celebration" 
                className="w-64 h-64 mx-auto rounded-3xl object-cover shadow-xl border-4 border-pink-400"
              />
              <div className="absolute inset-0 pointer-events-none">
                {/* Visual confetti-like effect */}
                <div className="absolute top-0 left-1/4 animate-bounce delay-100 text-2xl">💖</div>
                <div className="absolute top-1/2 right-0 animate-bounce delay-300 text-2xl">✨</div>
                <div className="absolute bottom-0 left-0 animate-bounce delay-500 text-2xl">🌹</div>
              </div>
            </div>

            <h2 className="text-5xl font-romantic text-pink-600 font-bold">Yay! I knew it!</h2>
            <p className="text-gray-600 text-lg italic">
              You've made me the happiest person in the digital world.
            </p>

            <div className="pt-8 border-t border-pink-100">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Want a special AI-written love letter?</h3>
              {!generatedLetter ? (
                <form onSubmit={handleGenerateLetter} className="space-y-4">
                  <input
                    type="text"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    placeholder="Enter your name..."
                    className="w-full px-4 py-3 rounded-xl border-2 border-pink-200 focus:border-pink-500 focus:outline-none transition-colors"
                  />
                  <button
                    disabled={isGenerating || !recipientName}
                    type="submit"
                    className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold py-3 px-6 rounded-xl hover:opacity-90 disabled:opacity-50 transition-all shadow-md"
                  >
                    {isGenerating ? 'Whispering to the stars...' : 'Generate Love Note'}
                  </button>
                </form>
              ) : (
                <div className="space-y-4 text-left">
                  <div className="bg-pink-50 p-6 rounded-2xl border border-pink-200 italic text-gray-700 leading-relaxed shadow-inner">
                    "{generatedLetter}"
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setGeneratedLetter('')}
                      className="flex-1 py-2 text-sm font-semibold text-pink-600 hover:underline"
                    >
                      Write another one
                    </button>
                    <button
                      onClick={reset}
                      className="flex-1 py-2 text-sm font-semibold text-gray-400 hover:underline"
                    >
                      Start over
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      <footer className="z-10 mt-8 text-pink-400 text-sm font-medium animate-pulse">
        Made with ❤️ for someone special
      </footer>
    </div>
  );
};

export default App;
