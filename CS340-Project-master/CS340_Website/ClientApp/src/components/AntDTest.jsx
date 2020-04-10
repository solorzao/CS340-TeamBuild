import React, { Component, Fragment } from 'react';
import { Button, Icon, Input, Modal, Popover } from 'antd';

import { TestTable, FormHandler } from './AntDTestExtras.jsx';

import styles from '../CSS/AntDTest.module.css';

/* A constant to hold text that goes in the info popover element. */
const infoPopoverContent = (
	<div className={styles.InfoPopover}>
		This is just a test of Ant Design to show off a little bit about how it works. Feel free to edit this page and get a hang of React and Antd.<br /><br />
		Also, we are using CSS modules. CSS files are defined in <strong>ClientApp/src/CSS</strong> using the convention<br />
		<code>&nbsp;&nbsp;&nbsp;[file name].module.css</code><br />
		and accessed within the file by using <br />
		<code>&nbsp;&nbsp;&nbsp;import styles from './CSS/[file name].module.css';</code><br />
		at the top of the file, then within a jsx element, using<br />
		<code>&nbsp;&nbsp;&nbsp;className={'{'}styles.[name of class]}</code>
	</div>
);

function toTitleCase(str) {
	if (typeof str === "undefined") {
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

class AntDTest extends Component {
	constructor() {
		/* This is always required in a constructor. If props (parameters) are being passed to the component, then
		 * the constructor will look like this:
		 *		constructor(props) {
		 *			super(props);
		 *			
		 *			//code...
		 *		}
		 */
		super();

		var data = [];
		data.push({
			key: 0,
			fname: `Edward`,
			mname: `P`,
			lname: `King`,
			age: 32,
			sex: `Male`,
			hometown: `London, England`,
		});

		// C++ style comments also work (I prefer C style comments but it's up to you what you want to do)
		// I use C style comments when they are on their own line, and C++ style comments when they're inline with code
		this.state = {
			name: 'User',
			tableData: data,
			modalVisible: false,
			displayEnteredText: false,
			enteredText: "",
			tableDataCount: 1
		};
	}

	/* Some logic for opening/closing the modal */
	showModal = () => {
		this.setState({
			modalVisible: true
		});
	}

	handleModalOk = () => {
		this.setState({
			displayEnteredText: true,
			modalVisible: false
		});
	}

	handleModalCancel = () => {
		this.setState({
			displayEnteredText: false,
			modalVisible: false
		});
	}

	inputChange = (e) => {
		this.setState({
			enteredText: e.target.value
		});
	}

	/* Callback function so form can pass it's data to this component. */
	formCallback = (formData) => {
		var data = [...this.state.tableData];

		data.push({
			key: this.state.tableDataCount,
			fname: toTitleCase(formData.fname),
			mname: toTitleCase(formData.mname),
			lname: toTitleCase(formData.lname),
			age: formData.age,
			sex: formData.sex,
			hometown: toTitleCase(formData.hometown),
		});

		this.setState({
			tableData: data,
			tableDataCount: this.state.tableDataCount + 1
		});
	}

	tableDeleteCallback = (key) => {
		var data = [...this.state.tableData];

		for (let i = key.length - 1; i >= 0; i--) {
			data = data.filter(function (obj) {
				return obj.key !== key[i]
			});
		}

		this.setState({ tableData: data });
	}

	render() {
		/* You can assign the states to variables so instead of having to type
		 * this.state.[vairable name] you only have to type [variable name] */
		var { displayEnteredText, enteredText, tableData } = this.state;

		return (
			<Fragment>
				{/* This is how to do a comment within the return of the render function.
				  * It has to be C style with the curly braces or it will not work. */}
				<h1 className={styles.Header}>Ant Design Sample</h1>
				<br />

				<Popover placement="rightBottom" title="Additional Information" content={infoPopoverContent} trigger="click">
					<Button>
						<div style={{ display: 'inline-flex' }}>
							{/* You can also specify style inline like this, but you should stick to using CSS module files. */}
							<Icon style={{ fontSize: '14pt', color: '#08c', marginRight: 10 }} type="info-circle" />
							Click me for more info!
						</div>
					</Button>
				</Popover>

				<br /><br /><br />

				<Button type="primary" onClick={this.showModal}>
					Click me to open a modal!
				</Button>
				<br />
				{displayEnteredText ?
					`Entered text: '${enteredText}'` : null
				}

				<Modal
					title="This is a sample modal"
					visible={this.state.modalVisible}
					onOk={this.handleModalOk}
					onCancel={this.handleModalCancel}
				>
					<Input placeholder="Please insert some text..." onChange={this.inputChange} />
				</Modal>

				<br /><br /><br /><br />

				{/* This is an example of a component that exists in another file. */}
				<div className={styles.PersonTable}>
					<FormHandler callback={this.formCallback} />
					<TestTable dataSource={tableData} deleteCallback={this.tableDeleteCallback} />
				</div>

			</Fragment>
		);
	}
}

export { AntDTest };