<template>
  <div id="app">
    <div class="vuers">
      <h2 class="title">此时{{ qqList.length || 0 }}位{{ devType | toUpperCase }}开发者路过</h2>
      <ul>
        <li v-for="item in qqList" :key="item">
          <img alt="person" src="./assets/images/person.jpg">
          <div class="vuer">
            <img :src="`http://q1.qlogo.cn/g?b=qq&nk=${item}&s=5`" alt="avatar">
            <h6 class="nickname">12</h6>
          </div>
          </li>
      </ul>
    </div>
    <strong style="color: red;">请输入正确的qq号，这里不做表单验证</strong>
    <div class="forms">
      <label>开发者类型：<input type="text" placeholder="开发者类型" v-model="devType"></label>
      <br />
      <label>QQ号：<input type="text" placeholder="QQ号" v-model.number="qqNumber"><input type="button" value="添加" @click="addQqNumber"><input type="button" value="删除" @click="delQqNumber"></label>
      <br />
      {{ qqList }}
      <br />
      <button @click="handleExportimage">导出图片</button>
    </div>
  </div>
</template>

<script>
import html2canvas from 'html2canvas'
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
        return false
      } else {
        return param.toUpperCase()
      }
    }
  },
  methods: {
    addQqNumber () {
      if (this.qqNumber && !this.qqList.some(item => item === this.qqNumber)) {
        this.qqList.push(this.qqNumber)
        this.qqNumber = null
      } else {
        return false
      }
    },
    delQqNumber () {
      if (this.qqNumber && this.qqList.some(item => item === this.qqNumber)) {
        this.qqList.splice(this.qqList.findIndex(item => item === this.qqNumber), 1)
        this.qqNumber = null
      } else {
        return false
      }
    },
    handleExportimage () {
      if (this.qqList.length > 0) {
        html2canvas(document.querySelector('.vuers'), {
          allowTaint: true,
          proxy: 'http://q1.qlogo.cn',
          logging: false
        }).then(canvas => {
          document.body.appendChild(canvas)
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
    .title {
      color: #a60cde;
      text-align: center;
      margin-bottom: 30px;
    }
    ul {
      display: flex;
      flex: 1;
      justify-content: center;
      li {
        position: relative;
        max-width: 200px;
        & > img {
          width: 100%;
        }
        .vuer {
          width: 140px;
          position: absolute;
          top: 8px;
          .nickname {
            width: 100%;
            text-align: center;
            color: #fff;
            margin-top: 8px;
            font-size: 16px;
          }
          text-align: center;
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
