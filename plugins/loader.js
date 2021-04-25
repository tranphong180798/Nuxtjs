import Vue from 'vue';
// Import component
import Loading from 'vue-loading-overlay';
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';
// Init plugin
Vue.use(Loading,{
  color:'green',
  bgColor: '#4b4b4b',
  height: 64,
  width: 64,
  fullPage: true,
  canCancel: true,
  useSlot: false,
  loader: 'dots',
});
