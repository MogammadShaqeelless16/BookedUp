import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { X, Calendar, Clock, Users, ChefHat, Sparkles } from 'lucide-react-native';

const { height } = Dimensions.get('window');

interface BookingModalProps {
  visible: boolean;
  onClose: () => void;
  venue: any;
}

const timeSlots = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM',
  '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM'
];

const serviceProviders = [
  {
    id: '1',
    name: 'Premium Catering Co.',
    type: 'Catering',
    price: 450,
    rating: 4.9,
    icon: ChefHat,
    description: 'Full-service catering with premium menu options'
  },
  {
    id: '2',
    name: 'Elite Event Services',
    type: 'Event Planning',
    price: 800,
    rating: 4.8,
    icon: Sparkles,
    description: 'Complete event planning and coordination'
  },
  {
    id: '3',
    name: 'Clean & Shine',
    type: 'Cleaning',
    price: 200,
    rating: 4.7,
    icon: Sparkles,
    description: 'Professional post-event cleaning service'
  },
];

export default function BookingModal({ visible, onClose, venue }: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [guestCount, setGuestCount] = useState(50);

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleNext = () => {
    if (step === 1 && (!selectedDate || !selectedTime)) {
      Alert.alert('Please select date and time');
      return;
    }
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleBooking = () => {
    const totalServiceCost = selectedServices.reduce((total, serviceId) => {
      const service = serviceProviders.find(s => s.id === serviceId);
      return total + (service?.price || 0);
    }, 0);

    const totalCost = venue.price + totalServiceCost;

    Alert.alert(
      'Booking Confirmed!',
      `Your venue has been booked for ${selectedDate} at ${selectedTime}.\n\nTotal Cost: R${totalCost.toLocaleString()}`,
      [
        {
          text: 'OK',
          onPress: () => {
            onClose();
            // Reset form
            setStep(1);
            setSelectedDate(null);
            setSelectedTime(null);
            setSelectedServices([]);
            setGuestCount(50);
          }
        }
      ]
    );
  };

  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push({
        date: date.toISOString().split('T')[0],
        day: date.getDate(),
        month: date.toLocaleDateString('en', { month: 'short' }),
        weekday: date.toLocaleDateString('en', { weekday: 'short' })
      });
    }
    return dates;
  };

  const calculateTotal = () => {
    const serviceCost = selectedServices.reduce((total, serviceId) => {
      const service = serviceProviders.find(s => s.id === serviceId);
      return total + (service?.price || 0);
    }, 0);
    return venue.price + serviceCost;
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <X size={24} color="#333333" strokeWidth={2} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Book Venue</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Progress indicator */}
        <View style={styles.progressContainer}>
          {[1, 2, 3].map((stepNumber) => (
            <View key={stepNumber} style={styles.progressStep}>
              <View 
                style={[
                  styles.progressCircle,
                  { backgroundColor: step >= stepNumber ? '#449BE8' : '#E0E0E0' }
                ]}
              >
                <Text 
                  style={[
                    styles.progressText,
                    { color: step >= stepNumber ? '#FFFFFF' : '#666666' }
                  ]}
                >
                  {stepNumber}
                </Text>
              </View>
              {stepNumber < 3 && (
                <View 
                  style={[
                    styles.progressLine,
                    { backgroundColor: step > stepNumber ? '#449BE8' : '#E0E0E0' }
                  ]} 
                />
              )}
            </View>
          ))}
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Step 1: Date & Time */}
          {step === 1 && (
            <View style={styles.stepContainer}>
              <Text style={styles.stepTitle}>Select Date & Time</Text>
              
              {/* Date Selection */}
              <Text style={styles.sectionLabel}>Choose Date</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.dateContainer}>
                  {generateDates().map((dateObj) => (
                    <TouchableOpacity
                      key={dateObj.date}
                      style={[
                        styles.dateCard,
                        selectedDate === dateObj.date && styles.dateCardSelected
                      ]}
                      onPress={() => handleDateSelect(dateObj.date)}
                    >
                      <Text 
                        style={[
                          styles.dateWeekday,
                          selectedDate === dateObj.date && styles.dateTextSelected
                        ]}
                      >
                        {dateObj.weekday}
                      </Text>
                      <Text 
                        style={[
                          styles.dateDay,
                          selectedDate === dateObj.date && styles.dateTextSelected
                        ]}
                      >
                        {dateObj.day}
                      </Text>
                      <Text 
                        style={[
                          styles.dateMonth,
                          selectedDate === dateObj.date && styles.dateTextSelected
                        ]}
                      >
                        {dateObj.month}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>

              {/* Time Selection */}
              <Text style={styles.sectionLabel}>Choose Time</Text>
              <View style={styles.timeGrid}>
                {timeSlots.map((time) => (
                  <TouchableOpacity
                    key={time}
                    style={[
                      styles.timeSlot,
                      selectedTime === time && styles.timeSlotSelected
                    ]}
                    onPress={() => handleTimeSelect(time)}
                  >
                    <Clock 
                      size={16} 
                      color={selectedTime === time ? '#FFFFFF' : '#666666'} 
                      strokeWidth={2} 
                    />
                    <Text 
                      style={[
                        styles.timeText,
                        selectedTime === time && styles.timeTextSelected
                      ]}
                    >
                      {time}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Step 2: Guest Count */}
          {step === 2 && (
            <View style={styles.stepContainer}>
              <Text style={styles.stepTitle}>Guest Count</Text>
              <View style={styles.guestContainer}>
                <Text style={styles.guestLabel}>Number of guests</Text>
                <View style={styles.guestCounter}>
                  <TouchableOpacity 
                    style={styles.counterButton}
                    onPress={() => setGuestCount(Math.max(1, guestCount - 10))}
                  >
                    <Text style={styles.counterText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.guestCount}>{guestCount}</Text>
                  <TouchableOpacity 
                    style={styles.counterButton}
                    onPress={() => setGuestCount(Math.min(venue.capacity, guestCount + 10))}
                  >
                    <Text style={styles.counterText}>+</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.guestLimit}>Maximum: {venue.capacity} guests</Text>
              </View>
            </View>
          )}

          {/* Step 3: Service Providers */}
          {step === 3 && (
            <View style={styles.stepContainer}>
              <Text style={styles.stepTitle}>Additional Services</Text>
              <Text style={styles.stepSubtitle}>Choose optional services for your event</Text>
              
              {serviceProviders.map((service) => {
                const IconComponent = service.icon;
                const isSelected = selectedServices.includes(service.id);
                
                return (
                  <TouchableOpacity
                    key={service.id}
                    style={[
                      styles.serviceCard,
                      isSelected && styles.serviceCardSelected
                    ]}
                    onPress={() => handleServiceToggle(service.id)}
                  >
                    <View style={styles.serviceHeader}>
                      <View style={styles.serviceInfo}>
                        <View style={styles.serviceIconContainer}>
                          <IconComponent size={20} color="#449BE8" strokeWidth={2} />
                        </View>
                        <View style={styles.serviceDetails}>
                          <Text style={styles.serviceName}>{service.name}</Text>
                          <Text style={styles.serviceType}>{service.type}</Text>
                          <Text style={styles.serviceDescription}>{service.description}</Text>
                        </View>
                      </View>
                      <View style={styles.servicePrice}>
                        <Text style={styles.servicePriceText}>R{service.price}</Text>
                        <View 
                          style={[
                            styles.checkbox,
                            isSelected && styles.checkboxSelected
                          ]}
                        >
                          {isSelected && <Text style={styles.checkmark}>✓</Text>}
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </ScrollView>

        {/* Bottom Actions */}
        <View style={styles.bottomContainer}>
          {step === 3 && (
            <View style={styles.totalContainer}>
              <Text style={styles.totalLabel}>Total Cost</Text>
              <Text style={styles.totalPrice}>R{calculateTotal().toLocaleString()}</Text>
            </View>
          )}
          
          <View style={styles.actionButtons}>
            {step > 1 && (
              <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                <Text style={styles.backButtonText}>Back</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity 
              style={[styles.nextButton, step === 1 && styles.nextButtonFull]}
              onPress={step === 3 ? handleBooking : handleNext}
            >
              <Text style={styles.nextButtonText}>
                {step === 3 ? 'Confirm Booking' : 'Next'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
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
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
    paddingHorizontal: 20,
  },
  progressStep: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
  },
  progressLine: {
    width: 40,
    height: 2,
    marginHorizontal: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  stepContainer: {
    paddingBottom: 20,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  stepSubtitle: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 12,
    marginTop: 24,
  },
  dateContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingRight: 20,
  },
  dateCard: {
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    minWidth: 70,
  },
  dateCardSelected: {
    backgroundColor: '#449BE8',
    borderColor: '#449BE8',
  },
  dateWeekday: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 4,
  },
  dateDay: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  dateMonth: {
    fontSize: 12,
    color: '#666666',
  },
  dateTextSelected: {
    color: '#FFFFFF',
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  timeSlot: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    gap: 8,
    minWidth: '45%',
  },
  timeSlotSelected: {
    backgroundColor: '#449BE8',
    borderColor: '#449BE8',
  },
  timeText: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
  timeTextSelected: {
    color: '#FFFFFF',
  },
  guestContainer: {
    backgroundColor: '#F8F9FA',
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  guestLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 24,
  },
  guestCounter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
    marginBottom: 16,
  },
  counterButton: {
    backgroundColor: '#449BE8',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '600',
  },
  guestCount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333333',
    minWidth: 80,
    textAlign: 'center',
  },
  guestLimit: {
    fontSize: 14,
    color: '#666666',
  },
  serviceCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  serviceCardSelected: {
    borderColor: '#449BE8',
    backgroundColor: '#F0F7FF',
  },
  serviceHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  serviceInfo: {
    flexDirection: 'row',
    flex: 1,
    gap: 12,
  },
  serviceIconContainer: {
    backgroundColor: '#FFFFFF',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  serviceDetails: {
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
    fontWeight: '500',
    marginBottom: 4,
  },
  serviceDescription: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  servicePrice: {
    alignItems: 'flex-end',
    gap: 8,
  },
  servicePriceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#449BE8',
    borderColor: '#449BE8',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  bottomContainer: {
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
  totalPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#449BE8',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  backButton: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#666666',
    fontSize: 16,
    fontWeight: '600',
  },
  nextButton: {
    flex: 2,
    backgroundColor: '#449BE8',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  nextButtonFull: {
    flex: 1,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});