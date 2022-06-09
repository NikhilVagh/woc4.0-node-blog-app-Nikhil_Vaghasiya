var { Userdb1, Userdb2 } = require('../model/model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.create_user = (req, res) => {

    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    if (req.cookies.jwt) {
        const token = req.cookies.jwt;
        const details = jwt.verify(token, process.env.TOKEN_SECRET);
        const user = new Userdb1({
            title: req.body.title,
            url: req.body.url,
            date: req.body.date,
            des: req.body.des,
            user_name: details.username,
        })

        user
            .save(user)
            .then(data => {
                res.redirect('/add-post');
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occured while creating a create operation"
                });
            });
    }
    else {
        const user = new Userdb2({
            username: req.body.username,
            pass: bcrypt.hashSync(req.body.password, 10),
        })

        user
            .save(user)
            .then(data => {
                const token = jwt.sign({ username: req.body.username, role: "user" }, process.env.TOKEN_SECRET);
                res.cookie("jwt", token);
                res.user = token;
                res.redirect('/home');
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occured while creating a create operation"
                });
            });
    }

};

exports.find = (req, res) => {

    const id = req.query.id;

    Userdb1.findById(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: "Not found user with id " + id })
            } else {
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error retrieving user with id " + id })
        })


}

exports.update = (req, res) => {
    if (!req.body) {
        return res
            .status(400)
            .send({ message: "Data to update can not be empty" })
    }

    const id = req.params.id;
    Userdb1.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot Update user with ${id}. Maybe user not found!` })
            } else {
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error Update user information" })
        })
}

exports.delete = (req, res) => {
    const id = req.params.id;

    Userdb1.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot Delete with ${id}. Maybe id is wrong!` })
            } else {
                res.send({
                    message: "User was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Could not delete User with id=${id}`
            });
        });
}