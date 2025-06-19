const pool = require('../db');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({success:false, msg:'Método não permitido.'});

  const { email } = req.body || {};
  if (!email) return res.status(400).json({success:false, msg:'E-mail obrigatório.'});

  try {
    await pool.execute('INSERT INTO newsletter (email) VALUES (?)', [email]);
    res.json({success:true, msg:'Inscrição realizada com sucesso!'});
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      res.json({success:false, msg:'Este e-mail já está cadastrado.'});
    } else {
      res.status(500).json({success:false, msg:'Erro ao cadastrar.', error: err.message});
    }
  }
}; 