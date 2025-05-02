import React, { useState, useEffect, useRef, useCallback } from 'react';
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
  StatusBar
} from 'react-native';
import axios from 'axios';

const { width } = Dimensions.get('window');

const HomePageScreen = ({ route, navigation }) => {
  const { username } = route.params;
  const [loading, setLoading] = useState(true);
  const [xchangeData, setXchangeData] = useState([]);
  const [featuredItem, setFeaturedItem] = useState(null);
  const [categories, setCategories] = useState({ 'All Items': [] });
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All Items');
  const [fetchingNextPage, setFetchingNextPage] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [lastListingId, setLastListingId] = useState('');
  const [lastRowValue, setLastRowValue] = useState('');
  const flatListRef = useRef(null);

  const endpoint = 'https://pk9blqxffi.execute-api.us-east-1.amazonaws.com/xdeal/Xchange';
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjYiLCJuYmYiOjE3NDU2MjYzNTksImV4cCI6MTc0ODIxODM1OSwiaXNzIjoiWHVyMzRQMSIsImF1ZCI6Ilh1cjQ0UFAifQ.qzc-LBSyxuBd7RqMtQFovUo093KtW3p7xHaYUPe0WJ8";

  const fetchProducts = useCallback(async (isNewSearch = false) => {
    if (fetchingNextPage || (!hasMore && !isNewSearch)) return;

    setFetchingNextPage(true);
    try {
      const params = {
        token,
        version_number: "2.2.6",
        user_type: 'Xpert',
        categories: selectedCategory !== 'All Items' ? [selectedCategory] : [],
        last_listing_id: isNewSearch ? '' : lastListingId,
        last_row_value: isNewSearch ? '' : lastRowValue,
        search: "",
        sort: "",
        min: "",
        max: ""
      };

      const response = await axios.post(endpoint, params);
      const newItems = response.data?.xchange || [];

      if (isNewSearch) {
        setXchangeData(newItems);
      } else {
        setXchangeData(prev => [...prev, ...newItems]);
      }

     
      const updatedCategories = JSON.parse(JSON.stringify(categories));
      if (isNewSearch) {
        updatedCategories['All Items'] = newItems;
        Object.keys(updatedCategories).forEach(key => {
          if (key !== 'All Items') updatedCategories[key] = [];
        });
      } else {
        updatedCategories['All Items'] = [...updatedCategories['All Items'], ...newItems];
      }

      newItems.forEach(item => {
        const category = item.category || item.brand || 'Popular Items';
        if (!updatedCategories[category]) {
          updatedCategories[category] = [];
        }
        updatedCategories[category].push(item);
      });

      setCategories(updatedCategories);

   
      if ((isNewSearch || !featuredItem) && newItems.length > 0) {
        setFeaturedItem(newItems[0]);
      }

    
      if (newItems.length > 0) {
        const lastItem = newItems[newItems.length - 1];
        setLastListingId(lastItem.listing_id.toString());
        setLastRowValue(lastItem.listing_date || lastItem.selling_price?.toString() || '');
      }
      
      setHasMore(newItems.length > 0);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err.message || 'Failed to load products');
    } finally {
      setFetchingNextPage(false);
      if (isNewSearch) {
        setLoading(false);
      }
    }
  }, [lastListingId, lastRowValue, selectedCategory, fetchingNextPage, hasMore, categories, featuredItem]);

  
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setXchangeData([]);
      setLastListingId('');
      setLastRowValue('');
      setHasMore(true);
      await fetchProducts(true);
    };

    loadData();
  }, [selectedCategory]);

  const renderFeaturedItem = () => {
    if (!featuredItem) return null;

    return (
      <TouchableOpacity 
        style={styles.featuredContainer}
        onPress={() => navigation.navigate('ProductDetail', { product: featuredItem })}
      >
        <Image
          source={{ uri: featuredItem.item_image || 'https://via.placeholder.com/500' }}
          style={styles.featuredImage}
          resizeMode="cover"
        />
        <View style={styles.featuredGradient}>
          <Text style={styles.featuredTitle}>{featuredItem.model || 'Featured Item'}</Text>
          <Text style={styles.featuredPrice}>
            {featuredItem.currency || 'USD'} {featuredItem.selling_price?.toFixed(2) || '0.00'}
          </Text>
          <Text style={styles.featuredBrand}>{featuredItem.brand || featuredItem.category || 'Popular Item'}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderGridItem = ({ item }) => {
    return (
      <TouchableOpacity 
        style={gridStyles.gridItem}
        onPress={() => navigation.navigate('ProductDetail', { product: item })}
      >
        <Image
          source={{ uri: item.item_image || 'https://via.placeholder.com/300' }}
          style={gridStyles.gridItemImage}
          resizeMode="cover"
        />
        <View style={gridStyles.gridItemDetails}>
          <Text style={gridStyles.gridItemPrice}>
            {item.currency || 'USD'} {item.selling_price?.toFixed(2) || '0.00'}
          </Text>
          <Text style={gridStyles.gridItemTitle} numberOfLines={1}>
            {item.model || item.name || 'Item'}
          </Text>
          <Text style={gridStyles.gridItemBrand} numberOfLines={1}>
            {item.brand || item.category || 'Brand'}
          </Text>
          <View style={gridStyles.gridItemSeller}>
            <Image
              source={{ uri: item.lister_image || 'https://via.placeholder.com/50' }}
              style={gridStyles.sellerAvatar}
            />
            <Text style={gridStyles.sellerName} numberOfLines={1}>
              {item.lister_name || 'Seller'}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderCategoryButtons = () => {
    const categoryNames = Object.keys(categories).filter(name => name !== 'All Items');
    
    return (
      <View style={styles.categoryContainer}>
        <FlatList
          data={['All Items', ...categoryNames]}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryList}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.categoryButton,
                selectedCategory === item && styles.activeCategoryButton
              ]}
              onPress={() => setSelectedCategory(item)}
            >
              <Text style={[
                styles.categoryText,
                selectedCategory === item && styles.activeCategoryText
              ]}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  };

  if (loading && xchangeData.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#E50914" />
        <Text style={styles.loadingText}>Loading products...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
        <TouchableOpacity 
          style={styles.retryButton}
          onPress={() => {
            setError(null);
            setSelectedCategory('All Items');
          }}
        >
          <Text style={styles.retryText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const currentItems = selectedCategory === 'All Items' 
    ? xchangeData 
    : categories[selectedCategory] || [];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#111" />

      <View style={styles.header}>
        <Text style={styles.logoText}>NEXPLS</Text>
        
      </View>

      <FlatList
        ref={flatListRef}
        data={currentItems}
        renderItem={renderGridItem}
        keyExtractor={(item) => item.listing_id.toString()}
        numColumns={2}
        columnWrapperStyle={gridStyles.gridRow}
        showsVerticalScrollIndicator={false}
        onEndReached={() => {
          if (hasMore && !fetchingNextPage) {
            fetchProducts();
          }
        }}
        onEndReachedThreshold={0.2}
        ListFooterComponent={
          fetchingNextPage ? (
            <ActivityIndicator size="small" color="#E50914" style={{ marginVertical: 20 }} />
          ) : null
        }
        ListHeaderComponent={
          <>
            {renderFeaturedItem()}
            {renderCategoryButtons()}
            <Text style={gridStyles.sectionTitle}>
              {selectedCategory === 'All Items' ? 'Latest Items' : selectedCategory}
            </Text>
          </>
        }
        contentContainerStyle={styles.listContent}
      />

      <View style={styles.bottomNav}>
        {['Home', 'Search', 'Sell', 'Watchlist', 'Profile'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={styles.navItem}
            onPress={() => {
              if (tab === 'Search') navigation.navigate('Search');
              if (tab === 'Profile') navigation.navigate('Profile');
            }}
          >
           
           
            <Text style={[
              styles.navText,
              tab === 'Home' && styles.activeNavText
            ]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default HomePageScreen;