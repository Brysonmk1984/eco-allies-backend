const nodemailer = require('nodemailer');


  // create reusable transporter object using the default SMTP transport
  let transporter = process.env.NODE_ENV === 'development' ? 
    nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
          user: 'vhrks3qs5lf6x3rg@ethereal.email',
          pass: '1AAZg6Z86MYFBPPYwu'
      }
    })
  :
    nodemailer.createTransport({
      host: 'mail.brysonkruk.com',
      port: 465,
      secure: true,
      auth: {
          user: 'info@ecoallies.com',
          pass: '***thebhpass***'
      }
    });


const sendContactEmail = function(formData, resolve, reject){

  // setup email data with unicode symbols
  let mailOptions = {
      from: formData.email,
      to: 'info@ecoallies.com',
      subject: 'Ecoallies - A user submitted a form message.', 
      text: `Someone has a question or comment about Eco Allies, the message is as follows: \n \n ${formData.message} \n \n ACCOUNT DATA: ${JSON.stringify(formData.accountInfo)}`,
      html: `Someone has a question or comment about Eco Allies, the message is as follows: \n \n ${formData.message} \n \n ACCOUNT DATA: ${JSON.stringify(formData.accountInfo)}`
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

const sendProofEmail = function(formData, resolve, reject){

  // setup email data with unicode symbols
  let mailOptions = {
      from: formData.email,
      to: 'info@ecoallies.com',
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

module.exports = { sendContactEmail, sendProofEmail };
