const nodemailer = require("nodemailer");

async function sendEmail(email, message, subject) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: '"Admin" <admin>', // sender address
      to: email, // list of receivers
      subject: subject, // Subject line
      text: message, // plain text body
      html: `<b>${message}</b>`, // html body
    
    })

  
    res.json({ message: "Email sent" });
  
   }
    catch (error) {
      console.log(error);
    }
}

module.exports = {sendEmail};
