import Sjs from '../SJS/Sjs'
import store from "./store/store";
import elApp from '../app/els/elApp'

new Sjs({
  store,
  root: elApp
}).render('#app');

//sjsNew.getInfo();
