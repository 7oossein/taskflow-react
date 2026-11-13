export default function Recherche({ recherche, setRecherche }) {
    return (
        <div>
            <input
                type="text"
                placeholder="Rechercher une tâche..."
                value={recherche}
                onChange={(event) => setRecherche(event.target.value)}
            />
        </div>
    );
}
