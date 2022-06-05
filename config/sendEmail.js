const nodemailer = require("nodemailer")

module.exports =  async(email, subject, html) =>{



let transporter = await nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.email,
        pass: process.env.password
       }
     });
     
     var mailOptions = {
       from: `king-store "no-reply@king-store.com"`,
       replyTo: 'no-reply@king-store.com',
       to: email,
       subject: subject,
       html: html
     };
     
     await transporter.sendMail(mailOptions, function(error, info){
       if (error) {
         console.log(error);
       } else {
         console.log('Email sent: ' + info.response);
       }
     });


}