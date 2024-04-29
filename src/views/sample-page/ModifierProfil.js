import React, { useState } from 'react';
import { Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import 'src/views/sample-page/ModifierProfil.css'


const ModifierProfile = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        feedback: ''
      });
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Données du formulaire soumises :', formData);
      };
  return (
    <PageContainer title="Modifer Profil" description="Modifier Profil">

      <DashboardCard title="Modifier Profil">
        <Typography></Typography>
        <form id='formMP' onSubmit={handleSubmit}>
      <label>
        Nom complet *
        <div>
          <input type="text" name="firstName" placeholder="Prénom" required onChange={handleChange} />
          <br/>
          <input type="text" name="lastName" placeholder="Nom" required onChange={handleChange} />
        </div>
      </label>

      <label>
        Adresse e-mail *
        <input type="email" name="email" required onChange={handleChange} />
      </label>

      <label>
        username
        <input type="text" name="Username" placeholder="Username" required onChange={handleChange}/>
      </label>

      <label>
        password
        <input name="password" type="password" required onChange={handleChange}></input>
      </label>

      <button type="submit">Modifier</button>
    </form>

      </DashboardCard>
    </PageContainer>
  );
};

export default ModifierProfile;
