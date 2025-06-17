import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  MenuItem
} from '@mui/material';

export default function RegisterPage({ onBack }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', { username, password, role });
      alert('Пользователь успешно зарегистрирован!');
      onBack();
    } catch (err) {
      alert('Ошибка регистрации: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 10 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Регистрация
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Имя пользователя"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="Пароль"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
          />
          <TextField
            select
            label="Роль"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            fullWidth
          >
            <MenuItem value="user">Пользователь</MenuItem>
            <MenuItem value="admin">Администратор</MenuItem>
          </TextField>
          <Button variant="contained" type="submit">Зарегистрироваться</Button>
          <Button variant="text" onClick={onBack}>Назад</Button>
        </Box>
      </Paper>
    </Container>
  );
}
