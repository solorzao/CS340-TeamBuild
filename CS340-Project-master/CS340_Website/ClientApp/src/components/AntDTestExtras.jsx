import React, { Component, Fragment } from 'react';
import { Button, Form, Icon, Input, InputNumber, Modal, Radio, Row, Col, Table } from 'antd';

import styles from '../CSS/AntDTest.module.css';

const ExampleForm = Form.create({ name: 'example-form-in-modal' })(
	class extends Component {
		render() {
			const { visible, onCancel, onCreate, form } = this.props;
			const { getFieldDecorator } = form;

			return (
				<Modal
					visible={visible}
					title="Sample Form in Modal"
					okText="Create"
					onCancel={onCancel}
					onOk={onCreate}
					width={350}
				>
					<Form layout="vertical">
						<Row gutter={12}>
							<Col span={16}>
								<Form.Item label="First Name" style={{ marginBottom: "0px" }}>
									{getFieldDecorator('fname', {
										rules: [{ required: true, message: 'First name is required', placeholder: 'Please write your legal first name...' }],
									})(<Input />)}
								</Form.Item>
							</Col>
							<Col span={8}>
								<Form.Item label="Middle Initial" style={{ marginBottom: "0px" }}>
									{getFieldDecorator('mname')(<Input maxLength={1} />)}
								</Form.Item>
							</Col>
						</Row>
						<Row gutter={12}>
							<Col span={24}>
								<Form.Item label="Last Name" style={{ marginBottom: "0px" }}>
									{getFieldDecorator('lname', {
										rules: [{ required: true, message: 'Last name is required', placeholder: 'Please write your legal last name...' }],
									})(<Input />)}
								</Form.Item>
							</Col>
						</Row>
						<Row gutter={12}>
							<Col span={10}>
								<Form.Item label="Age" style={{ marginBottom: "0px" }}>
									{getFieldDecorator('age', {
										rules: [{ required: true, message: 'Age is required' }],
									})(<InputNumber min={18} max={75} />)}
								</Form.Item>
							</Col>
							<Col span={14}>
								<Form.Item label="Sex" style={{ marginBottom: "0px" }}>
									{getFieldDecorator('sex', {
										rules: [{ required: true, message: 'Required' }],
									})(
										<Radio.Group>
											<Radio value="Male">Male</Radio>
											<Radio value="Female">Female</Radio>
										</Radio.Group>,
									)}
								</Form.Item>
							</Col>
						</Row>
						<Row gutter={12}>
							<Col span={24}>
								<Form.Item label="Hometown" style={{ marginBottom: "0px" }}>
									{getFieldDecorator('hometown')(<Input />)}
								</Form.Item>
							</Col>
						</Row>
					</Form>
				</Modal>
			)
		}
	}
)

class FormHandler extends Component {
	constructor() {
		super();

		this.state = { visible: false };
	};

	showModal = () => {
		this.setState({ visible: true });
	};

	handleCancel = () => {
		this.setState({ visible: false });
	};

	/* Validate the form, checking for required fields. */
	handleCreate = () => {
		const { form } = this.formRef.props;

		form.validateFields((err, values) => {
			if (err) {
				return;
			}

			this.props.callback(values);

			form.resetFields();
			this.setState({ visible: false });
		});
	};

	saveFormRef = formRef => {
		this.formRef = formRef;
	};

	render() {
		var { visible } = this.state;

		return (
			<Fragment>
				<Button type="primary" onClick={this.showModal} className={styles.TableHeader}>
					<div style={{ display: 'inline-flex' }}>
						{/* You can also specify style inline like this, but you should stick to using CSS module files. */}
						<Icon style={{ fontSize: '14pt', color: '#fff', marginRight: 10 }} type="plus" />
						Add an Item!
					</div>
				</Button>
				<ExampleForm
					wrappedComponentRef={this.saveFormRef}
					visible={visible}
					onCancel={this.handleCancel}
					onCreate={this.handleCreate}
				/>
			</Fragment>
		);
	}
}

class TestTable extends Component {
	constructor(props) {
		super(props);

		this.state = {
			tableData: this.props.tableData,
			selectedRowKeys: []
		};

		/* Have to define the columns of the table. Can get kinda messy. The way I set tables
		 * up when there's an excess of columns is to have a function defined to construct the
		 * options for each column, that way it's one line per column instead of like 10 */
		this.columns = [
			{
				title: 'First Name',
				dataIndex: 'fname',
				key: 'fname',
			},
			{
				title: 'Middle Name',
				dataIndex: 'mname',
				key: 'mname',
			},
			{
				title: 'Last Name',
				dataIndex: 'lname',
				key: 'lname',
			},
			{
				title: 'Age',
				dataIndex: 'age',
				key: 'age',
			},
			{
				title: 'Sex',
				dataIndex: 'sex',
				key: 'sex',
			},
			{
				title: 'Hometown',
				dataIndex: 'hometown',
				key: 'hometown',
			}
		];
	};
	
	onSelectChange = selectedRowKeys => {
		this.setState({ selectedRowKeys });
	};

	handleDelete = () => {
		this.props.deleteCallback(this.state.selectedRowKeys);
		this.setState({ selectedRowKeys: [] });
	};

	render() {
		var { selectedRowKeys } = this.state;
		const rowSelection = {
			selectedRowKeys,
			onChange: this.onSelectChange,
		};

		var hasSelected = selectedRowKeys.length > 0;

		return (
			<Fragment>
				<div className={styles.TableHeader}>
					{hasSelected ?
						<div>
							<Button type="danger" onClick={this.handleDelete} style={{ marginRight: 10 }}>
								<Icon type="delete" style={{ position: 'relative', bottom: 3 }} />
							</Button>
							Selected {selectedRowKeys.length} items
						</div>
						: null
					}
				</div>
				<Table rowSelection={rowSelection} columns={this.columns} dataSource={this.props.dataSource} />
			</Fragment>
		);
	}
}

export { FormHandler, TestTable };