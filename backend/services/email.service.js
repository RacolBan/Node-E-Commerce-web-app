const nodemailer = require('nodemailer');
const {fromMail, fromPWD} = require("../config/mail.config")

async function sendMail(toEmail, emailSubject, emailContent) {

    let transporter = nodemailer.createTransport ({
        service: "gmail",
        auth : {
            user: fromMail,
            pass: fromPWD
        }
    }) 


    // send mail with defined transport object
    await transporter.sendMail({
        from: fromMail, // sender address
        to: toEmail, // list of receivers
        subject: emailSubject, // Subject line
        text: emailContent, // plain text body
    });
}

module.exports = sendMail