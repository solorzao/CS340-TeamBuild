import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Spin, Table, Input, Button, Icon } from 'antd';
import { serverURL } from '../App';

import Highlighter from 'react-highlight-words';
import styles from '../CSS/DatabaseTable.module.css';

export default class ViewMatches extends Component {
	state = {
		tableData: null,
		tableLoading: true
	};

	state = {
		searchText: '',
		searchedColumn: '',
	};

	getColumnSearchProps = dataIndex => ({
		filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
			<div style={{ padding: 8 }}>
				<Input
					ref={node => {
						this.searchInput = node;
					}}
					placeholder={`Search`}
					value={selectedKeys[0]}
					onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
					onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
					style={{ width: 188, marginBottom: 8, display: 'block' }}
				/>
				<Button
					type="primary"
					onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
					icon="search"
					size="small"
					style={{ width: 90, marginRight: 8 }}
				>
					Search
			</Button>
				<Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
					Reset
			</Button>
			</div>
		),
		filterIcon: filtered => (
			<Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
		),
		onFilter: (value, record) =>
			record[dataIndex]
				.toString()
				.toLowerCase()
				.includes(value.toLowerCase()),
		onFilterDropdownVisibleChange: visible => {
			if (visible) {
				setTimeout(() => this.searchInput.select());
			}
		},
		render: text =>
			this.state.searchedColumn === dataIndex ? (
				<Highlighter
					highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
					searchWords={[this.state.searchText]}
					autoEscape
					textToHighlight={text.toString()}
				/>
			) : (
					text
				),
	});

	handleSearch = (selectedKeys, confirm, dataIndex) => {
		confirm();
		this.setState({
			searchText: selectedKeys[0],
			searchedColumn: dataIndex,
		});
	};

	handleReset = clearFilters => {
		clearFilters();
		this.setState({ searchText: '' });
	};

	constructor() {
		super();

		this.columns = [
			{
				title: 'Applicant',
				dataIndex: 'Applicant_Name',
				width: 500,
				sorter: (a, b) => { return a.Applicant_Name.localeCompare(b.Applicant_Name) },
				...this.getColumnSearchProps('Applicant_Name'),
				render: (text, record) => <Link to={'applicant/'} onClick={() => { window.location.href = '/applicant'; }}>{text}</Link>,
			},
			{
				title: 'Applicant Interests',
				dataIndex: 'Applicant_Interests',
				width: 800,
				sorter: (a, b) => { return a.Applicant_Interests.localeCompare(b.Applicant_Interests) },
				...this.getColumnSearchProps('Applicant_Interests'),
				render: (text, record) => <Link to={'applicant/'} onClick={() => { window.location.href = '/applicant'; }}>{text}</Link>,
			},
			{
				title: 'Open Role',
				dataIndex: 'Open_Role',
				width: 500,
				sorter: (a, b) => { return a.Open_Role.localeCompare(b.Open_Role) },
				...this.getColumnSearchProps('Open_Role'),
				render: (text, record) => <Link to={'openRole/'} onClick={() => { window.location.href = '/openRole'; }}>{text}</Link>,
			},
			{
				title: 'Department Name',
				dataIndex: 'Department_Name',
				width: 500,
				sorter: (a, b) => { return a.Department_Name.localeCompare(b.Department_Name) },
				...this.getColumnSearchProps('Department_Name'),
				render: (text, record) => <Link to={'department/'} onClick={() => { window.location.href = '/department'; }}>{text}</Link>,
			},
			{
				title: 'Role Keywords',
				dataIndex: 'Keywords',
				width: 800,
				sorter: (a, b) => { return a.Keywords.localeCompare(b.Keywords) },
				...this.getColumnSearchProps('Keywords'),
				render: (text, record) => <Link to={'openRole/'} onClick={() => { window.location.href = '/openRole'; }}>{text}</Link>,
			}
		];
	}

	componentDidMount = async () => {
		await this.tableFetch();
	};

	tableFetch = async () => {
		// Get match table
		await fetch(serverURL + "get_match_table", {
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

	}

	render() {
		var { tableData, tableLoading } = this.state;
		
		const loading = {
			spinning: tableLoading,
			indicator: <Spin size="large" tip={<div className={styles.LoadingSpinTip}>Fetching from Database</div>} />,
		}

		return (
			<Fragment>
				<h1>Match Table</h1>

				<br />

				<h4>FOR ADMINISTRATOR USE ONLY</h4>
				<p>This table cannot be added to, edited, or deleted from.</p>

				<div style={{ maxWidth: 1500 }}>
					<Table
						rowKey="Applicant_Name"
						locale={{ emptyText: <div style={{ height: 120 }} /> }}
						loading={loading}
						columns={this.columns}
						dataSource={tableData}
						width={500}
						pagination={false}
					/>
				</div>
			</Fragment>
		);
	}
}