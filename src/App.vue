<template>
  <div style="background-color:#D3D3D3; height:1200px">

    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <a class="navbar-brand" href="#">HCS Laboratory</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarColor01">
          <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
              <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
              <a class="nav-link" href="#" @click="about_modal = !about_modal">About</a>
          </li>
          <li class="nav-item">
              <a class="nav-link" href="#">Contact</a>
          </li>
          </ul>
          <form class="form-inline my-2 my-lg-0">
          <input class="form-control mr-sm-2" type="text" placeholder="Search">
          <button class="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
          </form>
      </div>
    </nav>

    <b-modal v-model="about_modal" size="lg" title="About This Experiment">
      <p>You may have heard of audio visual integration, likely from an audio visual integrator when describing what they do. It’s a mainstream term in the industry, but for most audio visual integration is like the word strategy. People have an idea of what it means, but a cohesive definition doesn’t exactly roll off the tongue.</p>
      <p>We’ll start with audio visual-Audio visual is: “of or relating to both hearing and sight”.This makes sense when you think of video conferencing and how conversation is enhanced by the ability to see the person you’re talking to. Next is integration, defined by Merriam-Webster as “the action or process of integrating”. That’s not very helpful, so we dig deeper and find that
      Integrating means: “to form, coordinate, or blend into a functioning or unified whole”.</p>
      <p>However, there’s another key piece to audio visual integration: design. Neurilink is an audio visual design and integration firm, we help people connect and communicate through audio visual technology.</p>
      <p>AV design and integration is a lot more than hanging displays on a wall and plugging them in. The design piece is critical, it enables the team to integrate the technologies into a functioning solution. It requires trained designers to map out the entire system, making sure each technology is compatible and, when combined, able to create the outcome the customer envisions.</p>
      <p>Other elements of a solid audio visual system design are control system programming, user interface layouts, architectural drawing packages and system documentation.  Each of these elements plays a key role in providing systems that function properly and reliably.
      After the design process is complete, technicians can begin integrating the hardware. They physically go to the site, pull in wire, mount displays, install speakers and screens, connect the different electronic components, make sure everything functions properly.</p>
      <br>
      <p class="text-right">HCS Laboratory, CUHK(SZ)</p>
      <p class="text-right">July 2020</p>
    </b-modal>

    <div style="background-color:#000000;" class="container-fluid">
      <div class="container">
      <vue-plyr ref="video" :options="video_options">
        <video playsinline="" controls poster="" src="./assets/daoko.mp4">
        </video>
      </vue-plyr>
      </div>
    </div>
    
    <div class="container">
      <vue-plyr ref="audio" :options="audio_options">
        <audio>
          <source src="./assets/daoko.mp3" type="audio/mp3"/>
        </audio>
      </vue-plyr>
    </div>

    <hr />
    <div class="container">
        <div class="container" align="center">
          <p>Try to adjust the soundtrack to fit the video by clicking the buttons below. If you are ready, click
            <button type="button" class="btn btn-sm btn-primary" @click="startTest()">start</button> button here to play the video and audio. If you would like to restart the test, click <button type="button" class="btn btn-sm btn-primary" @click="restartTest()">restart</button> button here.
          </p>
          <hr />

          <div class="btn-group" role="group" aria-label="Basic example">
            <button type="button" class="btn btn-secondary" style="margin-right:5px" @click="RewindTime(2)">Slower -2</button>
            <button type="button" class="btn btn-secondary" style="margin-right:2px" @click="RewindTime(5)" >Slower -5</button>
            <button type="button" class="btn btn-secondary" style="margin-left:2px" @click="ForwardTime(5)">Faster +5</button>
            <button type="button" class="btn btn-secondary" style="margin-left:5px" @click="ForwardTime(2)">Faster +2</button>
          </div>
          <br />
          <br />
          <button type="button" class="btn btn-success" style="margin-right:10px" @click="GoodIntergration()">Good Intergration</button>
          <button type="button" class="btn btn-danger" style="margin-left:10px" @click="BadIntergration()">Bad Intergration</button>
        </div>


      <br />
      <h3>Audiovisual</h3>
      <p>
        You may have heard of audio visual integration, likely from an audio visual integrator when describing what they do. It’s a mainstream term in the industry, but for most audio visual integration is like the word strategy. People have an idea of what it means, but a cohesive definition doesn’t exactly roll off the tongue.
        We’ll start with audio visual-
        Audio visual is: “of or relating to both hearing and sight”.
        This makes sense when you think of video conferencing and how conversation is enhanced by the ability to see the person you’re talking to. Next is integration, defined by Merriam-Webster as “the action or process of integrating”. That’s not very helpful, so we dig deeper and find that
        Integrating means: “to form, coordinate, or blend into a functioning or unified whole”.
      </p>
      <br />
      <p
        class="text-muted text-center"
      >Design and Develop by HCS Laboratory. All Right Reserved © 2020 ｜ hcs.sse.cuhk.edu.cn ｜ Powered by Vue.js & Bootstrap</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {

  },
  data(){
      return {
        about_modal: true,
        operation_storage:[],
        video_options:{
          'autoplay': false,
          'controls': [],
          'volume': 0,
          'ratio':'16:9',
        },
        audio_options:{
          'autoplay': false,
          'controls': ['current-time', 'volume']
        }
      }
  },
  computed:{
    video(){
      return this.$refs.video.player
    },
    audio(){
      return this.$refs.audio.player
    }
  },
  mounted(){
    
  },
  methods:{
    startTest(){
      this.video.play()
      this.audio.play()
    },
    restartTest(){
      this.video.restart()
      this.audio.restart()
      this.operation_storage = []
    },
    ForwardTime(amount){
      this.audio.forward(amount)
      this.operation_storage.push(amount)
      console.log(this.operation_storage)
      console.log(this.audio.currentTime)
    },
    RewindTime(amount){
      this.audio.rewind(amount)
      this.operation_storage.push(amount*-1)
      console.log(this.operation_storage)
      console.log(this.audio.currentTime)
    },
    BadIntergration(){

    },
    GoodIntergration(){
      this.toastCount++
        this.$bvToast.toast('Your records have been uploaded', {
          title: 'Submisstion Complete',
          autoHideDelay: 1000,
          appendToast: false,
          variant: 'success',
          solid: true
        })
    },
  }
}
</script>