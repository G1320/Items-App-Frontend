import React, { useState } from 'react';
import Button from '../buttons/genericButton';

const GenericForm = ({ title, fields, onSubmit, className, btnTxt = 'Submit' }) => {
  const initialState = Object.fromEntries(fields.map((field) => [field.name, '']));
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData(initialState);
  };

  return (
    <section className={`generic-form ${className}`}>
      <h2>{title}</h2>
      <form onSubmit={handleSubmit}>
        {fields.map((field) => (
          <div key={field.name}>
            <label htmlFor={field.name}>{field.label}</label>
            <input
              type={field.type}
              id={field.name}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
            />
          </div>
        ))}
        <Button type="submit">{btnTxt}</Button>
      </form>
    </section>
  );
};

export default GenericForm;
