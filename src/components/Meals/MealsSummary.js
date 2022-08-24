import classes from './MealsSummary.module.css';

function MealsSummary (){
    return(
        <section className={classes.summary}>
            <h2>Rendelj isteni ételeket a react appomal</h2>
            <p>
                A rendelésben kiválaszthatod, hogy melyik ételeket szeretnél rendelni.
                A rendelésedet a kosárba teszed.
            </p>
            <p>
                A kosárban lévő ételek összegét és számát is láthatod.
            </p>
        </section>
    );
}

export default MealsSummary;