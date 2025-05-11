const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const PORT = 3000;
require('dotenv').config(); 
app.use(express.json());

const sendMedicalEmail = async (data) => {
    const { name, email, phone, date } = data;
  
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      }
    });
  
    const htmlContent = `
      <h3>New Patient Inquiry</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Date:</strong> ${date}</p>
    `;
  console.log(data.email);
  const mailOptions = {
    from: data.email,               // User's email (from the contact form)
    to: process.env.EMAIL,       // Your admin email (where the email will be sent)
    subject:'New Patient Inquiry', // fallback if subject not sent
    html: htmlContent
     // HTML content of the email body
  };

  await transporter.sendMail(mailOptions);
}
module.exports={sendMedicalEmail};
