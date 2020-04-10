import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Layout, Menu, Icon } from 'antd';

import { Home } from './components/Home';
import DatabaseTableHandler from './components/DatabaseTableHandler';
import ViewMatches from './components/viewMatches';
import { About } from './components/About';
import { AntDTest } from './components/AntDTest'; // not connected to the menu. You have to access by URL

import styles from './CSS/App.module.css';

export const serverURL = "http://access.engr.oregonstate.edu:8088/"

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default class App extends Component {
	constructor() {
		super();

		// Get the current page for the menu
		var URL = window.location.href;

		var page = '1';
		var subMenu = '';

		/* This is a really messy way of doing this, but it doesn't really matter. */
		if (URL.includes('about')) {
			page = '2';
		}
		else if (URL.includes('view_matches')) {
			page = '3';
		}
		else if (URL.includes('applicant')) {
			page = 's1-1';
			subMenu = 's1';
		} else if (URL.includes('department')) {
			page = 's1-2';
			subMenu = 's1';
		} else if (URL.includes('openRole')) {
			page = 's1-3';
			subMenu = 's1';
		} else if (URL.includes('degree')) {
			page = 's1-4';
			subMenu = 's1';
		} else if (URL.includes('role')) {
			page = 's1-5';
			subMenu = 's1';
		}

		this.state = {
			collapsed: false,
			currentPage: page,
			currentSubMenu: subMenu
		};
	};

	onCollapse = (collapsed) => {
		this.setState({ collapsed });
	}

	toggle = () => {
		this.setState({
			collapsed: !this.state.collapsed
		});
	}

	menuSwap = (obj) => {
		this.setState({ currentPage: obj.key });
	}

	render() {
		var { collapsed, currentPage, currentSubMenu } = this.state;

		return (
			<Router>
				<Header className={styles.AppHeader}>
					CS 340 Project Website
				</Header>

				<Layout className={styles.AppLayout}>
					<Sider
						collapsible
						onCollapse={this.onCollapse}
						collapsed={collapsed}
					>
						<Menu
							theme="dark"
							defaultSelectedKeys={[currentPage]}
							defaultOpenKeys={[currentSubMenu]}
							mode="inline"
						>
							<Menu.Item key="1" onClick={this.menuSwap}>
								<Icon type="home" className={styles.MenuIcon} />
								<span>Home</span>
								<Link to="/" />
							</Menu.Item>
							<Menu.Item key="2" onClick={this.menuSwap}>
								<Icon type="info-circle" className={styles.MenuIcon} />
								<span>About</span>
								<Link to="/about" />
							</Menu.Item>
							<Menu.Item key="3" onClick={this.menuSwap}>
								<Icon type="check" className={styles.MenuIcon} />
								<span>View Matches</span>
								<Link to="/view_matches" />
							</Menu.Item>
							<SubMenu
								key="s1"
								title={
									<span>
										<Icon type="table" className={styles.MenuIcon} />
										<span>View Tables</span>
									</span>
								}
							>
								<Menu.Item key="s1-1" onClick={this.menuSwap}>
									<span>Applicant</span>
									<Link to="/applicant" />
								</Menu.Item>
								<Menu.Item key="s1-2" onClick={this.menuSwap}>
									<span>Department</span>
									<Link to="/department" />
								</Menu.Item>
								<Menu.Item key="s1-3" onClick={this.menuSwap}>
									<span>Open Role</span>
									<Link to="/openRole" />
								</Menu.Item>
								<Menu.Item key="s1-4" onClick={this.menuSwap}>
									<span>Degree</span>
									<Link to="/degree" />
								</Menu.Item>
								<Menu.Item key="s1-5" onClick={this.menuSwap}>
									<span>Role</span>
									<Link to="/role" />
								</Menu.Item>
							</SubMenu>
						</Menu>
					</Sider>

					<Layout>
						<Content className={styles.AppContent}>
							<Route exact path="/" component={Home} />
							<Route exact path="/about" component={About} />
							<Route exact path="/view_matches" component={ViewMatches} />

							{/* First submenu */}
							<Route path="/applicant" render={(props) => <DatabaseTableHandler {...props} pageType="Applicant" />} />
							<Route path="/department" render={(props) => <DatabaseTableHandler {...props} pageType="Department" />} />
							<Route path="/openRole" render={(props) => <DatabaseTableHandler {...props} pageType="Open Role" />} />
							<Route path="/degree" render={(props) => <DatabaseTableHandler {...props} pageType="Degree" />} />
							<Route path="/role" render={(props) => <DatabaseTableHandler {...props} pageType="Role" />} />

							<Route exact path="/AntDTest" component={AntDTest} />
						</Content>
						<Footer className={styles.AppFooter}>
							Ant Design &copy;2016 Created by Ant UED
						</Footer>
					</Layout>
				</Layout>
			</Router>
		);
	}
}
