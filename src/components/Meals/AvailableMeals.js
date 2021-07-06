import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import { useEffect,useState } from 'react';

const AvailableMeals = () => {

const [meals,setMeals] =useState([]);
const [isLoading,setIsLoading]=useState(true);
const [error,setError]=useState(null);

useEffect( ()=>{
 const fetchData =async ()=>{
   const responce =await fetch('https://meals-c8f36-default-rtdb.firebaseio.com/meals.json');


   if(!responce.ok){
     throw new Error('Somthing go wrong');
   }
   const data = await responce.json();


   const loaded = [];


   for(const key in data){
     loaded.push({
       id:key,
       name:data[key].name,
       description:data[key].description,
       price:data[key].price
     });
   }


   setMeals(loaded);
   setIsLoading(false);
 }

  fetchData().catch(err=>{
    setIsLoading(false);
    setError(err.message);
  });


},[])


if(isLoading){
return <section className={classes.MealsLoading}>
  <p>Loading ...</p>
</section>
}



if(error){
return <section className={classes.MealsError}>
<p>{error}</p>
</section>
}

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
