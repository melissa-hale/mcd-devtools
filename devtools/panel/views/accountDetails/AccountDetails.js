export default class AccountDetails {
	constructor(params) {
		this.warehouseUuid = params.warehouseUuid;
		this.warehouseName = params.warehouseName;
	}

	async getHtml() {
		return `
						<h1>Monte Carlo DevTools</h1>
						<p>Please find account details below</p>
						<table class="table">
							<tbody>
							<tr>
								<th scope="row">Warehouse Name:</th>
								<td>${this.warehouseName}</td>
							</tr>
							<tr>
								<th scope="row">Warehouse UUID:</th>
								<td>${this.warehouseUuid}</td>
							</tr>
						</table>
						<button id="test-button">click me</button>
				`
	}

	async getErrorPage() {
		
	}

}
