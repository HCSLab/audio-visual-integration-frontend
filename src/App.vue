<template>
  <div style="background-color:	#D3D3D3; height:1200px">
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <a class="navbar-brand" href="#">HCS Lab: Audio-Visual Integration Test</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarColor01"
        aria-controls="navbarColor01"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarColor01">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="#">
              Home
              <span class="sr-only">(current)</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click="about_modal = !about_modal">About</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Contact</a>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <input class="form-control mr-sm-2" type="text" placeholder="Search" />
          <button class="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
        </form>
      </div>
    </nav>

    <b-modal v-model="about_modal" size="lg" title="About This Experiment">
      <p>You may have heard of audio visual integration, likely from an audio visual integrator when describing what they do. It’s a mainstream term in the industry, but for most audio visual integration is like the word strategy. People have an idea of what it means, but a cohesive definition doesn’t exactly roll off the tongue.</p>
      <p>
        We’ll start with audio visual-Audio visual is: “of or relating to both hearing and sight”.This makes sense when you think of video conferencing and how conversation is enhanced by the ability to see the person you’re talking to. Next is integration, defined by Merriam-Webster as “the action or process of integrating”. That’s not very helpful, so we dig deeper and find that
        Integrating means: “to form, coordinate, or blend into a functioning or unified whole”.
      </p>
      <p>However, there’s another key piece to audio visual integration: design. Neurilink is an audio visual design and integration firm, we help people connect and communicate through audio visual technology.</p>
      <p>AV design and integration is a lot more than hanging displays on a wall and plugging them in. The design piece is critical, it enables the team to integrate the technologies into a functioning solution. It requires trained designers to map out the entire system, making sure each technology is compatible and, when combined, able to create the outcome the customer envisions.</p>
      <p>
        Other elements of a solid audio visual system design are control system programming, user interface layouts, architectural drawing packages and system documentation. Each of these elements plays a key role in providing systems that function properly and reliably.
        After the design process is complete, technicians can begin integrating the hardware. They physically go to the site, pull in wire, mount displays, install speakers and screens, connect the different electronic components, make sure everything functions properly.
      </p>
      <br />
      <p class="text-right">HCS Laboratory, CUHK(SZ)</p>
      <p class="text-right">July 2020</p>
    </b-modal>

    <div style="background-color:#000000; pointer-events: none" class="container-fluid">
      <div class="container">
        <vue-plyr ref="video" :options="video_options">
          <video playsinline poster src="./assets/the_tango.mp4"></video>
        </vue-plyr>
      </div>
    </div>

    <div class="container">
      <vue-plyr ref="audio" :options="audio_options">
        <audio>
          <source src="./assets/the_tango.mp3" type="audio/mp3" />
        </audio>
      </vue-plyr>
    </div>

    <hr />
    <div class="container">
      <div class="container" align="center">
        <p>
          Try to adjust the soundtrack to fit the video by clicking the buttons below. If you are ready, click
          <button
            type="button"
            class="btn btn-sm btn-primary"
            @click="startTest()"
          >start</button> button here to play the video and audio. If you would like to restart the test, re-click the start button. If you find it too difficult to synchronized the video and the soundtrack, feel free to click the give up button blow.
        </p>
        <hr />

          <div style="width:55%">
            <label for="range">Adjust Step: {{ adjust_amount }} Seconds</label>
            <b-form-input
              id="range"
              v-model="adjust_amount"
              type="range"
              min="0.1"
              max="0.9"
              step="0.1"
            ></b-form-input>
          </div>

          <div class="form-inline">
            <div style="width:100%;align:center">
              <button
                type="button"
                class="btn btn-outline-primary"
                style="margin-right:5px"
                @click="RewindTime()"
              >{{ adjust_amount }} Slower</button>

              <button
                type="button"
                class="btn btn-outline-primary"
                style="margin-left:5px"
                @click="ForwardTime()"
              >{{ adjust_amount }} Faster</button>
            </div>
          </div>

        <br />
        <button
          type="button"
          class="btn btn-success"
          style="margin-right:10px"
          @click="GoodIntergration()"
        >Done! It's synchronized</button>
        <button
          type="button"
          class="btn btn-danger"
          style="margin-left:10px"
          @click="BadIntergration()"
        >I give up</button>
      </div>

      <p class="text-muted text-center" style="margin-top:100px">Design and Develop by Human-Cloud System Laboratory. All Right Reserved © 2020 ｜ <a href="https://hcslab.cuhk.edu.cn">hcs.sse.cuhk.edu.cn</a></p>
      <p class="text-muted text-center">Powered by <a href="https://vuejs.org/">Vue.js</a>, <a href="https://getbootstrap.com/">Bootstrap</a>, <a href="https://github.com/sampotts/plyr">sampotts/plyr</a> & coffee ☕️</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      delay: Math.random() * 3 - 1.5,
      adjust_amount: 0.3,
      about_modal: true,
      operation_storage: [],
      video_options: {
        autoplay: false,
        controls: [],
        volume: 0,
        ratio: "16:9",
      },
      audio_options: {
        autoplay: false,
        controls: ["current-time", "volume"],
      },
    };
  },
  computed: {
    video() {
      return this.$refs.video.player;
    },
    audio() {
      return this.$refs.audio.player;
    },
  },
  mounted() {
    console.log(this.delay)
  },
  methods: {
    startTest() {
      this.video.currentTime = 5;
      this.audio.currentTime = 5 + this.delay;

      this.audio.play();
      this.video.play();
      this.operation_storage = [];
    },
    ForwardTime() {
      var amount = this.adjust_amount;
      this.audio.forward(amount);
      this.operation_storage.push({
        'opertaion': amount * 1,
        'video_time': this.video.currentTime,
        'audio_time': this.audio.currentTime
      });
      console.log(this.operation_storage);
    },
    RewindTime() {
      var amount = this.adjust_amount;
      this.audio.rewind(amount);
      this.operation_storage.push({
        'operation': amount * -1,
        'video_time': this.video.currentTime,
        'audio_time': this.audio.currentTime
      });
      console.log(this.operation_storage);
    },
    BadIntergration(){
      this.toastCount++;
      this.$bvToast.toast("Your records have been uploaded", {
        title: "Submisstion Complete",
        autoHideDelay: 1000,
        appendToast: false,
        variant: "success",
        solid: true,
      });
    },
    GoodIntergration(){
      this.toastCount++;
      this.$bvToast.toast("Your records have been uploaded", {
        title: "Submisstion Complete",
        autoHideDelay: 1000,
        appendToast: false,
        variant: "success",
        solid: true,
      });
    },
  },
};
</script>