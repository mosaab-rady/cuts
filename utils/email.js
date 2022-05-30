const nodemailer = require('nodemailer');

// const sendEmail = async (options) => {
//   const transporter = nodemailer.createTransport({
//     service: 'SendinBlue',
//     auth: {
//       user: process.env.SENDINBLUE_USERNAME,
//       pass: process.env.SENDINBLUE_PASSWORD,
//     },
//   });

//   const mailOptions = {
//     from: `Mosaab Radi <${process.env.EMAIL_FROM}>`,
//     to: options.to,
//     subject: options.subject,
//     html: '<b>Hey there! </b><br> This is our first message sent with Nodemailer',
//   };

//   await transporter.sendMail(mailOptions);
// };

// module.exports = sendEmail;

module.exports = class Email {
  constructor(options) {
    this.from = `Mosaab Radi <${process.env.EMAIL_FROM}>`;
    this.to = options.to;
    this.first_name = options.first_name;
  }

  transport() {
    return nodemailer.createTransport({
      service: 'SendinBlue',
      auth: {
        user: process.env.SENDINBLUE_USERNAME,
        pass: process.env.SENDINBLUE_PASSWORD,
      },
    });
  }

  async send(subject, html) {
    const mail_options = {
      from: this.from,
      // using mailsac.com or real email
      to: this.to,
      subject,
      html,
    };

    try {
      console.log('sent!!!!');
      await this.transport().sendMail(mail_options);
    } catch (error) {
      console.log(error);
    }
  }

  async welcome() {
    await this.send(
      'Welcome to cuts !!!',
      `<b>Hey ${this.first_name} </b><br> Welcome to cuts <br>we hope you like our amazing collections of clothes.`
    );
  }
};
