import React, { Component } from 'react';
import { Form, Input, InputNumber, Modal, Select } from 'antd';
import { serverURL } from '../App';

const { Option } = Select;

const AddRoleForm = Form.create({ name: 'add-role-form' })(    // Don't forget to change the names here
	class extends Component {
		constructor(props) {
			super(props);

			// Populate department dropdown menu by fetching department table
			this.departmentSelect();

			var data = {
				roleName: '',
				departmentID: null,
				baseSalary: null,
			};

			this.state = { formData: data };
		}

		componentDidUpdate(prevProps) {
			if (
				(prevProps.formData !== this.props.formData) ||
				(prevProps.selectedRowKeys !== this.props.selectedRowKeys) ||
				(prevProps.editing !== this.props.editing)
			) {
				const { selectedRowKeys, editing } = this.props;
				var data = {};
				if (selectedRowKeys.length !== 1) {
					data = {
						roleName: '',
						departmentID: null,
						baseSalary: null,
					};
				} else if (selectedRowKeys.length === 1 && editing === true) {
					data = this.props.defaultData.find(item => item.roleID === selectedRowKeys[0]);
				}

				this.setState({
					formData: data,
					selectedRowKeys: selectedRowKeys
				});

				this.departmentSelect();
			}
		} 

		departmentSelect = () => {
			// Fetch the department table to get values for select component
			fetch(serverURL + "get_table/department", {
				method: "GET",
				headers: {
					"Accept": "application/json"
				}
			}).then((res) => {
				res.json().then((data) => {
					// Create the select component
					var dropdown = [];

					for (let i = 0; i < data.length; i++) {
						dropdown.push(<Option key={data[i].departmentID}>{data[i].departmentName}</Option>);
					}

					this.setState({ departmentDropdown: dropdown });
				});
			}).catch(err => err);
		}

		render() {
			const { formData } = this.state;
			const { visible, editing, onCancel, onCreate, form } = this.props;
			const { getFieldDecorator } = form;

			var okayText = "Add";
			if (editing)
				okayText = "Edit";

			return (
				<Modal
					visible={visible}
					title={okayText + " Role"}
					okText={okayText}
					onCancel={onCancel}
					onOk={onCreate}
					width={350}                       // You might need to make the modal wider
				>
					{/* Dont forget to change label and fieldDecorator names. FieldDecorator names are the names of the keys in the object that's passed to the form validator. */}
					<Form layout="vertical">
						<Form.Item label="Role" style={{ marginBottom: "0px" }}>
							{getFieldDecorator('roleName', {
								rules: [{ required: true, message: 'Required' }],
								initialValue: formData.roleName || null,
							})(<Input placeholder="Enter the name of the role..." />)}
						</Form.Item>
						<Form.Item label="Associated Department" style={{ marginBottom: "0px" }}>
							{getFieldDecorator('departmentID', {
								rules: [{ required: true, message: 'Required' }],
								initialValue: formData.departmentID || null,
							})(
								<Select placeholder="Select a department" style={{ width: 300 }}>
									{this.state.departmentDropdown}
								</Select>
							)}
						</Form.Item>
						<Form.Item label="Salary" style={{ marginBottom: "10px" }}>
							{getFieldDecorator('baseSalary', {
								rules: [{ required: true, message: 'Required' }],
								initialValue: formData.baseSalary || null,
							})(
								<InputNumber
									formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
									parser={value => value.replace(/\$\s?|(,*)/g, '')}
									style={{ width: 300 }}
								/>
							)}
						</Form.Item>
					</Form>
				</Modal>
			)
		}
	}
)

export { AddRoleForm };