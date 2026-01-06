import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import {
  ArrowLeft,
  Heart,
  Share,
  Star,
  MapPin,
  Users,
  Wifi,
  Car,
  Calendar,
  Clock,
} from 'lucide-react-native';
import BookingModal from '@/components/BookingModal';

const { width } = Dimensions.get('window');

const venueData = {
  id: '1',
  name: 'Elegant Garden Venue',
  location: 'Johannesburg, Gauteng',
  price: 2500,
  rating: 4.8,
  reviews: 124,
  capacity: 150,
  description: 'A beautiful garden venue perfect for weddings, corporate events, and special celebrations. Features stunning landscapes, modern facilities, and professional service.',
  images: [
    'https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1024248/pexels-photo-1024248.jpeg?auto=compress&cs=tinysrgb&w=800',
  ],
  amenities: [
    { icon: Wifi, name: 'Free Wi-Fi' },
    { icon: Car, name: 'Parking' },
    { icon: Users, name: 'Catering Available' },
  ],
  availability: {
    nextAvailable: '2024-02-15',
    timeSlots: ['09:00', '14:00', '18:00'],
  },
};

export default function VenueDetail() {
  const { id } = useLocalSearchParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);

  const handleBook = () => {
    setShowBookingModal(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerButton} onPress={() => router.back()}>
            <ArrowLeft size={24} color="#333333" strokeWidth={2} />
          </TouchableOpacity>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.headerButton}>
              <Share size={24} color="#333333" strokeWidth={2} />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.headerButton} 
              onPress={() => setIsFavorite(!isFavorite)}
            >
              <Heart
                size={24}
                color={isFavorite ? '#E53740' : '#333333'}
                fill={isFavorite ? '#E53740' : 'transparent'}
                strokeWidth={2}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Images */}
        <ScrollView 
          horizontal 
          pagingEnabled 
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(e) => {
            const index = Math.round(e.nativeEvent.contentOffset.x / width);
            setCurrentImageIndex(index);
          }}
        >
          {venueData.images.map((image, index) => (
            <Image key={index} source={{ uri: image }} style={styles.image} />
          ))}
        </ScrollView>

        {/* Image indicators */}
        <View style={styles.imageIndicators}>
          {venueData.images.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                { backgroundColor: index === currentImageIndex ? '#449BE8' : '#CCCCCC' },
              ]}
            />
          ))}
        </View>

        <View style={styles.content}>
          {/* Basic Info */}
          <View style={styles.basicInfo}>
            <Text style={styles.venueName}>{venueData.name}</Text>
            <View style={styles.locationRow}>
              <MapPin size={16} color="#666666" strokeWidth={2} />
              <Text style={styles.locationText}>{venueData.location}</Text>
            </View>
            <View style={styles.statsRow}>
              <View style={styles.ratingContainer}>
                <Star size={16} color="#FCBA14" fill="#FCBA14" strokeWidth={0} />
                <Text style={styles.ratingText}>{venueData.rating}</Text>
                <Text style={styles.reviewsText}>({venueData.reviews} reviews)</Text>
              </View>
              <View style={styles.capacityContainer}>
                <Users size={16} color="#666666" strokeWidth={2} />
                <Text style={styles.capacityText}>Up to {venueData.capacity} guests</Text>
              </View>
            </View>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About this venue</Text>
            <Text style={styles.description}>{venueData.description}</Text>
          </View>

          {/* Amenities */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Amenities</Text>
            <View style={styles.amenitiesGrid}>
              {venueData.amenities.map((amenity, index) => {
                const IconComponent = amenity.icon;
                return (
                  <View key={index} style={styles.amenityItem}>
                    <IconComponent size={20} color="#449BE8" strokeWidth={2} />
                    <Text style={styles.amenityText}>{amenity.name}</Text>
                  </View>
                );
              })}
            </View>
          </View>

          {/* Availability */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Availability</Text>
            <View style={styles.availabilityContainer}>
              <View style={styles.availabilityItem}>
                <Calendar size={20} color="#449BE8" strokeWidth={2} />
                <Text style={styles.availabilityText}>
                  Next available: {venueData.availability.nextAvailable}
                </Text>
              </View>
              <View style={styles.timeSlots}>
                {venueData.availability.timeSlots.map((time, index) => (
                  <View key={index} style={styles.timeSlot}>
                    <Clock size={16} color="#666666" strokeWidth={2} />
                    <Text style={styles.timeText}>{time}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom booking bar */}
      <View style={styles.bottomBar}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>R{venueData.price.toLocaleString()}</Text>
          <Text style={styles.priceUnit}>per day</Text>
        </View>
        <TouchableOpacity style={styles.bookButton} onPress={handleBook}>
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>
      </View>

      {/* Booking Modal */}
      <BookingModal
        visible={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        venue={venueData}
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
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    zIndex: 1000,
  },
  headerButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  image: {
    width,
    height: 300,
  },
  imageIndicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  basicInfo: {
    marginBottom: 24,
  },
  venueName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 6,
  },
  locationText: {
    fontSize: 16,
    color: '#666666',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  reviewsText: {
    fontSize: 16,
    color: '#666666',
  },
  capacityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  capacityText: {
    fontSize: 16,
    color: '#666666',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#666666',
    lineHeight: 24,
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  amenityText: {
    fontSize: 14,
    color: '#333333',
    fontWeight: '500',
  },
  availabilityContainer: {
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 12,
  },
  availabilityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  availabilityText: {
    fontSize: 16,
    color: '#333333',
    fontWeight: '500',
  },
  timeSlots: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  timeSlot: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
  },
  timeText: {
    fontSize: 14,
    color: '#666666',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  priceText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#449BE8',
  },
  priceUnit: {
    fontSize: 16,
    color: '#666666',
  },
  bookButton: {
    backgroundColor: '#449BE8',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});