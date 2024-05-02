import React from 'react';
import ItemsList from '../../entities/items/itemsList';

const Store = ({ items = null }) => {
  return (
    <section className="store">
      <ItemsList items={items} />
    </section>
  );
};

export default Store;
