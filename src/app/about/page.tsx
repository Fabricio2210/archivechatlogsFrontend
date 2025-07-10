import React from 'react'

export default function About() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 px-4">
      <div className="border-form p-8 rounded-lg">
        <h2 className="text-2xl font-bold text-center border-b border-primary pb-2 mb-4">
          ABOUT
        </h2>
        <div className="space-y-4 text-base leading-relaxed">
          <p>
            Archive Chat Logs is a search engine for the log files from twitch
            and youtube channels.
          </p>
          <p>You can search by username, message and/or date.</p>
        </div>
      </div>

      <div className="border-form p-8 rounded-lg">
        <h2 className="text-2xl font-bold text-center border-b border-primary pb-2 mb-4">
          HOW IT WORKS
        </h2>
        <div className="space-y-6 text-base leading-relaxed">
          <p>
            The search is capped by 10k results, you can narrow it down using
            a date range.
          </p>
          
          <div>
            <p className="font-semibold mb-2">The <strong>username field</strong> has three types of search:</p>
            
            <div className="ml-6 space-y-4">
              <div>
                <p><strong>Match:</strong> The regular search, will look for results that contain the whole word.</p>
                <p className="text-sm text-muted-foreground mt-1">
                  <strong>Example:</strong> The results for "Dspgamming": Dspgamming, Dspgammingisafaggot, JimcuckedDspgamming.
                </p>
              </div>
              
              <div>
                <p><strong>Prefix:</strong> Will look for results that contains a term that begins with the word.</p>
                <p className="text-sm text-muted-foreground mt-1">
                  <strong>Example:</strong> The results for "onlyiced": onlyicedcoffee, onlyicedfag, fuckonlyicedNicknames.
                </p>
              </div>
              
              <div>
                <p><strong>Similar Matches:</strong> Will look for results similar to the word.</p>
                <p className="text-sm text-muted-foreground mt-1">
                  <strong>Example:</strong> The results for "Kevin": Kevin, Tevin, Melvin.
                </p>
              </div>
            </div>
          </div>

          <div>
            <p className="font-semibold mb-2">The <strong>message field</strong> has two types of search:</p>
            
            <div className="ml-6 space-y-4">
              <div>
                <p><strong>Match phrase:</strong> The regular search, it will look for results that contain the whole phrase.</p>
                <p className="text-sm text-muted-foreground mt-1">
                  <strong>Example:</strong> The results for "bills to pay": how many bills to pay today phil, Phil has bills to pay and it's our job to pay them, press 1 if you have bills to pay also.
                </p>
              </div>
              
              <div>
                <p><strong>Match phrase prefix:</strong> Will look for results that contain the phrase in the same order plus every result that begins with the last word.</p>
                <p className="text-sm text-muted-foreground mt-1">
                  <strong>Example:</strong> The results for "play the f": DO YOU WANNA PLAY THE F GAME??, do you wanna play the f****** game, Play the F***** game already.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-form p-8 rounded-lg">
        <h2 className="text-2xl font-bold text-center border-b border-primary pb-2 mb-4">
          CONTACT
        </h2>
        <div className="text-center py-4">
          <h4 className="text-lg">
            <a 
              href="https://kiwifarms.net/members/third_world_detractor.28399/"
              className="text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Third_World_Detractor
            </a>
          </h4>
        </div>
      </div>
    </div>
  )
}