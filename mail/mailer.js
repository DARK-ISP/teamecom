import nodemailer from "nodemailer"


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for port 465, false for other ports
    auth: {
      user: "wwwghimiresagar88@gmail.com",
      pass: process.env.emailPassword,
    },
  });
  
  // async..await is not allowed in global scope, must use a wrapper
  export const mailOtp = async(email,token) => {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"Maddison Foo Koch 👻" <wwwghimiresagar88@gmail.com>', // sender address
      to: "wwwghimiresagar88@gmail.com", // list of receivers
      subject: "otp verification", // Subject line
    //   text: "Hello world?", // plain text body
      html:  `<div>Your otp code is <b>${token}</b></div>`, // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
  }
   
  