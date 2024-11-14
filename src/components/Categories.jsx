import React from 'react';

const categoriesList = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

function Categories({ activeCategoryIdx, setActiveCategoryIdx }) {
  return (
    <div className="categories">
      <ul>
        {categoriesList.map((categoryName, index) => {
          return (
            <li
              key={categoryName}
              onClick={() => setActiveCategoryIdx(index)}
              className={activeCategoryIdx === index ? 'active' : ''}
            >
              {categoryName}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Categories;
