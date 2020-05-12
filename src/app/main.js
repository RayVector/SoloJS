import SoloJS from "../CORE/SoloJS";
import el_helloWorld from "./els/el_hello-world";
import el_userName from "./els/user-name/el_user-name";
import el_userNameResult from "./els/el_user-name-result";

const SJS = new SoloJS("app");

SJS.el(el_helloWorld);
SJS.el(el_userName);
SJS.el(el_userNameResult);