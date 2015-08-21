import plugins from "./plugins";

//import "moment/locale/en";
import moment from "moment";
//moment.locale("en");
window.moment = moment;

import Locales from "./locales";
var locales = new Locales("en-US");
window.__ = locales.strings;

window.app = {};
import "./Router.jsx";
import App from "./App.jsx";
