exports.requireAuth = (req, res, next) => {
  console.log('Authorization Header:', req.headers.authorization);
  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace('Bearer ', '');

  if (token !== 'coordinator-token') {
    console.log('Unauthorized access attempt');
    return res.status(403).json({ error: 'Unauthorized' });
  }

  next();
};