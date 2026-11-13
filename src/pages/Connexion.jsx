import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { connexion } from "../services/auth";

function Connexion() {
    const [email, setEmail] = useState("");
    const [motDePasse, setMotDePasse] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    async function gererConnexion(event) {
        event.preventDefault();
        setMessage("");

        try {
            await connexion(email.trim(), motDePasse);

            // Enregistrer les informations utilisateur
            // est déjà fait dans auth.js ? Nous allons le vérifier ensuite.

            navigate("/dashboard");
        } catch (erreur) {
            setMessage(erreur.message);
        }
    }

    return (
        <main>
            <h1>Connexion</h1>

            <form onSubmit={gererConnexion}>
                <input
                    type="email"
                    placeholder="Adresse email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Mot de passe"
                    value={motDePasse}
                    onChange={(event) => setMotDePasse(event.target.value)}
                    required
                />

                <button type="submit">Se connecter</button>
            </form>

            {message && <p className="erreur">{message}</p>}

            <p>
                Pas encore de compte ? <Link to="/inscription">S'inscrire</Link>
            </p>
        </main>
    );
}

export default Connexion;
