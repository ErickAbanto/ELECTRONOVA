import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const enviarCorreoRecuperacion = async ({ destinatario, nombre, resetLink }) => {
  const mailOptions = {
    from: `"ELECTRONOVA" <${process.env.EMAIL_USER || "no-reply@electronova.com"}>`,
    to: destinatario,
    subject: "Recuperación de Contraseña - ELECTRONOVA",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <h2 style="color: #0d47a1;">Recuperación de Contraseña</h2>
        <p>Hola <strong>${nombre}</strong>,</p>
        <p>Has solicitado restablecer tu contraseña en el sistema ELECTRONOVA. Haz clic en el botón siguiente para definir una nueva:</p>
        <p style="text-align: center; margin: 30px 0;">
          <a href="${resetLink}" style="background-color: #0d47a1; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Restablecer Contraseña</a>
        </p>
        <p style="color: #666; font-size: 13px;">Este enlace es válido únicamente por 15 minutos.</p>
        <p style="color: #999; font-size: 12px;">Si no solicitaste este cambio, puedes ignorar este mensaje de forma segura.</p>
      </div>
    `,
  };

  return await transporter.sendMail(mailOptions);
};

export { enviarCorreoRecuperacion };
