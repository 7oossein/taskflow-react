import { useEffect, useState } from "react";
import { obtenirTaches, ajouterTache } from "../services/api";

import Navbar from "../components/Navbar";
import Tache from "../components/Tache";

function Dashboard() {
    const [taches, setTaches] = useState([]);
    const [texte, setTexte] = useState("");
    const [filtreActuel, setFiltreActuel] = useState("toutes");
    const [message, setMessage] = useState("");
    const [typeMessage, setTypeMessage] = useState("erreur");
    const [chargement, setChargement] = useState(true);

    const utilisateur = JSON.parse(
        localStorage.getItem("utilisateur") || "null",
    );

    // Charger les tâches au démarrage
    useEffect(() => {
        async function chargerTaches() {
            try {
                const resultat = await obtenirTaches();
                setTaches(resultat);
            } catch (erreur) {
                afficherMessage(erreur.message);
            } finally {
                setChargement(false);
            }
        }

        chargerTaches();
    }, []);

    // Afficher un message temporaire
    function afficherMessage(texte, type = "erreur") {
        setMessage(texte);
        setTypeMessage(type);

        setTimeout(() => {
            setMessage("");
        }, 3000);
    }

    // Ajouter une tâche
    async function gererAjout(event) {
        event.preventDefault();

        const texteNettoye = texte.trim();

        if (texteNettoye === "") {
            afficherMessage("Veuillez saisir une tâche.");
            return;
        }

        try {
            const nouvelleTache = await ajouterTache(texteNettoye);

            setTaches((anciennes) => [...anciennes, nouvelleTache]);
            setTexte("");

            afficherMessage("Tâche ajoutée avec succès !", "succes");
        } catch (erreur) {
            afficherMessage(erreur.message);
        }
    }

    // Calculer le nombre de tâches en cours
    const nombreTachesEnCours = taches.filter(
        (tache) => !tache.terminee,
    ).length;

    // Appliquer le filtre
    const tachesFiltrees = taches.filter((tache) => {
        if (filtreActuel === "en-cours") {
            return !tache.terminee;
        }

        if (filtreActuel === "terminees") {
            return tache.terminee;
        }

        return true;
    });

    return (
        <div>
            <Navbar />

            <main>
                <h1>Bonjour {utilisateur?.nom || "Utilisateur"}</h1>

                <p>{nombreTachesEnCours} tâche(s) en cours</p>

                {message && <p className={typeMessage}>{message}</p>}

                <form onSubmit={gererAjout}>
                    <input
                        type="text"
                        value={texte}
                        onChange={(event) => setTexte(event.target.value)}
                        placeholder="Nouvelle tâche"
                    />

                    <button type="submit">Ajouter</button>
                </form>

                <div>
                    <button onClick={() => setFiltreActuel("toutes")}>
                        Toutes
                    </button>

                    <button onClick={() => setFiltreActuel("en-cours")}>
                        En cours
                    </button>

                    <button onClick={() => setFiltreActuel("terminees")}>
                        Terminées
                    </button>
                </div>

                {chargement ? (
                    <p>Chargement des tâches...</p>
                ) : (
                    <ul>
                        {tachesFiltrees.map((tache) => (
                            <Tache
                                key={tache.id}
                                tache={tache}
                                afficherMessage={afficherMessage}
                                mettreAJourTaches={setTaches}
                            />
                        ))}
                    </ul>
                )}
            </main>
        </div>
    );
}

export default Dashboard;
