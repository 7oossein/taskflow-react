import { apiFetch } from "./api";

export async function inscription(nom, email, motDePasse) {
    return await apiFetch("/auth/inscription", {
        method: "POST",
        body: JSON.stringify({ nom, email, motDePasse }),
    });
}

export async function connexion(email, motDePasse) {
    const data = await apiFetch("/auth/connexion", {
        method: "POST",
        body: JSON.stringify({ email, motDePasse }),
    });

    localStorage.setItem("token", data.token);

    localStorage.setItem("utilisateur", JSON.stringify(data.utilisateur));

    return data.utilisateur;
}

export function deconnexion() {
    localStorage.removeItem("token");
}
