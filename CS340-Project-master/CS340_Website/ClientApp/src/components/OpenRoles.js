import React, { Component } from 'react';
import { Form, Input, Modal, Select, Row, Col } from 'antd';
import { serverURL } from '../App';

const { Option } = Select;

const AddOpenRoleForm = Form.create({ name: 'add-open-role-form' })(    // Don't forget to change the names here
	class extends Component {
		constructor(props) {
			super(props);

			// Populate roles dropdown menu by fetching roles table
			this.roleSelect();

			var data = {
				roleID: null,
				MBTI: '',
				interestKeywords: '',
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
						roleID: null,
						MBTI: '',
						interestKeywords: '',
					};
				} else if (selectedRowKeys.length === 1 && editing === true) {
					data = this.props.defaultData.find(item => item.openRoleID === selectedRowKeys[0]);
				}

				this.setState({
					formData: data,
					selectedRowKeys: selectedRowKeys
				});

				this.roleSelect();
			}
		} 

		roleSelect = () => {
			// Fetch the roles table to get values for select component
			fetch(serverURL + "get_table/role", {
				method: "GET",
				headers: {
					"Accept": "application/json"
				}
			}).then((res) => {
				res.json().then((data) => {
					// Create the select component
					var dropdown = [];

					for (let i = 0; i < data.length; i++) {
						dropdown.push(<Option key={data[i].roleID}>{data[i].roleName}</Option>);
					}

					this.setState({ roleDropdown: dropdown });
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
					title={okayText + " Open Role"}
					okText={okayText}
					onCancel={onCancel}
					onOk={onCreate}
					width={450}                       // You might need to make the modal wider
				>
					{/* Dont forget to change label and fieldDecorator names. FieldDecorator names are the names of the keys in the object that's passed to the form validator. */}
					<Form layout="vertical">
						<Row gutter={12}>
							<Col span={12}>
								<Form.Item label="Role" style={{ marginBottom: "10px" }}>
									{getFieldDecorator('roleID', {
										rules: [{ required: true, message: 'Required' }],
										initialValue: formData.roleID || null,
									})(
										<Select placeholder="Select a Role" style={{ width: 195 }}>
											{this.state.roleDropdown}
										</Select>
									)}
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item label="Associated MBTI" style={{ marginBottom: "0px" }}>
									{getFieldDecorator('MBTI', {
										rules: [{ required: true, message: 'Required' }],
										initialValue: formData.MBTI || null,
									})(
										<Select placeholder="Select a MBTI" style={{ width: 195 }}>
											<Option value='ISTJ'>ISTJ</Option>
											<Option value='ISFJ'>ISFJ</Option>
											<Option value='INFJ'>INFJ</Option>
											<Option value='INTJ'>INTJ</Option>
											<Option value='ISTP'>ISTP</Option>
											<Option value='ISFP'>ISFP</Option>
											<Option value='INFP'>INFP</Option>
											<Option value='INTP'>INTP</Option>
											<Option value='ESTP'>ESTP</Option>
											<Option value='ESFP'>ESFP</Option>
											<Option value='ENFP'>ENFP</Option>
											<Option value='ENTP'>ENTP</Option>
											<Option value='ESTJ'>ESTJ</Option>
											<Option value='ESFJ'>ESFJ</Option>
											<Option value='ENFJ'>ENFJ</Option>
											<Option value='ENTJ'>ENTJ</Option>
										</Select>
									)}
								</Form.Item>
							</Col>
						</Row>
						<Form.Item label="Interest Keywords" style={{ marginBottom: "10px" }}>
							{getFieldDecorator('interestKeywords', {
								initialValue: formData.interestKeywords || null,
							})(<Input placeholder="Enter some keywords" />)}
						</Form.Item>
					</Form>
				</Modal>
			)
		}
	}
)

export { AddOpenRoleForm };
