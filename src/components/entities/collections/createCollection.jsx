import React from 'react';
import { useNavigate } from 'react-router-dom';
import GenericForm from '../../common/forms/genericForm';
import { getLocalUser } from '../../../services/user-service';

import { useCreateCollectionMutation } from '../../../hooks/mutations/collections/collectionMutations';

const CreateCollection = () => {
  const user = getLocalUser();
  const createCollectionMutation = useCreateCollectionMutation();

  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    createCollectionMutation.mutate({ userId: user?._id, newCollection: formData });
    navigate('/');
  };

  const fields = [
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'description', label: 'Description', type: 'text' },
  ];

  return <GenericForm title="Create Collection" fields={fields} onSubmit={handleSubmit} />;
};

export default CreateCollection;
