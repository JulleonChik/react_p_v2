import React, { useEffect, useRef } from 'react';

const sortOptionsList = [
  { name: 'популярности', sortProperty: 'rating', order: 'desc' },
  { name: 'возрастанию цены', sortProperty: 'price', order: 'asc' },
  { name: 'убыванию цены', sortProperty: 'price', order: 'desc' },
  { name: 'алфавиту', sortProperty: 'title', order: 'asc' },
];

function Sort({ selectedSortOption, setSelectedSortOption }) {
  const [isVisiblePopup, setVisiblePopup] = React.useState(false); // состояние видимости popup и функция для изменения этого состояния
  const sortRef = useRef(); // ссылка на элемент DOM

  const toggleVisiblePopup = () => setVisiblePopup(!isVisiblePopup); // функция для изменения состояния видимости popup

  const onSelectSortOption = (obj) => {
    if (
      obj.sortProperty !== selectedSortOption.sortProperty ||
      obj.order !== selectedSortOption.order
    ) {
      // если выбранный параметр сортировки не совпадает с текущим, то устанавливается новый параметр сортировки
      setSelectedSortOption(obj);
    }
    setVisiblePopup(false);
  };

  const handleOutsideClick = (event) => {
    if (sortRef.current && !sortRef.current.contains(event.target)) {
      setVisiblePopup(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick, { passive: true });
    return () => {
      document.removeEventListener('click', handleOutsideClick, { passive: true });
    };
  }, []);

  return (
    <div className="sort" ref={sortRef}>
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={toggleVisiblePopup}>
          {sortOptionsList.find(
            (obj) =>
              obj.sortProperty === selectedSortOption.sortProperty &&
              obj.order === selectedSortOption.order,
          )?.name || 'популярности'}
        </span>
      </div>
      {isVisiblePopup && (
        <div className="sort__popup">
          <ul>
            {sortOptionsList.map((obj, index) => (
              <li
                key={obj.sortProperty + obj.order}
                onClick={() => onSelectSortOption(obj)}
                className={
                  obj.sortProperty === selectedSortOption.sortProperty &&
                  obj.order === selectedSortOption.order
                    ? 'active'
                    : ''
                }
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Sort;
