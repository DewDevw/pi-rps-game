import express from "express";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Charger les variables d'environnement
const PI_API_KEY = process.env.PI_API_KEY; // Clé API de ton application Pi
const PI_WALLET_SEED = process.env.PI_WALLET_SEED; // Seed de ton wallet

app.use(express.json());

// Endpoint pour tester le serveur
app.get("/", (req, res) => {
    res.send("Serveur Pi RPS Game en ligne !");
});

// Exemple d'authentification avec Pi Network
app.post("/auth", async (req, res) => {
    try {
        const { accessToken } = req.body; // Le token envoyé par le client

        const response = await axios.get("https://api.minepi.com/v2/me", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        });

        res.json({ success: true, user: response.data });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : "Une erreur est survenue",
    });
    
    }
});

// Lancer le serveur
app.listen(PORT, () => {
    console.log(`✅ Serveur démarré sur le port ${PORT}`);
});
