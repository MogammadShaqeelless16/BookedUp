import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import {
  ArrowLeft,
  Search,
  MapPin,
  Users,
  DollarSign,
  Calendar,
  Star,
  Heart,
  SlidersHorizontal,
} from 'lucide-react-native';

const locationOptions = ['Johannesburg', 'Cape Town', 'Durban', 'Pretoria', 'Port Elizabeth'];
const capacityRanges = ['1-50', '51-100', '101-200', '201-500', '500+'];
const priceRanges = ['R0-R1000', 'R1001-R2500', 'R2501-R5000', 'R5001-R10000', 'R10000+'];
const venueTypes = ['Wedding Venue', 'Conference Hall', 'Party Venue', 'Co-working Space', 'Restaurant'];

const searchResults = [
  {
    id: '1',
    name: 'Elegant Garden Venue',
    location: 'Johannesburg',
    price: 'R2,500',
    rating: 4.8,
    reviews: 124,
    image: 'https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg?auto=compress&cs=tinysrgb&w=400',
    capacity: '150 guests',
    type: 'Wedding Venue',
  },
  {
    id: '2',
    name: 'Modern Conference Center',
    location: 'Cape Town',
    price: 'R1,800',
    rating: 4.6,
    reviews: 89,
    image: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=400',
    capacity: '200 guests',
    type: 'Conference Hall',
  },
  {
    id: '3',
    name: 'Rooftop Event Space',
    location: 'Durban',
    price: 'R3,200',
    rating: 4.9,
    reviews: 156,
    image: 'https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=400',
    capacity: '100 guests',
    type: 'Party Venue',
  },
];

