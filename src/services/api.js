const API_URL = "https://taskflow-5hsg.onrender.com";

function verifierReponse(reponse) {
    if (reponse.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("utilisateur");

        throw new Error("Session expirée. Veuillez vous reconnecter.");
    }
}

async function envoyerRequete(route, options = {}) {
    const token = localStorage.getItem("token");

    const reponse = await fetch(`${API_URL}${route}`, {
        ...options,
        headers: {
            ...(options.body && { "Content-Type": "application/json" }),
            ...(token && { Authorization: `Bearer ${token}` }),
            ...options.headers,
        },
    });

    verifierReponse(reponse);

    const resultat = await reponse.json();

    if (!reponse.ok) {
        throw new Error(
            resultat.message || resultat.erreur || "Une erreur est survenue.",
        );
    }

    return resultat;
}
export async function apiFetch(route, options = {}) {
    return await envoyerRequete(route, options);
}
export async function obtenirTaches() {
    return await envoyerRequete("/taches");
}

export async function ajouterTache(texte) {
    const resultat = await envoyerRequete("/taches", {
        method: "POST",
        body: JSON.stringify({ texte }),
    });

    return resultat.tache;
}

export async function supprimerTache(id) {
    return await envoyerRequete(`/taches/${id}`, {
        method: "DELETE",
    });
}

export async function modifierTache(id, texte) {
    const resultat = await envoyerRequete(`/taches/${id}`, {
        method: "PUT",
        body: JSON.stringify({ texte }),
    });

    return resultat.tache;
}

export async function terminerTache(id) {
    const resultat = await envoyerRequete(`/taches/${id}/terminer`, {
        method: "PATCH",
    });

    return resultat.tache;
}

export async function reactiverTache(id) {
    const resultat = await envoyerRequete(`/taches/${id}/reactiver`, {
        method: "PATCH",
    });

    return resultat.tache;
}
