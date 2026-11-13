export default function ListeTaches({
    taches,
    indexEnModification,
    texteModifie,
    setTexteModifie,
    setIndexEnModification,
    modifierTache,
    terminerTache,
    supprimerTache
}) {
    return (
        <ul>
            {taches.map((tache) => (
                <li key={tache.id}>
                    {indexEnModification === tache.id ? (
                        <>
                            <input
                                value={texteModifie}
                                onChange={event =>
                                    setTexteModifie(event.target.value)
                                }
                            />

                            <button className="btn-enr" onClick={() =>
                                modifierTache(tache.id, texteModifie)
                            }>
                                Enregistrer
                            </button>

                            <button className="btn-an" onClick={() => {
                                setIndexEnModification(null);
                                setTexteModifie('');
                            }}>
                                Annuler
                            </button>
                        </>
                    ) : (
                        <>
                            <span>{tache.texte}</span>

                            <button className="btn-mod" onClick={() => {
                                setIndexEnModification(tache.id);
                                setTexteModifie(tache.texte);
                            }}>
                                Modifier
                            </button>

                            <button className={tache.terminee?"btn-react":"btn-act"} onClick={() => terminerTache(tache.id)}>
                                {tache.terminee ? 'Réactiver' : 'Terminer'}
                            </button>

                            <button className="btn-supp" onClick={() => supprimerTache(tache.id)}>
                                Supprimer
                            </button>
                        </>
                    )}
                </li>
            ))}
        </ul>
    );
}