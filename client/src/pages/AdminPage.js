import React, { useEffect, useState } from 'react';
import api from '../api';
import {
  Box,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  CircularProgress,
  Alert,
  Chip
} from '@mui/material';

export default function AdminPage() {
  const [requests, setRequests] = useState([]);
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchData = async () => {
    try {
      const [reqRes, prodRes] = await Promise.all([
        api.get('/requests'),
        api.get('/products')
      ]);

      const prodMap = {};
      prodRes.data.forEach(p => prodMap[p.code] = p);

      setProducts(prodMap);
      setRequests(reqRes.data);
    } catch (err) {
      setError('Ошибка загрузки данных');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const markAsReady = async (id) => {
    try {
      await api.put(`/requests/${id}`);
      fetchData();
    } catch {
      alert('Ошибка при обновлении статуса');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.reload();
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ mt: 8 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 8 }}>
      <Typography variant="h5" gutterBottom>
        Панель администратора
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Артикул</TableCell>
              <TableCell>Название</TableCell>
              <TableCell>Цена</TableCell>
              <TableCell>Время</TableCell>
              <TableCell>Статус</TableCell>
              <TableCell>Действие</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.map((r) => {
              const p = products[r.productCode] || {};
              return (
                <TableRow key={r._id}>
                  <TableCell>{p.code}</TableCell>
                  <TableCell>{p.name}</TableCell>
                  <TableCell>{p.price}₸</TableCell>
                  <TableCell>{new Date(r.timestamp).toLocaleString()}</TableCell>
                  <TableCell>
                    {r.status === 'готов' ? (
                      <Chip label="Готов" color="success" />
                    ) : (
                      <Chip label="В ожидании" color="warning" />
                    )}
                  </TableCell>
                  <TableCell>
                    {r.status !== 'готов' && (
                      <Button onClick={() => markAsReady(r._id)} variant="contained" color="primary">
                        Подтвердить
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ mt: 2 }}>
        <Button onClick={handleLogout} color="error" variant="outlined">Выйти</Button>
      </Box>
    </Container>
  );
}
