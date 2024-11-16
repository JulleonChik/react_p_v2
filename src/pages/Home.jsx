import React from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';

function Home({ searchValue }) {
  const [pizzasData, setPizzasData] = React.useState([]); // состояние данных пицц и функция для изменения этого состояния
  const [isLoading, setIsLoading] = React.useState(true); // состояние загрузки и функция для изменения этого состояния

  const [activeCategoryIdx, setActiveCategoryIdx] = React.useState(0); // состояние индекса выбранной категории и функция для изменения этого состояния
  const [selectedSortType, setSelectedSortType] = React.useState({
    name: 'популярности',
    sortProperty: 'rating',
    order: 'desc',
  }); // состояние выбранного типа сортировки и функция для изменения этого состояния

  React.useEffect(() => {
    const fetchPizzas = async () => {
      const baseUrl = 'https://67321e852a1b1a4ae10eee73.mockapi.io/items';
      const url = new URL(baseUrl);

      if (activeCategoryIdx !== 0) {
        url.searchParams.append('category', activeCategoryIdx - 1);
      }
      url.searchParams.append('sortBy', selectedSortType.sortProperty);
      url.searchParams.append('order', selectedSortType.order);
      if (searchValue) {
        url.searchParams.append('title', searchValue);
      }

      setIsLoading(true);

      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        const items = await response.json();
        setPizzasData(Array.isArray(items) ? items : []);
        window.scrollTo(0, 0);
      } catch (error) {
        console.error('Ошибка при загрузке:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPizzas();
  }, [activeCategoryIdx, selectedSortType.sortProperty, selectedSortType.order, searchValue]);

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
        {isLoading ? (
          [...new Array(6)].map((_, index) => <Skeleton key={index} />) // пока загружаются данные, отображаются скелетоны
        ) : pizzasData?.length > 0 ? (
          pizzasData.map((value) => <PizzaBlock key={`pizza-block-${value.id}`} {...value} />) // отображаются пиццы
        ) : (
          <div className="notFound">Пицц не найдено 😕</div> // Показываем сообщение если пицц нет
        )}
      </div>
    </div>
  );
}

export default Home;
