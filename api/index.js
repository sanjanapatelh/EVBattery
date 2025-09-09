const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Enable CORS for all routes
app.use(cors({
  origin: [
    'http://localhost:5173', 
    'http://localhost:5174', 
    'http://localhost:5175',
    'http://localhost:3000'
  ], // All Vite dev server ports and API server
  credentials: true
}));

app.use(bodyParser.json());

// Simple test route
app.get('/test', (req, res) => {
  res.json({ message: 'API is working!', timestamp: new Date().toISOString() });
});

// Test manufacturer registration endpoint
app.get('/test-registration', (req, res) => {
  res.json({ 
    message: 'Registration endpoints are available!', 
    endpoints: [
      'POST /manufacturer/register/battery-manufacturer',
      'POST /manufacturer/register/ev-manufacturer', 
      'POST /manufacturer/register/ev-consumer',
      'POST /manufacturer/register/recycler'
    ],
    timestamp: new Date().toISOString() 
  });
});

app.use('/battery', require('./routes/battery'));
app.use('/ev', require('./routes/ev'));
app.use('/manufacturer', require('./routes/manufacturer'));
app.use('/recycler', require('./routes/recycler'));
app.use('/owner', require('./routes/owner'));
// In-memory storage for user credentials
let userCredentials = {};

// Helper function to register credentials
const registerCredentials = (username, password, userId, userType) => {
  userCredentials[username] = {
    username,
    password,
    userId,
    userType,
    createdAt: new Date().toISOString()
  };
  console.log('Registered credentials for:', username, 'Type:', userType);
  console.log('Current credentials:', Object.keys(userCredentials));
};

// Simple auth endpoints
app.get('/auth/test', (req, res) => {
  res.json({ message: 'Auth test endpoint working!', timestamp: new Date().toISOString() });
});

app.get('/auth/users', (req, res) => {
  const users = Object.values(userCredentials).map(cred => ({
    username: cred.username,
    userType: cred.userType,
    userId: cred.userId,
    createdAt: cred.createdAt
  }));
  res.json({ success: true, users });
});

app.post('/auth/register-credentials', (req, res) => {
  console.log('Received registration request:', req.body);
  try {
    const { username, password, userId, userType } = req.body;
    
    if (!username || !password || !userId || !userType) {
      console.log('Missing fields:', { username, password, userId, userType });
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields: username, password, userId, userType' 
      });
    }
    
    // Store credentials
    userCredentials[username] = {
      username,
      password,
      userId,
      userType,
      createdAt: new Date().toISOString()
    };
    
    console.log('Registered credentials for:', username, 'Type:', userType);
    res.json({ success: true, message: 'Credentials registered successfully' });
  } catch (error) {
    console.error('Error registering credentials:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    console.log('Login attempt for:', username);
    console.log('Available users:', Object.keys(userCredentials));
    
    if (!username || !password) {
      return res.status(400).json({ 
        success: false, 
        error: 'Username and password are required' 
      });
    }
    
    // Check credentials
    const credential = userCredentials[username];
    if (!credential) {
      console.log('User not found:', username);
      return res.status(401).json({ 
        success: false, 
        error: 'Invalid username or password' 
      });
    }
    
    if (credential.password !== password) {
      console.log('Password incorrect for:', username);
      return res.status(401).json({ 
        success: false, 
        error: 'Invalid username or password' 
      });
    }
    
    console.log('Login successful for:', username, 'Type:', credential.userType);
    
    // For now, return mock user data
    const userData = {
      id: credential.userId,
      name: username,
      username: username,
      userType: credential.userType,
      externalId: credential.userId,
      universalId: credential.userId,
      companyCode: 'TEST'
    };
    
    res.json({ success: true, user: userData });
    
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Register a test user for demonstration
registerCredentials('testuser', 'testpass', 'BMANU_1757346592672000000', 'battery-manufacturer');

console.log('Auth endpoints loaded');

app.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}`);
});
