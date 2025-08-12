import RepoCard, { RepoCardRepository } from '@/components/RepoCard';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { RootState, store } from '@/store';
import { fetchRepositoriesByLanguageAndDate, setSelectedDate, setSelectedLanguage } from '@/store/repositories/actions';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  TextInput,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useDispatch, useSelector } from 'react-redux';
import { languages } from '@/constants/Languages';
import { formatDateYYYYMMDD } from '@/constants/FormatDate';
import { repoStyles } from '../exploreStyles';

interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const RepositoriesScreen: React.FC = () => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const dispatch = useDispatch<typeof store.dispatch>();
  const { items, loading, error, selectedLanguage, selectedDate } = useSelector((state: RootState) => state.repositories);

  const [showLanguageModal, setShowLanguageModal] = useState<boolean>(false);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [languageSearch, setLanguageSearch] = useState<string>('');
  const [currentDate, setCurrentDate] = useState<Date>(new Date());




  const filteredLanguages = languages.filter(lang =>
    lang.toLowerCase().includes(languageSearch.toLowerCase())
  );


  useEffect(() => {
    dispatch(fetchRepositoriesByLanguageAndDate(100, selectedLanguage, selectedDate) as any);
  }, [dispatch, selectedLanguage, selectedDate]);

  const handleLanguageSelect = (language: string) => {
    dispatch(setSelectedLanguage(language));
    setShowLanguageModal(false);
    setLanguageSearch('');
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {

    const dateStr = formatDateYYYYMMDD(event.nativeEvent.timestamp);
    setShowDatePicker(false);
    console.log(dateStr)
    if (selectedDate) {
      setCurrentDate(selectedDate);
      dispatch(setSelectedDate(dateStr));
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: '2-digit'
    });
  };

  const renderRepository = ({ item }: { item: Repository }) => (
    <RepoCard repository={item as RepoCardRepository} />
  );

  useEffect(() => {
    if (error) {
      Alert.alert('Error', error);
    }
  }, [error]);

  const renderLanguageModal = () => (
    <Modal
      animationType="fade"
      transparent={true}
      visible={showLanguageModal}
      onRequestClose={() => setShowLanguageModal(false)}
    >
      <View style={repoStyles.modalOverlay}>
        <View style={[repoStyles.modalContent, { backgroundColor: theme.surface }]}>
          <View style={repoStyles.modalHeader}>
            <Text style={[repoStyles.modalTitle, { color: theme.text }]}>Select Language</Text>
            <TouchableOpacity
              onPress={() => setShowLanguageModal(false)}
              style={repoStyles.closeButton}
            >
              <Text style={[repoStyles.closeButtonText, { color: theme.icon }]}>✕</Text>
            </TouchableOpacity>
          </View>

          <View style={[repoStyles.searchContainer, { borderColor: theme.border }]}>
            <TextInput
              style={[repoStyles.searchInput, { color: theme.text }]}
              placeholder="Filter Languages"
              placeholderTextColor={theme.icon}
              value={languageSearch}
              onChangeText={setLanguageSearch}
            />
            <Text style={[repoStyles.searchIcon, { color: theme.icon }]}>🔍</Text>
          </View>

          <FlatList
            data={filteredLanguages}
            keyExtractor={(item, index) => `${item}-${index}`}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  repoStyles.languageItem,
                  selectedLanguage === item && { backgroundColor: theme.tint + '20' }
                ]}
                onPress={() => handleLanguageSelect(item)}
              >
                <Text style={[repoStyles.languageItemText, { color: theme.text }]}>{item}</Text>
                {item === 'JavaScript' && (
                  <View style={repoStyles.languageCount}>
                    <Text style={[repoStyles.languageCountText, { color: theme.background }]}>83.5</Text>
                  </View>
                )}
              </TouchableOpacity>
            )}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={[repoStyles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={theme.background} />

      <View style={[repoStyles.header, { borderBottomColor: theme.border }]}>
        <Text style={[repoStyles.headerTitle, { color: theme.text }]}>Repositories</Text>

        <View style={repoStyles.filtersContainer}>
          <View style={repoStyles.filtersRow}>
            {/* Language Filter */}
            <View style={[repoStyles.filterWrapper, { borderColor: theme.border, backgroundColor: theme.surface }]}>
              <Text style={[repoStyles.inlinePrefix, { color: theme.icon }]}>Language:</Text>
              <TouchableOpacity
                style={repoStyles.languageButton}
                onPress={() => setShowLanguageModal(true)}
              >
                <Text style={[repoStyles.filterButtonText, { color: theme.text }]}>{selectedLanguage || 'Any'}</Text>
                <Text style={[repoStyles.dropdownArrow, { color: theme.icon }]}>▼</Text>
              </TouchableOpacity>
            </View>

            {/* Date Filter */}
            <View style={[repoStyles.filterWrapper, { borderColor: theme.border, backgroundColor: theme.surface }]}>
              <Text style={[repoStyles.inlinePrefix, { color: theme.icon }]}>Date:</Text>
              <TouchableOpacity
                style={repoStyles.dateButton}
                onPress={() => setShowDatePicker(true)}
              >
                <Text style={[repoStyles.filterButtonText, { color: theme.text }]}>{formatDate(currentDate)}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      {loading ? (
        <View style={repoStyles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.tint as string} />
          <Text style={[repoStyles.loadingText, { color: theme.icon }]}>Loading repositories...</Text>
        </View>
      ) : (
        <FlatList
          data={items as unknown as Repository[]}
          renderItem={renderRepository}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={repoStyles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}

      {showDatePicker && (
        <View
          style={{
            backgroundColor: theme.surface,
            borderRadius: 8,
            padding: Platform.OS === 'ios' ? 10 : 0, // padding for iOS display
            overflow: 'hidden',
          }}
        >
          <DateTimePicker
            value={currentDate}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        </View>
      )}

      {renderLanguageModal()}
    </SafeAreaView>
  );
};



export default RepositoriesScreen;