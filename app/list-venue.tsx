import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import {
  ArrowLeft,
  Camera,
  MapPin,
  Users,
  DollarSign,
  Wifi,
  Car,
  Coffee,
  Music,
  Utensils,
  Shield,
} from 'lucide-react-native';

const amenityOptions = [
  { id: 'wifi', icon: Wifi, name: 'Free Wi-Fi' },
  { id: 'parking', icon: Car, name: 'Parking Available' },
  { id: 'catering', icon: Utensils, name: 'Catering Kitchen' },
  { id: 'sound', icon: Music, name: 'Sound System' },
  { id: 'coffee', icon: Coffee, name: 'Coffee Station' },
  { id: 'security', icon: Shield, name: '24/7 Security' },
];

export default function ListVenue() {
  const [formData, setFormData] = useState({
    venueName: '',
    description: '',
    location: '',
    capacity: '',
    pricePerDay: '',
    contactName: '',
    contactPhone: '',
    contactEmail: '',
  });
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleAmenity = (amenityId: string) => {
    setSelectedAmenities(prev =>
      prev.includes(amenityId)
        ? prev.filter(id => id !== amenityId)
        : [...prev, amenityId]
    );
  };

  const handleSubmit = () => {
    if (!formData.venueName || !formData.location || !formData.capacity || !formData.pricePerDay) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    Alert.alert(
      'Success!',
      'Your venue listing has been submitted for review. We will contact you within 24 hours.',
      [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#333333" strokeWidth={2} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>List Your Venue</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.subtitle}>
            Share your space with event organizers and earn extra income
          </Text>

          {/* Basic Information */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Basic Information</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Venue Name *</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter venue name"
                value={formData.venueName}
                onChangeText={(value) => handleInputChange('venueName', value)}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Describe your venue, its features, and what makes it special"
                multiline
                numberOfLines={4}
                value={formData.description}
                onChangeText={(value) => handleInputChange('description', value)}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Location *</Text>
              <View style={styles.inputWithIcon}>
                <MapPin size={20} color="#666666" strokeWidth={2} />
                <TextInput
                  style={styles.inputWithIconText}
                  placeholder="City, Province"
                  value={formData.location}
                  onChangeText={(value) => handleInputChange('location', value)}
                />
              </View>
            </View>

            <View style={styles.row}>
              <View style={[styles.inputGroup, { flex: 1, marginRight: 12 }]}>
                <Text style={styles.label}>Capacity *</Text>
                <View style={styles.inputWithIcon}>
                  <Users size={20} color="#666666" strokeWidth={2} />
                  <TextInput
                    style={styles.inputWithIconText}
                    placeholder="Max guests"
                    keyboardType="numeric"
                    value={formData.capacity}
                    onChangeText={(value) => handleInputChange('capacity', value)}
                  />
                </View>
              </View>

              <View style={[styles.inputGroup, { flex: 1, marginLeft: 12 }]}>
                <Text style={styles.label}>Price per Day *</Text>
                <View style={styles.inputWithIcon}>
                  <DollarSign size={20} color="#666666" strokeWidth={2} />
                  <TextInput
                    style={styles.inputWithIconText}
                    placeholder="Amount in Rand"
                    keyboardType="numeric"
                    value={formData.pricePerDay}
                    onChangeText={(value) => handleInputChange('pricePerDay', value)}
                  />
                </View>
              </View>
            </View>
          </View>

          {/* Photos */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Photos</Text>
            <TouchableOpacity style={styles.photoUpload}>
              <Camera size={32} color="#449BE8" strokeWidth={2} />
              <Text style={styles.photoUploadText}>Add Photos</Text>
              <Text style={styles.photoUploadSubtext}>Upload up to 10 photos of your venue</Text>
            </TouchableOpacity>
          </View>

          {/* Amenities */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Amenities</Text>
            <View style={styles.amenitiesGrid}>
              {amenityOptions.map((amenity) => {
                const IconComponent = amenity.icon;
                const isSelected = selectedAmenities.includes(amenity.id);
                
                return (
                  <TouchableOpacity
                    key={amenity.id}
                    style={[
                      styles.amenityCard,
                      isSelected && styles.amenityCardSelected
                    ]}
                    onPress={() => toggleAmenity(amenity.id)}
                  >
                    <IconComponent
                      size={24}
                      color={isSelected ? '#FFFFFF' : '#449BE8'}
                      strokeWidth={2}
                    />
                    <Text style={[
                      styles.amenityText,
                      isSelected && styles.amenityTextSelected
                    ]}>
                      {amenity.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Contact Information */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contact Information</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Contact Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Your full name"
                value={formData.contactName}
                onChangeText={(value) => handleInputChange('contactName', value)}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Phone Number</Text>
              <TextInput
                style={styles.input}
                placeholder="+27 XX XXX XXXX"
                keyboardType="phone-pad"
                value={formData.contactPhone}
                onChangeText={(value) => handleInputChange('contactPhone', value)}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                style={styles.input}
                placeholder="your.email@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
                value={formData.contactEmail}
                onChangeText={(value) => handleInputChange('contactEmail', value)}
              />
            </View>
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit Venue Listing</Text>
          </TouchableOpacity>
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
  content: {
    padding: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0850AE',
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: '#333333',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
  },
  inputWithIconText: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  photoUpload: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    paddingVertical: 40,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
  },
  photoUploadText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#449BE8',
    marginTop: 12,
  },
  photoUploadSubtext: {
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  amenityCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 12,
    alignItems: 'center',
    minWidth: '30%',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  amenityCardSelected: {
    backgroundColor: '#449BE8',
    borderColor: '#449BE8',
  },
  amenityText: {
    fontSize: 12,
    color: '#333333',
    textAlign: 'center',
    marginTop: 8,
    fontWeight: '500',
  },
  amenityTextSelected: {
    color: '#FFFFFF',
  },
  submitButton: {
    backgroundColor: '#449BE8',
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});