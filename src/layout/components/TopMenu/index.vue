<template>
  <div class="top-menu-container">
    <div class="top-menu-main">
      <div
        v-for="key in functionArr"
        :key="key.functionid"
        class="top-menu-main-item"
        @click="changeFunction"
      >
        <span
          class="top-menu-text"
          :class="activeFunctionid === key.functionid ?'top-menu-main-item-active':''"
        >
          {{ key.label }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      functionArr: [
        {
          label: '首页',
          functionid: 'a1'
        },
        {
          label: '经济运行',
          functionid: 'b1'
        },
        {
          label: '系统管理',
          functionid: 'c1'
        }
      ],
      activeFunctionid: 'c1'
    }
  },
  methods: {
    changeFunction () {
    }
  }
}
</script>

<style scoped>
.top-menu-container{
  width: 100%;
  height: 50px;
  background-color: #262f40;
  line-height: 50px;
  color: #ffffff;
}
.top-menu-main{
  width: 100%;
  height: 100%;
  overflow: hidden;
  line-height: 50px;
  font-size: 0;
  
}
.top-menu-main-item{
  font-size: 20px;
  display: inline-block;
  height: 100%;
  padding: 0 30px;
  text-align: center;
}
.top-menu-text{
  display: inline-block;
  height: 100%;
  padding: 0 3px;
  cursor: pointer;
}
.top-menu-text:hover{
  border-bottom: 4px solid #589ef8;
}
.top-menu-main-item-active{
  border-bottom: 4px solid #589ef8;
}
</style>
