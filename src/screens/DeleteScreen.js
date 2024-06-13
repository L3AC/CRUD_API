import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const DeleteScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const handleDelete = () => {
    fetch('http://your-api-url/api/administrador?action=deleteRow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idAdministrador: route.params.id })
    })
    .then(response => response.json())
    .then(() => navigation.goBack());
  };

  return (
    <View>
      <Text>Are you sure you want to delete this administrator?</Text>
      <Button title="Delete" onPress={handleDelete} />
    </View>
  );
};

export default DeleteScreen;
