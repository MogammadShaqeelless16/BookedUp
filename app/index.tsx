import { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Index() {
  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  const checkOnboardingStatus = async () => {
    try {
      const hasOnboarded = await AsyncStorage.getItem('hasOnboarded');
      const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
      
      if (!hasOnboarded) {
        router.replace('/onboarding');
      } else if (!isLoggedIn) {
        router.replace('/auth/login');
      } else {
        router.replace('/(tabs)');
      }
    } catch (error) {
      router.replace('/onboarding');
    }
  };

  return <View style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#449BE8',
  },
});