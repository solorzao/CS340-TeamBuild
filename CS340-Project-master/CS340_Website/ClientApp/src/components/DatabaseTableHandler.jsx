import React, { Component, Fragment } from 'react';
import DatabaseTable from './DatabaseTable';
import { serverURL } from '../App';

import {
	ApplicantTableColumns,
	DepartmentTableColumns,
	OpenRoleTableColumns,
	DegreesTableColumns,
	RoleTableColumns
} from './TableColumns';

function toTitleCase(str) {
	if (typeof str === "undefined" || str === null) {
		return "";
	}
	else {
		return str.replace(
			/\w\S*/g,
			function (txt) {
				return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
			}
		);
	}
}

export default class DatabaseTableHandler extends Component {
	state = {
		tableData: null,
		tableLoading: true
	};

	constructor(props) {
		super(props);

		/* Choose which columns to give to the table. */
		const { pageType } = this.props;

		/* Set information about table, including what columns to use, the table's
		 * width, and what key to use at the row's unique identifier. */
		if (pageType === 'Applicant') {
			this.columns = ApplicantTableColumns;
			this.tableWidth = 1400;
			this.rowKey = "applicantID";
		}
		else if (pageType === 'Department') {
			this.columns = DepartmentTableColumns;
			this.tableWidth = 500;
			this.rowKey = "departmentID";
		}
		else if (pageType === 'Open Role') {
			this.columns = OpenRoleTableColumns;
			this.tableWidth = 700;
			this.rowKey = "openRoleID";
		}
		else if (pageType === 'Degree') {
			this.columns = DegreesTableColumns;
			this.tableWidth = 400;
			this.rowKey = "degreesID";
		}
		else if (pageType === 'Role') {
			this.columns = RoleTableColumns;
			this.tableWidth = 700;
			this.rowKey = "roleID";
		}
	}

	/* This is where the fetch for the table data will take place. */
	componentDidMount = async () => {
		await this.tableFetch();
	};

	tableFetch = async () => {
		var pageType = this.props.pageType;

		// Replace spaces with underscores and make it all lower case
		pageType = pageType.replace(/ /g, "_").toLowerCase();

		// Only fetches the current table instead of all of them
		await fetch(serverURL + "get_table/" + pageType, {
			method: "GET",
			headers: {
				"Accept": "application/json"
			}
		}).then(async (res) => {
			res.json().then(async (data) => {
				await this.setState({
					tableData: data,
					tableLoading: false
				})
			});
		}).catch(err => err);

		// Change the columns that display IDs of foreign keys to display the string instead of the number.
		if (pageType === 'applicant')
		{
			await fetch(serverURL + "get_table/degree", {
				method: "GET",
				headers: {
					"Accept": "application/json"
				}
			}).then(async (res) => {
				res.json().then(async (data) => {
					// Copy this.state.tableData into a new array.
					var tableDataCopy = [...this.state.tableData];
					var newData = "";

					// Run through all datapoints in the applicant table, replacing degreesID with degreesCombination
					for (let i = 0; i < tableDataCopy.length; i++) {
						var degID = null;

						if (typeof tableDataCopy[i].degreesID === 'string')
							degID = parseInt(tableDataCopy[i].degreesID.charAt(0));
						else
							degID = parseInt(tableDataCopy[i].degreesID);

						newData = degID + " - " + data.find(item => item.degreesID === degID).degreeCombination;

						tableDataCopy[i].degreesID = newData;
					}

					this.setState({ tableData: tableDataCopy });
				});
			}).catch(err => err);
		}
		else if (pageType === 'open_role') {
			await fetch(serverURL + "get_table/role", {
				method: "GET",
				headers: {
					"Accept": "application/json"
				}
			}).then(async (res) => {
				res.json().then(async (data) => {
					// Copy this.state.tableData into a new array.
					var tableDataCopy = [...this.state.tableData];
					var newData = "";

					// Run through all datapoints in the applicant table, replacing roleID with degreesCombination
					for (let i = 0; i < tableDataCopy.length; i++) {
						var roleID = null;

						if (typeof tableDataCopy[i].roleID === 'string')
							roleID = parseInt(tableDataCopy[i].roleID.charAt(0));
						else
							roleID = parseInt(tableDataCopy[i].roleID);

						newData = roleID + " - " + data.find(item => item.roleID === roleID).roleName;

						tableDataCopy[i].roleID = newData;
					}

					this.setState({ tableData: tableDataCopy });
				});
			}).catch(err => err);
		}
		else if (pageType === 'role') {
			await fetch(serverURL + "get_table/department", {
				method: "GET",
				headers: {
					"Accept": "application/json"
				}
			}).then(async (res) => {
				res.json().then(async (data) => {
					// Copy this.state.tableData into a new array.
					var tableDataCopy = [...this.state.tableData];
					var newData = "";

					// Run through all datapoints in the applicant table, replacing departmentID with degreesCombination
					for (let i = 0; i < tableDataCopy.length; i++) {
						var deptID = null;

						if (typeof tableDataCopy[i].departmentID === 'string')
							deptID = parseInt(tableDataCopy[i].departmentID.charAt(0));
						else
							deptID = parseInt(tableDataCopy[i].departmentID);

						newData = deptID + " - " + data.find(item => item.departmentID === deptID).departmentName;

						tableDataCopy[i].departmentID = newData;
					}

					this.setState({ tableData: tableDataCopy });
				});
			}).catch(err => err);
		}
	}

