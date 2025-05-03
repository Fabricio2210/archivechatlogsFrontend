<template>
  <div class="about animated fadeIn main">
    <b-row>
      <b-col md="12" class="top-padding">
        <br class="py-2 d-sm-block d-md-none" />
        <div class="bordaForm">
          <h2 class="text-center aboutHeader pb-1">ABOUT</h2>
          <div class="paddingBottomDiv d-none d-lg-block">
            <p>
              Archive Chat Logs is a search engine for the log files from twitch
              and youtube channels.
            </p>
            <p>You can search by username, message and/or date.</p>
          </div>
          <div class="paddingBottomDivsm d-sm-block d-md-none">
            <p>
              Archive Chat Logs is a search engine for the log files from twitch
              and youtube channels.
            </p>
            <p>You can search by username, message and/or date.</p>
          </div>
        </div>
        <br />
        <div class="bordaForm">
          <h2 class="text-center aboutHeader pb-1">HOW IT WORKS</h2>
          <div class="paddingBottomDiv d-none d-lg-block">
            <p>
              The search is capped by 10k results, you can narrow it down using
              a date range.
            </p>
            <p>The <b>username field</b> has three types of search:</p>
            <p>
              <b>Match:</b>The regular search,will look for results that contain
              the whole word.
            </p>
            <p>
              <b>Example:</b> The results for "Dspgamming": Dspgamming,
              Dspgammingisafaggot, JimcuckedDspgamming.
            </p>
            <p>
              <b>Prefix:</b> Will look for results that contains a term that
              begins with the word.
            </p>
            <p>
              <b>Example:</b> The results for "onlyiced": onlyicedcoffee,
              onlyicedfag, fuckonlyicedNicknames.
            </p>
            <p>
              <b>Similar Matches:</b>Will look for results similar to the word.
            </p>
            <p>
              <b>Example:</b> The results for "Kevin": Kevin, Tevin, Melvin.
            </p>
            <p>The <b>message field</b> has two types of search:</p>
            <p>
              <b>Match phrase:</b> The regular search, it will look for results
              that contain the whole phrase.
            </p>
            <p>
              <b>Example:</b> The results for "bills to pay": how many bills to
              pay today phil, Phil has bills to pay and it’s our job to pay
              them, press 1 if you have bills to pay also.
            </p>
            <p>
              <b>Match phrase prefix:</b>Will look for results that contain the
              phrase in the same order plus every result that begins with the
              last word.
            </p>
            <p>
              <b>Example:</b> The results for "play the f": DO YOU WANNA PLAY
              THE F GAME??, do you wanna play the f****** game, Play the F*****
              game already.
            </p>
          </div>
          <div class="paddingBottomDivsm d-sm-block d-md-none">
            <p>
              The search is capped by 10k results, you can narrow it down using
              a date range.
            </p>
            <p>The <b>username field</b> has three types of search:</p>
            <p>
              <b>Match:</b>The regular search, it will look for results that
              contain the whole word.
            </p>
            <p>
              <b>Example:</b> The results for "Dspgamming": Dspgamming,
              Dspgammingisafaggot, JimcuckedDspgamming.
            </p>
            <p>
              <b>Prefix:</b>Will look for results that contains a term that
              begins with the word.
            </p>
            <p>
              <b>Example:</b> The results for "onlyiced": onlyicedcoffee,
              onlyicedfag, fuckonlyicedNicknames.
            </p>
            <p>
              <b>Similar Matches:</b> Will look for results similar to the word.
            </p>
            <p>
              <b>Example:</b> The results for "Kevin": Kevin, Tevin, Melvin.
            </p>
            <p>The <b>message field</b> has two types of search:</p>
            <p>
              <b>Match phrase:</b> The regular search, will look for results
              that contain the whole phrase.
            </p>
            <p>
              <b>Example:</b> The results for "bills to pay": how many bills to
              pay today phil, Phil has bills to pay and it’s our job to pay
              them, press 1 if you have bills to pay also.
            </p>
            <p>
              <b>Match phrase prefix:</b> Will look for results that contain the
              phrase in the same order plus every result that begins with the
              last word.
            </p>
            <p>
              <b>Example:</b> The results for "play the f": DO YOU WANNA PLAY
              THE F GAME??, do you wanna play the f****** game, Play the F*****
              game already.
            </p>
          </div>
        </div>
        <div class="bordaForm d-none d-lg-block my-3">
          <h2 class="text-center aboutHeader">CONTACT</h2>
          <b-row>
            <b-col md="6">
              <h4 class="pl-4">
                <v-icon name="kiwi-bird" scale="2" />
                <a
                  href="https://kiwifarms.net/members/third_world_detractor.28399/"
                  >Third_World_Detractor</a
                >
              </h4>
            </b-col>
          </b-row>
        </div>
        <div class="bordaForm d-sm-block d-md-none my-3">
          <h2 class="text-center aboutHeader">CONTACT</h2>
          <b-row>
            <b-col md="6">
              <h5 class="pl-2">
                <v-icon name="kiwi-bird" scale="2" />
                <a
                  href="https://kiwifarms.net/members/third_world_detractor.28399/"
                  >Third_World_Detractor</a
                >
              </h5>
            </b-col>
          </b-row>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<style scoped>
.linkContact {
  color: black !important;
}
.top-padding {
  padding-top: 70px !important;
}
</style>
