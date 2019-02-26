import React from 'react';

const List = ({ companies, destroy }) => {
  return (
    <ul>
      {companies.map(company => {
        return (
          <li key={company.id}>
            {company.name}
            <button onClick={() => destroy(company.id)}>x</button>
          </li>
        );
      })}
    </ul>
  );
};

export default List;
