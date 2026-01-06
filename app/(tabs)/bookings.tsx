import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import { Calendar, MapPin, Clock, Users, ChevronRight } from 'lucide-react-native';

const bookings = [
  {
    id: '1',
    venueName: 'Elegant Garden Venue',
    location: 'Johannesburg, Gauteng',
    date: '2024-02-15',
    time: '18:00',
    guests: 120,
    status: 'confirmed',
    image: 'https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg?auto=compress&cs=tinysrgb&w=400',
    totalCost: 3200,
  },
  {
    id: '2',
    venueName: 'Modern Conference Center',
    location: 'Cape Town, Western Cape',
    date: '2024-02-20',
    time: '09:00',
    guests: 80,
    status: 'pending',
    image: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=400',
    totalCost: 2400,
  },
  {
    id: '3',
    venueName: 'Rooftop Event Space',
    location: 'Durban, KwaZulu-Natal',
    date: '2024-01-28',
    time: '19:00',
    guests: 60,
    status: 'completed',
    image: 'https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=400',
    totalCost: 2800,
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'confirmed':
      return '#449BE8';
    case 'pending':
      return '#FCBA14';
    case 'completed':
      return '#28A745';
    default:
      return '#666666';
  }
};

const getStatusText = (status: string) => {
  return status.charAt(0).toUpperCase() + status.slice(1);
};

export default function Bookings() {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {bookings.map((booking) => (
            <TouchableOpacity
              key={booking.id}
              style={styles.bookingCard}
              onPress={() => router.push(`/booking/${booking.id}`)}
            >
              <Image source={{ uri: booking.image }} style={styles.venueImage} />
              <View style={styles.bookingInfo}>
                <View style={styles.bookingHeader}>
                  <Text style={styles.venueName}>{booking.venueName}</Text>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(booking.status) }]}>
                    <Text style={styles.statusText}>{getStatusText(booking.status)}</Text>
                  </View>
                </View>
                
                <View style={styles.locationRow}>
                  <MapPin size={14} color="#666666" strokeWidth={2} />
                  <Text style={styles.locationText}>{booking.location}</Text>
                </View>
                
                <View style={styles.detailsRow}>
                  <View style={styles.detailItem}>
                    <Calendar size={14} color="#449BE8" strokeWidth={2} />
                    <Text style={styles.detailText}>{booking.date}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Clock size={14} color="#449BE8" strokeWidth={2} />
                    <Text style={styles.detailText}>{booking.time}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Users size={14} color="#449BE8" strokeWidth={2} />
                    <Text style={styles.detailText}>{booking.guests}</Text>
                  </View>
                </View>
                
                <View style={styles.bookingFooter}>
                  <Text style={styles.totalCost}>R{booking.totalCost.toLocaleString()}</Text>
                  <ChevronRight size={20} color="#CCCCCC" strokeWidth={2} />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    padding: 16,
  },
  bookingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  venueImage: {
    width: '100%',
    height: 120,
  },
  bookingInfo: {
    padding: 16,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  venueName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    flex: 1,
    marginRight: 12,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 6,
  },
  locationText: {
    fontSize: 14,
    color: '#666666',
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    fontSize: 14,
    color: '#333333',
    fontWeight: '500',
  },
  bookingFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalCost: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#449BE8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
  },
});