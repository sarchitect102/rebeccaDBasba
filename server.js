const express = require("express");
const bodyParser = require("body-parser");
const axios = require('axios');
require("dotenv").config();
// const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (like HTML, CSS, JS)
app.use(express.static("public"));
 

// Route to handle form submission
app.post("/submit-form", async (req, res) => {
  const { name, email, mobile, location, time, date, timeZone,  message } = req.body;
res.send("Form submitted successfully!");
  // Log form data to the console
  console.log(
    `Name: ${name}\nEmail: ${email}\n Mobile: ${mobile}\nLocation: ${location}\n Time: ${time}\n Date:${date}\ntimeZone: ${timeZone}\n Message: ${message}`
  );

  // send form data to telegram
  const chat_id = process.env.CHAT_ID;
  const token = process.env.TELEGRAM_TOKEN;
  const messageText = `Name: ${name}\n ** Email: ${email}\n ** Mobile: ${mobile}\n ** Location: ${location}\n ** Time: ${time}\n ** Date:${date}\n ** timeZone: ${timeZone}\n **  Message: ${message}`;
  const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&text=${messageText}`;
  try {
    const response = await axios.get(url);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }



  // // Validate form data
  // if (!name || !email || !message) {
  //   return res.status(400).send("Please fill out all fields.");
  // }

  // Configure Nodemailer transporter
  // const transporter = nodemailer.createTransport({
  //   service: "gmail", // Use your email service (e.g., Gmail, Outlook)
  //   auth: {
  //     user: "your-email@gmail.com", // Your email address
  //     pass: "your-email-password", // Your email password or app-specific password
  //   },
  // });

  // // Email options
  // const mailOptions = {
  //   from: email,
  //   to: "your-email@gmail.com", // Recipient email address
  //   subject: `New Contact Form Submission from ${name}`,
  //   text: `Name: ${name}\nEmail: ${email}\n Mobile: ${mobile}\nLocation: ${location}\n Time: ${time}\n Date:${date}\ntimeZone: ${timeZone} Message: ${message}`,
  // };

  // // Send email
  // transporter.sendMail(mailOptions, (error, info) => {
  //   if (error) {
  //     console.error("Error sending email:", error);
  //     return res.status(500).send("Error sending email.");
  //   } else {
  //     console.log("Email sent:", info.response);
  //     return res.status(200).send("Form submitted successfully!");
  //   }
  // });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
