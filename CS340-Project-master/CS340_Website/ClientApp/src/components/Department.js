import React, { Component } from 'react';
import { Form, Input, InputNumber, Modal } from 'antd';

const AddDepartmentForm = Form.create({ name: 'add-department-form' })(    // Don't forget to change the names here
	class extends Component {
		constructor(props) {
			super(props);

			var data = {
				departmentName: '',
				departmentSize: null,
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
						departmentName: '',
						departmentSize: null,
					};
				} else if (selectedRowKeys.length === 1 && editing === true) {
					data = this.props.defaultData.find(item => item.departmentID === selectedRowKeys[0]);
				}

				this.setState({
					formData: data,
					selectedRowKeys: selectedRowKeys
				});
			}
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
					title={okayText + " Department"}
					okText={okayText}
					onCancel={onCancel}
					onOk={onCreate}
					width={350}                       // You might need to make the modal wider
				>
					{/* Dont forget to change label and fieldDecorator names. FieldDecorator names are the names of the keys in the object that's passed to the form validator. */}
					<Form layout="vertical">
						<Form.Item label="Department Name" style={{ marginBottom: "0px", width: 300 }}>
							{getFieldDecorator('departmentName', {
								rules: [{ required: true, message: 'Department name is required' }],
								initialValue: formData.departmentName || null,
							})(<Input placeholder="Enter a department name..." />)}
						</Form.Item>
						<Form.Item label="Department Size" style={{ marginBottom: "0px", width: 300 }}>
							{getFieldDecorator('departmentSize', {
								rules: [{ required: true, message: 'Department size is required' }],
								initialValue: formData.departmentSize || null
							})(<InputNumber min={1} />)}
						</Form.Item>
					</Form>
				</Modal>
			)
		}
	}
)

export { AddDepartmentForm };   