import MealsSummary from "./MealsSummary";
import AvailbleMeals from "./AvailbleMeals";
import { Fragment } from "react/cjs/react.production.min";

function Meals(){
    return(
        <Fragment>
            <MealsSummary />
            <AvailbleMeals />
        </Fragment>
    );
}

export default Meals;