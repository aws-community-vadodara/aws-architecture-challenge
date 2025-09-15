const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Create or get user
router.post('/', async (req, res) => {
  try {
    const { name, email } = req.body;
    
    // Validation
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }
    
    let user = await User.findOne({ email });
    
    if (!user) {
      user = new User({ name, email, testResults: [] });
      await user.save();
    }
    
    res.json(user);
  } catch (error) {
    console.error('Error creating/getting user:', error);
    res.status(500).json({ error: error.message });
  }
});

// Save test result
router.post('/test-result', async (req, res) => {
  try {
    const { email, mode, testId, score, timeSpent, completed } = req.body;
    
    // Validation
    if (!email || !mode || !testId || score === undefined || timeSpent === undefined) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    user.testResults.push({ mode, testId, score, timeSpent, completed });
    await user.save();
    
    res.json({ 
      message: 'Test result saved successfully',
      totalTests: user.testResults.length 
    });
  } catch (error) {
    console.error('Error saving test result:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get leaderboard
router.get('/leaderboard', async (req, res) => {
  try {
    const users = await User.aggregate([
      { $unwind: '$testResults' },
      { $match: { 'testResults.completed': true } },
      {
        $group: {
          _id: '$_id',
          name: { $first: '$name' },
          email: { $first: '$email' },
          totalScore: { $sum: '$testResults.score' },
          testsCompleted: { $sum: 1 },
          averageScore: { $avg: '$testResults.score' },
          bestScore: { $max: '$testResults.score' }
        }
      },
      { $sort: { totalScore: -1 } },
      { $limit: 10 }
    ]);
    
    res.json(users);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get user stats
router.get('/stats/:email', async (req, res) => {
  try {
    const { email } = req.params;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const completedTests = user.testResults.filter(test => test.completed);
    const totalScore = completedTests.reduce((sum, test) => sum + test.score, 0);
    const averageScore = completedTests.length > 0 ? totalScore / completedTests.length : 0;
    
    const stats = {
      totalTests: user.testResults.length,
      completedTests: completedTests.length,
      totalScore,
      averageScore: Math.round(averageScore),
      bestScore: completedTests.length > 0 ? Math.max(...completedTests.map(t => t.score)) : 0,
      testsByMode: {
        beginner: user.testResults.filter(t => t.mode === 'beginner').length,
        intermediate: user.testResults.filter(t => t.mode === 'intermediate').length,
        advanced: user.testResults.filter(t => t.mode === 'advanced').length
      }
    };
    
    res.json(stats);
  } catch (error) {
    console.error('Error fetching user stats:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;