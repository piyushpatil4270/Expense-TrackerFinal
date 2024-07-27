const http = require("http");
const express = require("express");
const cors = require("cors");
const sequelize = require("./utils/db");
const AuthRouter = require("./routes/auth");
const Users = require("./models/Users");
const Expenses = require("./models/Expenses");
const ExpenseRouter = require("./routes/expense");
const crypto = require("crypto");
const bodyParser = require("body-parser");

const app = express();
const server = http.createServer(app);

Users.hasOne(Expenses, { foreignKey: "userId" });

const key = "4qVKdt";
const salt = "EkDHiiSmyzFM36MoRCdG16hrAMaymo7w";

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

sequelize
  .sync()
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.log(err));



function generateHash(key, txnid, amount, productinfo, firstname, email, salt) {
  const hashString = `${key}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|||||||||||${salt}`;
  return crypto.createHash("sha512").update(hashString).digest("hex");
}


app.post("/payu", async (req, res, next) => {
  try {
    const { txnid, amount, productinfo, firstname, email, phone } = req.body;
    const hash = generateHash(key, txnid, amount, productinfo, firstname, email, salt);
    const payuData = {
      key: key,
      txnid: txnid,
      amount: amount,
      productinfo: productinfo,
      firstname: firstname,
      email: email,
      phone: phone,
      surl: "http://localhost:5500/success",
      furl: "http://localhost:5500/failure",
      hash: hash,
      service_provider: "payu_paisa",
    };

    res.json(payuData);
  } catch (error) {
    console.error("Error in /payu endpoint:", error);
    res.status(500).json({ status: "failure", message: "Internal Server Error" });
  }
});

app.post("/payu_response", (req, res) => {
  try {
    const { key, txnid, amount, productinfo, firstname, email, status, hash } = req.body;
    
    const hashString = `${salt}|${status}|||||||||||${email}|${firstname}|${productinfo}|${amount}|${txnid}|${key}`;

    const newHash = crypto.createHash("sha512").update(hashString).digest("hex");
    console.log(hashString,"  ",newHash)

    if (newHash === hash) {
      res.json({ status: "success", message: "Payment Successful" });
    } else {
      res.json({ status: "failure", message: "Payment Verification Failed" });
    }
  } catch (error) {
    console.error("Error in /payu_response endpoint:", error);
    res.status(500).json({ status: "failure", message: "Internal Server Error" });
  }
});




app.post("/success", (req, res) => {
  console.log("Success Endpoint:", req.body);

  res.json("Payment Successful");
});

app.post("/failure", (req, res) => {
  res.json("Payment failed");
});
app.use("/auth", AuthRouter);
app.use("/expense", ExpenseRouter);

server.listen(5500, () => console.log("Server started on port 5500"));
