import React, { useState, useEffect } from 'react';
import { View, TextInput, Button } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const EditScreen = () => {
  const [form, setForm] = useState({
    idAdministrador: '',
    nombreAdministrador: '',
    apellidoAdministrador: '',
    correoAdministrador: ''
  });
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    fetch(`http://your-api-url/api/administrador?action=readOne&idAdministrador=${route.params.id}`)
      .then(response => response.json())
      .then(data => setForm(data.dataset));
  }, []);

  const handleSubmit = () => {
    fetch('http://your-api-url/api/administrador?action=updateRow', {
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
      <Button title="Update" onPress={handleSubmit} />
    </View>
  );
};

export default EditScreen;
