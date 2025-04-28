const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());







app.post("/send-data-myportfolio", (req, res) => {
  const { name, email, message, subject } = req.body;
  const nodemailer = require("nodemailer");

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'muhammadfurqanch517@gmail.com',
      pass: 'ooszsmkdjtrmcmis',
    },
  });

  const storeMailOptions = {
    from: email,
    to: "muhammadfurqanch517@gmail.com",
    subject: `New Inquiry from ${name}: ${subject}`,
    html: `
      <center><img src="https://res.cloudinary.com/dzcecmml3/image/upload/v1745834808/furqan-img_t5ptqh.jp" alt="Muhammad Furqan Logo" style="width: 70px; height:70px; border-radius:50%; border:2px solid #f28301; padding:5px; "></center>

      <center><h2 style="color: #3A3A3A; font-family: Arial, sans-serif; font-size: 24px; font-weight: bold; margin-bottom: 20px;">New Contact Form Submission</h2></center>

      <p style="color: #3A3A3A; font-family: Arial, sans-serif; font-size: 16px;">You’ve received a new inquiry from the website contact form:</p>
      <p style="color: #3A3A3A; font-family: Arial, sans-serif; font-size: 16px;"><strong>Name:</strong> ${name}</p>
      <p style="color: #3A3A3A; font-family: Arial, sans-serif; font-size: 16px;"><strong>Email:</strong> ${email}</p>
      <p style="color: #3A3A3A; font-family: Arial, sans-serif; font-size: 16px;"><strong>Subject:</strong> ${subject}</p>
      <hr style="border: 0.5px solid #ccc;">
      <p style="color: #3A3A3A; font-family: Arial, sans-serif; font-size: 16px;"><strong>Message:</strong></p>
      <p style="color: #3A3A3A; font-family: Arial, sans-serif; font-size: 16px; line-height: 1.5;">${message}</p>
    `,
  };

  const userMailOptions = {
    from: "muhammadfurqanch517@gmail.com",
    to: email,
    subject: "Thank You for Contacting Muhammad Furqan",
    html: `
      <center><img src="https://res.cloudinary.com/dzcecmml3/image/upload/v1745834808/furqan-img_t5ptqh.jp" alt="All County Construction Logo" style="width: 70px; height:70px; border-radius:50%; border:2px solid #f28301; padding:5px;"></center>

      <center><h2 style="color: #3A3A3A; font-family: Arial, sans-serif; font-size: 24px; font-weight: bold;">Hi ${name},</h2></center>

      <p style="color: #3A3A3A; font-family: Arial, sans-serif; font-size: 16px; line-height: 1.5;">Thank you for reaching out to <strong>All County Construction Services Inc.</strong> We’ve received your message and our team will review it shortly.</p>
      
      <p style="color: #3A3A3A; font-family: Arial, sans-serif; font-size: 16px; margin-top: 10px;"><strong>Your message:</strong></p>
      <p style="color: #3A3A3A; font-family: Arial, sans-serif; font-size: 16px; line-height: 1.5;">"${message}"</p>

      <p style="color: #3A3A3A; font-family: Arial, sans-serif; font-size: 16px; line-height: 1.5;">We appreciate your interest and will get back to you as soon as possible. If you need immediate assistance, feel free to call us directly at +(407) 686 3865.</p>

      <p style="color: #3A3A3A; font-family: Arial, sans-serif; font-size: 16px; line-height: 1.5;">Best regards,<br><strong>All County Construction Services Inc.</strong><br>Winter Haven, FL<br><a href="mailto:marcus@allcountyfl.com" style="color: #149ddd;">marcus@allcountyfl.com</a></p>
    `
  };

  transporter.sendMail(storeMailOptions, function(error, storeInfo) {
    if (error) {
      console.error(error);
      res.status(500).send("Error sending email to store");
    } else {
      console.log("Email sent to store: " + storeInfo.response);

      transporter.sendMail(userMailOptions, function(error, userInfo) {
        if (error) {
          console.error(error);
          res.status(500).send("Error sending email to user");
        } else {
          console.log("Email sent to user: " + userInfo.response);
          res.status(200).send("Form submitted successfully");
        }
      });
    }
  });
});










app.get("/", (req,res) =>{
  res.send("Backend server has started running successfully Muhammad saab...");
});

const server = app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
  
