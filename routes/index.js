const { default: axios } = require("axios");
var express = require("express");
var router = express.Router();
const nodemailer = require("nodemailer");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/sendEmail", async (req, res, next) => {
  // const { email, message } = req.body;
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user:  process.env.MAIL_USERNAME,
      pass:  process.env.MAIL_PASSWORD,
    },

  });

 try {
  const info = await transporter.sendMail({
    from: '"Fred Foo 👻" <admin>', // sender address
    to: "Natanger97@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  
  })
  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  res.json({ message: "Email sent" });

 }
  catch (error) {
    console.log(error);
  }
 
});

module.exports = router;
