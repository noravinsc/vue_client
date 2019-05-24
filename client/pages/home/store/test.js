import axios from 'axios';

export default {
  namespaced: true,

  state: {
    name: 'liucw',
    age: '18',
    myDataListJs: []
  },

  mutations: {
    getName(state) {
      return state.name;
    },
    setName(state, name) {
      state.name = name;
    },

    getAge(state) {
      return state.age;
    },
    setAge(state, age) {
      state.age = age;
    },

    getData(state) {
      return state.myDataListJs;
    },
    setData(state, myDataListJs) {
      state.myDataListJs = myDataListJs;
    }
  },

  actions: {
    getNameByRequest(context) {
      axios.get(
        '/users/getUserName',
        {
          params:{
            'name':this.state.home.name
          }
        }
      )
      .then(
        res => {context.commit('setName', res.data)},
        err => {console.log(err)}
      );
    },

    getAgeByRequest(context) {
      axios.get(
        '/users/getUserAge',
        {
          params:{
            age:this.state.home.age
          }
        }
      )
      .then(function(res){
        context.commit('setAge', res.data)
        console.log('res.data',res.data)
      })
      .catch(function(err){
        console.log('err:',err)
      })
    },

    getMysqlDataByRequest(context) {
      axios.get(
        '/mysql/getMysqlData'
      )
      .then(function(res){
        context.commit('setData', res.data)
        console.log('res.data',res.data)
      })
      .catch(function(err){
        console.log('err:',err)
      })
    }

  }

};
