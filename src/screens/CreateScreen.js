import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CreateScreen = () => {
  const [form, setForm] = useState({
    nombreAdministrador: '',
    apellidoAdministrador: '',
    correoAdministrador: '',
    aliasAdministrador: '',
    claveAdministrador: '',
    confirmarClave: ''
  });
  const navigation = useNavigation();

  const handleSubmit = () => {
    fetch('http://your-api-url/api/administrador?action=createRow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    .then(response => response.json())
    .then(() => navigation.goBack());
  };

  return (
    <View>
      <TextInput placeholder="Nombre" value={form.nombreAdministrador} onChangeText={(text) => setForm({ ...form, nombreAdministrador: text })} />
      <TextInput placeholder="Apellido" value={form.apellidoAdministrador} onChangeText={(text) => setForm({ ...form, apellidoAdministrador: text })} />
      <TextInput placeholder="Correo" value={form.correoAdministrador} onChangeText={(text) => setForm({ ...form, correoAdministrador: text })} />
      <TextInput placeholder="Alias" value={form.aliasAdministrador} onChangeText={(text) => setForm({ ...form, aliasAdministrador: text })} />
      <TextInput placeholder="Clave" value={form.claveAdministrador} onChangeText={(text) => setForm({ ...form, claveAdministrador: text })} secureTextEntry />
      <TextInput placeholder="Confirmar Clave" value={form.confirmarClave} onChangeText={(text) => setForm({ ...form, confirmarClave: text })} secureTextEntry />
      <Button title="Create" onPress={handleSubmit} />
    </View>
  );
};

export default CreateScreen;
