import React, { useEffect, useState } from 'react';
import api from '../api'; 
import {
  Box,
  Button,
  Container,
  MenuItem,
  Select,
  Typography,
  FormControl,
  InputLabel,
  CircularProgress,
  Alert,
} from '@mui/material';

export default function UserPage() {
  const [products, setProducts] = useState([]);
  const [selectedCode, setSelectedCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    api.get('/products')
      .then((res) => setProducts(res.data))
      .catch(() => setError('Не удалось загрузить товары'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
  api.get('/users')
    .then((res) => {
      console.log('Пользователи:', res.data);
    })
    .catch((err) => {
      console.error('Ошибка при загрузке пользователей:', err);
    });
}, []);



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCode) return;

    const selectedProduct = products.find(p => p.code === selectedCode);
    try {
      await api.post('/requests', { productCode: selectedCode });
      alert(`Вы заказали: ${selectedProduct.name}`);
      setSelectedCode('');
    } catch {
      alert('Ошибка при отправке запроса');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.reload();
  };

  if (loading) {
    return (
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Typography variant="h5" gutterBottom>
        Заказ товара
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <FormControl fullWidth>
          <InputLabel id="product-select-label">Выберите товар</InputLabel>
          <Select
            labelId="product-select-label"
            value={selectedCode}
            onChange={(e) => setSelectedCode(e.target.value)}
            required
          >
            {products.map((p) => (
              <MenuItem key={p.code} value={p.code}>
                {p.name} — {p.price}₸
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" type="submit" disabled={!selectedCode}>
          Заказать
        </Button>
        <Button onClick={handleLogout} color="error">
          Выйти
        </Button>
      </Box>
    </Container>
  );
}
