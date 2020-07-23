import sjs from "../sjs/sjs";
import store from "./store/store";
import elHelloWorld from "./els/elHelloWorld";

const sjsNew = new sjs({
  nodeId: '#app',
  store,
});

sjsNew.getInfo();

sjsNew.render(elHelloWorld);
sjsNew.render(elHelloWorld);


