export default function Progression({ taches }) {
    const nombreTerminees = taches.filter((tache) => tache.terminee).length;

    const pourcentage =
        taches.length === 0
            ? 0
            : Math.round((nombreTerminees / taches.length) * 100);

    return (
        <div>
            <p>Progression : {pourcentage}%</p>

            <div className="barre">
                <div
                    className="progression"
                    style={{ width: `${pourcentage}%` }}
                ></div>
            </div>
        </div>
    );
}
