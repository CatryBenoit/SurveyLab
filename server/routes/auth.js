const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');  
const User = require('../models/User');

router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;

        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "Cet utilisateur existe déjà" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({
            email,
            password: hashedPassword
        });
        await user.save();

        const secret = process.env.JWT_SECRET || 'phrase_secrete_par_defaut';
        const token = jwt.sign({ id: user._id }, secret, { expiresIn: '1d' });

        res.status(201).json({ token, user: { id: user._id, email: user.email } });
    } catch (err) {
        console.error("Erreur Register:", err); 
        res.status(500).json({ message: "Erreur lors de l'inscription" });
    }
});


router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Identifiants invalides (email)" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Identifiants invalides (password)" });

        const secret = process.env.JWT_SECRET || 'phrase_secrete_par_defaut';
        const token = jwt.sign({ id: user._id }, secret, { expiresIn: '1d' });

        res.json({ token, user: { id: user._id, email: user.email } });
    } catch (err) {
        console.error("Erreur Login:", err);
        res.status(500).json({ message: "Erreur serveur lors de la connexion" });
    }
});

module.exports = router;