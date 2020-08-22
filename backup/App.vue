<template>
  <div style="background-color:	#cccccc; height:1240px">
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
       <a class="navbar-brand" href="#">
        <img src="./assets/av-test.png" width="35" height="35" alt="load failed" loading="lazy">
      </a>
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

      <div class="collapse navbar-collapse" id="navbarColor01" v-if="!lang_is_zh">
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
          <li class="nav-item">
            <a class="nav-link" href="#" @click="changeLang()">
                简体中文
            </a>
          </li>
        </ul>
      </div>
      <!--====================The Chinese Introduction====================-->
      <div class="collapse navbar-collapse" id="navbarColor01" v-if="lang_is_zh">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="#">
              测试
              <span class="sr-only">(current)</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click="about_modal = !about_modal">实验说明</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" target="_blank" href="https://hcslab.cuhk.edu.cn/">实验室主页</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click="changeLang()">
                English
            </a>
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
      hide-footer
    >
      <div v-if="!lang_is_zh">
        <p>
          Thank you for your participance, your test result has been successfuly uploaded. Please copy the
          <strong class="text-info">Session ID</strong> before enter the questionnaire. <strong class="text-info">Click the number below</strong> to copy your ID:
        </p>
        <h2 class="text-center text-large text-success" ref="copy" @click="copyID()">{{this.session_id}}
          <svg v-show="iscopy" width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-check-circle-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style="margin-bottom:7px">
            <path fill-rule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
          </svg>
        </h2>
        <p>If you have the ID on your clipboard, here's the link to the questionnaire for this test:
          <h2 class="text-center"><a target="_blank" href="https://forms.office.com/Pages/ResponsePage.aspx?id=eouJ5YecS0qyKi3z81XgHnxB1gMPgXtOvnxFSLgMzGpUMDlBUlQ0RFhQNVRHSjlGNkpUTkRYRkUyNS4u&lang=EN"
          >Questionnaire</a></h2>
        </p>
      </div>
      <!--====================The Chinese Introduction====================-->
      <div v-if="lang_is_zh">
        <p>
          感谢您的参与，本次实验的结果已经上传。请在前往问卷之前，<strong class="text-info">点击下面的数字以复制
          测试编号</strong>:
        </p>
        <h2 class="text-center text-large text-success" ref="copy" @click="copyID()">{{this.session_id}}
          <svg v-show="iscopy" width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-check-circle-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style="margin-bottom:7px">
            <path fill-rule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
          </svg>
        </h2>
        <p>如果您已复制测试编号，您可以点击右侧链接以前往问卷：
          <h2 class="text-center"><a target="_blank" href="https://forms.office.com/Pages/ResponsePage.aspx?id=eouJ5YecS0qyKi3z81XgHnxB1gMPgXtOvnxFSLgMzGpUMDlBUlQ0RFhQNVRHSjlGNkpUTkRYRkUyNS4u&lang=zh-CN"
          >调查问卷</a></h2>
        </p>
      </div>
    </b-modal>

    <b-modal
      v-model="about_modal"
      :no-close-on-backdrop="modal_property"
      :no-close-on-esc="modal_property"
      size="lg"
      title="About This Experiment"
      hide-footer
    >
      <div v-if="!this.lang_is_zh">
        <p><strong class="text-danger">Notice: This test requires a good network environment to load resources smoothly. We recommend that you connect to Wi-Fi before starting the test.</strong></p>
        <p v-if="!this.is_desktop"><strong class="text-danger">* We notice that you're using mobile device; Please open this page on PC for better experience. *</strong></p>

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
        <p class="text-right">August 2020</p>
      </div>
      <!--====================The Chinese Introduction====================-->
      <div v-if="this.lang_is_zh">
        <p><strong class="text-danger">注意：本测试需要良好的网络环境以顺利加载资源，我们推荐您在Wi-Fi环境下使用。</strong></p>
        <p v-if="!this.is_desktop"><strong class="text-danger">* 我们注意到您正在使用移动端，请尽可能使用PC端以获得更好的体验。 *</strong></p>
      
        <p>音画不同步现象在流媒体中很常见，它是由硬件无线通信过程中不稳定的网络或传输延迟引起的。这个实验的目的是音画不同步现象的感知敏感性，以及在多大程度上影响了视听体验。</p>

        <p>
          一段内容中性，适合所有年龄段的随机视频片段将显示在页面上。视频和声音之间将会存在
          <strong class="text-info">-1.5 至 1.5秒的不同步</strong>。您的任务是通过点击按钮调整音频轨道，使之与视频轨道同步。您可以通过滑块更改每次点击产生时间间隔，调整范围为0.1 至 0.9秒。我们禁止了暂停功能，以模拟在YouTube或Twitch上的流媒体观看体验。
        </p>

        <p>
          当你认为视频和声音同步时，你可以点击
          <strong class="text-success">“Done!”</strong>按钮，你的操作记录将被上传。当然，如果你竭尽全力也无法对齐视频和声音时，可以点击
          <strong class="text-danger">“Give Up”</strong> 按钮。
          <strong class="text-info">在提交前请您保持在本网页画面。</strong>
        </p>

        <p>提交结果后，我们希望邀请您填写一份问卷，您所有的个人信息和实验日志仅用于学术研究。本平台的代码将在GitHub上开源。</p>
        <p>感谢您的参与和贡献！</p>
        <p class="text-right">香港中文大学（深圳） - 人云系统实验室</p>
        <p class="text-right">2020年8月</p>
      </div>
    </b-modal>

    <div style="background-color:#000000;" class="container-fluid">

      <div class="container" style="pointer-events: none;">
        <vue-plyr ref="video" :options="video_options" >
          <video preload="auto" playsinline poster v-bind:src="this.video_url" type="video/mp4"></video>
        </vue-plyr>
      </div>
    </div>

    <!-- <vue-plyr class="container" ref="audio" :options="audio_options">
      <audio>
        <source v-bind:src="audio_url" type="audio/mp3"/>
      </audio>
    </vue-plyr>-->

    <vue-plyr ref="audio" :options="audio_options" style="pointer-events: none">
      <audio preload="auto" v-bind:src="audio_url" controls></audio>
    </vue-plyr>

    <hr />
    <div class="container">
      <div class="container" align="center">
        
          <div class="text-center">
            <button
              type="button"
              class="btn btn-lg btn-info"
              :class="{'btn-warning':start_btn=='Restart'}"
              @click="startTest()"
            >{{start_btn}}: {{this.select_name}}</button>
          </div>

        <div style="width:55%; padding-top:8px" >
          <label for="range" v-if="!lang_is_zh">Adjust Step: <strong class="text-info" style="font-size:15px">{{ adjust_amount }}</strong> Seconds</label>
          <label for="range" v-if="lang_is_zh">调整间距： <strong class="text-info" style="font-size:15px">{{ adjust_amount }}</strong> 秒</label>
          <b-form-input
            id="range"
            v-model="adjust_amount"
            type="range"
            min="0.1"
            max="0.9"
            step="0.1"
            class="background-color:red"
          ></b-form-input>
        </div>

        <div class="form-inline">
          <div style="width:100%;align:center">
            <button
              type="button"
              class="btn btn-outline-primary btn-lg"
              style="margin-right:5px; font-size:15px"
              @click="RewindTime()"
            >
              <svg style="font-size: 23px; margin-bottom:4px" width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-skip-backward" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M.5 3.5A.5.5 0 0 1 1 4v3.248l6.267-3.636c.52-.302 1.233.043 1.233.696v2.94l6.267-3.636c.52-.302 1.233.043 1.233.696v7.384c0 .653-.713.998-1.233.696L8.5 8.752v2.94c0 .653-.713.998-1.233.696L1 8.752V12a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5zm7 1.133L1.696 8 7.5 11.367V4.633zm7.5 0L9.196 8 15 11.367V4.633z"/>
              </svg>
            {{ adjust_amount }}
            </button>

            <button
              type="button"
              class="btn btn-outline-primary btn-lg"
              style="margin-left:5px; font-size:15px"
              @click="ForwardTime()"
            >{{ adjust_amount }}
              <svg style="font-size: 23px; margin-bottom:4px" width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-skip-forward" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M15.5 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V8.752l-6.267 3.636c-.52.302-1.233-.043-1.233-.696v-2.94l-6.267 3.636C.713 12.69 0 12.345 0 11.692V4.308c0-.653.713-.998 1.233-.696L7.5 7.248v-2.94c0-.653.713-.998 1.233-.696L15 7.248V4a.5.5 0 0 1 .5-.5zM1 4.633v6.734L6.804 8 1 4.633zm7.5 0v6.734L14.304 8 8.5 4.633z"/>
              </svg>
            </button>
          </div>
        </div>

        <br />
        <button
          type="button"
          class="btn btn-success"
          v-bind:disabled="duplicate_submission"
          style="margin-right:10px"
          @click="intergrationResult(true)"
        >Done! It's Synchronized</button>
        <button
          type="button"
          class="btn btn-danger"
          v-bind:disabled="duplicate_submission"
          style="margin-left:10px"
          @click="intergrationResult(false)"
        >I Give Up</button>
      </div>
      
      <!-- develop usage -->
      <!-- <button @click="test()">here</button> -->
      <!-- <h5>{{video_load_progress}}</h5> -->

      <hr/>
      <div v-show="!guide_switch">
          <p v-if="!lang_is_zh">
            Try to  <strong class="text-info">adjust the soundtrack to fit the video</strong> by clicking the buttons above. You can <strong class="text-info">adjust the step using the SlideBar</strong>. If you think the audio and the video is sychronized, click the <strong class="text-success">Done!</strong> button; If you find it too difficult to complete the task, feel free to click the <strong class="text-danger">I Give Up</strong> button.
          </p>
          <p v-if="lang_is_zh">
            尝试点击上面的按钮，您需要<strong class="text-info">调整声音轨道</strong>来使音画同步. 你可以通过<strong class="text-info">调整滑块来调节每次操作的间隔</strong>。当您认为声音和画面同步时，请点击<strong class="text-success">Done!</strong>按钮；当您认为无法使声音和画面同步时，请点击<strong class="text-danger">I Give Up</strong>按钮。
          </p>
      </div>

      <div v-show="guide_switch">
          <strong class="text-danger">There's no way back. You have entered the "Just Do It" mode, please finish finish the test with "Just Do It" clip or Refresh the window to start a new session. </strong>
      </div>

      <!--===================Footer Area===================-->
      <p class="text-primary text-center" style="margin-top:100px">
        Design and Develop by <a target="_blank" href="https://hcslab.cuhk.edu.cn">Human-Cloud System Laboratory</a>. All Right Reserved © 2020 ｜ <a target="_blank" href="https://github.com/HCSLab">Source Code</a>
      </p>
      <p class="text-primary text-center">
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
      is_desktop: null,
      lang_is_zh: null,
      start_btn: 'Start',
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
        location: null,
        device: null,
        os: null,
        language: null
      },
      // player setting
      video_options: {
        autoplay: false,
        controls: [], // ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'settings', 'pip', 'airplay', 'fullscreen']
        volume: 0,
        ratio: "16:9",
        // hideControls: false
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
    }
  },
  created() {
    // for dev
    // this.base_url = "http://localhost:3000";
    this.base_url = "http://47.242.3.232:3000";

    // for deploy
    // this.base_url = "";
    
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
    // ip information
    axios.get('http://ip-api.com/json/')
      .then((response) => {
        this.upload_result.location = response.data.country
      })
      .catch((error) => console.log(error))
    // lang check
    this.lang_is_zh = navigator.language == 'zh-CN';    
    this.upload_result.language = navigator.language;
    // device check
    this.upload_result.os = device['os'];
    this.upload_result.device = device['type'];
    this.is_desktop = device.desktop()

    //for dev
    // console.log(this.upload_result)
  },
  methods: {
    // test(){
    //   console.log(this.video.buffered, this.video.seeking, this.video.duration)
    //   console.log(this.audio.buffered, this.audio.seeking, this.audio.duration)
    // },
    changeLang(){
      this.lang_is_zh = !this.lang_is_zh
      // console.log(this.lang_is_zh)
    },
    copyID(){
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
      this.start_btn = 'Restart';
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