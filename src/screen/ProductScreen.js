import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { styles } from '../styles/ProductScreenS';
import axios from 'axios';

const ProductScreen = ({ route, navigation }) => {
  const { item, product } = route.params || {};
  const productData = item || product;
  
  const [expandedSections, setExpandedSections] = useState({
    specification: false,
    provenance: false,
    description: false,
  });
  const [itemDetails, setItemDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_ENDPOINT =
    'https://pk9blqxffi.execute-api.us-east-1.amazonaws.com/xdeal/XchangeDetails';
  const API_TOKEN =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJuYmYiOjE3NDYxOTI1MTQsImV4cCI6MTc0ODc4NDUxNCwiaXNzIjoiWHVyMzRQMSIsImF1ZCI6Ilh1cjQ0UFAifQ.QD-fcLXtznCfkTIYkbOQfc5fXfxYgw_mOziKWpUHddk';

  useEffect(() => {
    if (productData) {
      fetchItemDetails();
    } else {
      setError('No product data available');
      setIsLoading(false);
    }
  }, []);

  const fetchItemDetails = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const params = {
        current_owner_code: productData.lister_code || "MC-1000000000",
        current_owner_type: productData.lister_type || "Xpert",
        item_id: Number(productData.item_id || productData.listing_id || 1),
        listing_id: Number(productData.listing_id || 1),
        token: API_TOKEN,
        user_type: "Xpert",
        version_number: "2.2.6"
      };

      console.log('Sending parameters to API:', JSON.stringify(params, null, 2));

      const response = await axios.post(API_ENDPOINT, params);

      if (response.status === 200) {
        if (response.data) {
          console.log('Item Details Response:', JSON.stringify(response.data, null, 2));
          setItemDetails(response.data);
        } else {
          setError('Invalid response format from server');
        }
      } else {
        setError('Failed to fetch item details');
      }
    } catch (err) {
      setError(err.message || 'An error occurred while fetching item details');
      console.error('API error:', err);

      const mockItemDetails = {
        item_details: [{
          brand: productData.brand || 'Unknown Brand',
          model: productData.model || productData.name || 'Unknown Model',
          currency: productData.currency || 'USD',
          selling_price: productData.selling_price || 0
        }],
        lister_details: {
          username: productData.lister_name || 'Unknown Seller',
          xpert_code: `AC-${productData.listing_id || '0000000000'}`,
          city: 'Unknown City',
          state: 'Unknown State',
          date_created: new Date().toISOString(),
          image_link: productData.lister_image || 'https://randomuser.me/api/portraits/women/44.jpg'
        },
        item_images: [{
          image_link: productData.item_image || 'https://picsum.photos/300/300'
        }],
        specification: [
          { label: 'Category', value: productData.category || 'Unknown' },
          { label: 'Brand', value: productData.brand || 'Unknown' },
          { label: 'Model', value: productData.model || productData.name || 'Unknown' },
          { label: 'Price', value: `${productData.currency || 'USD'} ${(productData.selling_price || 0).toLocaleString()}` }
        ],
        description: [{
          description: `This is a ${productData.category || 'collectible'} item from ${productData.brand || 'unknown brand'}. Listed by ${productData.lister_name || 'seller'}.`,
          description_by: productData.lister_name || 'Seller'
        }],
        provenance: [
          {
            date_created: new Date().toISOString(),
            created_by_name: productData.lister_name || 'Unknown',
            provenance_type: 'Registration'
          },
          {
            date_created: new Date().toISOString(),
            created_by_name: productData.lister_name || 'Unknown',
            provenance_type: 'Listed',
            control_number: `L-${productData.listing_id || '1000001685'}`
          }
        ]
      };
      
      setItemDetails(mockItemDetails);
      setError(null); 
  
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSection = section => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  if (!productData) {
    return (
      <View style={[styles.container, styles.errorContainer]}>
        <Text style={styles.errorText}>No product data available</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => navigation.goBack()}>
          <Text style={styles.retryButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#6200ee" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.errorContainer]}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchItemDetails}>
          <Text style={styles.retryButtonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../assets/back.png')}
              style={styles.backButtonImage}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Item Details</Text>
          <View style={{ width: 30 }} />
        </View>

        <Image
          source={{
            uri: itemDetails?.item_images?.[0]?.image_link ||
              productData.item_image ||
              'https://picsum.photos/300/300',
          }}
          style={styles.productImage}
          resizeMode="contain"
        />

        <View style={styles.productInfoContainer}>
          <Text style={styles.brandText}>
            {itemDetails?.item_details?.[0]?.brand || productData.brand || 'No Brand'}
          </Text>
          <Text style={styles.modelText}>
            {itemDetails?.item_details?.[0]?.model || productData.model || 'No Model'}
          </Text>
          <Text style={styles.priceText}>
            {itemDetails?.item_details?.[0]?.currency || productData.currency || 'HKD'}{' '}
            {(itemDetails?.item_details?.[0]?.selling_price || productData.selling_price || 0).toLocaleString()}
          </Text>

          <View style={styles.sellerContainer}>
            <Image
              source={{
                uri: itemDetails?.lister_details?.image_link ||
                  productData.lister_image ||
                  'https://randomuser.me/api/portraits/women/44.jpg',
              }}
              style={styles.sellerImage}
            />
            <View style={styles.sellerInfo}>
              <Text style={styles.sellerName}>
                {itemDetails?.lister_details?.username || productData.lister_name || 'Unknown seller'}
              </Text>
              <Text style={styles.sellerId}>
                {itemDetails?.lister_details?.xpert_code || 
                `AC-${productData.lister_id || productData.listing_id || '0000000000'}`}
              </Text>
              <Text style={styles.sellerLocation}>
                {itemDetails?.lister_details?.city && itemDetails?.lister_details?.state ?
                  `${itemDetails.lister_details.city}, ${itemDetails.lister_details.state}` :
                  productData.lister_location || 'Location not specified'}
              </Text>
              <Text style={styles.sellerJoined}>
                Joined: {itemDetails?.lister_details?.date_created ?
                  new Date(itemDetails.lister_details.date_created).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                  }) :
                  'January 2025'}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <TouchableOpacity
            style={styles.sectionHeader}
            onPress={() => toggleSection('specification')}>
            <Text style={styles.sectionTitle}>Specification</Text>
            <Text style={styles.dropdownIcon}>
              {expandedSections.specification ? '∧' : '∨'}
            </Text>
          </TouchableOpacity>

          {expandedSections.specification && (
            <View style={styles.sectionContent}>
              {itemDetails?.specification?.map((spec, index) => (
                <View key={index} style={styles.detailRow}>
                  <Text style={styles.detailLabel}>{spec.label}</Text>
                  <Text style={styles.detailValue}>{spec.value}</Text>
                </View>
              ))}
              <View style={styles.specificationFooter}>
                <Text style={styles.watermarkText}>
                  {productData.lister_name || 'mantra'}
                </Text>
              </View>
            </View>
          )}
        </View>

        <View style={styles.sectionContainer}>
          <TouchableOpacity
            style={styles.sectionHeader}
            onPress={() => toggleSection('description')}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.dropdownIcon}>
              {expandedSections.description ? '∧' : '∨'}
            </Text>
          </TouchableOpacity>
          {expandedSections.description && (
            <View style={styles.sectionContent}>
              {itemDetails?.description && itemDetails.description.length > 0 ? (
                Array.from(new Set(itemDetails.description.map(item => item.description)))
                  .map((uniqueDesc, index) => {
                    const descItem = itemDetails.description.find(d => d.description === uniqueDesc);
                    return (
                      <View key={index} style={styles.descriptionItem}>
                        <Text style={styles.descriptionText}>{uniqueDesc}</Text>
                        {descItem && descItem.description_by && (
                          <Text style={styles.descriptionBy}>
                            - {descItem.description_by}
                          </Text>
                        )}
                      </View>
                    );
                  })
              ) : (
                <Text style={styles.descriptionText}>
                  No description available for this item.
                </Text>
              )}
            </View>
          )}
        </View>

        <View style={styles.sectionContainer}>
          <TouchableOpacity
            style={styles.sectionHeader}
            onPress={() => toggleSection('provenance')}>
            <Text style={styles.sectionTitle}>Provenance</Text>
            <Text style={styles.dropdownIcon}>
              {expandedSections.provenance ? '∧' : '∨'}
            </Text>
          </TouchableOpacity>

          {expandedSections.provenance && (
            <View style={styles.sectionContent}>
              <View style={styles.provenanceItem}>
                <Text style={styles.provenanceSubtitle}>Registration</Text>
                <View style={styles.detailRow}>
                  <Text style={styles.provenanceLabel}>Date</Text>
                  <Text style={styles.provenanceValue}>
                    {itemDetails?.provenance?.[0]?.date_created ?
                      new Date(itemDetails.provenance[0].date_created).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      }) :
                      'May 02, 2025'}
                  </Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.provenanceLabel}>Registered by</Text>
                  <Text style={styles.provenanceValue}>
                    {itemDetails?.provenance?.[0]?.created_by_name || 'Unknown'}
                  </Text>
                </View>
              </View>

              <View style={styles.provenanceItem}>
                <Text style={styles.provenanceSubtitle}>Certification</Text>
                <View style={styles.detailRow}>
                  <Text style={styles.provenanceLabel}>Date</Text>
                  <Text style={styles.provenanceValue}>
                    {itemDetails?.provenance?.[1]?.date_created ?
                      new Date(itemDetails.provenance[1].date_created).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      }) :
                      'May 02, 2025'}
                  </Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.provenanceLabel}>Type</Text>
                  <Text style={styles.provenanceValue}>
                    {itemDetails?.provenance?.[1]?.provenance_type || 'Listed'}
                  </Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.provenanceLabel}>Certified by</Text>
                  <Text style={styles.provenanceValue}>
                    {itemDetails?.provenance?.[1]?.created_by_name || 'Unknown'}
                  </Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.provenanceLabel}>Control Number</Text>
                  <Text style={styles.provenanceValue}>
                    {itemDetails?.provenance?.[1]?.control_number || `L-${productData.listing_id || '1000001685'}`}
                  </Text>
                </View>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default ProductScreen;