<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->

    <!--单组件路由视图，不需要指定name-->
    <router-view/>

    <!--多组件路由视图，需要指定name，页面按路由顺序显示组件-->
    <!--header-->
    <router-view name="Header"/>
    <router-view name="HeaderAnother"/>

    <!--lcw_components-->
    <router-view name="ImgCom"/>
    <router-view name="Test"/>
    <router-view name="Home"/>

    <!--footer-->
    <router-view name="Footer"/>
    <router-view name="FooterAnother"/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
