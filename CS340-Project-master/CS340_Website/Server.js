var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('./dbcon.js');
var cors = require('cors');

var app = express();

app.use(cors());
app.use(express.json());
app.set('port', 8088);

// Unnecessary, leaving as an example.
app.get('/', function (req, res, next) {
	res.json({ msg: 'this is simply a test' });
});

// Unnecessary, leaving as an example.
app.get('/test', function (req, res, next) {
	var context = {};

	mysql.pool.query('SELECT * FROM match_table', function (err, rows, fields) {
		if (err) {
			next(err);
			return;
		}
		//context.results = JSON.stringify(rows);
		//res.send(context);
		res.json(rows);
	});
});

// Fetch a table from the database that matches the passed tableID
app.get('/get_table/:tableID', function (req, res, next) {
	var id = req.params.tableID;

	var query = 'SELECT * FROM ' + id + '_table';

	mysql.pool.query(query, function (err, rows, fields) {
		if (err) {
			next(err);
			return;
		}

		res.json(rows);
	});
});

app.get('/get_match_table', function (req, res, next) {
	var id = req.params.tableID;

	var query = 'SELECT CONCAT_WS(\' \', applicant_table.fname, applicant_table.mname, applicant_table.lname) ' +
		'AS Applicant_Name, applicant_table.interests AS Applicant_Interests,  role_table.roleName AS Open_Role, ' +
		'department_table.departmentName AS Department_Name, open_role_table.interestKeywords AS Keywords FROM ' +
		'role_table JOIN open_role_table ON role_table.roleID=open_role_table.roleID JOIN department_table ON ' +
		'role_table.departmentID = department_table.departmentID JOIN applicant_table ON applicant_table.MBTI = open_role_table.MBTI;';

	mysql.pool.query(query, function (err, rows, fields) {
		if (err) {
			next(err);
			return;
		}

		res.json(rows);
	});
});


/***************** INSERT functions *****************/

// Add a row to applicant_table
app.post('/add_to_applicant', function (req, res, next) {
	var fname = req.body.fname;
	var mname = null;
	var lname = req.body.lname;
	var age = req.body.age;
	var sex = req.body.sex;
	var MBTI = req.body.MBTI;
	var degreesID = parseInt(req.body.degreesID.charAt(0));
	var interests = null;

	if (req.body.mname !== null) {
		mname = req.body.mname;
	}
	if (req.body.interests !== null) {
		interests = req.body.interests
	}

	var query = `INSERT INTO applicant_table
				(
					fname, mname, lname, age, sex, MBTI, degreesID, interests
				)
				VALUES
				(
					?, ?, ?, ?, ?, ?, ?, ?
				)`;

	mysql.pool.query(query, [fname, mname, lname, age, sex, MBTI, degreesID, interests], function (err, rows, fields) {
		if (err) {
			next(err);
			return;
		}

		res.json({ msg: 'Successfully inserted row.' });
	});
});

// Add a row to degree_table
app.post('/add_to_degree', function (req, res, next) {
	var degreeCombination = req.body.degreeCombination;

	var query = `INSERT INTO degree_table
				(
					degreeCombination
				)
				VALUES
				(
					?
				)`;

	mysql.pool.query(query, [degreeCombination], function (err, rows, fields) {
		if (err) {
			next(err);
			return;
		}

		res.json({ msg: 'Successfully inserted row.' });
	});
});

// Add a row to department_table
app.post('/add_to_department', function (req, res, next) {
	var departmentName = req.body.departmentName;
	var departmentSize = req.body.departmentSize;

	var query = `INSERT INTO department_table
				(
					departmentName, departmentSize
				)
				VALUES
				(
					?, ?
				)`;

	mysql.pool.query(query, [departmentName, departmentSize], function (err, rows, fields) {
		if (err) {
			next(err);
			return;
		}

		res.json({ msg: 'Successfully inserted row.' });
	});
});

// Add a row to open_role_table
app.post('/add_to_open_role', function (req, res, next) {
	var roleID = req.body.roleID;
	var MBTI = req.body.MBTI;
	var interestKeywords = null;

	if (req.body.interestKeywords !== null) {
		interestKeywords = req.body.interestKeywords;
	}

	var query = `INSERT INTO open_role_table
				(
					roleID, MBTI, interestKeywords
				)
				VALUES
				(
					?, ?, ?
				)`;

	mysql.pool.query(query, [roleID, MBTI, interestKeywords], function (err, rows, fields) {
		if (err) {
			next(err);
			return;
		}

		res.json({ msg: 'Successfully inserted row.' });
	});
});

