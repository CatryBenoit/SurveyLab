const express = require('express');
const router = express.Router();
const Survey = require('../models/Survey');
const auth = require('../middleware/auth');
const Response = require('../models/Response');

router.get('/my-surveys', auth, async (req, res) => {
    try {
        const surveys = await Survey.find({ creator: req.user.id });
        res.json(surveys);
    } catch (err) {
        res.status(500).json({ message: "Erreur lors de la récupération des sondages" });
    }
});

router.post('/', auth, async (req, res) => {
    try {
        const { title, questions } = req.body;
        
        const newSurvey = new Survey({
            title,
            questions,
            creator: req.user.id 
        });

        const savedSurvey = await newSurvey.save();
        res.status(201).json(savedSurvey);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: "Erreur lors de la création du sondage" });
    }
});

router.post('/:id/responses', async (req, res) => {
    try {
        const newResponse = new Response({
            surveyId: req.params.id,
            answers: req.body.answers
        });
        await newResponse.save();
        res.status(201).json({ message: "Réponse enregistrée" });
    } catch (err) {
        res.status(400).json({ message: "Erreur lors de l'enregistrement" });
    }
});

router.get('/:id/analytics', auth, async (req, res) => {
    try {
        const { filterQ, filterV } = req.query; 
        let query = { surveyId: req.params.id };

        
        if (filterQ && filterV) {
            query.answers = { 
                $elemMatch: { questionId: filterQ, value: filterV } 
            };
        }

        const responses = await Response.find(query);
        const survey = await Survey.findById(req.params.id);

        res.json({
            total: responses.length,
            responses,
            survey
        });
    } catch (err) {
        res.status(500).json({ message: "Erreur analytics" });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const survey = await Survey.findById(req.params.id);
        if (!survey) {
            return res.status(404).json({ message: "Sondage introuvable" });
        }
        res.json(survey);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erreur lors de la récupération du sondage" });
    }
});



module.exports = router;