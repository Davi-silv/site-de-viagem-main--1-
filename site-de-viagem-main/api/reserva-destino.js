const pool = require('../db');
const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({success:false, msg:'Método não permitido.'});

  const { nome, email, destino, data_ida, data_volta, passageiros } = req.body || {};

  if (!nome || !email || !destino || !data_ida || !data_volta || !passageiros) {
    return res.status(400).json({success:false, msg:'Preencha todos os campos.'});
  }

  try {
    await pool.execute(
      'INSERT INTO reserva_destino (nome, email, destino, data_ida, data_volta, passageiros) VALUES (?, ?, ?, ?, ?, ?)',
      [nome, email, destino, data_ida, data_volta, passageiros]
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
      subject: 'Confirmação de Reserva de Destino - TravelWorld',
      text: `Olá ${nome},\n\nSua reserva para o destino '${destino}' foi realizada com sucesso!\n\nData de ida: ${data_ida}\nData de volta: ${data_volta}\nPassageiros: ${passageiros}\n\nObrigado por escolher a TravelWorld!`
    });

    res.json({success:true, msg:'Reserva realizada com sucesso! Verifique seu e-mail.'});
  } catch (err) {
    res.status(500).json({success:false, msg:'Erro ao salvar reserva.', error: err.message});
  }
}; 