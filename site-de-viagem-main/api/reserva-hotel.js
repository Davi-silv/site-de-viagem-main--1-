const pool = require('../db');
const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({success:false, msg:'Método não permitido.'});

  const { nome, email, hotel, checkin, checkout, hospedes } = req.body || {};

  if (!nome || !email || !hotel || !checkin || !checkout || !hospedes) {
    return res.status(400).json({success:false, msg:'Preencha todos os campos.'});
  }

  try {
    await pool.execute(
      'INSERT INTO reserva_hotel (nome, email, hotel, checkin, checkout, hospedes) VALUES (?, ?, ?, ?, ?, ?)',
      [nome, email, hotel, checkin, checkout, hospedes]
    );

    // Envio de e-mail
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 465,
      secure: true,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: email,
      subject: 'Confirmação de Reserva de Hotel - TravelWorld',
      text: `Olá ${nome},\n\nSua reserva no hotel '${hotel}' foi realizada com sucesso!\n\nCheck-in: ${checkin}\nCheck-out: ${checkout}\nHóspedes: ${hospedes}\n\nObrigado por escolher a TravelWorld!`
    });

    res.json({success:true, msg:'Reserva realizada com sucesso! Verifique seu e-mail.'});
  } catch (err) {
    res.status(500).json({success:false, msg:'Erro ao salvar reserva.', error: err.message});
  }
}; 