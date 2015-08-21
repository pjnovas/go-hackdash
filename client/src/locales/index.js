
let locales = {
  enUS: require("./en-US")
};

export default class Locale {

  constructor(lan) {
    lan = lan || "en-US";
    let l = lan.replace("-", "");
    this.strings = locales[l];
  }

};
