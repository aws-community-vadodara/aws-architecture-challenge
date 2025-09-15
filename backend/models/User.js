const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    trim: true
  },
  email: { 
    type: String, 
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  testResults: [{
    mode: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: true
    },
    testId: {
      type: String,
      required: true
    },
    score: {
      type: Number,
      required: true,
      min: 0
    },
    timeSpent: {
      type: Number,
      required: true,
      min: 0
    },
    completed: {
      type: Boolean,
      default: false
    },
    timestamp: { 
      type: Date, 
      default: Date.now 
    }
  }]
}, {
  timestamps: true
});

// Index for better query performance
userSchema.index({ email: 1 });
userSchema.index({ 'testResults.mode': 1 });
userSchema.index({ 'testResults.completed': 1 });

module.exports = mongoose.model('User', userSchema);