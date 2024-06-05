import nodemailer from 'nodemailer';
import generateEmailTemplate from './emailtemp/comment.js'; 
import config from './config.js';

const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.com',
  port: 465,
  secure: true,
  auth: {
    user: config.USER,
    pass: config.PASS,
  },
});

const sendEmail = async ({ nombreAlumno, nombreProyecto, nombreProfesor, estatusProyecto, comentario, studentEmail }) => {
  const emailHtml = generateEmailTemplate({ nombreAlumno, nombreProyecto, nombreProfesor, estatusProyecto, comentario });

  const mailOptions = {
    from: config.MAIL,
    to: studentEmail,
    subject: 'Notificación de Comentarios en tu Proyecto',
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
