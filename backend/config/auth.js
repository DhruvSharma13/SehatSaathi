require('dotenv').config();

module.exports = {
  jwtSecret: process.env.JWT_SECRET || 'fallback_secret_for_hackathon',
  jwtExpiration: '24h',
};
