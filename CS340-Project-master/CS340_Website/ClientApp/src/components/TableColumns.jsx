import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const ApplicantTableColumns = [
	{
		title: 'First Name',
		dataIndex: 'fname',
		width: 200,
		sorter: (a, b) => { return a.fname.localeCompare(b.fname) },
	},
	{
		title: 'Middle Initial',
		dataIndex: 'mname',
		width: 100,
		sorter: (a, b) => { return a.mname.localeCompare(b.mname) },
	},
	{
		title: 'Last Name',
		dataIndex: 'lname',
		width: 200,
		sorter: (a, b) => { return a.lname.localeCompare(b.lname) },
	},
	{
		title: 'Age',
		dataIndex: 'age',
		width: 75,
		sorter: (a, b) => a.age - b.age,
	},
	{
		title: 'Sex',
		dataIndex: 'sex',
		width: 75,
		sorter: (a, b) => { return a.sex.localeCompare(b.sex) },
	},
	{
		title: 'MBTI',
		dataIndex: 'MBTI',
		width: 100,
		sorter: (a, b) => { return a.MBTI.localeCompare(b.MBTI) },
		onFilter: (value, record) => record.MBTI.indexOf(value) === 0,
		filters: [
			{ text: 'ISTJ', value: 'ISTJ', },
			{ text: 'ISFJ', value: 'ISFJ', },
			{ text: 'INFJ', value: 'INFJ', },
			{ text: 'INTJ', value: 'INTJ', },
			{ text: 'ISTP', value: 'ISTP', },
			{ text: 'ISFP', value: 'ISFP', },
			{ text: 'INFP', value: 'INFP', },
			{ text: 'INTP', value: 'INTP', },
			{ text: 'ESTP', value: 'ESTP', },
			{ text: 'ESFP', value: 'ESFP', },
			{ text: 'ENFP', value: 'ENFP', },
			{ text: 'ENTP', value: 'ENTP', },
			{ text: 'ESTJ', value: 'ESTJ', },
			{ text: 'ESFJ', value: 'ESFJ', },
			{ text: 'ENFJ', value: 'ENFJ', },
			{ text: 'ENTJ', value: 'ENTJ', },
		],
	},
	{
		title: 'Degree(s)',
		dataIndex: 'degreesID',
		width: 200,
		render: (text, record) => <Link to={'degree/'} onClick={() => { window.location.href = '/degree'; }}>{text}</Link>,
	},
	{
		title: 'Interests',
		dataIndex: 'interests',
	}
];

const DepartmentTableColumns = [
	{
		title: 'Department',
		dataIndex: 'departmentName',
		sorter: (a, b) => { return a.departmentName.localeCompare(b.departmentName) },
	},
	{
		title: 'Department Size',
		dataIndex: 'departmentSize',
		width: 100,
		sorter: (a, b) => a.departmentSize - b.departmentSize,
	},
];

const OpenRoleTableColumns = [
	{
		title: 'Role ID',
		dataIndex: 'roleID',
		width: 200,
		sorter: (a, b) => a.roleID - b.roleID,
		render: (text, record) => <Link to={'role/'} onClick={() => { window.location.href = '/role'; }}>{text}</Link>,
	},
	{
		title: 'Associated MBTI',
		dataIndex: 'MBTI',
		width: 150,
		sorter: (a, b) => { return a.MBTI.localeCompare(b.MBTI) },
		onFilter: (value, record) => record.MBTI.indexOf(value) === 0,
		filters: [
			{ text: 'ISTJ', value: 'ISTJ', },
			{ text: 'ISFJ', value: 'ISFJ', },
			{ text: 'INFJ', value: 'INFJ', },
			{ text: 'INTJ', value: 'INTJ', },
			{ text: 'ISTP', value: 'ISTP', },
			{ text: 'ISFP', value: 'ISFP', },
			{ text: 'INFP', value: 'INFP', },
			{ text: 'INTP', value: 'INTP', },
			{ text: 'ESTP', value: 'ESTP', },
			{ text: 'ESFP', value: 'ESFP', },
			{ text: 'ENFP', value: 'ENFP', },
			{ text: 'ENTP', value: 'ENTP', },
			{ text: 'ESTJ', value: 'ESTJ', },
			{ text: 'ESFJ', value: 'ESFJ', },
			{ text: 'ENFJ', value: 'ENFJ', },
			{ text: 'ENTJ', value: 'ENTJ', },
		],
	},
	{
		title: 'Keywords',
		dataIndex: 'interestKeywords',
	}
];

const DegreesTableColumns = [
	{
		title: 'Degree(s)',
		dataIndex: 'degreeCombination',
		sorter: (a, b) => { return a.degreeCombination.localeCompare(b.degreeCombination) },
	},
];

const RoleTableColumns = [
	{
		title: 'Associated Department',
		dataIndex: 'departmentID',
		width: 300,
		sorter: (a, b) => a.departmentID - b.departmentID,
		render: (text, record) => <Link to={'department/'} onClick={() => { window.location.href = '/department'; }}>{text}</Link>,
	},
	{
		title: 'Associated Role',
		dataIndex: 'roleName',
		width: 200,
		sorter: (a, b) => { return a.roleName.localeCompare(b.roleName) },
	},
	{
		title: 'Salary',
		dataIndex: 'baseSalary',
		sorter: (a, b) => a.baseSalary - b.baseSalary,
		render: value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
	},
];

export {
	ApplicantTableColumns,
	DepartmentTableColumns,
	OpenRoleTableColumns,
	DegreesTableColumns,
	RoleTableColumns
};