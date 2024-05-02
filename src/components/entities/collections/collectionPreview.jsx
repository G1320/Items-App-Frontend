import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '../../common/buttons/genericButton';
import { calculateTotalPrice } from '../../../utils/cartUtils';

const CollectionPreview = ({ collection }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isCollectionsPath = location.pathname.includes('collections');

  return (
    <article key={collection._id} className="preview collection-preview">
      <Button onClick={() => navigate(`/collections/${collection._id}`)}>{collection.name}</Button>
      <h3>{collection.items.length} items</h3>

      {isCollectionsPath && (
        <Button onClick={() => navigate(`/edit-collection/${collection._id}`)}>Edit Collection</Button>
      )}
    </article>
  );
};

export default CollectionPreview;
