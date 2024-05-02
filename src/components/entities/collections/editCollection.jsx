import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import GenericForm from '../../common/forms/genericForm';
import { useUpdateCollectionMutation } from '../../../hooks/mutations/collections/collectionMutations';
import { useCollection } from '../../../hooks/dataFetching/useCollection';

const EditCollection = () => {
  const navigate = useNavigate();
  const { collectionId } = useParams();
  const { data: collection } = useCollection(collectionId);

  const updateCollectionMutation = useUpdateCollectionMutation(collectionId);

  const fields = [
    { name: 'name', label: 'Name', type: 'text', value: collection?.name },
    { name: 'description', label: 'Description', type: 'text', value: collection?.description },
  ];

  const handleSubmit = async (formData) => {
    updateCollectionMutation.mutate(formData);
    navigate(`/Collections/${collectionId}`);
  };

  return (
    <section className="edit-collection">
      <GenericForm
        title="Edit Collection"
        fields={fields}
        onSubmit={handleSubmit}
        className="edit-collection-form"
      />
    </section>
  );
};

export default EditCollection;
