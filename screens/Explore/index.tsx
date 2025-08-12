import RepoCard, { RepoCardRepository } from '@/components/RepoCard';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { RootState, store } from '@/store';
import { fetchRepositoriesByLanguageAndDate, setSelectedView } from '@/store/repositories/actions';
import { Picker } from '@react-native-picker/picker';
import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  SafeAreaView,
  StatusBar,
  Text,
  View
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { exploreStyles } from '../exploreStyles';

interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string;
  stargazers_count: number;
  language: string;
  updated_at: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const ExploreScreen: React.FC = () => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const dispatch = useDispatch<typeof store.dispatch>();
  const { items, loading, error, selectedView } = useSelector((state: RootState) => state.repositories);

  const viewOptions = ['Top 10', 'Top 20', 'Top 50', 'Top 100'];

  useEffect(() => {
    const limit = parseInt(selectedView.split(' ')[1]);
    dispatch(fetchRepositoriesByLanguageAndDate(limit) as any);
  }, [dispatch, selectedView]);

  const handleViewChange = (value: string) => {
    dispatch(setSelectedView(value));
  };

  const renderRepository = ({ item }: { item: Repository }) => (
    <RepoCard repository={item as RepoCardRepository} />
  );

  useEffect(() => {
    if (error) {
      Alert.alert('Error', error);
    }
  }, [error]);

  return (
    <SafeAreaView style={[exploreStyles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={theme.background} />

      <View style={[exploreStyles.header, { borderBottomColor: theme.border }]}>
        <Text style={[exploreStyles.headerTitle, { color: theme.text }]}>Explore popular</Text>

        <View style={exploreStyles.pickerContainer}>
          <View style={[exploreStyles.pickerWrapper, { borderColor: theme.border, backgroundColor: theme.surface }]}>
            <Text style={[exploreStyles.inlinePrefix, { color: theme.icon }]}>View:</Text>
            <Picker
              selectedValue={selectedView}
              onValueChange={handleViewChange}
              mode="dropdown"
              style={[exploreStyles.picker, { color: theme.text }]}
              dropdownIconColor={theme.text as string}
            >
              {viewOptions.map((option) => (
                <Picker.Item
                  key={option}
                  label={option}
                  value={option}
                  color={theme.text as string}
                  style={{ backgroundColor: theme.surface }}
                />
              ))}
            </Picker>
          </View>
        </View>
      </View>
      
      {loading ? (
        <View style={exploreStyles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.tint as string} />
          <Text style={[exploreStyles.loadingText, { color: theme.icon }]}>Loading repositories...</Text>
        </View>
      ) : (
        <FlatList
          data={items as unknown as Repository[]}
          renderItem={renderRepository}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={exploreStyles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};



export default ExploreScreen;