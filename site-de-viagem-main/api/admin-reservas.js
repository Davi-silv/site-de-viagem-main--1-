const pool = require('../db');

module.exports = async (req, res) => {
  const token = req.headers['x-admin-token'];
  if (!token || token !== process.env.ADMIN_TOKEN) {
    return res.status(401).json({success:false, msg:'Não autorizado'});
  }
  try {
    const [destinos] = await pool.query('SELECT * FROM reserva_destino ORDER BY data_reserva DESC');
    const [hoteis] = await pool.query('SELECT * FROM reserva_hotel ORDER BY data_reserva DESC');
    res.json({success:true, destinos, hoteis});
  } catch (err) {
    res.status(500).json({success:false, msg:'Erro ao buscar reservas', error: err.message});
  }
}; 