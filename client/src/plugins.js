import "babel-core/polyfill";

import React from "react";

import $ from "jquery";
window.$ = window.jQuery = $;

import "bootstrap";

//Needed for React Developer Tools
window.React = React;
