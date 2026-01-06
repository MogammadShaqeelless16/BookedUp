import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import {
  ArrowLeft,
  MessageCircle,
  Phone,
  Mail,
  HelpCircle,
  FileText,
  Users,
  ChevronRight,
  ExternalLink,
} from 'lucide-react-native';

const helpSections = [
  {
    title: 'Contact Support',
    items: [
      {
        icon: MessageCircle,
        title: 'Live Chat',
        subtitle: 'Chat with our support team',
        action: 'Available 9 AM - 6 PM',
        onPress: () => {},
      },
      {
        icon: Phone,
        title: 'Call Us',
        subtitle: '+27 11 123 4567',
        action: 'Mon-Fri, 8 AM - 8 PM',
        onPress: () => Linking.openURL('tel:+27111234567'),
      },
      {
        icon: Mail,
        title: 'Email Support',
        subtitle: 'support@bookedup.co.za',
        action: 'Response within 24 hours',
        onPress: () => Linking.openURL('mailto:support@bookedup.co.za'),
      },
    ],
  },
  {
    title: 'Frequently Asked Questions',
    items: [
      {
        icon: HelpCircle,
        title: 'How do I book a venue?',
        subtitle: 'Step-by-step booking guide',
        onPress: () => {},
      },
      {
        icon: HelpCircle,
        title: 'Payment and refund policy',
        subtitle: 'Understanding our payment terms',
        onPress: () => {},
      },
      {
        icon: HelpCircle,
        title: 'Cancellation policy',
        subtitle: 'How to cancel or modify bookings',
        onPress: () => {},
      },
      {
        icon: HelpCircle,
        title: 'Venue requirements',
        subtitle: 'What to expect from venues',
        onPress: () => {},
      },
    ],
  },
  {
    title: 'Resources',
    items: [
      {
        icon: FileText,
        title: 'User Guide',
        subtitle: 'Complete app tutorial',
        onPress: () => {},
      },
      {
        icon: Users,
        title: 'Community Forum',
        subtitle: 'Connect with other users',
        onPress: () => {},
      },
      {
        icon: ExternalLink,
        title: 'Website',
        subtitle: 'Visit bookedup.co.za',
        onPress: () => Linking.openURL('https://bookedup.co.za'),
      },
    ],
  },
];

const quickActions = [
  {
    title: 'Report a Problem',
    subtitle: 'Something not working correctly?',
    color: '#E53740',
    onPress: () => {},
  },
  {
    title: 'Suggest a Feature',
    subtitle: 'Help us improve BookedUp',
    color: '#449BE8',
    onPress: () => {},
  },
  {
    title: 'Rate the App',
    subtitle: 'Share your experience',
    color: '#FCBA14',
    onPress: () => {},
  },
];

export default function Help() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#333333" strokeWidth={2} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help & Support</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.subtitle}>
            We're here to help! Find answers to common questions or get in touch with our support team.
          </Text>

          {/* Quick Actions */}
          <View style={styles.quickActionsContainer}>
            {quickActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.quickActionCard, { borderLeftColor: action.color }]}
                onPress={action.onPress}
              >
                <Text style={styles.quickActionTitle}>{action.title}</Text>
                <Text style={styles.quickActionSubtitle}>{action.subtitle}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Help Sections */}
          {helpSections.map((section, sectionIndex) => (
            <View key={sectionIndex} style={styles.section}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <View style={styles.sectionContent}>
                {section.items.map((item, itemIndex) => {
                  const IconComponent = item.icon;
                  return (
                    <TouchableOpacity
                      key={itemIndex}
                      style={styles.helpItem}
                      onPress={item.onPress}
                    >
                      <View style={styles.helpLeft}>
                        <View style={styles.iconContainer}>
                          <IconComponent size={20} color="#449BE8" strokeWidth={2} />
                        </View>
                        <View style={styles.helpText}>
                          <Text style={styles.helpTitle}>{item.title}</Text>
                          <Text style={styles.helpSubtitle}>{item.subtitle}</Text>
                          {item.action && (
                            <Text style={styles.helpAction}>{item.action}</Text>
                          )}
                        </View>
                      </View>
                      <ChevronRight size={20} color="#CCCCCC" strokeWidth={2} />
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          ))}

          {/* Emergency Contact */}
          <View style={styles.emergencyContainer}>
            <Text style={styles.emergencyTitle}>Emergency Support</Text>
            <Text style={styles.emergencyText}>
              For urgent issues during events, call our 24/7 emergency line:
            </Text>
            <TouchableOpacity
              style={styles.emergencyButton}
              onPress={() => Linking.openURL('tel:+27871234567')}
            >
              <Phone size={20} color="#FFFFFF" strokeWidth={2} />
              <Text style={styles.emergencyButtonText}>+27 87 123 4567</Text>
            </TouchableOpacity>
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
  quickActionsContainer: {
    marginBottom: 32,
  },
  quickActionCard: {
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
  },
  quickActionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },
  quickActionSubtitle: {
    fontSize: 14,
    color: '#666666',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0850AE',
    marginBottom: 16,
  },
  sectionContent: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    overflow: 'hidden',
  },
  helpItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  helpLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  helpText: {
    flex: 1,
  },
  helpTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 2,
  },
  helpSubtitle: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 2,
  },
  helpAction: {
    fontSize: 12,
    color: '#449BE8',
    fontWeight: '500',
  },
  emergencyContainer: {
    backgroundColor: '#FFF5F5',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FED7D7',
    alignItems: 'center',
  },
  emergencyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E53740',
    marginBottom: 8,
  },
  emergencyText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 20,
  },
  emergencyButton: {
    backgroundColor: '#E53740',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  emergencyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});