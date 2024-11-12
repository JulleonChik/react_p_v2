import React from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';

function Home() {
  const [pizzasData, setPizzasData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    fetch('https://67321e852a1b1a4ae10eee73.mockapi.io/items')
      .then((res) => res.json())
      .then((items) => {
        setPizzasData(items);
        setIsLoading(false);
        window.scrollTo(0, 0);
      });
  }, []);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : pizzasData.map((value) => <PizzaBlock key={`pizza-block-${value.id}`} {...value} />)}
      </div>
    </div>
  );
}

export default Home;
