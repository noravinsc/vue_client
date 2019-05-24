<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <img src="../assets/img.jpg">
    <img src="@/assets/img.jpg">
    <img :src="imgUrl">
    <div class="Visitor-img">
      <img :src="imgUrl">
      <img src="@/assets/img.jpg">
      <img src="../assets/img.jpg">
    </div>
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloImg',
  data () {
    return {
      msg: 'HelloImg',
      //路径不对
      Imgurl:"@/assets/img.jpg",
      //路径不对
      ImgUrl:"../assets/img.jpg",
      //路径对
      imgUrl:require("@/assets/img.jpg")
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
