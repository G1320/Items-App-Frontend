import React from 'react';
import { Link } from 'react-router-dom';
import GenericList from '../../common/lists/genericList';
import CollectionPreview from './collectionPreview';
import { useCollections } from '../../../hooks/dataFetching/useCollections';

const CollectionsList = () => {
  const { data: collections } = useCollections();

  const renderItem = (collection) => <CollectionPreview collection={collection} />;

  return (
    <section className="collections">
      <h2>Collection List</h2>
      <Link to="/create-collection">Create collection</Link>
      <GenericList data={collections} renderItem={renderItem} className="collections-list" />{' '}
    </section>
  );
};

export default CollectionsList;
