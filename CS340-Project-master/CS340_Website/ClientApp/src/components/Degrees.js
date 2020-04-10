import React, { Component } from 'react';
import { Form, Input, Modal, Row, Col } from 'antd';

const AddDegreeForm = Form.create({ name: 'add-degree-form' })(    // Don't forget to change the names here
	class extends Component {
		constructor(props) {
			super(props);

			var data = {
				degreeCombination: '',
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
						degreeCombination: '',
					};
				} else if (selectedRowKeys.length === 1 && editing === true) {
					data = this.props.defaultData.find(item => item.degreesID === selectedRowKeys[0]);
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
					title={okayText + " Degree"}
					okText={okayText}
					onCancel={onCancel}
					onOk={onCreate}
					width={450}                       // You might need to make the modal wider
				>
					{/* Dont forget to change label and fieldDecorator names. FieldDecorator names are the names of the keys in the object that's passed to the form validator. */}
					<Form layout="vertical">  
						<Row gutter={12}>
							<Col span={24}>
								<Form.Item label="Degree(s)" extra="Separate multiple degrees with &, i.e. 'Bachelors & Masters'" style={{ marginBottom: "10px" }}>
									{getFieldDecorator('degreeCombination', {
										rules: [{ required: true, message: 'Required' }],
										initialValue: formData.degreeCombination || null,
									})(<Input placeholder="Enter degree(s)..." />)}
								</Form.Item>
							</Col>
						</Row>
					</Form>
				</Modal>
			)
		}
	}
)

export { AddDegreeForm };