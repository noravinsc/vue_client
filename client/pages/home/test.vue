<template>
<div>
    <router-link  :to="{path:'/header_img_footer'}" >header_img_footer</router-link>
    <router-link  :to="{path:'/header_test_footer_another'}" >header_test_footer_another</router-link>
    <router-link  :to="{path:'/test_components'}" >test_components</router-link>
    <router-link  :to="{path:'/header_home_footer'}" >header_home_footer</router-link>
    <router-link  :to="{path:'/header_test_footer'}" >header_test_footer</router-link>
    <div><a href="/">主页</a></div>
    <div>My name is {{name}}</div>
    <div>My age is {{age}}</div>
    <button @click="getNameByRequest">请求姓名</button>
    <button @click="getAgeByRequest">请求年龄</button>
    <button @click="getMysqlDataByRequest">请求mysql数据</button>
    <button @click="getData">请求本地数据</button>
    <button @click="getDataStatic">请求静态文件数据</button>
    <button @click="getDataMysql">vue请求数据库数据</button>
    <button @click="getMysqlDataByRequest">js请求数据库数据</button>


    <div style="margin-top:20px;">
      <button v-on:click = "show = !show">点我</button>
      <transition
          v-on:before-enter="beforeEnter"
          v-on:enter="enter"
          v-on:leave="leave"
          v-bind:css="false"
        >
          <p v-if="show">菜鸟教程 -- 学的不仅是技术，更是梦想！！！</p>
      </transition>
    </div>


    <div class="panel panel-default"  style="margin-top: 30px;">
      <div class="panel-heading">
        网址列表
      </div>
      <table class="table" style="margin: auto" border="1">
          <tbody>
            <tr>
              <th>序号</th>
              <th>名称</th>
              <th>网址</th>
              <th>排名</th>
              <th>国家</th>
            </tr>
            <tr>
              <td>{{myData.id}}</td>
              <td>{{myData.name}}</td>
              <td>{{myData.url}}</td>
              <td>{{myData.alexa}}</td>
              <td>{{myData.country}}</td>
            </tr>
          </tbody>
      </table>
    </div>

    <div class="panel panel-default"  style="margin-top: 30px;">
      <div class="panel-heading">
        网址列表
      </div>
      <table class="table" style="margin: auto" border="1">
          <tbody>
            <tr>
              <th>序号</th>
              <th>名称</th>
              <th>网址</th>
              <th>排名</th>
              <th>国家</th>
            </tr>
            <tr v-for="(item,index) in myDataList">
              <td>{{item.id}}</td>
              <td>{{item.name}}</td>
              <td>{{item.url}}</td>
              <td>{{item.alexa}}</td>
              <td>{{item.country}}</td>
            </tr>
          </tbody>
      </table>
    </div>

    <div class="panel panel-default"  style="margin-top: 30px;">
      <div class="panel-heading">
        网址列表
      </div>
      <table class="table" style="margin: auto" border="1">
          <tbody>
            <tr>
              <th>序号</th>
              <th>名称</th>
              <th>网址</th>
              <th>排名</th>
              <th>国家</th>
            </tr>
            <tr v-for="(item,index) in myDataListJs">
              <td>{{item.id}}</td>
              <td>{{item.name}}</td>
              <td>{{item.url}}</td>
              <td>{{item.alexa}}</td>
              <td>{{item.country}}</td>
            </tr>
          </tbody>
      </table>
    </div>

    
    
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import dataStatic from './data.json';
import axios from 'axios';
import Velocity from 'velocity-animate'

const MODULE_NAME = 'test';

export default {
  name: 'test',
  computed: {
    ...mapState(MODULE_NAME, ['name']),
    ...mapState(MODULE_NAME, ['age']),
    ...mapState(MODULE_NAME, ['myDataListJs']),
  },

  data () {
    return {
      myData: {
        id: "",
        url:"",
        name:"",
        alexa:"",
        country:""
      },
      myDataList:[],
      show: false
    }
  },

  methods: {
    ...mapActions(MODULE_NAME, ['getNameByRequest']),
    ...mapActions(MODULE_NAME, ['getAgeByRequest']),
    ...mapActions(MODULE_NAME, ['getMysqlDataByRequest']),

    getData () {
      const getFromDb = {id:1,url:'www.baidu.com',name: '百度',alexa:1,country:'本地'} //查询结果
      this.myData = getFromDb // 将查询到的数据保存在data里
      console.log('getFromDb:',getFromDb)
    },

    getDataStatic (dataGet) {
      console.log('dataGet:',dataGet)
      const getFromDb = dataStatic //查询结果
      this.myData = getFromDb // 将查询到的数据保存在data里
      console.log('getFromDb:',getFromDb)
      console.log('list:',getFromDb.list)
      console.log('objlist:',getFromDb.objlist)
      console.log('getFromDb.objlist:',typeof getFromDb.objlist)
      console.log('this.myDataList:',typeof this.myDataList)
      console.log('this:',this)
      this.myDataList=getFromDb.objlist
    },

    getDataMysql () {
        axios.get(
          '/mysql/getMysqlData'
        )
        .then((res) => {
          console.log('res.data',res.data)
          console.log('res.data:',typeof res.data)
          console.log('this:',this)
          console.log('this.myDataList',typeof this.myDataList)
          this.myDataList=res.data
        })
    },

    beforeEnter: function (el) {
      console.log("174el:",el)
      el.style.opacity = 0
      el.style.transformOrigin = 'left'
    },
    enter: function (el, done) {
      console.log("179el:",el)
      console.log("180done:",done)
      Velocity(el, { opacity: 1, fontSize: '1.4em' }, { duration: 300 })
      Velocity(el, { fontSize: '1em' }, { complete: done })
    },
    leave: function (el, done) {
      console.log("185el:",el)
      console.log("186done:",done)
      Velocity(el, { translateX: '15px', rotateZ: '50deg' }, { duration: 600 })
      Velocity(el, { rotateZ: '100deg' }, { loop: 2 })
      Velocity(el, {
        rotateZ: '45deg',
        translateY: '30px',
        translateX: '30px',
        opacity: 0
      }, { complete: done })
    }

  },
}
</script>