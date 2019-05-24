import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/pages/home/index';
import Test from '@/pages/home/test';

import Header from '@/components/header';
import Footer from '@/components/footer';
import HeaderAnother from '@/components/header_another';
import FooterAnother from '@/components/footer_another';
import ImgCom from '@/components/imgcom';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
  	  // 单组件url
	  {
	    path: '/',
	    name: 'Home',
	    component: Home,
	    meta:{
	        title:'首页'
	    }
	  },
	  // 单组件url
	  {
	    path: '/test',
	    name: 'Test',
	    component: Test,
	    meta:{
	        title:'测试页'
	    }
	  },
	  // 多组件url
	  {
	    path: '/test_components',
	    name: 'Test_Components',
	    components: {
	    	Test,
	    	Home,
	    },
	    meta:{
	        title:'测试components'
	    }
	  },
	  // 多组件url
	  {
	    path: '/header_home_footer',
	    name: 'Header_Home_Footer',
	    components: {
	    	Header,
	    	Home,
	    	Footer,
	    },
	    meta:{
	        title:'测试header_home_footer'
	    }
	  },
	  // 多组件url
	  {
	    path: '/header_test_footer',
	    name: 'Header_Test_Footer',
	    components: {
	    	Header,
	    	Test,
	    	Footer,
	    },
	    meta:{
	        title:'测试header_test_footer'
	    }
	  },
	  // 多组件url
	  {
	    path: '/header_test_footer_another',
	    name: 'Header_Test_Footer_Another',
	    components: {
	    	HeaderAnother,
	    	Test,
	    	FooterAnother,
	    },
	    meta:{
	        title:'header_test_footer_another'
	    }
	  },
	  // 多组件url
	  {
	    path: '/header_img_footer',
	    name: 'Header_Img_Footer',
	    components: {
	    	Header,
	    	ImgCom,
	    	Test,
	    	Footer,
	    },
	    meta:{
	        title:'测试header_img_footer'
	    }
	  },
  ]
});
