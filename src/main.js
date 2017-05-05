import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App';
Vue.use(VueRouter);
Vue.use(VueResource);
import goods from 'components/goods/goods';
import ratings from 'components/ratings/ratings';
import seller from 'components/seller/seller';

//  挂在app组件
let app = Vue.extend(App);
//  定义路由
let router = new VueRouter({
	linkActiveClass: 'active'
});

router.map({
	'/goods': {
	component: goods
	},
	'/ratings': {
	component: ratings
	},
	'/seller': {
	component: seller
	}
});
 router.start(app, '#app');
 router.go('/goods');
//  router.redirect({
//   '*': '/goods'
// })
