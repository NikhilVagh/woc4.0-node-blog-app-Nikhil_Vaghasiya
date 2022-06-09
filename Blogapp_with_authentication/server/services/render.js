const axios = require("axios");
var { Userdb1, Userdb2 } = require("../model/model");
const jwt = require("jsonwebtoken");
const { config } = require("dotenv");
const bcrypt = require('bcrypt');
const { use } = require("bcrypt/promises");

exports.login = (req, res) => {
    res.render("login");
};

exports.add_admin = (req, res) => {
    res.render("new_user");
};

exports.add = (req, res) => {
    const details = req.user;
    const user = new Userdb2({
        username: req.body.username,
        pass: bcrypt.hashSync(req.body.password, 10),
        role: details.role,
    })
    user
        .save(user)
        .then(data => {
            res.redirect('/home');
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while create new user."
            });
        });
};

exports.homeRoutes = (req, res) => {
    const userna = req.body.username;
    const pas = req.body.password;
    var que1 = { username: userna };

    Userdb2.findOne(que1)
        .then((data) => {
            if (!data || !bcrypt.compareSync(pas, data.pass)) {
                res.status(404).send({ message: "Not found username : " + userna + " with password : " + pas + " as register." });
            } else {
                const token = jwt.sign({ username: userna, role: data.role }, process.env.TOKEN_SECRET);
                if (data.role == "admin") {
                    Userdb1.find()
                        .then(user => {
                            res.cookie("jwt", token);
                            res.user = token;
                            res.render("index_admin", { users: user });
                        })
                        .catch(err => {
                            res.status(500).send({ message: err.message || "Error Occurred while retriving user information" })
                        })
                }
                else {
                    var que2 = { user_name: userna };
                    Userdb1.find(que2)
                        .then(data1 => {
                            if (!data1) {
                                res
                                    .status(404)
                                    .send({ message: "Not found username : " + userna + " with any post" });
                            } else {
                                res.cookie("jwt", token);
                                res.user = token;
                                res.render("index", { users: data1 });
                            }
                        })
                        .catch((err) => {
                            res
                                .status(500)
                                .send({ message: "Erro retrieving username : " + userna });
                        });
                }
            }
        })
        .catch((err) => {
            res
                .status(500)
                .send({ message: "Erro retrieving username : " + userna });
        });
};

exports.homeRoutes2 = (req, res) => {
    const userna = req.user.username;
    const role = req.user.role;
    if (role == "admin") {
        Userdb1.find()
            .then(user => {
                res.render("index_admin", { users: user });
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Error Occurred while retriving user information" })
            })
    }
    else {
        var que2 = { user_name: userna };
        Userdb1.find(que2)
            .then((data1) => {
                if (!data1) {
                    res.status(404).send({ message: "Not found username : " + userna });
                } else {
                    res.render("index", { users: data1 });
                }
            })
            .catch((err) => {
                res
                    .status(500)
                    .send({ message: "Erro retrieving username : " + userna });
            });
    }
}

exports.view_user = (req, res) => {
    const id = req.query.id;

    Userdb1.findById(id)
        .then((data) => {
            if (!data) {
                res.status(404).send({ message: "Not found user with id " + id });
            } else {
                res.render("view", { user: data });
            }
        })
        .catch((err) => {
            res.status(500).send({ message: "Erro retrieving user with id " + id });
        });
};

exports.add_post = (req, res) => {
    res.render("new_post");
};

exports.edit_user = (req, res) => {
    axios
        .get("http://localhost:3000/api/users", { params: { id: req.query.id } })
        .then(function (userdata) {
            res.render("edit_user", { user: userdata.data });
        })
        .catch((err) => {
            res.send(err);
        });
};

exports.logout = (req, res) => {
    res.cookie("jwt", "");
    res.redirect('/');
}
