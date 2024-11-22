require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');

const PORT = process.env.PORT || 3500;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// User model létrehozása
const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const User = mongoose.model('user', UserSchema);

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Sikeres adatbázis csatlakozás!');
        app.listen(PORT, () => {
            console.log(`http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error.message);
    });

app.post('/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res
                .status(400)
                .json({ msg: 'Minden mezőt kötelező kitölteni!' });
        }

        const regisztralt = await User.findOne({ email });

        if (regisztralt) {
            return res
                .status(401)
                .json({ msg: 'Ilyen adatokkal létezik felhasználó!' });
        }

        const salt = await bcrypt.genSalt(10);

        const hashedPassword = bcrypt.hashSync(password, salt);

        const newUser = new User({ email, password: hashedPassword });

        // console.log(newUser);

        await newUser.save();

        res.status(201).json({ msg: 'Sikeres regisztráció!' });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    // console.log(req.body);

    try {
        if (!email || !password) {
            return res
                .status(400)
                .json({ msg: 'Minden mezőt kötelező kitölteni!' });
        }

        const regisztralt = await User.findOne({ email });

        if (!regisztralt) {
            return res.status(401).json({
                msg: 'Ilyen adatokkal nem létezik felhasználó! Regisztrálj!',
            });
        }

        const letezoUser = await bcrypt.compare(password, regisztralt.password);

        if (letezoUser) {
            return res.status(200).json({ msg: 'Sikeres belépés!' });
        } else {
            return res.status(403).json({ msg: 'Nincs jogod belépni!' });
        }
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});
