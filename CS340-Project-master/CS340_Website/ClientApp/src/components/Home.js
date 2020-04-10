import React, { Component } from 'react';
import { Button } from 'antd';

import { serverURL } from '../App';

export class Home extends Component {
	render () {
		return (
            <div>
				<h1>Hello, world!</h1>
				<br/>
				<p>This is our hiring compatibility Project for CS 340</p>

				<p>A word of warning: do not attempt to change between table pages while <br />
					the table is still being fetched from the database. Doing so will cause an error.</p>

				<p>Our server is located at :</p>
				<code>{serverURL}</code>
            </div>
		);
	}
}