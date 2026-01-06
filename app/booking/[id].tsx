import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Users,
  MapPin,
  Phone,
  Mail,
  Star,
  CheckCircle,
  AlertCircle,
  XCircle,
} from 'lucide-react-native';

const bookingDetails = {
  id: '1',
  venueName: 'Elegant Garden Venue',
  venueImage: 'https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg?auto=compress&cs=tinysrgb&w=800',
  location: 'Johannesburg, Gauteng',
  date: '2024-02-15',
  time: '18:00 - 23:00',
  guests: 120,
  status: 'confirmed',
  bookingRef: 'BU-2024-001',
  totalCost: 3200,
  venueOwner: {
    name: 'Sarah Johnson',
    phone: '+27 11 123 4567',
    email: 'sarah@elegantgarden.co.za',
    rating: 4.9,
  },
  services: [
    {
      name: 'Premium Catering Co.',
      type: 'Catering',
      cost: 450,
      contact: '+27 11 987 6543',
    },
    {
      name: 'Clean & Shine',
      type: 'Cleaning',
      cost: 200,
      contact: '+27 11 555 0123',
    },
  ],
  breakdown: {
    venueRental: 2500,
    services: 650,
    tax: 50,
    total: 3200,
  },
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'confirmed':
      return <CheckCircle size={24} color="#28A745" strokeWidth={2} />;
    case 'pending':
      return <AlertCircle size={24} color="#FCBA14" strokeWidth={2} />;
    case 'cancelled':
      return <XCircle size={24} color="#E53740" strokeWidth={2} />;
    default:
      return <CheckCircle size={24} color="#28A745" strokeWidth={2} />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'confirmed':
      return '#28A745';
    case 'pending':
      return '#FCBA14';
    case 'cancelled':
      return '#E53740';
    default:
      return '#28A745';
  }
};

export default function BookingDetail() {
  const { id } = useLocalSearchParams();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#333333" strokeWidth={2} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Booking Details</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={{ uri: bookingDetails.venueImage }} style={styles.venueImage} />

        <View style={styles.content}>
          {/* Status Section */}
          <View style={styles.statusSection}>
            <View style={styles.statusHeader}>
              {getStatusIcon(bookingDetails.status)}
              <View style={styles.statusInfo}>
                <Text style={[styles.statusText, { color: getStatusColor(bookingDetails.status) }]}>
                  {bookingDetails.status.toUpperCase()}
                </Text>
                <Text style={styles.bookingRef}>Ref: {bookingDetails.bookingRef}</Text>
              </View>
            </View>
          </View>

          {/* Venue Info */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Venue Details</Text>
            <Text style={styles.venueName}>{bookingDetails.venueName}</Text>
            <View style={styles.locationRow}>
              <MapPin size={16} color="#666666" strokeWidth={2} />
              <Text style={styles.locationText}>{bookingDetails.location}</Text>
            </View>
          </View>

          {/* Event Details */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Event Details</Text>
            <View style={styles.detailsGrid}>
              <View style={styles.detailItem}>
                <Calendar size={20} color="#449BE8" strokeWidth={2} />
                <Text style={styles.detailLabel}>Date</Text>
                <Text style={styles.detailValue}>{bookingDetails.date}</Text>
              </View>
              <View style={styles.detailItem}>
                <Clock size={20} color="#449BE8" strokeWidth={2} />
                <Text style={styles.detailLabel}>Time</Text>
                <Text style={styles.detailValue}>{bookingDetails.time}</Text>
              </View>
              <View style={styles.detailItem}>
                <Users size={20} color="#449BE8" strokeWidth={2} />
                <Text style={styles.detailLabel}>Guests</Text>
                <Text style={styles.detailValue}>{bookingDetails.guests}</Text>
              </View>
            </View>
          </View>

          {/* Venue Owner */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Venue Owner</Text>
            <View style={styles.ownerCard}>
              <View style={styles.ownerInfo}>
                <Text style={styles.ownerName}>{bookingDetails.venueOwner.name}</Text>
                <View style={styles.ratingRow}>
                  <Star size={16} color="#FCBA14" fill="#FCBA14" strokeWidth={0} />
                  <Text style={styles.ratingText}>{bookingDetails.venueOwner.rating}</Text>
                </View>
              </View>
              <View style={styles.contactButtons}>
                <TouchableOpacity style={styles.contactButton}>
                  <Phone size={18} color="#449BE8" strokeWidth={2} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.contactButton}>
                  <Mail size={18} color="#449BE8" strokeWidth={2} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Services */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Additional Services</Text>
            {bookingDetails.services.map((service, index) => (
              <View key={index} style={styles.serviceItem}>
                <View style={styles.serviceInfo}>
                  <Text style={styles.serviceName}>{service.name}</Text>
                  <Text style={styles.serviceType}>{service.type}</Text>
                </View>
                <Text style={styles.serviceCost}>R{service.cost}</Text>
              </View>
            ))}
          </View>

          {/* Cost Breakdown */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Cost Breakdown</Text>
            <View style={styles.costBreakdown}>
              <View style={styles.costItem}>
                <Text style={styles.costLabel}>Venue Rental</Text>
                <Text style={styles.costValue}>R{bookingDetails.breakdown.venueRental.toLocaleString()}</Text>
              </View>
              <View style={styles.costItem}>
                <Text style={styles.costLabel}>Additional Services</Text>
                <Text style={styles.costValue}>R{bookingDetails.breakdown.services.toLocaleString()}</Text>
              </View>
              <View style={styles.costItem}>
                <Text style={styles.costLabel}>Tax & Fees</Text>
                <Text style={styles.costValue}>R{bookingDetails.breakdown.tax.toLocaleString()}</Text>
              </View>
              <View style={[styles.costItem, styles.totalCostItem]}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>R{bookingDetails.breakdown.total.toLocaleString()}</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
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
  venueImage: {
    width: '100%',
    height: 200,
  },
  content: {
    padding: 20,
  },
  statusSection: {
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  statusInfo: {
    flex: 1,
  },
  statusText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  bookingRef: {
    fontSize: 14,
    color: '#666666',
    marginTop: 2,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 12,
  },
  venueName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0850AE',
    marginBottom: 8,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  locationText: {
    fontSize: 16,
    color: '#666666',
  },
  detailsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailItem: {
    alignItems: 'center',
    flex: 1,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666666',
    marginTop: 8,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  ownerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 12,
  },
  ownerInfo: {
    flex: 1,
  },
  ownerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
  },
  contactButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  contactButton: {
    backgroundColor: '#FFFFFF',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  serviceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 2,
  },
  serviceType: {
    fontSize: 14,
    color: '#449BE8',
  },
  serviceCost: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  costBreakdown: {
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 12,
  },
  costItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  costLabel: {
    fontSize: 16,
    color: '#666666',
  },
  costValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  totalCostItem: {
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    marginTop: 8,
    paddingTop: 16,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#449BE8',
  },
});