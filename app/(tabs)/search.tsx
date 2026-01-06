import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import {  SlidersHorizontal } from 'lucide-react-native';

export default function Search() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Quick Search</Text>
        <Text style={styles.subtitle}>Find venues and services quickly</Text>
        
        <TouchableOpacity 
          style={styles.advancedSearchButton}
          onPress={() => router.push('/advanced-search')}
        >
          <SlidersHorizontal size={24} color="#449BE8" strokeWidth={2} />
          <Text style={styles.advancedSearchText}>Advanced Search</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0850AE',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 40,
  },
  advancedSearchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    paddingVertical: 20,
    paddingHorizontal: 24,
    borderRadius: 12,
    gap: 16,
  },
  advancedSearchText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#449BE8',
  },
});