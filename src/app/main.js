import SoloJS from "../CORE/SoloJS";
import el_helloWorld from "./els/el_helloWorld";
import el_userName from "./els/el_userName";
import el_userNameResult from "./els/el_userNameResult";

const SJS = new SoloJS("app");

SJS.el(el_helloWorld);
SJS.el(el_userName);
SJS.el(el_userNameResult);
