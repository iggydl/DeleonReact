import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const gridStyles = StyleSheet.create({
  gridContainer: {
    paddingHorizontal: 10,
    marginTop: 15,
    marginBottom: 20,
  },
  gridSectionTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    marginLeft: 5,
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  gridItem: {
    width: width / 2 - 15, 
    height: width / 2 + 30, 
    marginBottom: 15,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: 'rgba(20, 20, 20, 0.6)',
  },
  gridItemImage: {
    width: '100%',
    height: width / 2 - 15, 
    borderRadius: 8,
  },
  gridItemDetails: {
    padding: 8,
  },
  gridItemPrice: {
    color: '#E50914',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  gridItemTitle: {
    color: '#FFF',
    fontSize: 13,
    marginBottom: 2,
  },
  gridItemBrand: {
    color: '#AAA',
    fontSize: 12,
  },
  gridItemSeller: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  sellerAvatar: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#666',
    marginRight: 5,
  },
  sellerName: {
    color: '#999',
    fontSize: 11,
  }
});