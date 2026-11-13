import { useState } from "react";

import {
    modifierTache,
    supprimerTache,
    terminerTache,
    reactiverTache,
} from "../services/api";

function Tache({ tache, afficherMessage, mettreAJourTaches }) {
    const [edition, setEdition] = useState(false);
    const [nouveauTexte, setNouveauTexte] = useState(tache.texte);

    // Enregistrer une modification
    async function enregistrerModification() {
        const texte = nouveauTexte.trim();

        if (!texte) {
            afficherMessage("Le texte ne peut pas être vide.");
            return;
        }

        try {
            const resultat = await modifierTache(tache.id, texte);

            mettreAJourTaches((anciennes) =>
                anciennes.map((ancienne) =>
                    ancienne.id === tache.id ? resultat : ancienne,
                ),
            );

            setEdition(false);
            afficherMessage("Tâche modifiée avec succès !", "succes");
        } catch (erreur) {
            afficherMessage(erreur.message);
        }
    }

    // Supprimer une tâche
    async function supprimer() {
        try {
            await supprimerTache(tache.id);

            mettreAJourTaches((anciennes) =>
                anciennes.filter((ancienne) => ancienne.id !== tache.id),
            );

            afficherMessage("Tâche supprimée avec succès !", "succes");
        } catch (erreur) {
            afficherMessage(erreur.message);
        }
    }

    // Terminer ou réactiver une tâche
    async function changerEtat() {
        try {
            const resultat = tache.terminee
                ? await reactiverTache(tache.id)
                : await terminerTache(tache.id);

            mettreAJourTaches((anciennes) =>
                anciennes.map((ancienne) =>
                    ancienne.id === tache.id ? resultat : ancienne,
                ),
            );

            afficherMessage(
                resultat.terminee
                    ? "Tâche terminée avec succès !"
                    : "Tâche réactivée avec succès !",
                "succes",
            );
        } catch (erreur) {
            afficherMessage(erreur.message);
        }
    }

    return (
        <li className={tache.terminee ? "terminee" : ""}>
            {edition ? (
                <>
                    <input
                        type="text"
                        value={nouveauTexte}
                        onChange={(event) =>
                            setNouveauTexte(event.target.value)
                        }
                    />

                    <button onClick={enregistrerModification}>
                        Enregistrer
                    </button>

                    <button
                        onClick={() => {
                            setNouveauTexte(tache.texte);
                            setEdition(false);
                        }}
                    >
                        Annuler
                    </button>
                </>
            ) : (
                <>
                    <span onClick={changerEtat}>{tache.texte}</span>

                    <div className="task-actions">
                        <button onClick={() => setEdition(true)}>
                            Modifier
                        </button>

                        <button onClick={supprimer}>Supprimer</button>
                    </div>
                </>
            )}
        </li>
    );
}

export default Tache;
