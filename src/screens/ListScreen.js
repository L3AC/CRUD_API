import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ListScreen = () => {
  const [administrators, setAdministrators] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetch('http://your-api-url/api/administrador?action=readAll')
      .then(response => response.json())
      .then(data => setAdministrators(data.dataset));
  }, []);

  return (
    <View>
      <Button title="Add Administrator" onPress={() => navigation.navigate('Create')} />
      <FlatList
        data={administrators}
        keyExtractor={item => item.id_administrador.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.nombre_administrador} {item.apellido_administrador}</Text>
            <Button title="Edit" onPress={() => navigation.navigate('Edit', { id: item.id_administrador })} />
            <Button title="Delete" onPress={() => navigation.navigate('Delete', { id: item.id_administrador })} />
          </View>
        )}
      />
    </View>
  );
};

export default ListScreen;
