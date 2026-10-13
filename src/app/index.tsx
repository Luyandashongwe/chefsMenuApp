import { useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const [menu, setMenu] = useState([
    { id: '1', name: 'Grilled Salmon', course: 'Main', price: 'R 185' },
    { id: '2', name: 'Chocolate Mousse', course: 'Dessert', price: 'R 65' },
  ]);
  const [name, setName] = useState('');
  const [course, setCourse] = useState('');
  const [price, setPrice] = useState('');

  const addItem = () => {
    if (!name || !course || !price) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    setMenu([...menu, { id: Date.now().toString(), name, course, price: 'R ' + price }]);
    setName(''); setCourse(''); setPrice('');
  };

  const removeItem = (id) => {
    setMenu(menu.filter(item => item.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>👨‍🍳 Chef's Menu App</Text>
      <Text style={styles.subtitle}>Total Dishes: {menu.length}</Text>

      <View style={styles.form}>
        <TextInput style={styles.input} placeholder="Dish Name e.g. Steak" value={name} onChangeText={setName} />
        <TextInput style={styles.input} placeholder="Course e.g. Main" value={course} onChangeText={setCourse} />
        <TextInput style={styles.input} placeholder="Price e.g. 120" value={price} onChangeText={setPrice} keyboardType="numeric" />
        <TouchableOpacity style={styles.addButton} onPress={addItem}>
          <Text style={styles.buttonText}>Add Dish +</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={menu}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View>
              <Text style={styles.dishName}>{item.name}</Text>
              <Text style={styles.course}>{item.course} • {item.price}</Text>
            </View>
            <TouchableOpacity onPress={() => removeItem(item.id)} style={styles.deleteButton}>
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20, paddingTop: 60 },
  title: { fontSize: 26, fontWeight: 'bold', textAlign: 'center', marginBottom: 5 },
  subtitle: { textAlign: 'center', color: 'gray', marginBottom: 20 },
  form: { marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 12, borderRadius: 10, marginBottom: 10, backgroundColor: '#f9f9f9' },
  addButton: { backgroundColor: '#000', padding: 15, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  card: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, borderWidth: 1, borderColor: '#eee', borderRadius: 12, marginBottom: 10, backgroundColor: '#fafafa' },
  dishName: { fontWeight: 'bold', fontSize: 16 },
  course: { color: 'gray', marginTop: 3 },
  deleteButton: { backgroundColor: '#ff4444', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6 },
  deleteText: { color: '#fff', fontWeight: 'bold' }
});