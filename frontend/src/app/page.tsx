"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [PiNetwork, setPiNetwork] = useState<any>(null);

  useEffect(() => {
    console.log("🚀 Tentative d'import du SDK Pi Network...");
    import("@pinetwork-js/sdk")
      .then((module) => {
        console.log("✅ SDK Pi Network chargé !");
        setPiNetwork(module.Pi);
        module.Pi.init({ version: "2.0" });
      })
      .catch((err) => console.error("❌ Erreur d'initialisation du SDK :", err));
  }, []);

  const handleLogin = async () => {
    console.log("🔄 Tentative de connexion...");
    if (!PiNetwork) {
      console.error("🚨 Le SDK Pi Network n'est pas chargé !");
      return;
    }

    try {
      const auth = await PiNetwork.authenticate(["username", "wallet_address"], "user");
      console.log("✅ Authentification réussie :", auth);
      setUser(auth.user);
    } catch (error: any) {
      console.error("❌ Erreur d'authentification :", error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Pi RPS Game</h1>
      {user ? (
        <p className="text-green-600">Bienvenue, {user.username} !</p>
      ) : (
        <button
          onClick={handleLogin}
          className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition"
          disabled={!PiNetwork}
        >
          {PiNetwork ? "Se connecter avec Pi Network" : "Chargement..."}
        </button>
      )}
    </div>
  );
}
