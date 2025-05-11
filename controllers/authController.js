exports.login = (req, res) => {
  console.log('🛂 Login controller called');

  const { username, password } = req.body;

  console.log('🔐 Received credentials:', username, password);

  if (username === 'coordinator' && password === 'admin123') {
    return res.status(200).json({ token: 'coordinator-token' });
  }

  return res.status(401).json({ error: 'Invalid credentials' });
};
