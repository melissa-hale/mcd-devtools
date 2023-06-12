export default class Config {
  constructor() {
    this.apiUrl = "https://graphql.getmontecarlo.com/graphql";
  }

  async setConfigProperty(key, val) {
    this[key] = val;
  }
}
