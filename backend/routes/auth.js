const express = require("express");
const Users = require("../models/Users");
const bcrypt = require("bcrypt");
const router = express.Router();
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const Sib = require("sib-api-v3-sdk");
require("dotenv").config();

const client = Sib.ApiClient.instance;
const apiKey = client.authentications["api-key"];
apiKey.apiKey ="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"

function generateToken(id) {
  const token = jwt.sign({ userId: id }, "fskhkahkk88245fafjklakljfalk");
  return token;
}

router.post("/signup", async (req, res, next) => {
  try {
    const body = req.body;
    const username = body.username;
    const email = body.email;
    const user = await Users.findOne({ where: { username: username } });
    if (user) return res.status(202).json("User already exist");
    const useremail = await Users.findOne({ where: { email: email } });
    if (useremail) return res.status(202).json("User with email already exist");
    const hasdhedPass = await bcrypt.hash(body.password, saltRounds);
    await Users.create({
      username: body.username,
      email: body.email,
      password: hasdhedPass,
    });

    res.json("User created succesfully");
  } catch (error) {
    res.status(404).json(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ where: { email: email } });
    if (!user) {
      return res.status(401).json("Email doesnt exist");
    }

    const matched = await bcrypt.compare(password, user.password);
    if (!matched) return res.status(404).json("Password is incorrect");
    const token = generateToken(user.id);
    res.status(202).json({ msg: "Login Successful", token: token });
  } catch (error) {
    res.status(404).json(error);
  }
});

router.post("/forgot_password", async (req, res, next) => {
  try {
    const { email } = req.body;
    console.log("email is ",email)
    const tranEmailApi = new Sib.TransactionalEmailsApi();

    const sender = {
      email: "piyushpatil4270@gmail.com",
    };

    const receivers = [
      {
        email:email,
      },
    ];

    tranEmailApi
      .sendTransacEmail({
        sender,
        to: receivers,
        subject: "Random subject ",
        textContent: "hello world",
      })
      .then(() => {
        console.log(`Email sent to ${email} succesfully`)
        res.status(202).json("email sent succesfully")
    })
      .catch((err) => {
        console.log(err)
        res.status(404).json(err)
    });
     
  } catch (error) {
    res.status(404).json(error);
  }
});

module.exports = router;
