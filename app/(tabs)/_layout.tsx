import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors, Typography } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Link, Tabs, usePathname } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState('index');


  useEffect(() => {
    if (pathname.includes('/repositories')) {
      setActiveTab('repositories');
    } else {
      setActiveTab('index');
    }
  }, [pathname]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Header */}
      <View style={[
        styles.header,
        { backgroundColor: Colors[colorScheme ?? 'light'].surface }
      ]}>
        <View style={styles.headerContent}>
          <View style={styles.logoContainer}>
            <Image 
              source={colorScheme === 'light' ? require('../../assets/images/FINAL LOGO.png') : require('../../assets/images/FINAL LOGO DARK.png')}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>
          <IconSymbol 
            size={24} 
            name="magnifyingglass" 
            color={Colors[colorScheme ?? 'light'].icon} 
          />
        </View>
      </View>


      <View style={[
        styles.topTabBar,
        { backgroundColor: Colors[colorScheme ?? 'light'].surface }
      ]}>
        <View style={styles.tabContainer}>
          <Link href="/(tabs)" asChild>
            <TouchableOpacity style={styles.tabItem} activeOpacity={0.7}>
              <Text style={[
                styles.tabText, 
                { color: activeTab === 'index' ? (colorScheme === 'light' ? Colors.light.tint : Colors.dark.text) : Colors[colorScheme ?? 'light'].icon }
              ]}>
                Explore
              </Text>
              {activeTab === 'index' && (
                <View style={[
                  styles.activeIndicator,
                  { backgroundColor: Colors[colorScheme ?? 'light'].accent }
                ]}
                />
              )}
            </TouchableOpacity>
          </Link>
          
          <Link href="/(tabs)/repositories" asChild>
            <TouchableOpacity style={styles.tabItem} activeOpacity={0.7}>
              <Text style={[
                styles.tabText, 
                { color: activeTab === 'repositories' ? (colorScheme === 'light' ? Colors.light.tint : Colors.dark.text) : Colors[colorScheme ?? 'light'].icon }
              ]}>
                Repositories
              </Text>
              {activeTab === 'repositories' && (
                <View style={[
                  styles.activeIndicator,
                  { backgroundColor: Colors[colorScheme ?? 'light'].accent }
                ]}
                />
              )}
            </TouchableOpacity>
          </Link>
        </View>
      </View>

      {/* Tabs */}
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: { display: 'none' }, // Hide the built-in tab bar
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Explore',
          }}
        />
        <Tabs.Screen
          name="repositories"
          options={{
            title: 'Repositories',
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 20,
    paddingBottom: 25,
    borderBottomWidth: 0,
    borderBottomColor: '#00C4B3',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    width: 120,
    height: 40,
  },
  tabBar: {
    height: 60,
    paddingBottom: Platform.OS === 'ios' ? 10 : 5,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  tabBarLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 5,
  },
  tabBarItem: {
    paddingVertical: 5,
  },
  topTabBar: {
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 0,
    borderBottomColor: '#00C4B3',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 40,
    gap: 40,
  },
  tabItem: {
    alignItems: 'center',
    position: 'relative',
    paddingBottom: 10,
  },
  tabText: {
    fontSize: Typography.fontSize.medium,
    fontFamily: Typography.fontFamily.regular,
  },
  activeIndicator: {
    position: 'absolute',
    bottom: -10,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: Colors.light.accent,
    borderRadius: 2,
  },
});
