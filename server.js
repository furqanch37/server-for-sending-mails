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
  const nodemailer = require("nodemailer");

  // Extract the fields from the form submission
  const allTextFields = req.body["text-832"];
  const name = Array.isArray(allTextFields) ? allTextFields[0] : "";
  const phone = Array.isArray(allTextFields) ? allTextFields[1] : "";
  const subject = Array.isArray(allTextFields) ? allTextFields[2] : "";

  const email = req.body["email-889"];
  const message = req.body["textarea-333"];

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
      <center><img src="https://res.cloudinary.com/dzcecmml3/image/upload/v1745834808/furqan-img_t5ptqh.jpg" alt="Muhammad Furqan Logo" style="width: 70px; height:70px; border-radius:50%; border:2px solid #f28301; padding:5px; "></center>
      <center><h2 style="color: #3A3A3A; font-family: Arial, sans-serif; font-size: 24px; font-weight: bold; margin-bottom: 20px;">New Contact Form Submission</h2></center>

      <p style="font-size: 16px;"><strong>Name:</strong> ${name}</p>
      <p style="font-size: 16px;"><strong>Email:</strong> ${email}</p>
      <p style="font-size: 16px;"><strong>Phone:</strong> ${phone}</p>
      <p style="font-size: 16px;"><strong>Subject:</strong> ${subject}</p>
      <hr>
      <p style="font-size: 16px;"><strong>Message:</strong></p>
      <p style="font-size: 16px;">${message}</p>
    `,
  };

  const userMailOptions = {
    from: "muhammadfurqanch517@gmail.com",
    to: email,
    subject: "Thank You for Contacting Muhammad Furqan",
    html: `
      <center><img src="https://res.cloudinary.com/dzcecmml3/image/upload/v1745834808/furqan-img_t5ptqh.jpg" alt="Muhammad Furqan Logo" style="width: 70px; height:70px; border-radius:50%; border:2px solid #f28301; padding:5px;"></center>

      <center><h2 style="color: #3A3A3A; font-family: Arial, sans-serif; font-size: 24px; font-weight: bold;">Hi ${name},</h2></center>

      <p style="font-size: 16px;">Thank you for reaching out to <strong>Muhammad Furqan</strong>. I’ve received your message and will review it shortly.</p>

      <p style="font-size: 16px;"><strong>Your message:</strong></p>
      <p style="font-size: 16px;">"${message}"</p>

      <p style="font-size: 16px;">If you need immediate help, feel free to call us at +(407) 686 3865.</p>

      <p style="font-size: 16px;">Best regards,<br><strong>Muhammad Furqan</strong><br>address, FL<br><a href="mailto:muhammadfurqanch517@gmail.com">muhammadfurqanch517@gmail.com</a></p>
    `,
  };

  transporter.sendMail(storeMailOptions, (error, storeInfo) => {
    if (error) {
      console.error(error);
      return res.status(500).send("Error sending email to store");
    }

    transporter.sendMail(userMailOptions, (error, userInfo) => {
      if (error) {
        console.error(error);
        return res.status(500).send("Error sending email to user");
      }

      res.status(200).send("Form submitted successfully");
    });
  });
});








app.get("/", (req,res) =>{
  res.send("Backend server has started running successfully Muhammad saab...");
});

const server = app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
  