	/* Callback function so form can pass it's data to this component.
	 * When we actually have the backend completed, this function will make the correct
	 * API call based on which table/form is being rendered. As for right now, with no
	 * backend implemented, this function will be a lot more crowded.
	 */
	formCallback = async (formData, keyNum) => {
		var pageType = this.props.pageType;

		// Replace spaces with underscores and make it all lower case
		pageType = pageType.replace(/ /g, "_").toLowerCase();

		var callBody = {};

		// Show the table as loading while the API call is happening
		this.setState({ tableLoading: true });

		if (pageType === 'applicant') {
			if (keyNum !== -1)
				callBody.applicantID = keyNum;

			callBody.fname = toTitleCase(formData.fname);
			callBody.mname = toTitleCase(formData.mname);
			callBody.lname = toTitleCase(formData.lname);
			callBody.age = formData.age;
			callBody.sex = formData.sex;
			callBody.MBTI = formData.MBTI;
			callBody.degreesID = formData.degreesID;
			callBody.interests = formData.interests;
		}
		else if (pageType === 'department') {
			if (keyNum !== -1)
				callBody.departmentID = keyNum;

			callBody.departmentName = toTitleCase(formData.departmentName);
			callBody.departmentSize = formData.departmentSize;
		}
		else if (pageType === 'open_role') {
			if (keyNum !== -1)
				callBody.openRoleID = keyNum;

			callBody.roleID = formData.roleID;
			callBody.MBTI = formData.MBTI;
			callBody.interestKeywords = toTitleCase(formData.interestKeywords);
		}
		else if (pageType === 'degree') {
			if (keyNum !== -1)
				callBody.degreesID = keyNum;

			callBody.degreeCombination = toTitleCase(formData.degreeCombination);
		}
		else if (pageType === 'role') {
			if (keyNum !== -1)
				callBody.roleID = keyNum;

			callBody.roleName = toTitleCase(formData.roleName);
			callBody.departmentID = formData.departmentID;
			callBody.baseSalary = formData.baseSalary;
		}

		// If keyNum === -1, then it's an ADD call. Otherwise, it's PUT call.
		if (keyNum === -1) {
			// Add the new item to the correct table
			await fetch(serverURL + "add_to_" + pageType, {
				method: "POST",
				mode: 'cors',
				body: JSON.stringify(callBody),
				headers: {
					"Content-Type": "application/json"
				}
			}).then((res) => {
				res.json().then((data) => {
					console.log(data);
				});
			}).catch(err => err);
		} else {
			// Update the new item in the correct table
			await fetch(serverURL + "update_" + pageType, {
				method: "PUT",
				mode: 'cors',
				body: JSON.stringify(callBody),
				headers: {
					"Content-Type": "application/json"
				}
			}).then((res) => {
				res.json().then((data) => {
					console.log(data);
				});
			}).catch(err => err);
		}

		// Wait a second before fetching again
		setTimeout(() => {
			this.tableFetch();
		}, 1000);
	}

	tableDeleteCallback = async (key) => {
		var pageType = this.props.pageType;

		// Replace spaces with underscores and make it all lower case
		pageType = pageType.replace(/ /g, "_").toLowerCase();

		// Show the table as loading while the API call is happening
		this.setState({ tableLoading: true });

		for (let i = key.length - 1; i >= 0; i--) {
			var callBody = {};

			if (pageType === 'applicant') {
				callBody.applicantID = key[i];
			} else if (pageType === 'department') {
				callBody.departmentID = key[i];
			} else if (pageType === 'open_role') {
				callBody.openRoleID = key[i];
			} else if (pageType === 'degree') {
				callBody.degreesID = key[i];
			} else if (pageType === 'role') {
				callBody.roleID = key[i];
			}

			// Delete the item from the correct table
			await fetch(serverURL + "delete_" + pageType, {
				method: "DELETE",
				mode: 'cors',
				body: JSON.stringify(callBody),
				headers: {
					"Content-Type": "application/json"
				}
			}).then((res) => {
				res.json().then((data) => {
					console.log(data);
				});
			}).catch(err => err);
		}

		// Wait one second per deletion
		setTimeout(() => {
			this.tableFetch();
		}, 1000);
	}

	render() {
		var { tableData, tableLoading } = this.state;
		const { pageType } = this.props;

		return (
			<Fragment>
				<h1>{pageType} Table</h1>

				<br /><br /><br />

				<DatabaseTable
					tableLoading={tableLoading}
					rowKey={this.rowKey}
					columns={this.columns}
					dataSource={tableData}
					tableWidth={this.tableWidth}
					formHandlerType={pageType}
					formHandlerCallback={this.formCallback}
					formEditCallback={this.formEditCallback}
					deleteCallback={this.tableDeleteCallback}
				/>
			</Fragment>
		);
	}
}