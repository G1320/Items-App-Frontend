import React from 'react';
import { useNavigate } from 'react-router-dom';
import GenericForm from '../../common/forms/genericForm';
import { useCreateItemMutation } from '../../../hooks/mutations/items/itemMutations';

const CreateItem = () => {
  const createItemMutation = useCreateItemMutation();
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    createItemMutation.mutate(formData);
    navigate('/store');
  };

  const fields = [
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'description', label: 'Description', type: 'text' },
    { name: 'price', label: 'Price', type: 'number' },
    { name: 'imageUrl', label: 'Image URL', type: 'text' },
  ];

  return <GenericForm title="Create Item" fields={fields} onSubmit={handleSubmit} />;
};

export default CreateItem;
