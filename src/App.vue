<template>
  <div id="app">
    <div class="vuers" ref="vuers">
      <h2 class="title">此时{{ qqList.length || 0 }}位{{ devType | toUpperCase }}开发者路过</h2>
      <ul>
        <li v-for="item in qqList" :key="item.qqNumber">
          <img alt="person" src="./assets/images/person-vue.jpg">
          <div class="vuer">
            <img :src="`http://q1.qlogo.cn/g?b=qq&nk=${item.qqNumber}&s=5`" alt="avatar">
            <h6 class="nickname">{{item.nickname}}</h6>
          </div>
          </li>
      </ul>
    </div>
    <strong style="color: red;">请输入正确的qq号，这里不做表单验证</strong>
    <div class="forms">
      <label>开发者类型：<input type="text" placeholder="开发者类型" v-model="devType"></label><code style="color: rgba(0, 0, 0, .55);font-size: 12px;margin-left: 5px;">暂时只支持vue的logo</code>
      <br />
      <label>QQ号：<input type="text" placeholder="QQ号" v-model.number="qqNumber"><input type="button" value="添加" @click="addQqNumber"><input type="button" value="删除" @click="delQqNumber"><input type="button" value=清空 @click="emptyUsersAndPreview"></label>
      <br />
      <template v-if="qqList.length > 0">
        {{ qqList }}
      </template>
      <br />
      <button @click="handlePreviewimage">生成预览</button>
      <!-- <button @click="handleExportimage">导出图片</button> -->
    </div>
    <div class="preview" ref="preview"></div>
  </div>
</template>

<script>
import html2canvas from 'html2canvas'
import axios from 'axios'
export default {
  name: 'app',
  data () {
    return {
      qqNumber: null,
      qqList: [],
      devType: 'vue'
    }
  },
  filters: {
    toUpperCase (param) {
      if (!param) {
        return 'vue'.toUpperCase()
      } else {
        return param.toUpperCase()
      }
    }
  },
  methods: {
    async addQqNumber () {
      if (this.qqNumber && !this.qqList.some(item => item.qqNumber === this.qqNumber)) {
        const res = await axios.get(`http://47.99.188.127:9990/user/${this.qqNumber}`)
        let nickname = res.data.nickname
        this.qqList.push({
          qqNumber: this.qqNumber,
          nickname: nickname
        })
        this.qqNumber = null
      } else {
        return false
      }
    },
    delQqNumber () {
      if (this.qqNumber && this.qqList.some(item => item.qqNumber === this.qqNumber)) {
        this.qqList.splice(this.qqList.findIndex(item => item.qqNumber === this.qqNumber), 1)
        this.qqNumber = null
      } else {
        return false
      }
    },
    emptyUsersAndPreview () {
      this.qqList = []
      this.$refs.preview.innerHTML = ''
    },
    handleExportimage () {
      if (this.$refs.preview.childNodes.length > 0) {
        this.$nextTick(() => {
          console.log(this.$refs.preview.childNodes[0].toDataURL('image/png'))
        })
      }
    },
    handlePreviewimage () {
      if (this.qqList.length > 0) {
        this.$refs.preview.innerHTML = ''
        html2canvas(this.$refs.vuers, {
          useCORS: true,
          allowTaint: true,
          proxy: 'http://q1.qlogo.cn',
          logging: false,
          width: this.qqList.length > 1 ? 150 * this.qqList.length : 320,
          x: this.qqList.length < 2 ? (this.$refs.vuers.clientWidth - 300) / 2 : this.$refs.vuers.clientWidth - this.qqList.length * 130 < 0 ? 0 : (this.$refs.vuers.clientWidth - this.qqList.length * 130) / 2
        }).then(canvas => {
          this.$refs.preview.appendChild(canvas)
        })
      }
    }
  }
}
</script>

<style lang="scss">
ul, li {
  list-style: none;
}
#app {
  .vuers {
    padding: 0 20px;
    .title {
      color: #a60cde;
      text-align: center;
      margin-bottom: 30px;
    }
    ul {
      // display: flex;
      // flex: 1;
      // justify-content: center;
      text-align: center;
      li {
        display: inline-block;
        position: relative;
        width: 130px;
        & > img {
          width: 100%;
        }
        .vuer {
          width: 70%;
          position: absolute;
          top: 3%;
          text-align: center;
          .nickname {
            width: 100%;
            text-align: center;
            color: #fff;
            margin-top: 0;
            font-size: 12px;
          }
          img {
            display: inline-block;
            width: 45%;
            border-radius: 50%;
          }
        }
      }
    }
  }
}
</style>
