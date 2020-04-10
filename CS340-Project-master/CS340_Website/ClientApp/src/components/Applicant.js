import React, { Component } from 'react';
import { Form, Input, InputNumber, Modal, Radio, Row, Col, Select } from 'antd';
import { serverURL } from '../App';

const { Option } = Select;

const AddApplicantForm = Form.create({ name: 'add-applicant-form' })(    // Don't forget to change the names here
	class extends Component {
		constructor(props) {
			super(props);

			var data = {
				fname: '',
				mname: '',
				lname: '',
				age: null,
				sex: '',
				MBTI: '',
				degreesID: null,
				interests: '',
			};

			this.state = { formData: data };
		}

		componentDidMount = async () => {
			// Populate degree dropdown menu by fetching degree table
			this.degreeSelect();
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
						fname: '',
						mname: '',
						lname: '',
						age: null,
						sex: '',
						MBTI: '',
						degreesID: null,
						interests: '',
					};
				} else if (selectedRowKeys.length === 1 && editing === true) {
					data = this.props.defaultData.find(item => item.applicantID === selectedRowKeys[0]);
				}

				this.setState({
					formData: data,
					selectedRowKeys: selectedRowKeys
				});

				this.degreeSelect();
			}
		}

		degreeSelect = () => {
			// Fetch the degree table to get values for select component
			fetch(serverURL + "get_table/degree", {
				method: "GET",
				headers: {
					"Accept": "application/json"
				}
			}).then((res) => {
				res.json().then((data) => {
					// Create the select component
					var dropdown = [];

					for (let i = 0; i < data.length; i++) {
						var text = data[i].degreesID + " - " + data[i].degreeCombination;
						dropdown.push(<Option key={data[i].degreesID}>{text}</Option>);
					}
					this.setState({ degreeDropdown: dropdown })
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
					title={okayText + " Applicant"}
					okText={okayText}
					onCancel={onCancel}
					onOk={onCreate}
					width={450}                       // You might need to make the modal wider
				>
					{/* Dont forget to change label and fieldDecorator names. FieldDecorator names are the names of the keys in the object that's passed to the form validator. */}
					<Form layout="vertical">
						<Row gutter={12}>    {/* Gutter is spacing between elements. I would just leave it at 12. */}
							<Col span={16}>  {/* span is how much width they take up in the grid. Out of 24. So 12 is half of the form, 8 is 1/3, etc. */}
								<Form.Item label="First Name" style={{ marginBottom: "0px" }}>
									{getFieldDecorator('fname', {
										rules: [{ required: true, message: 'First name is required' }],
										initialValue: formData.fname || null,
									})(<Input placeholder="Enter your legal first name..." />)}
								</Form.Item>
							</Col>
							<Col span={8}>
								<Form.Item label="Middle Initial" style={{ marginBottom: "0px" }}>
									{getFieldDecorator('mname', {
										initialValue: formData.mname || null,
									})(<Input maxLength={1} placeholder="Inital..." />)}   {/* You can limit the amount of characters that the user can enter into the box. */}
								</Form.Item>
							</Col>
						</Row>
						<Row gutter={12}>
							<Col span={24}>
								<Form.Item label="Last Name" style={{ marginBottom: "0px" }}>
									{getFieldDecorator('lname', {
										rules: [{ required: true, message: 'Last name is required' }],
										initialValue: formData.lname || null,
									})(<Input placeholder="Enter your legal last name..." />)}
								</Form.Item>
							</Col>
						</Row>
						<Row gutter={12}>
							<Col span={10}>
								<Form.Item label="Age" style={{ marginBottom: "0px" }}>
									{getFieldDecorator('age', {
										rules: [{ required: true, message: 'Age is required' }],
										initialValue: formData.age || null,
									})(<InputNumber min={18} max={100} />)}   {/* This input type only allows numbers. By default, it's only integers. */}
								</Form.Item>
							</Col>
							<Col span={14}>
								<Form.Item label="Sex" style={{ marginBottom: "0px" }}>
									{getFieldDecorator('sex', {
										rules: [{ required: true, message: 'Required' }],
										initialValue: formData.sex || null,
									})(
										<Radio.Group>   {/* Radio buttons for choose-one-of-many selections. */}
											<Radio value="M">Male</Radio>  {/* "value" is what gets passed to the form object when you validate. */}
											<Radio value="F">Female</Radio>
										</Radio.Group>,
									)}
								</Form.Item>
							</Col>
						</Row>
						<Row gutter={12}>
							<Col span={12}>
								<Form.Item label="Myers-Briggs Type Indicator" style={{ marginBottom: "0px" }}>
									{getFieldDecorator('MBTI', {
										rules: [{ required: true, message: 'Required' }],
										initialValue: formData.MBTI || null,
									})(
										<Select placeholder="Select a MBTI" style={{ width: 190 }}>
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
							<Col span={12}>
								<Form.Item label="Degrees" style={{ marginBottom: "0px" }}>
									{getFieldDecorator('degreesID', {
										rules: [{ required: true, message: 'Required' }],
										initialValue: formData.degreesID || null,
									})(
										<Select placeholder="Select degree(s)" dropdownMatchSelectWidth={false} style={{ width: 190 }}>
											{this.state.degreeDropdown}
										</Select>
									)}
								</Form.Item>
							</Col>
						</Row>

						<Row gutter={12}>
							<Col span={24}>
								<Form.Item label="Interests" style={{ marginBottom: "10px" }}>
									{getFieldDecorator('interests', {
										initialValue: formData.interests || null,
									})(<Input placeholder="Enter your interests, separated by commas..." />)}
								</Form.Item>
							</Col>
						</Row>
					</Form>
				</Modal>
			)
		}
	}
)

export { AddApplicantForm };