import nodemailer from 'nodemailer';
import config from './config.js';


import generateCommentTemplate from './emailtemp/comment.js';
import generateAssignedTemplate from './emailtemp/assigned.js';


const templates = {
  comment: generateCommentTemplate,
  assigned: generateAssignedTemplate,
  
};

const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.com',
  port: 465,
  secure: true,
  auth: {
    user: config.USER,
    pass: config.PASS,
  },
});

const sendEmail = async ({ templateName, templateParams }) => {
  const generateTemplate = templates[templateName];
  if (!generateTemplate) {
    throw new Error(`No se encontró la plantilla: ${templateName}`);
  }

  const emailHtml = generateTemplate(templateParams);

  const mailOptions = {
    from: config.MAIL,
    to: templateParams.studentEmail,
    subject: 'Notificación de ExpoIngenierias',
    html: emailHtml,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Correo enviado: ' + info.response);
  } catch (error) {
    console.error('Error al enviar correo: ' + error.toString());
  }
};

export default sendEmail;
