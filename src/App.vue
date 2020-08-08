<template>
  <div style="background-color:	#D3D3D3; height:1300px">
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
            <a class="nav-link" target="_blank" href="https://hcslab.cuhk.edu.cn/">Lab Hompage</a>
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
      <h2 class="text-center text-large text-success" ref="copy" @click="CopyID()">{{this.session_id}}
        <svg v-show="iscopy" width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-check-circle-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style="margin-bottom:7px">
          <path fill-rule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
        </svg>
      </h2>

      

      <p>If you have the ID on your clipboard, here's the link to the questionnaire for this test:
        <a target="_blank" href="https://forms.office.com/Pages/ResponsePage.aspx?id=eouJ5YecS0qyKi3z81XgHnxB1gMPgXtOvnxFSLgMzGpUMDlBUlQ0RFhQNVRHSjlGNkpUTkRYRkUyNS4u"
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
      <p><strong class="text-danger">Notice: This test requires a good network environment to load resources smoothly. We recommend that you connect to Wi-Fi before starting the test.</strong></p>
    
      <p>Audiovisual asynchrony is common during the stream live. It causes by unstable network or transmission delay during hardware wireless communication. In this experiment, we want to know to what extend the asynchrony affects experience of audiovisual as well as its perception sensitivity.</p>

      <p>
        A clip with random content will show on the page. The contents are neutral and suitable for all ages. The clip is with an asynchrony value of
        <strong class="text-info">0 to 1.5 seconds, either video ahead or audio ahead</strong>. Your task is adjusting audio track to be synchronous with visual track. The minimal step is 0.1s and it can be changed by slider. We prohibit pause and playback function on purpose, hoping for a more flowing experience like your daily wander on YouTube/Twitch.
      </p>

      <p>
        When you feel the clip video and soundtrack are synchronous, you can click
        <strong class="text-success">“Done!”</strong> button. The log of your operations will be submitted. Of course, you can click
        <strong class="text-danger">“Give Up”</strong> button if the adjust for synchronous annoying you.
        <strong class="text-info">Plase stay in the screen before submit your result.</strong>
      </p>

      <p>We’d like you fill a questionnaire after experiment, all your personal information and experiments logs are only used for academia. Codes for the platform will be open source on GitHub.</p>
      <p>Thanks for your participance!</p>
      <p class="text-right">HCS Laboratory, CUHK(SZ)</p>
      <p class="text-right">July 2020</p>
    </b-modal>

    <div style="background-color:#000000;" class="container-fluid">
      
      <div class="alert alert-dismissible alert-light">
        <button type="button" class="close" data-dismiss="alert">&times;</button>
        <h6 style="padding-top:3px"><strong>Heads up!</strong> Now it's playing <a href="#" class="alert-link text-info">{{this.select_name}}</a>, please keep this in mind.</h6>
      </div>

      <div class="container" style="pointer-events: none">
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
        <p v-show="!guide_switch">
          Try to  <strong class="text-info">adjust the soundtrack to fit the video</strong> by clicking the buttons below. You can <strong class="text-info">adjust the step using the SlideBar</strong>. If you find it too difficult to synchronized the video and the soundtrack, feel free to click the <strong class="text-danger">give up</strong> button blow. If you are ready, click
          <button
            type="button"
            class="btn btn-sm btn-info"
            @click="startTest()"
          >start</button> button here to play the video and audio. To <strong class="text-info">restart the test, re-click the start button</strong>.
        </p>
        <p v-show="guide_switch"><strong class="text-danger">There's no way back. You have entered the "Just Do It" mode, please finish finish the test with "Just Do It" clip or Refresh the window to start a new session. </strong></p>
        <hr />

        <div style="width:55%">
          <label for="range">Adjust Step: <strong class="text-info">{{ adjust_amount }}</strong> Seconds</label>
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
              class="btn btn-outline-primary btn-lg"
              style="margin-right:5px"
              @click="RewindTime()"
            >{{ adjust_amount }} Slower</button>

            <button
              type="button"
              class="btn btn-outline-primary btn-lg"
              style="margin-left:5px"
              @click="ForwardTime()"
            >{{ adjust_amount }} Faster</button>
          </div>
        </div>

        <br />
        <button
          type="button"
          class="btn btn-success"
          v-bind:disabled="duplicate_submission"
          style="margin-right:10px"
          @click="intergrationResult(true)"
        >Done! It's synchronized</button>
        <button
          type="button"
          class="btn btn-danger"
          v-bind:disabled="duplicate_submission"
          style="margin-left:10px"
          @click="intergrationResult(false)"
        >I give up</button>
      </div>
      <p class="text-muted text-center" style="margin-top:100px">
        Design and Develop by Human-Cloud System Laboratory. All Right Reserved © 2020 ｜
        <a target="_blank"
          href="https://hcslab.cuhk.edu.cn"
        >hcs.sse.cuhk.edu.cn</a> |
        <a target="_blank" href="https://github.com/HCSLab">Source Code</a>
      </p>
      <p class="text-muted text-center">
        Powered by
        <a target="_blank" href="https://vuejs.org/">Vue.js</a>,
        <a target="_blank" href="https://getbootstrap.com/">Bootstrap</a>,
        <a target="_blank" href="https://github.com/sampotts/plyr">sampotts/plyr</a> & coffee ☕️
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
      guide_switch: false,
      modal_property: true,
      video_list: null,
      select_name: null,
      video_url: null,
      audio_url: null,
      adjust_amount: 0.3,
      about_modal: true,
      finish_modal: false,
      iscopy: false,
      operation_storage: [],
      session_id: null,
      give_up_count: 0,
      duplicate_submission: false,
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
        controls: [], // ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'settings', 'pip', 'airplay', 'fullscreen']
        volume: 0,
        ratio: "16:9",
      },
      audio_options: {
        autoplay: false,
        controls: ["current-time"], // ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'settings', 'pip', 'airplay', 'fullscreen']
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
    // for dev
    // this.base_url = "http://localhost:3000";
    
    // for deploy
    this.base_url = "";
    
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
      
      this.iscopy = true;
    },
    // start the test, reset the operation storage
    startTest() {
      if (this.give_up_count >=3){
        this.video.once('canplay', event=>{
          this.video.currentTime = 5;
        });
        this.audio.once('canplay', event=>{
          this.audio.currentTime = 5 + this.delay;
        })
      }else{
          this.video.currentTime = 5;
          this.audio.currentTime = 5 + this.delay;
      }
      

      this.audio.volume = 1;
      this.audio.play();
      this.video.play();
      this.operation_storage = [];
    },
    // put forward audio time
    ForwardTime() {
      if (this.video.playing) {
        var amount = this.adjust_amount * 1
        // console.log(amount)
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
          variant: "danger",
          solid: true,
        });
      }
    },
    // roll backward audio time
    RewindTime() {
      if (this.video.playing) {
        var amount = this.adjust_amount * 1;
        // console.log(amount)
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
          variant: "danger",
          solid: true,
        });
      }
    },
    // collect the operation storage and send to backend
    intergrationResult(result) {
      if (this.operation_storage.length == 0 && this.give_up_count>=3) {
        // change guide words
        this.guide_switch = true;
        // play just_do_it
        this.video.source = {
            type: 'video',
            title: 'just_do_it_video',
            sources: [
                {
                    src: this.base_url + "/video/just_do_it.mp4",
                    type: 'video/mp4',
                    size: 720,
                } 
            ]
        };

        this.audio.source = {
          type: 'audio',
          title: 'just_do_it_audio',
          sources: [
            {
              src: this.base_url + "/audio/just_do_it.mp3",
              type: 'audio/mp3',
            }
          ],
        };
        this.select_name = "just_do_it"
        console.log("JUST DO IT!")
        this.startTest()

        // handle empty submisstion
        this.toastCount++;
        this.$bvToast.toast("We prepared special clips for you :)", {
          title: "Don't Give Up",
          autoHideDelay: 2000,
          appendToast: false,
          variant: "danger",
          solid: true,
        });
      } 
      else if(this.operation_storage.length == 0 && this.give_up_count <3){
        // give up warning
        this.give_up_count ++;
        this.toastCount++;
        this.$bvToast.toast("At least have one try please :(", {
          title: "Don't Give Up",
          autoHideDelay: 2000,
          appendToast: false,
          variant: "danger",
          solid: true,
        });
        console.log("DONT GIVE UP!")
      }
      else {
        // set post json: upload_result
        this.session_id = (new Date()).valueOf().toString();
        this.upload_result.timestamp = this.session_id, 
        this.upload_result.indicator = result ? "good" : "bad";
        this.upload_result.indicator = result ? "good" : "bad";
        this.upload_result.video_name = this.select_name;
        this.upload_result.rand = this.delay;
        this.upload_result.actions = this.operation_storage
          .map((e) => e.join(","))
          .join(";");

        // console.log(this.upload_result.timestamp)
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
            this.duplicate_submission = true;
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