import "./App.css";
import { useState, useEffect } from "react";
import Progression from "./progression";
import ListeTaches from "./ListeTaches";
import Filtres from "./Filtres";
import Recherche from "./Recherche";
import Ajout from "./Ajout";

export default function App() {
    const [tache, setTache] = useState("");
    const [taches, setTaches] = useState(() => {
        try {
            const sauvegarde = localStorage.getItem("taches");
            return sauvegarde ? JSON.parse(sauvegarde) : [];
        } catch (erreur) {
            console.error(erreur.message);
            return [];
        }
    });
    useEffect(() => {
        localStorage.setItem("taches", JSON.stringify(taches));
    }, [taches]);

    function ajouterTache(event) {
        event.preventDefault();

        if (tache.trim() === "") {
            return;
        }

        setTaches((anciennesTaches) => [
            ...anciennesTaches,
            {
                id: taches.length>0 ? taches[taches.length-1].id+1:0,
                texte: tache,
                terminee: false,
            },
        ]);

        setTache("");
    }

    function supprimerTache(id) {
        setTaches((anciennesTaches) =>
            anciennesTaches.filter((tache) => tache.id !== id),
        );
    }

    function terminerTache(id) {
        setTaches((anciennesTaches) =>
            anciennesTaches.map((tache) =>
                tache.id === id
                    ? { ...tache, terminee: !tache.terminee }
                    : tache,
            ),
        );
    }

    const [indexEnModification, setIndexEnModification] = useState(null);
    const [texteModifie, setTexteModifie] = useState("");

    function modifierTache(id, nouveauTexte) {
        if (nouveauTexte.trim() === "") return;

        setTaches((anciennesTaches) =>
            anciennesTaches.map((tache) =>
                tache.id === id
                    ? { ...tache, texte: nouveauTexte.trim() }
                    : tache,
            ),
        );

        setIndexEnModification(null);
        setTexteModifie("");
    }

    const [filtre, setFiltre] = useState("toutes");
    const [recherche, setRecherche] = useState("");
    const tachesFiltrees = taches.filter((tache) => {
        // Filtre selon l'état de la tâche
        if (filtre === "terminees" && !tache.terminee) {
            return false;
        }

        if (filtre === "restantes" && tache.terminee) {
            return false;
        }

        // Filtre selon le texte recherché
        return recherche.length < tache.texte.length
            ? tache.texte.toLowerCase().slice(0, recherche.length) === recherche
            : tache.texte.toLowerCase() ===
                  recherche.slice(0, tache.texte.length);
    });

    return (
        <div className="app">
            <h1>Gestionnaire de tâches</h1>

            <Ajout ajouterTache={ajouterTache} tache={tache} setTache={setTache}/>

            <Filtres filtre={filtre} setFiltre={setFiltre} />

            <Recherche recherche={recherche} setRecherche={setRecherche} />

            <ListeTaches
                taches={tachesFiltrees}
                indexEnModification={indexEnModification}
                texteModifie={texteModifie}
                setTexteModifie={setTexteModifie}
                setIndexEnModification={setIndexEnModification}
                modifierTache={modifierTache}
                terminerTache={terminerTache}
                supprimerTache={supprimerTache}
            />

            <Progression taches={taches} />
        </div>
    );
}