export default function AdvancedSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedCapacity, setSelectedCapacity] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (venueId: string) => {
    setFavorites(prev => 
      prev.includes(venueId) 
        ? prev.filter(id => id !== venueId)
        : [...prev, venueId]
    );
  };

  const clearFilters = () => {
    setSelectedLocation('');
    setSelectedCapacity('');
    setSelectedPrice('');
    setSelectedType('');
  };

  const renderVenue = ({ item }: { item: typeof searchResults[0] }) => (
    <TouchableOpacity
      style={styles.venueCard}
      onPress={() => router.push(`/venue/${item.id}`)}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.venueImage} />
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => toggleFavorite(item.id)}
        >
          <Heart
            size={20}
            color={favorites.includes(item.id) ? '#E53740' : '#FFFFFF'}
            fill={favorites.includes(item.id) ? '#E53740' : 'transparent'}
            strokeWidth={2}
          />
        </TouchableOpacity>
        <View style={styles.typeBadge}>
          <Text style={styles.typeText}>{item.type}</Text>
        </View>
      </View>
      <View style={styles.venueInfo}>
        <Text style={styles.venueName}>{item.name}</Text>
        <View style={styles.locationRow}>
          <MapPin size={14} color="#666666" strokeWidth={2} />
          <Text style={styles.locationText}>{item.location}</Text>
        </View>
        <View style={styles.detailsRow}>
          <View style={styles.ratingContainer}>
            <Star size={14} color="#FCBA14" fill="#FCBA14" strokeWidth={0} />
            <Text style={styles.ratingText}>{item.rating}</Text>
            <Text style={styles.reviewsText}>({item.reviews})</Text>
          </View>
          <Text style={styles.capacityText}>{item.capacity}</Text>
        </View>
        <Text style={styles.priceText}>{item.price} per day</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#333333" strokeWidth={2} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Advanced Search</Text>
        <TouchableOpacity onPress={() => setShowFilters(!showFilters)}>
          <SlidersHorizontal size={24} color="#449BE8" strokeWidth={2} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#666666" strokeWidth={2} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search venues, locations..."
            placeholderTextColor="#999999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {showFilters && (
        <View style={styles.filtersContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.filtersRow}>
              {/* Location Filter */}
              <View style={styles.filterGroup}>
                <Text style={styles.filterLabel}>Location</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View style={styles.filterOptions}>
                    {locationOptions.map((location) => (
                      <TouchableOpacity
                        key={location}
                        style={[
                          styles.filterOption,
                          selectedLocation === location && styles.filterOptionSelected
                        ]}
                        onPress={() => setSelectedLocation(selectedLocation === location ? '' : location)}
                      >
                        <Text style={[
                          styles.filterOptionText,
                          selectedLocation === location && styles.filterOptionTextSelected
                        ]}>
                          {location}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </ScrollView>
              </View>

              {/* Capacity Filter */}
              <View style={styles.filterGroup}>
                <Text style={styles.filterLabel}>Capacity</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View style={styles.filterOptions}>
                    {capacityRanges.map((capacity) => (
                      <TouchableOpacity
                        key={capacity}
                        style={[
                          styles.filterOption,
                          selectedCapacity === capacity && styles.filterOptionSelected
                        ]}
                        onPress={() => setSelectedCapacity(selectedCapacity === capacity ? '' : capacity)}
                      >
                        <Text style={[
                          styles.filterOptionText,
                          selectedCapacity === capacity && styles.filterOptionTextSelected
                        ]}>
                          {capacity}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </ScrollView>
              </View>

              {/* Price Filter */}
              <View style={styles.filterGroup}>
                <Text style={styles.filterLabel}>Price Range</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View style={styles.filterOptions}>
                    {priceRanges.map((price) => (
                      <TouchableOpacity
                        key={price}
                        style={[
                          styles.filterOption,
                          selectedPrice === price && styles.filterOptionSelected
                        ]}
                        onPress={() => setSelectedPrice(selectedPrice === price ? '' : price)}
                      >
                        <Text style={[
                          styles.filterOptionText,
                          selectedPrice === price && styles.filterOptionTextSelected
                        ]}>
                          {price}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </ScrollView>
              </View>

              {/* Type Filter */}
              <View style={styles.filterGroup}>
                <Text style={styles.filterLabel}>Venue Type</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View style={styles.filterOptions}>
                    {venueTypes.map((type) => (
                      <TouchableOpacity
                        key={type}
                        style={[
                          styles.filterOption,
                          selectedType === type && styles.filterOptionSelected
                        ]}
                        onPress={() => setSelectedType(selectedType === type ? '' : type)}
                      >
                        <Text style={[
                          styles.filterOptionText,
                          selectedType === type && styles.filterOptionTextSelected
                        ]}>
                          {type}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </ScrollView>
              </View>
            </View>
          </ScrollView>

          <View style={styles.filterActions}>
            <TouchableOpacity style={styles.clearButton} onPress={clearFilters}>
              <Text style={styles.clearButtonText}>Clear All</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.applyButton}>
              <Text style={styles.applyButtonText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <View style={styles.resultsHeader}>
        <Text style={styles.resultsCount}>{searchResults.length} venues found</Text>
      </View>

      <FlatList
        data={searchResults}
        renderItem={renderVenue}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.resultsList}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
  },
  filtersContainer: {
    backgroundColor: '#F8F9FA',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  filtersRow: {
    paddingHorizontal: 20,
  },
  filterGroup: {
    marginBottom: 16,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },
  filterOptions: {
    flexDirection: 'row',
    gap: 8,
  },
  filterOption: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  filterOptionSelected: {
    backgroundColor: '#449BE8',
    borderColor: '#449BE8',
  },
  filterOptionText: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
  filterOptionTextSelected: {
    color: '#FFFFFF',
  },
  filterActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 16,
    gap: 12,
  },
  clearButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  clearButtonText: {
    color: '#666666',
    fontSize: 14,
    fontWeight: '600',
  },
  applyButton: {
    flex: 1,
    backgroundColor: '#449BE8',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  resultsHeader: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  resultsCount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  resultsList: {
    padding: 16,
  },
  venueCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  imageContainer: {
    position: 'relative',
  },
  venueImage: {
    width: '100%',
    height: 180,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  typeBadge: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    backgroundColor: '#449BE8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  typeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  venueInfo: {
    padding: 16,
  },
  venueName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 4,
  },
  locationText: {
    fontSize: 14,
    color: '#666666',
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
  },
  reviewsText: {
    fontSize: 14,
    color: '#666666',
  },
  capacityText: {
    fontSize: 14,
    color: '#666666',
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#449BE8',
  },
});