export default function Filtres({ filtre, setFiltre }) {
    const options = [
        { valeur: "toutes", texte: "Toutes" },
        { valeur: "terminees", texte: "Terminées" },
        { valeur: "restantes", texte: "Restantes" },
    ];

    return (
        <div>
            {options.map((option) => (
                <button
                    key={option.valeur}
                    className={filtre === option.valeur ? "actif" : ""}
                    onClick={() => setFiltre(option.valeur)}
                >
                    {option.texte}
                </button>
            ))}
        </div>
    );
}
