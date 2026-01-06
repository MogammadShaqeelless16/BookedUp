import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import {
  ArrowLeft,
  Bell,
  Shield,
  Globe,
  Moon,
  Smartphone,
  Mail,
  MessageSquare,
  ChevronRight,
} from 'lucide-react-native';

export default function Settings() {
  const [notifications, setNotifications] = useState({
    push: true,
    email: true,
    sms: false,
    marketing: false,
  });
  const [darkMode, setDarkMode] = useState(false);

  const settingSections = [
    {
      title: 'Notifications',
      items: [
        {
          icon: Bell,
          title: 'Push Notifications',
          subtitle: 'Receive booking updates and reminders',
          type: 'switch',
          value: notifications.push,
          onToggle: (value: boolean) => setNotifications(prev => ({ ...prev, push: value })),
        },
        {
          icon: Mail,
          title: 'Email Notifications',
          subtitle: 'Get important updates via email',
          type: 'switch',
          value: notifications.email,
          onToggle: (value: boolean) => setNotifications(prev => ({ ...prev, email: value })),
        },
        {
          icon: MessageSquare,
          title: 'SMS Notifications',
          subtitle: 'Receive text messages for urgent updates',
          type: 'switch',
          value: notifications.sms,
          onToggle: (value: boolean) => setNotifications(prev => ({ ...prev, sms: value })),
        },
        {
          icon: Smartphone,
          title: 'Marketing Communications',
          subtitle: 'Promotional offers and venue recommendations',
          type: 'switch',
          value: notifications.marketing,
          onToggle: (value: boolean) => setNotifications(prev => ({ ...prev, marketing: value })),
        },
      ],
    },
    {
      title: 'Appearance',
      items: [
        {
          icon: Moon,
          title: 'Dark Mode',
          subtitle: 'Switch to dark theme',
          type: 'switch',
          value: darkMode,
          onToggle: setDarkMode,
        },
      ],
    },
    {
      title: 'Privacy & Security',
      items: [
        {
          icon: Shield,
          title: 'Privacy Settings',
          subtitle: 'Manage your data and privacy preferences',
          type: 'navigation',
          onPress: () => {},
        },
        {
          icon: Globe,
          title: 'Data Usage',
          subtitle: 'Control how your data is used',
          type: 'navigation',
          onPress: () => {},
        },
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#333333" strokeWidth={2} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {settingSections.map((section, sectionIndex) => (
            <View key={sectionIndex} style={styles.section}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <View style={styles.sectionContent}>
                {section.items.map((item, itemIndex) => {
                  const IconComponent = item.icon;
                  return (
                    <View key={itemIndex} style={styles.settingItem}>
                      <View style={styles.settingLeft}>
                        <View style={styles.iconContainer}>
                          <IconComponent size={20} color="#449BE8" strokeWidth={2} />
                        </View>
                        <View style={styles.settingText}>
                          <Text style={styles.settingTitle}>{item.title}</Text>
                          <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
                        </View>
                      </View>
                      <View style={styles.settingRight}>
                        {item.type === 'switch' ? (
                          <Switch
                            value={item.value as boolean}
                            onValueChange={item.onToggle}
                            trackColor={{ false: '#E0E0E0', true: '#449BE8' }}
                            thumbColor="#FFFFFF"
                          />
                        ) : (
                          <TouchableOpacity onPress={item.onPress}>
                            <ChevronRight size={20} color="#CCCCCC" strokeWidth={2} />
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>
          ))}

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>
            <View style={styles.sectionContent}>
              <TouchableOpacity style={styles.settingItem}>
                <View style={styles.settingLeft}>
                  <View style={styles.settingText}>
                    <Text style={styles.settingTitle}>App Version</Text>
                    <Text style={styles.settingSubtitle}>1.0.0</Text>
                  </View>
                </View>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.settingItem}>
                <View style={styles.settingLeft}>
                  <View style={styles.settingText}>
                    <Text style={styles.settingTitle}>Terms of Service</Text>
                    <Text style={styles.settingSubtitle}>Read our terms and conditions</Text>
                  </View>
                </View>
                <ChevronRight size={20} color="#CCCCCC" strokeWidth={2} />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.settingItem}>
                <View style={styles.settingLeft}>
                  <View style={styles.settingText}>
                    <Text style={styles.settingTitle}>Privacy Policy</Text>
                    <Text style={styles.settingSubtitle}>How we handle your data</Text>
                  </View>
                </View>
                <ChevronRight size={20} color="#CCCCCC" strokeWidth={2} />
              </TouchableOpacity>
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
  content: {
    padding: 20,
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
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  settingLeft: {
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
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 18,
  },
  settingRight: {
    marginLeft: 16,
  },
});