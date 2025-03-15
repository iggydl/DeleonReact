import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  ActivityIndicator, 
  SafeAreaView, 
  Alert, 
  StyleSheet 
} from 'react-native';
import axios from 'axios';

const HomePageScreen = ({ route, navigation }) => {
  const { username } = route.params;
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/users');
        setUsers(response.data);
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch users.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.welcomeText}>Welcome, {username}!</Text>
      <Text style={styles.employeeListTitle}>User List</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#007bff" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.userCard}>
              <Text style={styles.userTitle}>{item.name.firstname} {item.name.lastname}</Text>
              <Text style={styles.userText}>Email: {item.email}</Text>
              <Text style={styles.userText}>Username: {item.username}</Text>
              <Text style={styles.userText}>Phone: {item.phone}</Text>
              
              <View style={styles.addressContainer}>
                <Text style={styles.userText}>Address:</Text>
                <Text style={styles.userSubText}>{item.address.street}, {item.address.city}, {item.address.zipcode}</Text>
                <Text style={styles.userSubText}>Location: {item.address.geolocation.lat}, {item.address.geolocation.long}</Text>
              </View>
            </View>
          )}
          ListEmptyComponent={<Text style={styles.emptyListText}>No users found.</Text>}
        />
      )}

      <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.navigate('LoginScreen')}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    padding: 20,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  employeeListTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#007bff',
    marginBottom: 10,
    textAlign: 'center',
  },
  userCard: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    marginBottom: 15,
  },
  userTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 5,
  },
  userText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 3,
  },
  userSubText: {
    fontSize: 13,
    color: '#777',
    marginLeft: 10,
  },
  addressContainer: {
    marginTop: 8,
    backgroundColor: '#f1f1f1',
    padding: 8,
    borderRadius: 8,
  },
  logoutButton: {
    backgroundColor: '#d9534f',
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyListText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#888',
  },
});

export default HomePageScreen;
