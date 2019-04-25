const {EMAIL_NAME, EMAIL_PASS, EMAIL_API, EMAIL_BASE} = process.env;
const nodemailer = require('nodemailer');

module.exports = {
    sendEmail: (req, res) => {
        transport = {
            host: EMAIL_BASE,
            auth: {
                user: EMAIL_NAME,
                pass: EMAIL_PASS
            }
        };

        let transporter = nodemailer.createTransport(transport);

        transporter.verify((err, success) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Server is ready to take messages')
            }
        })

        const {email, number, name, message} = req.body;
        let mail = {
            from: email,
            to: EMAIL_NAME,
            subject: `${name} is trying to contact you`,
            text: `Hello, my name is ${name}. You may reach me at ${number} or at ${email}. My message: ${message}`
        };

        transporter.sendMail(mail, (err, data) => {
            if (err) {
                res.json({msg: 'fail'})
            } else {
                res.json({msg: 'success'})
            }
        })
    }
}