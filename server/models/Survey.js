const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    type: { type: String, required: true },
    label: { type: String, required: true },
    options: [mongoose.Schema.Types.Mixed],
    settings: mongoose.Schema.Types.Mixed
}); 

const SurveySchema = new mongoose.Schema({
    title: { type: String, required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    questions: [QuestionSchema], 
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Survey', SurveySchema);