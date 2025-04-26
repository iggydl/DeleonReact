import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  ActivityIndicator, 
  SafeAreaView, 
  StyleSheet,
  Image
} from 'react-native';
import axios from 'axios';

const HomePageScreen = ({ route, navigation }) => {
  const { username } = route.params;
  const [loading, setLoading] = useState(true);
  const [xchangeData, setXchangeData] = useState([]);
  const [error, setError] = useState(null);

  const endpoint = 'https://pk9blqxffi.execute-api.us-east-1.amazonaws.com/xdeal/Xchange';
  const inputData = {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjYiLCJuYmYiOjE3NDU2MjYzNTksImV4cCI6MTc0ODIxODM1OSwiaXNzIjoiWHVyMzRQMSIsImF1ZCI6Ilh1cjQ0UFAifQ.qzc-LBSyxuBd7RqMtQFovUo093KtW3p7xHaYUPe0WJ8",
    version_number: "2.2.6",
    user_type: 'Xpert',
    search: "",
    categories: [],
    last_listing: "",
    sort: "",
    min: "",
    max: "",
    last_row_value: "",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching data from API...');
        const response = await axios.post(endpoint, inputData);
        console.log('API Response:', response.data);
        
        if (response.status === 200 && response.data && Array.isArray(response.data.xchange)) {
          console.log('Data received:', response.data.xchange.length, 'items');
          setXchangeData(response.data.xchange);
        } else {
          setError('No data available or invalid response structure');
          console.warn('Unexpected response structure:', response.data);
        }
      } catch (err) {
        setError(err.message);
        console.error('API Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      {/* Item Image */}
      {item.item_image && (
        <Image 
          source={{ uri: item.item_image }} 
          style={styles.itemImage}
          resizeMode="contain"
        />
      )}
      
      {/* Item Details */}
      <Text style={styles.itemTitle}>{item.brand || 'No Brand'} - {item.model || 'No Model'}</Text>
      <Text style={styles.itemText}>Item #: {item.item_no || 'N/A'}</Text>
      <Text style={styles.priceText}>Price: {item.currency} {item.selling_price.toFixed(2)}</Text>
      
      {/* Lister Info */}
      <View style={styles.listerContainer}>
        {item.lister_image && (
          <Image 
            source={{ uri: item.lister_image }} 
            style={styles.listerImage}
          />
        )}
        <View style={styles.listerInfo}>
          <Text style={styles.listerName}>Sold by: {item.lister_name}</Text>
          <Text style={styles.listerType}>{item.lister_type}</Text>
        </View>
      </View>
      
      {/* Additional Info */}
      <Text style={styles.itemText}>Category: {item.category}</Text>
      <Text style={styles.itemText}>Listed: {new Date(item.listing_date).toLocaleDateString()}</Text>
      {item.variation && <Text style={styles.itemText}>Variation: {item.variation}</Text>}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.welcomeText}>Welcome, {username}!</Text>
      <Text style={styles.listTitle}>Xchange Listings</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#007bff" style={styles.loader} />
      ) : error ? (
        <Text style={styles.errorText}>Error: {error}</Text>
      ) : xchangeData.length === 0 ? (
        <Text style={styles.emptyListText}>No listings found.</Text>
      ) : (
        <FlatList
          data={xchangeData}
          keyExtractor={(item) => item.listing_id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
        />
      )}

      <TouchableOpacity 
        style={styles.logoutButton} 
        onPress={() => navigation.navigate('LoginScreen')}
      >
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    paddingHorizontal: 15,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 10,
    textAlign: 'center',
  },
  listTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#007bff',
    marginBottom: 15,
    textAlign: 'center',
  },
  listContent: {
    paddingBottom: 20,
  },
  itemContainer: {
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
  itemImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 5,
  },
  itemText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 3,
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2ecc71',
    marginVertical: 5,
  },
  listerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  listerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  listerInfo: {
    flex: 1,
  },
  listerName: {
    fontSize: 14,
    fontWeight: '600',
  },
  listerType: {
    fontSize: 12,
    color: '#777',
  },
  loader: {
    marginTop: 40,
  },
  logoutButton: {
    backgroundColor: '#d9534f',
    padding: 12,
    borderRadius: 8,
    marginVertical: 20,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyListText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#888',
  },
  errorText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#d9534f',
  },
});

export default HomePageScreen;