import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, Image, ScrollView } from 'react-native';
import Input from '../components/Inputs/Input';
import Buttons from '../components/Buttons/Button';
import * as Constantes from '../utils/constantes';

const App = () => {
  const ip = Constantes.IP;
  const [view, setView] = useState('list'); // 'list', 'create', 'edit'
  const [administrators, setAdministrators] = useState([]);
  const [form, setForm] = useState({
    idAdministrador: '',
    nombreAdministrador: '',
    apellidoAdministrador: '',
    correoAdministrador: '',
    aliasAdministrador: '',
    claveAdministrador: '',
    confirmarClave: ''
  });

  useEffect(() => {
    fetch(`${ip}/coffeeshop/api/services/admin/administrador.php?action=readAll`)
      .then(response => response.json())
      .then(data => setAdministrators(data.dataset));
  }, []);

  const handleCreate = async () => {
    const formData = new FormData();
    formData.append('nombreAdministrador', form.nombreAdministrador);
    formData.append('apellidoAdministrador', form.apellidoAdministrador);
    formData.append('correoAdministrador', form.correoAdministrador);
    formData.append('aliasAdministrador', form.aliasAdministrador);
    formData.append('claveAdministrador', form.claveAdministrador);

    try {
      const response = await fetch(`${ip}/coffeeshop/api/services/admin/administrador.php?action=createRow`, {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      if (data.status) {
        setView('list');
        refreshList();
      } else {
        Alert.alert('Error', data.error);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Ocurrió un error al crear el administrador');
    }
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append('idAdministrador', form.idAdministrador);
    formData.append('nombreAdministrador', form.nombreAdministrador);
    formData.append('apellidoAdministrador', form.apellidoAdministrador);
    formData.append('correoAdministrador', form.correoAdministrador);
    formData.append('aliasAdministrador', form.aliasAdministrador);
    formData.append('claveAdministrador', form.claveAdministrador);

    try {
      const response = await fetch(`${ip}/coffeeshop/api/services/admin/administrador.php?action=updateRow`, {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      if (data.status) {
        setView('list');
        refreshList();
      } else {
        Alert.alert('Error', data.error);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Ocurrió un error al actualizar el administrador');
    }
  };

  const handleDelete = async (id) => {
    const formData = new FormData();
    formData.append('idAdministrador', id);

    try {
      const response = await fetch(`${ip}/coffeeshop/api/services/admin/administrador.php?action=deleteRow`, {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      if (data.status) {
        refreshList();
      } else {
        Alert.alert('Error', data.error);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Ocurrió un error al eliminar el administrador');
    }
  };

  const refreshList = () => {
    fetch(`${ip}/coffeeshop/api/services/admin/administrador.php?action=readAll`)
      .then(response => response.json())
      .then(data => setAdministrators(data.dataset));
  };

  const handleEdit = async (id) => {
    const formData = new FormData();
    formData.append('idAdministrador', id);

    try {
      const response = await fetch(`${ip}/coffeeshop/api/services/admin/administrador.php?action=readOne`, {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      if (data.status) {
        setForm({
          idAdministrador: data.dataset.id_administrador,
          nombreAdministrador: data.dataset.nombre_administrador,
          apellidoAdministrador: data.dataset.apellido_administrador,
          correoAdministrador: data.dataset.correo_administrador,
          aliasAdministrador: data.dataset.alias_administrador,
          claveAdministrador: '',
          confirmarClave: ''
        });
        setView('edit');
      } else {
        Alert.alert('Error', data.error);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Ocurrió un error al obtener el administrador');
    }
  };

  const renderView = () => {
    switch (view) {
      case 'list':
        return (
          <View style={styles.container}>
            <Image source={require('../img/coffee-cup.png')} style={styles.image} />
            <Text style={styles.texto}>Administradores</Text>
            <Buttons textoBoton="Agregar Administrador" accionBoton={() => setView('create')} />
            <FlatList
              data={administrators}
              keyExtractor={item => item.id_administrador.toString()}
              renderItem={({ item }) => (
                <View style={styles.itemContainer}>
                  <Text style={styles.itemText}>{item.nombre_administrador} {item.apellido_administrador}</Text>
                  <View style={styles.buttonsContainer}>
                    <TouchableOpacity onPress={() => handleEdit(item.id_administrador)} style={styles.button}>
                      <Text style={styles.buttonText}>Editar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleDelete(item.id_administrador)} style={styles.button}>
                      <Text style={styles.buttonText}>Eliminar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
          </View>
        );
      case 'create':
      case 'edit':
        return (
          <ScrollView contentContainerStyle={styles.container}>
            <Image source={require('../img/coffee-cup.png')} style={styles.image} />
            <Text style={styles.texto}>{view === 'create' ? 'Crear Administrador' : 'Editar Administrador'}</Text>
            <Input
              placeHolder='Nombre'
              setValor={form.nombreAdministrador}
              setTextChange={(text) => setForm({ ...form, nombreAdministrador: text })}
            />
            <Input
              placeHolder='Apellido'
              setValor={form.apellidoAdministrador}
              setTextChange={(text) => setForm({ ...form, apellidoAdministrador: text })}
            />
            <Input
              placeHolder='Correo'
              setValor={form.correoAdministrador}
              setTextChange={(text) => setForm({ ...form, correoAdministrador: text })}
            />
            <Input
              placeHolder='Alias'
              setValor={form.aliasAdministrador}
              setTextChange={(text) => setForm({ ...form, aliasAdministrador: text })}
            />
            <Input
              placeHolder='Clave'
              setValor={form.claveAdministrador}
              setTextChange={(text) => setForm({ ...form, claveAdministrador: text })}
              contra={true}
            />
            <Input
              placeHolder='Confirmar Clave'
              setValor={form.confirmarClave}
              setTextChange={(text) => setForm({ ...form, confirmarClave: text })}
              contra={true}
            />
            <Buttons
              textoBoton={view === 'create' ? 'Crear' : 'Actualizar'}
              accionBoton={view === 'create' ? handleCreate : handleUpdate}
            />
            <Buttons
              textoBoton='Cancelar'
              accionBoton={() => setView('list')}
            />
          </ScrollView>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {renderView()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAD8C0',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  texto: {
    color: '#322C2B',
    fontWeight: '900',
    fontSize: 20,
    marginVertical: 10,
  },
  image: {
    width: 75,
    height: 75,
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    width: '100%',
  },
  itemText: {
    color: '#322C2B',
    fontSize: 16,
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#322C2B',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default App;
