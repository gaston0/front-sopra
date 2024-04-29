import React, { useState, useEffect } from 'react';
import {
    Typography, Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Chip,
    IconButton
} from '@mui/material';
import DashboardCard from '../../../components/shared/DashboardCard';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const ListUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/users')
            .then(response => {
                // Récupérer l'utilisateur connecté depuis localStorage
                const userDataString = localStorage.getItem('user');
                if (userDataString) {
                    try {
                        const userData = JSON.parse(userDataString);
                        
                        console.log('Identifiant de l\'utilisateur connecté:', userData.id); // Utiliser le champ "matricule"
                        
                        // Filtrer les utilisateurs pour exclure l'utilisateur connecté
                        const filteredUsers = response.data.filter(user => user.matricule !== parseInt(userData.id)); // Utiliser "matricule" au lieu de "id"
                        
                        // Mettre à jour l'état avec les utilisateurs filtrés
                        setUsers(filteredUsers);
                    } catch (error) {
                        console.error('Erreur lors de la conversion des données utilisateur :', error);
                    }
                } else {
                    // Si aucune donnée utilisateur n'est présente dans localStorage, utiliser les données brutes de l'API
                    setUsers(response.data);
                }
            })
            .catch(error => {
                console.error('Erreur lors du chargement des utilisateurs :', error);
            });
    }, []);
    
    

    const handleDeleteUser = (userId) => {
        const confirmed = window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?');
        if (!confirmed) {
            return; // Annuler la suppression si l'utilisateur clique sur "Annuler"
        }

        console.log('Suppression de l\'utilisateur avec ID :', userId);
        // Envoyez une requête HTTP DELETE vers votre API backend pour supprimer l'utilisateur
        axios.delete(`http://localhost:8080/api/user/${userId}`)
            .then(response => {
                console.log('Utilisateur supprimé avec succès');
                // Mettez à jour l'état local des utilisateurs en supprimant l'utilisateur supprimé
                setUsers(prevUsers => prevUsers.filter(user => user.matricule !== userId));
            })
            .catch(error => {
                console.error('Erreur lors de la suppression de l\'utilisateur :', error);
            });
    };
    
    return (
        <DashboardCard title="User List">
            <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
                <Table aria-label="simple table" sx={{ whiteSpace: "nowrap", mt: 2 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>Matricule</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>Email</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>Nom</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>Prénom</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>Roles</Typography>
                            </TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.matricule}>
                                <TableCell>
                                    <Typography variant="subtitle2" fontWeight={600}>{user.matricule}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>{user.email}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle2" fontWeight={600}>{user.nom}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle2" fontWeight={600}>{user.prenom}</Typography>
                                </TableCell>
                                <TableCell>
                                    {user.roles.map(role => (
                                        <Chip key={role.id} label={role.name} />
                                    ))}
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton onClick={() => handleDeleteUser(user.matricule)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </DashboardCard>
    );
};

export default ListUsers;