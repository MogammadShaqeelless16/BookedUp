import { useEffect, useState } from 'react';
import { Drawer } from 'expo-router/drawer';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import DrawerContent from '@/components/DrawerContent';

export default function RootLayout() {
  useFrameworkReady();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={DrawerContent}
        screenOptions={{
          headerShown: false,
          drawerType: 'front',
          drawerStyle: {
            width: 280,
          },
        }}
      >
        <Drawer.Screen name="onboarding" options={{ drawerItemStyle: { display: 'none' } }} />
        <Drawer.Screen name="auth/login" options={{ drawerItemStyle: { display: 'none' } }} />
        <Drawer.Screen name="(tabs)" options={{ drawerItemStyle: { display: 'none' } }} />
        <Drawer.Screen name="venue/[id]" options={{ drawerItemStyle: { display: 'none' } }} />
        <Drawer.Screen name="booking/[id]" options={{ drawerItemStyle: { display: 'none' } }} />
        <Drawer.Screen name="list-venue" options={{ drawerItemStyle: { display: 'none' } }} />
        <Drawer.Screen name="become-vendor" options={{ drawerItemStyle: { display: 'none' } }} />
        <Drawer.Screen name="advanced-search" options={{ drawerItemStyle: { display: 'none' } }} />
        <Drawer.Screen name="profile/settings" options={{ drawerItemStyle: { display: 'none' } }} />
        <Drawer.Screen name="profile/help" options={{ drawerItemStyle: { display: 'none' } }} />
        <Drawer.Screen name="profile/edit" options={{ drawerItemStyle: { display: 'none' } }} />
        <Drawer.Screen name="+not-found" options={{ drawerItemStyle: { display: 'none' } }} />
      </Drawer>
      <StatusBar style="auto" />
    </GestureHandlerRootView>
  );
}