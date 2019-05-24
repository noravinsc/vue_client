<template>
<div>
    <router-link  :to="{path:'/header_img_footer'}" >header_img_footer</router-link>
    <router-link  :to="{path:'/header_test_footer_another'}" >header_test_footer_another</router-link>
    <router-link  :to="{path:'/test_components'}" >test_components</router-link>
    <router-link  :to="{path:'/header_home_footer'}" >header_home_footer</router-link>
    <router-link  :to="{path:'/header_test_footer'}" >header_test_footer</router-link>
    <div><a href="/test">test</a></div>
    <div>My name is {{name}}</div>
    <div>My age is {{age}}</div>
    <button @click="getNameByRequest">请求姓名</button>
    <button @click="getAgeByRequest">请求年龄</button>
    <button @click="getMysqlDataByRequest">请求mysql数据</button>
    <button @click="getData">请求本地数据</button>
    <button @click="getDataStatic">请求静态文件数据</button>
    <button @click="getDataMysql">vue请求数据库数据</button>
    <button @click="getMysqlDataByRequest">js请求数据库数据</button>
    <button @click="pushDataStatic">列表追加数据</button>

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
              <th>删除</th>
              <th>删除</th>
              <th>删除</th>
              <th>删除</th>
            </tr>
            <tr v-for="(item,index) in myDataList">
              <td>{{item.id}}</td>
              <td>{{item.name}}</td>
              <td>{{item.url}}</td>
              <td>{{item.alexa}}</td>
              <td>{{item.country}}</td>
              <td><a href="javascript:void(0)" v-on:click="dele_data($event.currentTarget)">删除</a></td>
              <td><a href="javascript:void(0)" v-on:click="dele_data('123')">删除</a></td>
              <td><a href="javascript:void(0)" v-on:click="dele_data($event)">删除</a></td>
              <td><a href="javascript:void(0)" v-on:click="dele_data(item.id)">删除</a></td>
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
              <th>删除</th>
            </tr>
            <tr v-for="(item,index) in myDataListJs">
              <td>{{item.id}}</td>
              <td>{{item.name}}</td>
              <td>{{item.url}}</td>
              <td>{{item.alexa}}</td>
              <td>{{item.country}}</td>
              <td><a href="javascript:void(0)" v-on:click="dele(item.id)">删除</a></td>
            </tr>
          </tbody>
      </table>
    </div>

    <div id="myChart" :style="{width: '300px', height: '300px'}" style="margin: auto"></div>

    <div id="myChartNeed" :style="{width: '300px', height: '300px'}" style="margin: auto"></div>


    <div>
      <form action="" id="demo">
        <input type="text" value="调试 vuejs 2.0" ref="input1">
          <a href="javascript:void(0)" v-on:click="test1">提交数据</a>
          <br>
        <span>{{ result1 }}</span>
        <br>

        <input type="text" v-model="input2">
          <a href="javascript:void(0)" v-on:click="test2">提交数据</a>
          <br>
        <span>{{ result2 }}</span>
      </form>
    </div>


    <div style="margin-top: 30px;">
      <button v-on:click = "show = !show">点我</button>
      <transition name = "fade">
          <p v-show = "show" v-bind:style = "styleobj">动画实例</p>
      </transition>
    </div>

</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import dataStatic from './data.json';
import axios from 'axios';
import { showMsg } from '../../../static/js/show_message.js'

//按需引入
let echarts = require('echarts/lib/echarts')
// 引入柱状图组件
require('echarts/lib/chart/bar')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')

const MODULE_NAME = 'home';

export default {
  name: 'home',
  computed: {
    ...mapState(MODULE_NAME, ['name']),
    ...mapState(MODULE_NAME, ['age']),
    ...mapState(MODULE_NAME, ['myDataListJs']),
  },

  mounted:function(){
      this.pushDataStatic();//进入页面直接需要触发的函数
      this.drawLine();
      this.drawLineNeed();
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
      result1: null,
      result2: null,
      input2: "a",
      show:true,
      styleobj :{
          fontSize:'30px',
          color:'red'
      }
    }
  },

  methods: {
    ...mapActions(MODULE_NAME, ['getNameByRequest']),
    ...mapActions(MODULE_NAME, ['getAgeByRequest']),
    ...mapActions(MODULE_NAME, ['getMysqlDataByRequest']),

    //将本地数据写入列表
    getData () {
      const getFromDb = {id:1,url:'www.baidu.com',name: '百度',alexa:1,country:'本地'} //查询结果
      this.myData = getFromDb // 将查询到的数据保存在data里
      console.log('getFromDb:',getFromDb)
    },

    //将本地json文件数据写入列表
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

    //获取mysql数据
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

    //列表追加数据
    pushDataStatic (dataGet) {
      const getFromDb = dataStatic //查询结果
      console.log('getFromDb.objlist:',getFromDb.objlist)
      this.myDataList.push(getFromDb.objlist[0])
    },

    //通过在main.js全局引入echart所有组件
    drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
            title: { 
                text: '在Vue中使用echarts',
                //subtext:'在此测试',
                //x:'center',
                //y:'top',
                //textAlign:'center'
            },
            tooltip: {},
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        });
    },

    //通过在当前vue按需引入echart组件
    drawLineNeed() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('myChartNeed'))
      // 绘制图表
      myChart.setOption({
        title: { 
          text: '在Vue中使用echarts',
          //subtext:'在此测试',
          //x:'center',
          //y:'top',
          //textAlign:'center'
        },
        tooltip: {},
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      });
    },

    //通过input的ref获取数据，非双向绑定
    test1: function () {
        console.log("输入框1的内容是：",this.$refs.input1.value)
        this.result1 = this.$refs.input1.value + " 成功!";
        showMsg(this.result1,"center");
    },

    //通过v-modal双向绑定获取input数据
    test2: function () {
        console.log("输入框2的内容是：",this.input2)
        this.result2 = this.input2 + " 成功!";
        showMsg(this.result2,"center");
    },

    //通过id删除数据
    dele: function(data) {
      console.log(data);
      console.log("删除该数据");
      showMsg("删除该数据","center");
    },

    //通过id删除数据
    dele_data: function(data) {
      console.log(data);
      console.log("删除该数据");
      showMsg("删除该数据","center");
    }

  },
}
</script>
<style>
  @import '../../../static/css/show_message.css';

  /* 可以设置不同的进入和离开动画 */
  /* 设置持续时间和动画函数 */
  .fade-enter-active, .fade-leave-active {
      transition: opacity 2s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active, 2.1.8 版本以下 */ {
      opacity: 0
  }
</style>