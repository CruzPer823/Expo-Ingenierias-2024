export default function generateEmailTemplate({ nombreAlumno, nombreProyecto, nombreProfesor, estatusProyecto, comentario }) {
    
    // Verificar si el comentario está vacío
    const comentarioText = comentario.trim() === '' ? 'Sin comentarios' : comentario;
  
    return `
      <!DOCTYPE html>
      <html lang="es">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
          <style type="text/css">
              .ExternalClass,.ExternalClass div,.ExternalClass font,.ExternalClass p,.ExternalClass span,.ExternalClass td,img {line-height: 100%;}#outlook a {padding: 0;}.ExternalClass,.ReadMsgBody {width: 100%;}a,blockquote,body,li,p,table,td {-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;}table,td {mso-table-lspace: 0;mso-table-rspace: 0;}img {-ms-interpolation-mode: bicubic;border: 0;height: auto;outline: 0;text-decoration: none;}table {border-collapse: collapse !important;}#bodyCell,#bodyTable,body {height: 100% !important;margin: 0;padding: 0;font-family: ProximaNova, sans-serif;}#bodyCell {padding: 20px;}#bodyTable {width: 600px;}@font-face {font-family: ProximaNova;src: url(https://cdn.auth0.com/fonts/proxima-nova/proximanova-regular-webfont-webfont.eot);src: url(https://cdn.auth0.com/fonts/proxima-nova/proximanova-regular-webfont-webfont.eot?#iefix)format("embedded-opentype"),url(https://cdn.auth0.com/fonts/proxima-nova/proximanova-regular-webfont-webfont.woff) format("woff");font-weight: 400;font-style: normal;}@font-face {font-family: ProximaNova;src: url(https://cdn.auth0.com/fonts/proxima-nova/proximanova-semibold-webfont-webfont.eot);src: url(https://cdn.auth0.com/fonts/proxima-nova/proximanova-semibold-webfont-webfont.eot?#iefix)format("embedded-opentype"),url(https://cdn.auth0.com/fonts/proxima-nova/proximanova-semibold-webfont-webfont.woff) format("woff");font-weight: 600;font-style: normal;}@media only screen and (max-width: 480px) {#bodyTable,body {width: 100% !important;}a,blockquote,body,li,p,table,td {-webkit-text-size-adjust: none !important;}body {min-width: 100% !important;}#bodyTable {max-width: 600px !important;}#signIn {max-width: 280px !important;}}
          </style>
      </head>
      <body>
          <center>
              <table
                  style='width: 600px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;margin: 0;padding: 0;font-family: "ProximaNova", sans-serif;border-collapse: collapse !important;height: 100% !important;'
                  align="center"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  height="100%"
                  width="100%"
                  id="bodyTable"
              >
                  <tr>
                      <td
                          align="center"
                          valign="top"
                          id="bodyCell"
                          style='-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;margin: 0;padding: 20px;font-family: "ProximaNova", sans-serif;height: 100% !important;'
                      >
                          <div class="main">
                              <p
                                  style="text-align: center;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%; margin-bottom: 30px;"
                              >
                                  <img
                                      src="https://i.postimg.cc/c40X3jy8/logoei.jpg"
                                      width="50"
                                      alt="EI"
                                      style="-ms-interpolation-mode: bicubic;border: 0;height: auto;line-height: 100%;outline: none;text-decoration: none;"
                                  />
                              </p>
  
                              <h1>Notificación de Comentarios en tu Proyecto</h1>
  
                              <p>Hola ${nombreAlumno}, tu proyecto <strong>${nombreProyecto}</strong> ha sido revisado por el docente asignado: <strong>${nombreProfesor}</strong>. El estatus de tu proyecto es:</p>
                              <p class="status"><strong>${estatusProyecto}</strong></p>
                              <p>Comentarios:</p>
                              <p class="comment" style="border: 1px solid #ccc;padding: 10px;border-radius: 5px;background-color: #f9f9f9;">${comentarioText}</p>
                              <p>Ingresa a tu perfil para ver más detalles de tu proyecto en el siguiente enlace:</p>
                              <p><a href="http://localhost:3000">http://localhost:3000</a></p>
  
                              <br />
                              ¡Gracias!
                              <br />
                              <strong>Equipo Expoingenierias</strong>
  
                              <br /><br />
                              <hr style="border: 2px solid #EAEEF3; border-bottom: 0; margin: 20px 0;" />
                              <p style="text-align: center;color: #A9B3BC;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;">
                                  Si no realizaste esta solicitud, por favor contáctanos respondiendo a este correo.
                              </p>
                          </div>
                      </td>
                  </tr>
              </table>
          </center>
      </body>
      </html>
    `;
  }
  
