<template>
  <div style="background-color:	#D3D3D3; height:1200px">
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <a class="navbar-brand" href="#">Audio-Visual Integration Test</a>
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
            <a class="nav-link" href="https://hcslab.cuhk.edu.cn/">Contact</a>
          </li>
        </ul>
      </div>
    </nav>
    <b-modal
      v-model="finish_modal"
      :no-close-on-backdrop="modal_property"
      :no-close-on-esc="modal_property"
      header-bg-variant="success"
      size="lg"
      title="Congratulations! Your test has been uploaded."
    >
      <p>
        Thank you for your participance, your test result has been successfuly uploaded. Please copy the
        <strong>Session ID</strong> before enter the questionnaire. <strong>Click the number below</strong> to copy your ID:
      </p>
      <h2 class="text-center text-large text-success" ref="copy" @click="CopyID()">{{this.session_id}}</h2>
      <p>If you have the ID on your clipboard, here's the link to the questionnaire for this test:
        <a href="https://forms.office.com/Pages/ResponsePage.aspx?id=eouJ5YecS0qyKi3z81XgHnxB1gMPgXtOvnxFSLgMzGpUMDlBUlQ0RFhQNVRHSjlGNkpUTkRYRkUyNS4u"
        >Questionnaire</a>
      </p>
    </b-modal>

    <b-modal
      v-model="about_modal"
      :no-close-on-backdrop="modal_property"
      :no-close-on-esc="modal_property"
      size="lg"
      title="About This Experiment"
    >
      <p>Audiovisual asynchrony is common during the stream live. It causes by unstable network or transmission delay during hardware wireless communication. In this experiment, we want to know to what extend the asynchrony affects experience of audiovisual as well as its perception sensitivity.</p>

      <p>
        A clip with random content will show on the page. The contents are neutral and suitable for all ages. The clip is with an asynchrony value of
        <strong>0 to 1.5 seconds, either video ahead or audio ahead</strong>. Your task is adjusting audio track to be synchronous with visual track. The minimal step is 0.1s and it can be changed by slider. We prohibit pause and playback function on purpose, hoping for a more flowing experience like your daily wander on YouTube/Twitch.
      </p>

      <p>
        When you feel the clip video and soundtrack are synchronous, you can click
        <a class="text-success">“Done!”</a> button. The log of your operations will be submitted. Of course, you can click
        <a class="text-danger">“Give Up”</a> button if the adjust for synchronous annoying you.
        <strong>Plase stay in the screen before submit your result.</strong>
      </p>

      <p>We’d like you fill a questionnaire after experiment, all your personal information and experiments logs are only used for academia. Codes for the platform will be open source on GitHub.</p>
      <p>Thanks for your participance!</p>
      <p class="text-right">HCS Laboratory, CUHK(SZ)</p>
      <p class="text-right">July 2020</p>
    </b-modal>

    <div style="background-color:#000000; pointer-events: none" class="container-fluid">
      <div class="container">
        <vue-plyr ref="video" :options="video_options">
          <video playsinline poster v-bind:src="this.video_url" type="video/mp4"></video>
        </vue-plyr>
      </div>
    </div>

    <!-- <vue-plyr class="container" ref="audio" :options="audio_options">
      <audio>
        <source v-bind:src="audio_url" type="audio/mp3"/>
      </audio>
    </vue-plyr>-->

    <vue-plyr ref="audio" :options="audio_options" style="pointer-events: none">
      <audio v-bind:src="audio_url" controls></audio>
    </vue-plyr>

    <hr />
    <div class="container">
      <div class="container" align="center">
        <p>
          Try to adjust the soundtrack to fit the video by clicking the buttons below. If you find it too difficult to synchronized the video and the soundtrack, feel free to click the give up button blow. If you are ready, click
          <button
            type="button"
            class="btn btn btn-primary"
            @click="startTest()"
          >start</button> button here to play the video and audio. If you would like to restart the test, re-click the start button.
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
          @click="intergrationResult(true)"
        >Done! It's synchronized</button>
        <button
          type="button"
          class="btn btn-danger"
          style="margin-left:10px"
          @click="intergrationResult(false)"
        >I give up</button>
      </div>
      <p class="text-muted text-center" style="margin-top:100px">
        Design and Develop by Human-Cloud System Laboratory. All Right Reserved © 2020 ｜
        <a
          href="https://hcslab.cuhk.edu.cn"
        >hcs.sse.cuhk.edu.cn</a> |
        <a href="https://github.com/HCSLab">Source Code</a>
      </p>
      <p class="text-muted text-center">
        Powered by
        <a href="https://vuejs.org/">Vue.js</a>,
        <a href="https://getbootstrap.com/">Bootstrap</a>,
        <a href="https://github.com/sampotts/plyr">sampotts/plyr</a> & coffee ☕️
      </p>
    </div>
  </div>
</template>

