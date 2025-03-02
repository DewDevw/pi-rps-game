import axios from "axios";

const API_KEY = "olkurkkmfnes8tjicpondnxhofyv9jzbp99anpebvg87ccqlstedwxqu5wpnm7bb"; // Mets ta vraie API Key ici
const ACCESS_TOKEN = "fake_test_access_token_123"; // Fake access token

async function verifyUser() {
    try {
        const response = await axios.get("https://api.minepi.com/v2/me", {
            headers: {
                "Authorization": `Bearer ${ACCESS_TOKEN}`,
                "X-API-KEY": API_KEY,
            },
        });

        console.log("✅ Réponse API :", response.data);
    } catch (error: any) {  // Correction ici
        console.error("❌ Erreur :", error.response?.data || error.message);
    }
}

verifyUser();