// Add a row to role_table
app.post('/add_to_role', function (req, res, next) {
	var roleName = req.body.roleName;
	var departmentID = req.body.departmentID;
	var baseSalary = req.body.baseSalary;

	var sqlQuery = `INSERT INTO role_table
				(
					roleName, departmentID, baseSalary
				)
				VALUES
				(
					?, ?, ?
				)`;

	mysql.pool.query(sqlQuery, [roleName, departmentID, baseSalary], function (err, rows, fields) {
		if (err) {
			res.json({ msg: err });
			return;
		}

		res.json({ msg: 'Successfully inserted row.' });
	});
});



/***************** UPDATE functions *****************/

// Update a row in applicant_table based on the applicantID in the body
app.put('/update_applicant', function (req, res, next) {
	var applicantID = req.body.applicantID;
	var fname = req.body.fname;
	var mname = null;
	var lname = req.body.lname;
	var age = req.body.age;
	var sex = req.body.sex;
	var MBTI = req.body.MBTI;
	var degreesID = parseInt(req.body.degreesID.charAt(0));
	var interests = null;

	if (req.body.mname !== null) {
		mname = req.body.mname;
	}
	if (req.body.interests !== null) {
		interests = req.body.interests
	}

	var query = `UPDATE applicant_table
				SET fname = ?, mname = ?, lname = ?, age = ?, sex = ?, MBTI = ?, degreesID = ?, interests = ?
				WHERE applicantID = ?`;

	mysql.pool.query(query, [fname, mname, lname, age, sex, MBTI, degreesID, interests, applicantID], function (err, rows, fields) {
		if (err) {
			next(err);
			return;
		}

		res.json({ msg: 'Successfully updated row ' + applicantID });
	});
});

// Update a row in degree_table based on the degreeID in the body
app.put('/update_degree', function (req, res, next) {
	var degreesID = req.body.degreesID;
	var degreeCombination = req.body.degreeCombination;

	var query = `UPDATE degree_table
				SET degreeCombination = ?
				WHERE degreesID = ?`;

	mysql.pool.query(query, [degreeCombination, degreesID], function (err, rows, fields) {
		if (err) {
			next(err);
			return;
		}

		res.json({ msg: 'Successfully updated row ' + degreesID });
	});
});

// Update a row in department_table based on the departmentID in the body
app.put('/update_department', function (req, res, next) {
	var departmentID = req.body.departmentID;
	var departmentName = req.body.departmentName;
	var departmentSize = req.body.departmentSize;

	var query = `UPDATE department_table
				SET departmentName = ?, departmentSize = ?
				WHERE departmentID = ?`;

	mysql.pool.query(query, [departmentName, departmentSize, departmentID], function (err, rows, fields) {
		if (err) {
			next(err);
			return;
		}

		res.json({ msg: 'Successfully updated row ' + departmentID });
	});
});

// Update a row in open_role_table based on the openRoleID in the body
app.put('/update_open_role', function (req, res, next) {
	var openRoleID = req.body.openRoleID;
	var roleID = req.body.roleID;
	var MBTI = req.body.MBTI;
	var interestKeywords = null;

	if (req.body.interestKeywords !== null) {
		interestKeywords = req.body.interestKeywords;
	}

	var query = `UPDATE open_role_table
				SET roleID = ?, MBTI = ?, interestKeywords = ?
				WHERE openRoleID = ?`;

	mysql.pool.query(query, [roleID, MBTI, interestKeywords, openRoleID], function (err, rows, fields) {
		if (err) {
			next(err);
			return;
		}

		res.json({ msg: 'Successfully updated row ' + openRoleID });
	});
});

// Update a row in role_table based on the roleID in the body
app.put('/update_role', function (req, res, next) {
	var roleID = req.body.roleID;
	var roleName = req.body.roleName;
	var departmentID = req.body.departmentID;
	var baseSalary = req.body.baseSalary;

	var query = `UPDATE role_table
				SET roleName = ?, departmentID = ?, baseSalary = ?
				WHERE roleID = ?`;

	mysql.pool.query(query, [roleName, departmentID, baseSalary, roleID], function (err, rows, fields) {
		if (err) {
			next(err);
			return;
		}

		res.json({ msg: 'Successfully updated row ' + roleID });
	});
});



/***************** DELETE functions *****************/

// Delete a row from applicant_table based on the applicantID in the body
app.delete('/delete_applicant', function (req, res, next) {
	var applicantID = req.body.applicantID;

	var query = `DELETE FROM applicant_table
				WHERE applicantID = ?`;

	mysql.pool.query(query, [applicantID], function (err, rows, fields) {
		if (err) {
			next(err);
			return;
		}

		res.json({ msg: 'Successfully deleted row ' + applicantID + ' from applicant_table' });
	});
});

