import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import {
  ArrowLeft,
  User,
  Phone,
  Mail,
  MapPin,
  Briefcase,
  DollarSign,
  FileText,
  ChefHat,
  Music,
  Camera,
  Sparkles,
  Truck,
  Scissors,
} from 'lucide-react-native';

const serviceCategories = [
  { id: 'catering', icon: ChefHat, name: 'Catering Services' },
  { id: 'photography', icon: Camera, name: 'Photography & Videography' },
  { id: 'music', icon: Music, name: 'DJ & Entertainment' },
  { id: 'decoration', icon: Sparkles, name: 'Event Decoration' },
  { id: 'transport', icon: Truck, name: 'Transportation' },
  { id: 'beauty', icon: Scissors, name: 'Beauty & Styling' },
];

export default function BecomeVendor() {
  const [formData, setFormData] = useState({
    businessName: '',
    contactName: '',
    phone: '',
    email: '',
    location: '',
    description: '',
    experience: '',
    pricing: '',
    portfolio: '',
  });
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleSubmit = () => {
    if (!formData.businessName || !formData.contactName || !formData.phone || !formData.email || selectedCategories.length === 0) {
      Alert.alert('Error', 'Please fill in all required fields and select at least one service category');
      return;
    }

    Alert.alert(
      'Application Submitted!',
      'Thank you for your interest in becoming a vendor. We will review your application and contact you within 2-3 business days.',
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
        <Text style={styles.headerTitle}>Become a Vendor</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.subtitle}>
            Join our network of trusted service providers and grow your business
          </Text>

          {/* Business Information */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Business Information</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Business Name *</Text>
              <View style={styles.inputWithIcon}>
                <Briefcase size={20} color="#666666" strokeWidth={2} />
                <TextInput
                  style={styles.inputWithIconText}
                  placeholder="Your business or company name"
                  value={formData.businessName}
                  onChangeText={(value) => handleInputChange('businessName', value)}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Contact Person *</Text>
              <View style={styles.inputWithIcon}>
                <User size={20} color="#666666" strokeWidth={2} />
                <TextInput
                  style={styles.inputWithIconText}
                  placeholder="Your full name"
                  value={formData.contactName}
                  onChangeText={(value) => handleInputChange('contactName', value)}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Phone Number *</Text>
              <View style={styles.inputWithIcon}>
                <Phone size={20} color="#666666" strokeWidth={2} />
                <TextInput
                  style={styles.inputWithIconText}
                  placeholder="+27 XX XXX XXXX"
                  keyboardType="phone-pad"
                  value={formData.phone}
                  onChangeText={(value) => handleInputChange('phone', value)}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email Address *</Text>
              <View style={styles.inputWithIcon}>
                <Mail size={20} color="#666666" strokeWidth={2} />
                <TextInput
                  style={styles.inputWithIconText}
                  placeholder="business@example.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={formData.email}
                  onChangeText={(value) => handleInputChange('email', value)}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Service Area</Text>
              <View style={styles.inputWithIcon}>
                <MapPin size={20} color="#666666" strokeWidth={2} />
                <TextInput
                  style={styles.inputWithIconText}
                  placeholder="Cities/regions you serve"
                  value={formData.location}
                  onChangeText={(value) => handleInputChange('location', value)}
                />
              </View>
            </View>
          </View>

          {/* Service Categories */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Service Categories *</Text>
            <Text style={styles.sectionSubtitle}>Select all services you provide</Text>
            
            <View style={styles.categoriesGrid}>
              {serviceCategories.map((category) => {
                const IconComponent = category.icon;
                const isSelected = selectedCategories.includes(category.id);
                
                return (
                  <TouchableOpacity
                    key={category.id}
                    style={[
                      styles.categoryCard,
                      isSelected && styles.categoryCardSelected
                    ]}
                    onPress={() => toggleCategory(category.id)}
                  >
                    <IconComponent
                      size={28}
                      color={isSelected ? '#FFFFFF' : '#449BE8'}
                      strokeWidth={2}
                    />
                    <Text style={[
                      styles.categoryText,
                      isSelected && styles.categoryTextSelected
                    ]}>
                      {category.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Business Details */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Business Details</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Business Description</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Describe your services, specialties, and what makes your business unique"
                multiline
                numberOfLines={4}
                value={formData.description}
                onChangeText={(value) => handleInputChange('description', value)}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Years of Experience</Text>
              <TextInput
                style={styles.input}
                placeholder="How long have you been in business?"
                value={formData.experience}
                onChangeText={(value) => handleInputChange('experience', value)}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Pricing Information</Text>
              <View style={styles.inputWithIcon}>
                <DollarSign size={20} color="#666666" strokeWidth={2} />
                <TextInput
                  style={styles.inputWithIconText}
                  placeholder="Starting prices or price ranges"
                  value={formData.pricing}
                  onChangeText={(value) => handleInputChange('pricing', value)}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Portfolio/Website</Text>
              <View style={styles.inputWithIcon}>
                <FileText size={20} color="#666666" strokeWidth={2} />
                <TextInput
                  style={styles.inputWithIconText}
                  placeholder="Website URL or portfolio link"
                  autoCapitalize="none"
                  value={formData.portfolio}
                  onChangeText={(value) => handleInputChange('portfolio', value)}
                />
              </View>
            </View>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>What happens next?</Text>
            <Text style={styles.infoText}>
              • We'll review your application within 2-3 business days{'\n'}
              • Our team may contact you for additional information{'\n'}
              • Once approved, you'll receive access to our vendor portal{'\n'}
              • Start receiving booking requests from customers
            </Text>
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit Application</Text>
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
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666666',
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
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
    width: '47%',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  categoryCardSelected: {
    backgroundColor: '#449BE8',
    borderColor: '#449BE8',
  },
  categoryText: {
    fontSize: 14,
    color: '#333333',
    textAlign: 'center',
    marginTop: 12,
    fontWeight: '500',
    lineHeight: 18,
  },
  categoryTextSelected: {
    color: '#FFFFFF',
  },
  infoBox: {
    backgroundColor: '#F0F7FF',
    padding: 20,
    borderRadius: 12,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#449BE8',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0850AE',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
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