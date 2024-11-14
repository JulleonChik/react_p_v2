import React from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';

function Home() {
  const [pizzasData, setPizzasData] = React.useState([]); // состояние данных пицц и функция для изменения этого состояния
  const [isLoading, setIsLoading] = React.useState(true); // состояние загрузки и функция для изменения этого состояния

  const [activeCategoryIdx, setActiveCategoryIdx] = React.useState(0); // состояние индекса выбранной категории и функция для изменения этого состояния
  const [selectedSortType, setSelectedSortType] = React.useState({
    name: 'популярности',
    sortProperty: 'rating',
    order: 'desc',
  }); // состояние выбранного типа сортировки и функция для изменения этого состояния

  React.useEffect(() => {
    setIsLoading(true);
    // activeCategoryIdx = 0 - это "Все"
    // => если не 0 то выбрана категория и в url будет добавлен параметр category с индексом категории
    //  - 1 потому как в mockapi индекс категории начинается с 0
    fetch(
      `https://67321e852a1b1a4ae10eee73.mockapi.io/items?${
        activeCategoryIdx !== 0 ? `category=${activeCategoryIdx - 1}&` : ''
      }sortBy=${selectedSortType.sortProperty}&order=${selectedSortType.order}`,
    ) // запрос к mockapi с параметрами категории и типа сортировки
      .then((res) => res.json())
      .then((items) => {
        setPizzasData(items); // установка данных пицц
        setIsLoading(false); // установка состояния загрузки в false
        window.scrollTo(0, 0); // прокрутка к началу страницы
      });
  }, [activeCategoryIdx, selectedSortType]); // зависимости для перерисовки компонента при изменении activeCategoryIdx или selectedSortType

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          activeCategoryIdx={activeCategoryIdx} // индекс выбранной категории
          setActiveCategoryIdx={setActiveCategoryIdx} // функция для изменения индекса выбранной категории
        />
        <Sort
          selectedSortOption={selectedSortType} // объект с выбранным параметром сортировки
          setSelectedSortOption={setSelectedSortType} // функция для изменения выбранного параметра сортировки
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {
          isLoading
            ? [...new Array(6)].map((_, index) => <Skeleton key={index} />) // пока загружаются данные, отображаются скелетоны
            : pizzasData.map((value) => <PizzaBlock key={`pizza-block-${value.id}`} {...value} />) // отображаются пиццы
        }
      </div>
    </div>
  );
}

export default Home;
