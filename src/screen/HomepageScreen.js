import React, { useState, useEffect } from 'react';
import { styles } from '../styles/Mainstyles';
import { gridStyles } from '../styles/GridStyles';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  ActivityIndicator, 
  SafeAreaView,
  Image,
  Dimensions,
  ScrollView,
  StatusBar
} from 'react-native';
import axios from 'axios';

const { width, height } = Dimensions.get('window');

const HomePageScreen = ({ route, navigation }) => {
  const { username } = route.params;
  const [loading, setLoading] = useState(true);
  const [xchangeData, setXchangeData] = useState([]);
  const [featuredItem, setFeaturedItem] = useState(null);
  const [categories, setCategories] = useState({});
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All Items');

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
          const data = response.data.xchange;
          
          if (data.length > 0) {
            setFeaturedItem(data[0]);
          }
          
          const categoryMap = {};
          data.forEach(item => {
            const category = item.category || item.brand || 'Popular Items';
            if (!categoryMap[category]) {
              categoryMap[category] = [];
            }
            categoryMap[category].push(item);
          });
          
          categoryMap['All Items'] = data;
          setCategories(categoryMap);
          setXchangeData(data);
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

  const renderFeaturedItem = () => {
    if (!featuredItem) return null;
    
    return (
      <TouchableOpacity style={styles.featuredContainer}>
        <Image 
          source={{ uri: featuredItem.item_image || 'https://via.placeholder.com/500' }} 
          style={styles.featuredImage}
        />
        <View style={styles.featuredGradient}>
          <Text style={styles.featuredTitle}>{featuredItem.model || 'Featured Item'}</Text>
          <Text style={styles.featuredPrice}>
            {featuredItem.currency} {featuredItem.selling_price?.toFixed(2) || '0.00'}
          </Text>
          <Text style={styles.featuredBrand}>{featuredItem.brand || featuredItem.category || 'Popular Item'}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderGridItem = ({ item }) => {
    return (
      <TouchableOpacity style={gridStyles.gridItem}>
        <Image 
          source={{ uri: item.item_image || 'https://via.placeholder.com/300' }} 
          style={gridStyles.gridItemImage}
          resizeMode="cover"
        />
        <View style={gridStyles.gridItemDetails}>
          <Text style={gridStyles.gridItemPrice}>
            {item.currency} {item.selling_price?.toFixed(2) || '0.00'}
          </Text>
          <Text style={gridStyles.gridItemTitle} numberOfLines={1}>
            {item.model || item.name || 'Item'}
          </Text>
          <Text style={gridStyles.gridItemBrand} numberOfLines={1}>
            {item.brand || item.category || 'Brand'}
          </Text>
          <View style={gridStyles.gridItemSeller}>
            <View style={gridStyles.sellerAvatar} />
            <Text style={gridStyles.sellerName}>
              {item.seller_name || 'Seller'}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderCategoryButtons = () => {
    const categoryNames = Object.keys(categories);
    
    return (
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 15 }}
      >
        {categoryNames.map((category) => (
          <TouchableOpacity
            key={category}
            style={{
              paddingHorizontal: 15,
              paddingVertical: 8,
              marginRight: 10,
              backgroundColor: selectedCategory === category ? '#E50914' : 'rgba(255,255,255,0.1)',
              borderRadius: 20,
            }}
            onPress={() => setSelectedCategory(category)}
          >
            <Text style={{
              color: '#FFF',
              fontWeight: selectedCategory === category ? 'bold' : 'normal',
            }}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  const renderItemGrid = () => {
    const itemsToShow = categories[selectedCategory] || [];
    
    return (
      <View style={gridStyles.gridContainer}>
        <Text style={gridStyles.gridSectionTitle}>{selectedCategory}</Text>
        <FlatList
          data={itemsToShow}
          renderItem={renderGridItem}
          keyExtractor={(item) => item.listing_id?.toString() || Math.random().toString()}
          numColumns={2}
          columnWrapperStyle={gridStyles.gridRow}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
        />
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#E50914" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => setLoading(true)}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#111" />
      
      <View style={styles.header}>
        <Text style={styles.logoText}>NEXPLS</Text>
        <View style={styles.headerRight}>
        </View>
      </View>
      
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {renderFeaturedItem()}
        {renderItemGrid()}
      </ScrollView>
      
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Text style={[styles.navText, styles.activeNavText]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navText}>New</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navText}>My List</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('LoginScreen')}
        >
          <Text style={styles.navText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomePageScreen;