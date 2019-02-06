const nodemailer = require('nodemailer');

const sendEmail = function(formData, resolve, reject){
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
        user: 'vhrks3qs5lf6x3rg@ethereal.email',
        pass: '1AAZg6Z86MYFBPPYwu'
    }
  });

  // let transporter = nodemailer.createTransport({
  //   host: 'mail.brysonkruk.com',
  //   port: 465,
  //   secure: true,
  //   auth: {
  //       user: 'info.ecoallies@brysonkruk.com',
  //       pass: '***thebhpass***'
  //   }
  // });

  // setup email data with unicode symbols
  let mailOptions = {
      from: 'info.ecoallies@brysonkruk.com',
      to: 'bryson.kruk@protonmail.com',
      subject: 'Eco Allies Proof Has been Submitted', 
      text: `This is an automated email indicating someone submitted Eco Ally Proof, there should be an attachment and there may be an included optional message from the user below: \n ${formData.message}`,
      html: `<p>This is an automated email indicating someone submitted Eco Ally Proof, there should be an attachment and there may be an included optional message from the user below: \n ${formData.message}</p>`,
      attachments: [{filename : formData.filename, content : formData.file}]
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          reject(console.log(error));
      }

      console.log('Message sent: %s', info.messageId);
      // Preview only available when sending through an Ethereal account
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      resolve(nodemailer.getTestMessageUrl(info));
  });
};

module.exports = sendEmail;
