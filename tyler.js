let tilePage = Vue.component('tile-page', {
  template: `
    <div :style="styleObj" :class="{'bg-light-blue': !imgsrc}" class="vh-100 dt w-100 helvetica">
      <div class="dtc v-mid tc"> 
        <form class="mw7 center">
          <fieldset class="cf bn ma0 pa0">
            <div class="cf shadow-2">
              <label class="fileContainer fl f6 f5-l pv3 bn tc pointer w-100 bg-animate hover-bg-white bg-light-gray">
                <span>{{ label }}</span>
                <input @change="getimage($event)" type="file" accept=".png,.jpg,.jpeg"/>
              </label>
              <a v-if="src" :href="src" class="f6 f5-l no-underline pv3 button-reset bn fl tc bg-animate bg-black-70 hover-bg-black white pointer w-100">{{ btn }}</a>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  `,
  data: function () {
    return {
      label: 'Select file',
      src: '',
      btn: 'Get wallpaper',
      imgsrc: ''
    }
  },
  computed: {
    styleObj: function () {
      return {
        'background-image': 'url(' + this.imgsrc + ')'
      }
    }
  },
  methods: {
    getimage: function (e) {
      let file = e.target.files[0]
      let width = window.screen.width
      let height = window.screen.height
      let vm = this

      if (file) {
        let reader = new FileReader()
        vm.label = file.name

        reader.onload = function (e) {
          let canvas = document.createElement('canvas')
          let ctx = canvas.getContext('2d')
          let img = new Image()
          canvas.width = width
          canvas.height = height
          img.src = e.target.result
          vm.imgsrc = e.target.result

          img.onload = function () {
            let pattern = ctx.createPattern(img, 'repeat')
            ctx.fillStyle = pattern
            ctx.fillRect(0, 0, width, height)
            vm.src = canvas.toDataURL()
          }
        }

        reader.readAsDataURL(file)
      }
    }
  }
})
