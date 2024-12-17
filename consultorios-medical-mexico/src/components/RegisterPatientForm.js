import React, { useState } from 'react';

const RegisterPatientForm = () => {
  const [patientData, setPatientData] = useState({
    name: '',
    email: ''
  });

  const handleChange = (e) => {
    setPatientData({
      ...patientData,
      [e.target.name]: e.target.value,
    });
  };

  const registerPatient = async (patientData) => {
    try {
      const response = await fetch('http://localhost:4000/api/v1/user/patient/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patientData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to register patient');
      }
  
      const data = await response.json();
      console.log('Patient registered:', data);
    } catch (error) {
      console.error('Error registering patient:', error);
    }
  };
  
  

  const handleSubmit = (e) => {
    e.preventDefault();
    registerPatient();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type="text" name="name" value={patientData.name} onChange={handleChange} />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" name="email" value={patientData.email} onChange={handleChange} />
      </div>
      {/* Aquí puedes agregar más campos */}
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterPatientForm;
