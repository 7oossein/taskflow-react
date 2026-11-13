export default function Ajout({ajouterTache,tache,setTache}) {
    return (
        <div>
            <form onSubmit={ajouterTache}>
                <input
                    type="text"
                    value={tache}
                    onChange={(event) => setTache(event.target.value)}
                    placeholder="Écrire une tâche"
                />

                <button className="btn-aj" type="submit">Ajouter</button>
            </form>
        </div>
    );
}
