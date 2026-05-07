router.get('/:surveyId/stats', async (req, res) => {
    const { filterQuestionId, filterValue } = req.query;

    let query = { surveyId: req.params.surveyId };

    
    if (filterQuestionId && filterValue) {
        query.answers = { 
            $elemMatch: { questionId: filterQuestionId, value: filterValue } 
        };
    }

    const responses = await Response.find(query);
    res.json({ count: responses.length, data: responses });
});