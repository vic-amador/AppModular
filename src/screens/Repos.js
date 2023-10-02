import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, Button, StyleSheet } from 'react-native';

function ReportCell({ report }) {
  return (
    <View style={styles.cell}>
      <Text>ID: {report.reporte_id}</Text>
      <Text>Nombre: {report.firstName}</Text>
      <Text>Apellido: {report.lastName}</Text>
      <Text>Colonia: {report.location_report}</Text>
      {report.image && (
        <Image
          source={{ uri: `data:image/jpeg;base64,${report.image.data}` }}
          style={styles.image}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  cell: {
    backgroundColor: 'white',
    padding: 10,
    marginVertical: 5,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  image: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
});

function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDataFromAPI();
  }, []);

  const fetchDataFromAPI = async () => {
    try {
      const response = await fetch('http://44.211.143.212:3000/Reportes');
      if (!response.ok) {
        throw new Error('No se pudo conectar al servidor.');
      }
      const newData = await response.json();
      console.log(newData);
      setData(newData);
      setError(null);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      setError('Error al obtener los datos. Verifica tu conexión y vuelve a intentarlo.');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Tabla de Datos</Text>
      <Button title="Recargar Datos" onPress={fetchDataFromAPI} />
      {error && <Text>Error: {error}</Text>}
      <FlatList
        data={data}
        keyExtractor={(item) => (item.reporte_id ? item.reporte_id.toString() : Math.random().toString())}
        renderItem={({ item }) => <ReportCell report={item} />}
      />
    </View>
  );
}

export default App;