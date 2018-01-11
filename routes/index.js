var express = require('express');
var router = express.Router();
// Mongo db
const mongodb = require('../model/db.js');
const ObjectId = require('mongodb').ObjectId;
const User = require('../model/schemas/users.js');

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', { title: 'My Portfolio', err: '' });
});
router.get('/home', function (req, res, next) {
	res.render('index', { title: 'My Portfolio', err: '' });
});




// Ajax request
router.post("/regist", (req, res, next) => {
	let newUser = new User(req.body);
	console.log(newUser);
	newUser.save().then(() => {
		console.log("ok");
		res.send(req.body);
	}).catch((err) => {
		console.log(err);
		res.send(err);
	});
});
// router.post("/login", (req, res, next) => {
// 	let login = req.body.login;
//     let password = req.body.pass;
//     User.findOne({ "email": `${login}` }, function (err, docs) {
//         if (err) throw err;
//         if (docs != null) {
//             if (docs.checkPassword(password)) {
//                 // req.session.name = docs._id;
//                 // console.log(req.session.name);
//                 res.redirect('/');
//             }
//             else {
//                 // req.session.name = "";
//                 res.render(`index`, { title: "Login", err: "Incorrect password" });
//             }
//         } else {
//             res.render(`index`, { title: "Login", err: "Incorrect email" });
//         }
//     })
// });

router.post("/login", (req, res, next) => {
	console.log(req.body);
	User.findOne({ "email": `${req.body.email}` }, function (err, docs) {
		if (err) throw err;
		let loginInfo = {};
		if (docs != null) {
			if (docs.checkPassword(req.body.password)) {
				req.session.name = docs._id;
				console.log(req.session);
				loginInfo.user = docs;
				res.send(loginInfo);
			} else {
				loginInfo.passErr = "Incorrect password";
				res.send(loginInfo);
			}
		} else {
			loginInfo.emailErr = "Incorrect email";
			res.send(loginInfo);
		}

	})
});

module.exports = router;
