import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  SafeAreaView,
  Image,
  Dimensions,
  StatusBar,
  Modal,
  ScrollView,
  RefreshControl
} from 'react-native';
import axios from 'axios';
import { styles } from '../styles/HomepageStyle';

const { width } = Dimensions.get('window');

const HomePageScreen = ({ route, navigation }) => {
  const { username } = route?.params || {};
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [xchangeData, setXchangeData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState(null);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [fetchingNextPage, setFetchingNextPage] = useState(false);
  const [moreProducts, setMoreProducts] = useState(true);
  const [lastListingId, setLastListingId] = useState('');
  const [lastRowValue, setLastRowValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortCategory, setSortCategory] = useState('Category');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState('');
  const flatListRef = useRef(null);

  const endpoint = 'https://pk9blqxffi.execute-api.us-east-1.amazonaws.com/xdeal/Xchange';
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJuYmYiOjE3NDYxOTI1MTQsImV4cCI6MTc0ODc4NDUxNCwiaXNzIjoiWHVyMzRQMSIsImF1ZCI6Ilh1cjQ0UFAifQ.QD-fcLXtznCfkTIYkbOQfc5fXfxYgw_mOziKWpUHddk";

  const categories = [
    "All", "Bags", "Shoes", "Jewelry", "Toys", "Watches", "Automotive and Parts",
    "Electronics and Gadgets", "Clothing", "Eyewear", "Musical Instrument",
    "Trading Cards", "Artworks", "Rare Coins", "Books and Comic Books",
    "Stamps", "Antiques", "Music", "Movie", "Sports", "Others"
  ];

  const sortOptions = ["Category", "Price", "Name", "Date"];

  const priceRanges = [
    { label: "1 - 5k", min: 1, max: 5000 },
    { label: "5k - 10k", min: 5000, max: 10000 },
    { label: "10k - 50k", min: 10000, max: 50000 },
    { label: "50k - 100k", min: 50000, max: 100000 },
    { label: "100k+", min: 100000, max: null }
  ];

  const fetchProducts = useCallback(async (isNewSearch = false, isRefresh = false) => {
    if (fetchingNextPage || (!moreProducts && !isNewSearch && !isRefresh)) return;

    if (!isRefresh) {
      setFetchingNextPage(true);
    }
    
    try {
      const params = {
        token,
        version_number: "2.2.6",
        user_type: 'Xpert',
        categories: selectedCategories,
        last_listing_id: isNewSearch || isRefresh ? '' : lastListingId,
        last_row_value: isNewSearch || isRefresh ? '' : lastRowValue,
        search: searchQuery,
        sort: sortBy,
        min: minPrice,
        max: maxPrice
      };

      const response = await axios.post(endpoint, params);
      const newItems = response.data?.xchange || [];
      
      const mockData = newItems.length > 0 ? newItems : generateMockData();

      if (isNewSearch || isRefresh) {
        setXchangeData(mockData);
      } else {
        setXchangeData(prev => [...prev, ...mockData]);
      }

      if (mockData.length > 0) {
        const lastItem = mockData[mockData.length - 1];
        setLastListingId(lastItem.listing_id?.toString() || '');
        setLastRowValue(lastItem.listing_date || lastItem.selling_price?.toString() || '');
      }
      
      setMoreProducts(mockData.length > 0);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err.message || 'Failed to load products');
      const mockData = generateMockData();
      setXchangeData(mockData);
    } finally {
      if (!isRefresh) {
        setFetchingNextPage(false);
      }
      if (isNewSearch) {
        setLoading(false);
      }
    }
  }, [lastListingId, lastRowValue, selectedCategories, searchQuery, sortBy, minPrice, maxPrice, fetchingNextPage, moreProducts]);

  
  const applyFiltersAndSort = useCallback(() => {
    let filtered = [...xchangeData];

    
    if (searchQuery.trim()) {
      filtered = filtered.filter(item => 
        item.model?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.brand?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    
    if (selectedCategories.length > 0 && !selectedCategories.includes('All')) {
      filtered = filtered.filter(item => 
        selectedCategories.includes(item.category)
      );
    }

    
    if (minPrice || maxPrice) {
      filtered = filtered.filter(item => {
        const price = item.selling_price || 0;
        const min = minPrice ? parseFloat(minPrice) : 0;
        const max = maxPrice ? parseFloat(maxPrice) : Infinity;
        return price >= min && price <= max;
      });
    }

    
    if (sortBy && sortCategory) {
      filtered.sort((a, b) => {
        let valueA, valueB;
        
        switch (sortCategory) {
          case 'Price':
            valueA = a.selling_price || 0;
            valueB = b.selling_price || 0;
            break;
          case 'Name':
            valueA = (a.model || a.name || '').toLowerCase();
            valueB = (b.model || b.name || '').toLowerCase();
            break;
          case 'Category':
            valueA = (a.category || '').toLowerCase();
            valueB = (b.category || '').toLowerCase();
            break;
          case 'Date':
            valueA = a.listing_date || a.listing_id;
            valueB = b.listing_date || b.listing_id;
            break;
          default:
            return 0;
        }

        if (sortBy === 'asc') {
          return valueA > valueB ? 1 : -1;
        } else {
          return valueA < valueB ? 1 : -1;
        }
      });
    }

    setFilteredData(filtered);
  }, [xchangeData, searchQuery, selectedCategories, minPrice, maxPrice, sortBy, sortCategory]);

  
  useEffect(() => {
    applyFiltersAndSort();
  }, [applyFiltersAndSort]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setXchangeData([]);
    setLastListingId('');
    setLastRowValue('');
    setMoreProducts(true);
    setError(null);
    
    try {
      await fetchProducts(true, true);
    } catch (err) {
      console.error('Error during refresh:', err);
    } finally {
      setRefreshing(false);
    }
  }, [fetchProducts]);

  const generateMockData = () => {
    const baseData = [
      {
        listing_id: '1',
        item_image: 'https://via.placeholder.com/300x300',
        model: 'HUNTER HUNTER Trading Cards',
        name: 'PHOTOCARD',
        category: 'Trading Cards',
        brand: 'HUNTER HUNTER',
        selling_price: 1200,
        currency: 'HKD',
        lister_name: 'mantra',
        lister_image: 'https://via.placeholder.com/50x50',
        listing_date: '2024-01-15'
      },
      {
        listing_id: '2',
        item_image: 'https://via.placeholder.com/300x300',
        model: 'Jisoo Kim Shutdown V1001',
        name: 'Pop Mart PH',
        category: 'Toys',
        brand: 'Pop Mart',
        selling_price: 1600,
        currency: 'PHP',
        lister_name: 'toyrok',
        lister_image: 'https://via.placeholder.com/50x50',
        listing_date: '2024-01-14'
      },
      {
        listing_id: '3',
        item_image: 'https://via.placeholder.com/300x300',
        model: 'Baby Molly Astronaut',
        name: 'Pop Mart',
        category: 'Toys',
        brand: 'Pop Mart',
        selling_price: 900,
        currency: 'PHP',
        lister_name: 'xpertcreator',
        lister_image: 'https://via.placeholder.com/50x50',
        listing_date: '2024-01-13'
      },
      {
        listing_id: '4',
        item_image: 'https://via.placeholder.com/300x300',
        model: 'Hirono Collectible',
        name: 'Popmart',
        category: 'Toys',
        brand: 'Popmart',
        selling_price: 600,
        currency: 'PHP',
        lister_name: 'Magic Company',
        lister_image: 'https://via.placeholder.com/50x50',
        listing_date: '2024-01-12'
      },
      {
        listing_id: '5',
        item_image: 'https://via.placeholder.com/300x300',
        model: 'Vintage Rolex Watch',
        name: 'Luxury Timepiece',
        category: 'Watches',
        brand: 'Rolex',
        selling_price: 25000,
        currency: 'USD',
        lister_name: 'watchcollector',
        lister_image: 'https://via.placeholder.com/50x50',
        listing_date: '2024-01-11'
      },
      {
        listing_id: '6',
        item_image: 'https://via.placeholder.com/300x300',
        model: 'Designer Handbag',
        name: 'Luxury Bag',
        category: 'Bags',
        brand: 'Louis Vuitton',
        selling_price: 3500,
        currency: 'USD',
        lister_name: 'fashionista',
        lister_image: 'https://via.placeholder.com/50x50',
        listing_date: '2024-01-10'
      }
    ];

    return baseData.map(item => ({
      ...item,
      selling_price: item.selling_price + Math.floor(Math.random() * 200) - 100,
      listing_id: item.listing_id + '_' + Date.now()
    }));
  };
  
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setXchangeData([]);
      setLastListingId('');
      setLastRowValue('');
      setMoreProducts(true);
      await fetchProducts(true);
    };

    loadData();
  }, []);

  const handleCategoryToggle = (category) => {
    if (category === 'All') {
      setSelectedCategories([]);
    } else {
      setSelectedCategories(prev => {
        if (prev.includes(category)) {
          return prev.filter(c => c !== category);
        } else {
          return [...prev, category];
        }
      });
    }
  };

  const handlePriceRangeSelect = (range) => {
    setSelectedPriceRange(range.label);
    setMinPrice(range.min.toString());
    setMaxPrice(range.max ? range.max.toString() : '');
  };

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setMinPrice('');
    setMaxPrice('');
    setSelectedPriceRange('');
    setSortBy('');
    setSortCategory('Category');
  };

  const handleApplyFilters = () => {
    setFilterModalVisible(false);
    applyFiltersAndSort();
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity 
        style={styles.itemContainer}
        onPress={() => navigation.navigate('ProductScreen', { product: item })}
      >
        <Image
          source={{ uri: item.item_image }}
          style={styles.itemImage}
          resizeMode="cover"
        />
        <Text style={styles.itemPrice}>
          {item.currency} {item.selling_price?.toLocaleString()}
        </Text>
        <Text style={styles.itemTitle} numberOfLines={1}>
          {item.model}
        </Text>
        <Text style={styles.itemCategory} numberOfLines={1}>
          {item.name || item.category}
        </Text>
        <View style={styles.sellerContainer}>
          <Image
            source={{ uri: item.lister_image }}
            style={styles.sellerAvatar}
          />
          <Text style={styles.sellerName} numberOfLines={1}>
            {item.lister_name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderCategoryDropdown = () => {
    if (!showCategoryDropdown) return null;

    return (
      <View style={styles.categoryDropdown}>
        <ScrollView style={{ maxHeight: 200 }}>
          {sortOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.dropdownItem,
                sortCategory === option && styles.selectedDropdownItem
              ]}
              onPress={() => {
                setSortCategory(option);
                setShowCategoryDropdown(false);
              }}
            >
              <Text style={styles.dropdownItemText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  };

  const renderFilterModal = () => {
    return (
      <Modal
        visible={filterModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setFilterModalVisible(false)}
      >
        <View style={styles.filterModal}>
          <TouchableOpacity 
            style={{ flex: 1 }} 
            onPress={() => setFilterModalVisible(false)}
          />
          <View style={styles.filterContent}>
            <View style={styles.filterHeader}>
              <Text style={styles.sortTitle}>Sort & Filter</Text>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setFilterModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.sortHeader}>
              <TouchableOpacity 
                style={styles.dropdownContainer}
                onPress={() => setShowCategoryDropdown(!showCategoryDropdown)}
              >
                <Text style={styles.dropdownText}>{sortCategory}</Text>
                <Text>{showCategoryDropdown ? '▲' : '▼'}</Text>
              </TouchableOpacity>
              
              {renderCategoryDropdown()}
              
              <View style={styles.sortButtonsContainer}>
                <TouchableOpacity 
                  style={[
                    styles.sortButton,
                    sortBy === 'asc' && styles.activeSortButton
                  ]}
                  onPress={() => setSortBy(sortBy === 'asc' ? '' : 'asc')}
                >
                  <Text style={[
                    styles.sortButtonText,
                    sortBy === 'asc' && styles.activeSortButtonText
                  ]}>
                    ASC
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[
                    styles.sortButton,
                    sortBy === 'desc' && styles.activeSortButton
                  ]}
                  onPress={() => setSortBy(sortBy === 'desc' ? '' : 'desc')}
                >
                  <Text style={[
                    styles.sortButtonText,
                    sortBy === 'desc' && styles.activeSortButtonText
                  ]}>
                    DESC
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            
            <ScrollView>
              <View style={styles.filterSection}>
                <Text style={styles.filterSectionTitle}>Filter by Category</Text>
                <View style={styles.categoryContainer}>
                  {categories.map((category, index) => (
                    <TouchableOpacity 
                      key={index} 
                      style={[
                        styles.categoryButton,
                        (selectedCategories.includes(category) || (category === 'All' && selectedCategories.length === 0)) && styles.selectedCategoryButton
                      ]}
                      onPress={() => handleCategoryToggle(category)}
                    >
                      <Text style={[
                        styles.categoryText,
                        (selectedCategories.includes(category) || (category === 'All' && selectedCategories.length === 0)) && styles.selectedCategoryText
                      ]}>
                        {category}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              
              <View style={styles.filterSection}>
                <Text style={styles.filterSectionTitle}>Value Range</Text>
                <View style={styles.valueRangeInputContainer}>
                  <TextInput 
                    style={styles.valueRangeInput} 
                    placeholder="Min" 
                    keyboardType="number-pad"
                    value={minPrice}
                    onChangeText={setMinPrice}
                  />
                  <Text style={styles.dashText}>—</Text>
                  <TextInput 
                    style={styles.valueRangeInput} 
                    placeholder="Max" 
                    keyboardType="number-pad"
                    value={maxPrice}
                    onChangeText={setMaxPrice}
                  />
                </View>
                
                <View style={styles.priceRangeButtonsContainer}>
                  {priceRanges.map((range, index) => (
                    <TouchableOpacity 
                      key={index} 
                      style={[
                        styles.priceRangeButton,
                        selectedPriceRange === range.label && styles.selectedPriceRangeButton
                      ]}
                      onPress={() => handlePriceRangeSelect(range)}
                    >
                      <Text style={[
                        styles.priceRangeButtonText,
                        selectedPriceRange === range.label && styles.selectedPriceRangeButtonText
                      ]}>
                        {range.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </ScrollView>
            
            <View style={styles.filterActionContainer}>
              <TouchableOpacity 
                style={styles.clearButton}
                onPress={handleClearFilters}
              >
                <Text style={styles.clearButtonText}>Clear</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.applyButton}
                onPress={handleApplyFilters}
              >
                <Text style={styles.applyButtonText}>Apply</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

 
  if (loading && xchangeData.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#C0935C" />
        <Text style={styles.loadingText}>Loading products...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>The Xchange</Text>
        <TouchableOpacity style={styles.notificationButton}>
          <Image 
            source={require('../assets/notification.png')}
            style={styles.notificationIcon}
          />
        </TouchableOpacity>
      </View>
      
      
      <TextInput
        style={styles.searchBar}
        placeholder="Tell us what you're looking for..."
        placeholderTextColor="#999999"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      
      
      <FlatList
        ref={flatListRef}
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.listing_id.toString()}
        numColumns={2}
        contentContainerStyle={{ paddingHorizontal: 8 }}
        showsVerticalScrollIndicator={false}
        onEndReached={() => {
          if (moreProducts && !fetchingNextPage && !refreshing) {
            fetchProducts();
          }
        }}
        onEndReachedThreshold={0.2}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#C0935C']}
            tintColor="#C0935C"
            title="Pull to refresh..."
            titleColor="#666666"
          />
        }
        ListFooterComponent={
          fetchingNextPage && !refreshing ? (
            <ActivityIndicator size="small" color="#C0935C" style={{ marginVertical: 20 }} />
          ) : null
        }
        ListHeaderComponent={
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              Daily Discovery {filteredData.length < xchangeData.length ? `(${filteredData.length} filtered)` : ''}
            </Text>
            <TouchableOpacity 
              style={styles.filterButton} 
              onPress={() => setFilterModalVisible(true)}
            >
              <Text style={styles.filterText}>Filter</Text>
              <Image 
                source={{ uri: 'https://via.placeholder.com/16/C0935C/C0935C?text=≡' }}
                style={styles.filterIcon}
              />
            </TouchableOpacity>
          </View>
        }
      />
      
      
      <View style={styles.bottomNav}>
  <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Xhibit')}>
    <Image source={require('../assets/xhibit.png')} style={styles.navIcon} />
    <Text style={styles.navLabel}>Xhibit</Text>
  </TouchableOpacity>

  <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Xchange')}>
    <Image source={require('../assets/shop.png')} style={styles.navIcon} />
    <Text style={styles.navLabel}>Xchange</Text>
  </TouchableOpacity>

  <View style={{ width: 60 }} /> 

  <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Inventory')}>
    <Image source={require('../assets/clipboard-list.png')} style={styles.navIcon} />
    <Text style={styles.navLabel}>Inventory</Text>
  </TouchableOpacity>

  <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Profile')}>
    <Image source={require('../assets/profile.png')} style={styles.navIcon} />
    <Text style={styles.navLabel}>Profile</Text>
  </TouchableOpacity>
</View>


<TouchableOpacity
  style={styles.centerNavButton}
  onPress={() => console.log('Center Action')}
>
  <Image source={require('../assets/xurec.png')} style={styles.centerIcon} />
</TouchableOpacity>
      
      
      {renderFilterModal()}
    </SafeAreaView>
  );
};

export default HomePageScreen;