<script>
const axios = require("axios");
export default {
  name: "App",
  components: {},
  data() {
    return {
      modal_property: true,
      video_list: null,
      select_name: null,
      video_url: null,
      audio_url: null,
      adjust_amount: 0.3,
      about_modal: true,
      finish_modal: false,
      operation_storage: [],
      session_id: null,
      //upload_result
      upload_result: {
        timestamp: null,
        video_name: null,
        rand: null,
        indicator: null,
        actions: null,
      },
      // player setting
      video_options: {
        autoplay: false,
        controls: [],
        volume: 0,
        ratio: "16:9",
      },
      audio_options: {
        autoplay: false,
        controls: ["current-time"], // ['progress', 'volume']
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
  created() {
    this.base_url = "http://localhost:3000";
    this.delay = Math.random() * 3 - 1.5;

    // generate session_id by time
    // let current_date = new Date().valueOf();
    // this.session_id = ((Math.random() * current_date) / 1000)
    //   .toString(36)
    //   .slice(-8);
    // console.log(this.session_id);
    //get available videos
    axios
      .get(this.base_url + "/available_videos")
      .then((response) => {
        this.video_list = response.data.video_names;
        let index = Math.floor(Math.random() * this.video_list.length);
        this.select_name = this.video_list[index];
        this.video_url = this.base_url + "/video/" + this.select_name + ".mp4";
        this.audio_url = this.base_url + "/audio/" + this.select_name + ".mp3";

        // for development
        // console.log(this.delay);
        // console.log(this.audio_url);
        // console.log(this.video_url);
      })
      .catch((error) => console.log(error));
  },
  mounted() {
    // for development
  },
  methods: {
    CopyID(){
      window.getSelection().removeAllRanges()
      const copyDOM = this.$refs.copy
      const range = document.createRange()
      range.selectNode(copyDOM)
      window.getSelection().addRange(range)
      document.execCommand("copy");
    },
    // start the test, reset the operation storage
    startTest() {
      this.video.currentTime = 5;
      this.audio.currentTime = 5 + this.delay;

      this.audio.play();
      this.video.play();
      this.operation_storage = [];
    },
    // put forward audio time
    ForwardTime() {
      if (this.video.playing) {
        var amount = this.adjust_amount;
        this.audio.forward(amount);
        this.operation_storage.push([
          this.video.currentTime,
          this.audio.currentTime,
          amount * 1,
        ]);
        // console.log(this.operation_storage);
      } else {
        // handle clicking when video is stop
        this.toastCount++;
        this.$bvToast.toast("Press the start button first", {
          title: "Alert",
          autoHideDelay: 2000,
          appendToast: false,
          variant: "warning",
          solid: true,
        });
      }
    },
    // roll backward audio time
    RewindTime() {
      if (this.video.playing) {
        var amount = this.adjust_amount;
        this.audio.rewind(amount);
        this.operation_storage.push([
          this.video.currentTime,
          this.audio.currentTime,
          amount * -1,
        ]);
        // console.log(this.operation_storage);
      } else {
        // handle clicking when video is stop
        this.toastCount++;
        this.$bvToast.toast("Press the start button first", {
          title: "Alert",
          autoHideDelay: 2000,
          appendToast: false,
          variant: "warning",
          solid: true,
        });
      }
    },
    // collect the operation storage and send to backend
    intergrationResult(result) {
      if (this.operation_storage.length == 0) {
        // handle empty submisstion
        this.toastCount++;
        this.$bvToast.toast("At least have a try please.", {
          title: "Submisstion Complete",
          autoHideDelay: 2000,
          appendToast: false,
          variant: "warning",
          solid: true,
        });
      } else {
        // set post json: upload_result
        this.upload_result.timestamp, this.session_id = (new Date()).valueOf().toString();
        this.upload_result.indicator = result ? "good" : "bad";
        this.upload_result.indicator = result ? "good" : "bad";
        this.upload_result.video_name = this.select_name;
        this.upload_result.rand = this.delay;
        this.upload_result.actions = this.operation_storage
          .map((e) => e.join(","))
          .join(";");

        // Development usage
        // console.log(this.upload_result);

        axios
          .post(this.base_url + "/upload_result", this.upload_result)
          .then((response) => {
            this.toastCount++;
            this.$bvToast.toast("Your records have been uploaded", {
              title: "Submisstion Complete",
              autoHideDelay: 2000,
              appendToast: false,
              variant: "success",
              solid: true,
            });
            // stop video and audio
            this.video.stop();
            this.audio.stop();

            // open finish modal
            this.finish_modal = true;
          })
          .catch((error) => {
            console.log(error);
            this.toastCount++;
            this.$bvToast.toast("Something went wrong. Please try again", {
              title: "Error",
              autoHideDelay: 2000,
              appendToast: false,
              variant: "danger",
              solid: true,
            });
          });
      }
    },
  },
};
</script>