import React from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
function Home() {
  const { searchValue } = React.useContext(SearchContext);

  const [pizzasData, setPizzasData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [activeCategoryIdx, setActiveCategoryIdx] = React.useState(0);
  const [selectedSortType, setSelectedSortType] = React.useState({
    name: 'популярности',
    sortProperty: 'rating',
    order: 'desc',
  });

  const [currentPage, setCurrentPage] = React.useState(1);
  const totalPages = 3;

  // Обработчик смены страницы
  const handlePageChange = (event) => {
    setCurrentPage(event.selected + 1);
  };

  // Эффект для получения пиццы с пагинацией
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

      url.searchParams.append('page', currentPage);
      url.searchParams.append('limit', 4);

      setIsLoading(true);

      fetch(url)
        .then((res) => res.json())
        .then((items) => {
          setPizzasData(Array.isArray(items) ? items : []);
          window.scrollTo(0, 0);
        })
        .catch((error) => {
          console.error('Ошибка при загрузке:', error);
          setPizzasData([]);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    fetchPizzas();
  }, [
    currentPage,
    activeCategoryIdx,
    selectedSortType.sortProperty,
    selectedSortType.order,
    searchValue,
  ]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          activeCategoryIdx={activeCategoryIdx}
          setActiveCategoryIdx={setActiveCategoryIdx}
        />
        <Sort selectedSortOption={selectedSortType} setSelectedSortOption={setSelectedSortType} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading ? (
          [...new Array(6)].map((_, index) => <Skeleton key={index} />)
        ) : pizzasData?.length > 0 ? (
          pizzasData.map((value) => <PizzaBlock key={`pizza-block-${value.id}`} {...value} />)
        ) : (
          <div className="notFound">Пицц не найдено 😕</div>
        )}
      </div>
      <Pagination totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
}

export default Home;
