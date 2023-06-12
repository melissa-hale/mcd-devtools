import Base from "../Base.js";

export default class extends Base {
  constructor(params) {
    super(params);
    // this.setTitle("Account Details");
  }

  async getHtml() {
    return `
            <h1>Let's do something</h1>
            <p>Create a maintenance window!</p>
        `;
  }
}