// Delete a row from degree_table based on the degreesID in the body
app.delete('/delete_degree', function (req, res, next) {
	var degreesID = req.body.degreesID;

	/* Can't delete a degree that's in use in applicant_table.
	 * Must delete any entry in applicant_table using said degree first. */
	var query1 = `DELETE FROM applicant_table
				WHERE degreesID = ?`;

	mysql.pool.query(query1, [degreesID], function (err, rows, fields) {
		if (err) {
			next(err);
			return;
		}
	});

	// Now that foreign key constraints are deleted, delete from degree_table
	var query2 = `DELETE FROM degree_table
				WHERE degreesID = ?`;

	mysql.pool.query(query2, [degreesID], function (err, rows, fields) {
		if (err) {
			next(err);
			return;
		}

		res.json({ msg: 'Successfully deleted rows in applicant_table with degreesID ' + degreesID + '. Successfully deleted row ' + degreesID + ' from degree_table' });
	});
});

// Delete a row from degree_table based on the departmentID in the body
app.delete('/delete_department', function (req, res, next) {
	var departmentID = req.body.departmentID;

	/* Can't delete a department that's in use in role_table.
	 * Must delete any entry in role_table using said department first.
	 * But before that can be done, need to delete any entries in open_role_table
	 * that are using the roleID of the row in role_table we're trying to delete. */
	var query1 = `SELECT roleID FROM role_table
				WHERE departmentID = ?`;

	mysql.pool.query(query1, [departmentID], function (err, rows, fields) {
		if (err) {
			next(err);
			return;
		}

		deleteFromOpenRoles(rows);
	});

	/* Separated into functions to ensure that there's enough time to
	 * delete everything from open_role_table before moving on */
	function deleteFromOpenRoles(query1rows) {
		var query2 = `DELETE FROM open_role_table
						WHERE roleID = ?`;

		for (let i = 0; i < query1rows.length; i++) {
			var query2 = `DELETE FROM open_role_table
						WHERE roleID = ?`;

			mysql.pool.query(query2, [query1rows[i].roleID], function (err, rows, fields) {
				if (err) {
					next(err);
					return;
				}
			});
		}

		setTimeout(function () {
			var query3 = `DELETE FROM role_table
				WHERE departmentID = ?`;

			mysql.pool.query(query3, [departmentID], function (err, rows, fields) {
				if (err) {
					next(err);
					return;
				}
			});
		}, 1000);
		

		setTimeout(function () {
			var query4 = `DELETE FROM department_table
				WHERE departmentID = ?`;

			mysql.pool.query(query4, [departmentID], function (err, rows, fields) {
				if (err) {
					next(err);
					return;
				}

				res.json({ msg: 'Successfully deleted rows in open_role_table that constrain rows in role_table. Successfully deleted rows in role_table with departmentID ' + departmentID + '. Successfully deleted row ' + departmentID + ' in department_table' });
			});
		}, 1000);
	}
});

// Delete a row from degree_table based on the openRoleID in the body
app.delete('/delete_open_role', function (req, res, next) {
	var openRoleID = req.body.openRoleID;

	var query = `DELETE FROM open_role_table
				WHERE openRoleID = ?`;

	mysql.pool.query(query, [openRoleID], function (err, rows, fields) {
		if (err) {
			next(err);
			return;
		}

		res.json({ msg: 'Successfully deleted row ' + openRoleID + ' from open_role_table' });
	});
});

// Delete a row from degree_table based on the roleID in the body
app.delete('/delete_role', function (req, res, next) {
	var roleID = req.body.roleID;

	/* Can't delete a role that's in use in open_role_table.
	 * Must delete any entry in open_role_table using said role first. */
	var query1 = `DELETE FROM open_role_table
				WHERE roleID = ?`;

	mysql.pool.query(query1, [roleID], function (err, rows, fields) {
		if (err) {
			next(err);
			return;
		}
	});

	var query2 = `DELETE FROM role_table
				WHERE roleID = ?`;

	mysql.pool.query(query2, [roleID], function (err, rows, fields) {
		if (err) {
			next(err);
			return;
		}

		res.json({ msg: 'Successfully deleted rows in open_role_table with roleID ' + roleID + '. Successfully deleted row ' + roleID + ' from role_table' });
	});
});


// Set the server up on the selected port
app.listen(app.get('port'));