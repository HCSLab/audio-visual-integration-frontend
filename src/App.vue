<template>
  <div style="background-color:	#cccccc; height:1340px">
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
          <strong class="text-info">0 to 10 seconds, either the video or the audio ahead</strong>. Your task includes <strong class='text-info'>four stages</strong>: <ul><li>1. Determine if the audio and video are synchronized;</li> <li>2-4. adjust the audio track to fit the video <strong class="text-success">for three attempts</strong>. Detailed guidance wil show in stages.</li></ul>
        </p>

        <p>
          After finishing four stages, you will see a pop-up window showing your 13-digit <strong class="text-info">completion code</strong>. We’d like you to <strong class="text-info">copy the code, and fill a questionnaire</strong>. All your personal information and experiments logs will be only used for academia. The source code of this project available on GitHub.
        </p>

        <p>Thank you for your participance!</p>
        <p class="text-right">HCS Laboratory, CUHK(SZ)</p>
        <p class="text-right">Octobar 2020</p>
      </div>
      <!--====================The Chinese Introduction====================-->
      <div v-if="this.lang_is_zh">
        <p><strong class="text-danger">注意：本测试需要良好的网络环境以顺利加载资源，我们推荐您在Wi-Fi环境下使用。</strong></p>
        <p v-if="!this.is_desktop"><strong class="text-danger">* 我们注意到您正在使用移动端，请尽可能使用PC端以获得更好的体验。 *</strong></p>
      
        <p>音画不同步现象在流媒体中很常见，它是由硬件无线通信过程中不稳定的网络或传输延迟引起的。这个实验的目的是音画不同步现象的感知敏感性，以及在多大程度上影响了视听体验。</p>

        <p>
          一段内容中性，适合所有年龄段的随机视频片段将显示在页面上。声音将相对于视频存在
          <strong class="text-info">-10 至 10秒的不同步</strong>。您的任务包括<strong class="text-info">四个部分</strong>：<ul><li>1. 判断视频和音频的同步情况；</li><li>2. <strong class="text-success">三次</strong>尝试调整音频，使之与视频同步。</li></ul>
        </p>

        <p>
          完成四个部分后，您将看见一个包含13位<strong class="text-info">完成码</strong>的弹窗，我们希望邀请您<strong class="text-info">复制改完成码，并填写一份问卷</strong>。您所有的个人信息和实验日志仅用于学术研究。本平台的代码在GitHub上开源。
        </p>

        <p>感谢您的参与和贡献！</p>
        <p class="text-right">香港中文大学（深圳） - 人云系统实验室</p>
        <p class="text-right">二〇二〇年十月</p>
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

    <vue-plyr v-show="false" ref="audio" :options="audio_options" style="pointer-events: none">
      <audio preload="auto" v-bind:src="audio_url" controls></audio>
    </vue-plyr>

    <b-progress :max="4" height="2rem">
      <b-progress-bar :value="stage_number" striped animated variant="success">
          <span class="text"><strong>Stage Progress: {{stage_number}}/4</strong></span>
      </b-progress-bar>
    </b-progress>

    <hr />
    <div class="container" >

      <div class="container" align="center" v-show="show_judge_panel">
        <div class="text-center">
            <button
              type="button"
              class="btn"
              v-bind:class="[isplaying ? 'btn-warning' : 'btn-info']"
              @click="startTest()"
            >{{start_btn_state}}</button>
        </div>
        <br />
        <div>
          <b-form-group>
            <span v-show="!lang_is_zh">Are the audio and the video synchronized?</span>
            <span v-show="lang_is_zh">音频和视频是否同步?</span>
            <b-form-radio v-model="upload_result.stage_1_1" value="yes">Yes</b-form-radio>
            <b-form-radio v-model="upload_result.stage_1_1" value="no">No</b-form-radio>
          </b-form-group>

          <b-form-group>
            <span v-show="!lang_is_zh">Which of the track is ahead?</span>
            <span v-show="lang_is_zh">在音频和视频中，哪一个在前面?</span>
            <b-form-radio v-model="upload_result.stage_1_2" value="video">Video</b-form-radio>
            <b-form-radio v-model="upload_result.stage_1_2" value="audio">Audio</b-form-radio>
            <b-form-radio v-show="upload_result.stage_1_1 == 'yes'" v-model="upload_result.stage_1_2" value="same">Synchronized</b-form-radio>
          </b-form-group>
        </div>
        <br />
        <div class="container" align="center">
        <button class="btn btn-info" @click="next_stage()">Next Stage</button>
        </div>

        <hr/>
        <div>
            <p v-if="!lang_is_zh">
              <strong class="text-info">Stage {{stage_number}}: </strong>Play the video. You should first judge whether the audiovisual is synchronous, then determine the their order.
            </p>
            <p v-if="lang_is_zh">
              <strong class="text-info">Stage {{stage_number}} </strong>您需要先辨别音画是否同步，再判断声音在前还是画面在前。
            </p>
        </div>

      </div>

      <div class="container" align="center" v-show="show_adjust_panel">
        
          <div class="text-center">
            <button
              type="button"
              class="btn"
              v-bind:class="[isplaying ? 'btn-warning' : 'btn-info']"
              @click="startTest()"
            >{{start_btn_state}}</button>
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


        <hr/>
        <div v-if="stage_number == 2">
            <p v-if="!lang_is_zh">
              <strong class="text-info">Stage {{stage_number}}: </strong>Your task is <strong class="text-success">adjusting the audio track to fit the video</strong>. Here are the mentions:
              <ul class="list-unstyled">
                <li> 1. The adjust step can be changed from 0.1 to 0.9 second by the slider. The default value is 0.3 second.</li>
                <li>2. You can forward or rewind the audio track by clicking the buttons below the slider.</li>
                <li>3. Press the <strong class="text-warning">Restart</strong> button can clear your operation logs and refresh the stage.</li>
                <li>4. You can submit and to the next stage by clicking the <strong class="text-info">Done</strong> button when you feel the audiovisual is synchronous; or, the <strong class="text-danger">Give Up</strong> button after trying you best but the audiovisual is still asynchronous.</li>
              </ul>
            </p>
            <p v-if="lang_is_zh">
              <strong class="text-info">Stage {{stage_number}}: </strong>您需要<strong class="text-success">调整音轨，使之于视频同步</strong>. 以下是指引:
              <ul>
                <li>1. 每次调整的间距可以由滑块在0.1到0.9秒内调整，默认值是0.3秒。</li>
                <li>2. 通过点击滑块下方的两个按钮，来使音轨快进或快退。</li>
                <li>3. 点击 <strong class="text-warning">Restart</strong> 按钮将消除您的操作记录，并重新开始这个stage。</li>
                <li>4. 您可以通过点击 <strong class="text-info">Done</strong> 按钮来提交您的操作并进入下一个Stage；当您竭尽全力也无法使音画同步时，点击 <strong class="text-danger">Give Up</strong> 按钮放弃，并进去下一个Stage。</li>
              </ul>
            </p>
        </div>

        <div v-if="stage_number == 3">
            <p v-if="!lang_is_zh">
              <strong class="text-info">Stage {{stage_number}}: </strong>It is the same as Stage 2 but you should <strong class="text-info">re-synchronize</strong> the audiovisual and submit it again. If you have already synchronized the audiovisual in Stage 1, feel free the direct press <strong class="text-success">Done</strong>.
            </p>
            <p v-if="lang_is_zh">
              <strong class="text-info">Stage {{stage_number}}: </strong>同Stage 2 一样，但您需<strong class="text-info">要重新使音画同步</strong>并再次提交。若您认为经过 Stage 1 的调整音画已经同步，您也可以直接点击 <strong class="text-success">Done</strong> 按钮。
            </p>
        </div>

        <div v-if="stage_number == 4">
            <p v-if="!lang_is_zh">
              <strong class="text-info">Stage {{stage_number}}: </strong>You're <strong class="text-success">almost done!</strong> What you need to do is the same as two previous stages. Notice that after your submission, there will be a pop-up window showing your<strong class="text-info"> 13-digit completion code</strong>. Please copy it as your session ID.
            </p>
            <p v-if="lang_is_zh">
              <strong class="text-info">Stage {{stage_number}}: </strong><strong class="text-success">您几乎完成了！</strong> 您需要同前两个Stage一样，再次完成同步。当您提交后，将会出现一个包含<strong class="text-info">13位数字的完成码</strong>。请将其复制作为您本次测试的编号。
            </p>
        </div>

      </div>
      
      <!-- develop usage -->
      <!-- <div class="container" align="center">
        <button class="btn btn-warning" @click="test()">test</button>
      </div> -->
      

      <!--===================Footer Area===================-->
      <br />
      <br />
      <br />
        <p class="text-primary text-center">
          Powered by
          <a target="_blank" href="https://vuejs.org/">Vue</a>,
          <a target="_blank" href="https://github.com/bootstrap-vue/bootstrap-vue">Bootstrap-Vue</a>,
          <a target="_blank" href="https://bootswatch.com/">Bootswatch</a>,
          <a target="_blank" href="https://github.com/sampotts/plyr">sampotts/plyr</a> & coffee ☕️
        </p>
        <p class="text-primary text-center" >
          Design and Develop by <a target="_blank" href="https://hcslab.cuhk.edu.cn">Human-Cloud System Lab@CUHK(SZ)</a>. All Right Reserved © 2020 ｜ <a target="_blank" href="https://github.com/HCSLab">Source Code(GitHub)</a>
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
      stage_storage: [], //[stage2 indicator, stage2 action, stage3 indicator, stage3 action, stage4 indicator, stage4 action]
      stage_number: 1,
      is_desktop: null,
      lang_is_zh: null,
      start_btn_state: "Start",
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
      isplaying: false,

      //upload_result
      upload_result: {
        stage_1_1: "",
        stage_1_2: "",
        stage_2_indicator: null,
        stage_2_actions: null,
        stage_3_indicator: null,
        stage_3_actions: null,
        stage_4_indicator: null,
        stage_4_actions: null,
        timestamp: null,
        video_name: null,
        delay: null,
        location: null,
        device: null,
        os: null,
        language: null,
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
    show_judge_panel() {
      if (this.stage_number == "1") {
        return true;
      } else {
        return false;
      }
    },
    show_adjust_panel() {
      if (this.stage_number == "1") {
        return false;
      } else {
        return true;
      }
    },
    video() {
      return this.$refs.video.player;
    },
    audio() {
      return this.$refs.audio.player;
    },
  },
  created() {
    this.isplaying = false;
    // for dev
    // this.base_url = "http://localhost:3000";
    // this.base_url = "http://47.242.3.232:3000";

    // for deploy
    this.base_url = "";

    this.delay = Math.random() * 20 - 10;
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

        // for dev
        // console.log(this.delay);
        // console.log(this.audio_url);
        // console.log(this.video_url);
      })
      .catch((error) => console.log(error));
  },
  mounted() {
    // ip information
    axios
      .get("http://ip-api.com/json/")
      .then((response) => {
        this.upload_result.location = response.data.country;
      })
      .catch((error) => console.log(error));
    // lang check
    this.lang_is_zh = navigator.language == "zh-CN";
    this.upload_result.language = navigator.language;
    // device check
    this.upload_result.os = device["os"];
    this.upload_result.device = device["type"];
    this.is_desktop = device.desktop();
    this.upload_result.delay = this.delay.toString();

    //for dev
    // console.log(this.upload_result)
  },
  methods: {
    next_stage() {
      if (
        this.upload_result.stage_1_1 == "" ||
        this.upload_result.stage_1_2 == ""
      ) {
        this.$bvToast.toast("Please do not submit empty", {
          title: "Alert",
          autoHideDelay: 2000,
          appendToast: false,
          variant: "danger",
        });
      } else {
        if (!this.video.playing) {
          this.$bvToast.toast("Please start the test", {
            title: "Alert",
            autoHideDelay: 2000,
            appendToast: false,
            variant: "danger",
          });
        } else {
          this.video.stop();
          this.audio.stop();
          this.isplaying = false;
          this.start_btn_state = "Start";
          this.stage_number += 1;
        }
      }
    },
    // test(){
    //   console.log(this.stage_storage)
    //   console.log(this.upload_result)
    // },
    changeLang() {
      this.lang_is_zh = !this.lang_is_zh;
      // console.log(this.lang_is_zh)
    },
    copyID() {
      window.getSelection().removeAllRanges();
      const copyDOM = this.$refs.copy;
      const range = document.createRange();
      range.selectNode(copyDOM);
      window.getSelection().addRange(range);
      document.execCommand("copy");

      this.iscopy = true;
    },
    // start the test, reset the operation storage
    startTest() {
      // this.video.once('canplay', event=>{
      //   this.video.currentTime = 5;
      // this.audio.once('canplay', event=>{
      //   this.audio.currentTime = 5 + this.delay;
      // })

      this.video.currentTime = 10;
      this.audio.currentTime = 10 + this.delay;

      //for dev
      // console.log(this.delay)

      this.audio.volume = 1;
      this.audio.play();
      this.video.play();
      this.start_btn_state = "Restart";
      this.operation_storage = [];
      this.isplaying = true;
    },
    // put forward audio time
    ForwardTime() {
      if (this.audio.playing) {
        var amount = this.adjust_amount * 1;

        // for dev
        // console.log(amount)
        // console.log(this.audio.currentTime)

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
        this.$bvToast.toast("Press start the test", {
          title: "Alert",
          autoHideDelay: 2000,
          appendToast: false,
          variant: "danger",
        });
      }
    },
    // roll backward audio time
    RewindTime() {
      if (this.audio.playing) {
        var amount = this.adjust_amount * 1;

        // for dev
        // console.log(amount)
        // console.log(this.audio.currentTime)

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
        this.$bvToast.toast("Press start the test", {
          title: "Alert",
          autoHideDelay: 2000,
          appendToast: false,
          variant: "danger",
        });
      }
    },
    // collect the operation storage and send to backend
    intergrationResult(result) {
      // if(this.operation_storage.length == 0){
      if (false) {
        // give up warning
        this.give_up_count++;
        this.toastCount++;
        this.$bvToast.toast("At least have one try please :(", {
          title: "Don't Give Up",
          autoHideDelay: 2000,
          appendToast: false,
          variant: "danger",
        });
      } else {
        this.stage_storage.push(result ? "good" : "bad");
        this.stage_storage.push(
          this.operation_storage.map((e) => e.join(",")).join(";")
        );

        // set post json: upload_result
        if (this.stage_number == 4) {
          this.upload_result.stage_2_indicator = this.stage_storage[0];
          this.upload_result.stage_2_actions = this.stage_storage[1];
          this.upload_result.stage_3_indicator = this.stage_storage[2];
          this.upload_result.stage_3_actions = this.stage_storage[3];
          this.upload_result.stage_4_indicator = this.stage_storage[4];
          this.upload_result.stage_4_actions = this.stage_storage[5];

          this.upload_result.video_name = this.select_name;
          this.session_id = new Date().valueOf().toString();
          (this.upload_result.timestamp = this.session_id),
            axios
              .post(this.base_url + "/upload_result", this.upload_result)
              .then((response) => {
                this.toastCount++;
                this.$bvToast.toast("Your records have been uploaded", {
                  title: "Submisstion Complete",
                  autoHideDelay: 2000,
                  appendToast: false,
                  variant: "success",
                });
                // stop video and audio
                this.video.stop();
                this.audio.stop();
                this.isplaying = false;

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
                });
              });
          // for dev active
          console.log(this.upload_result);
        } else {
          // enter next stage
          this.delay = this.audio.currentTime - this.video.currentTime;
          this.start_btn_state = "Start";
          this.video.stop();
          this.audio.stop();
          this.isplaying = false;
          this.operation_storage = [];
          this.stage_number += 1;
        }
      }
    },
  },
};
</script>