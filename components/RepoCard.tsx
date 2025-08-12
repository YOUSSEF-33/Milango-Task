import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export interface RepoCardRepository {
  id: number;
  full_name: string;
  description: string | null;
  stargazers_count: number;
  language?: string | null;
  updated_at: string;
}

interface RepoCardProps {
  repository: RepoCardRepository;
  onPress?: () => void;
}

const RepoCard: React.FC<RepoCardProps> = ({ repository, onPress }) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const getTimeAgo = (dateString: string): string => {
    const now = new Date();
    const updatedDate = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - updatedDate.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 24) {
      return `Updated ${diffInHours} hours ago`;
    }
    const diffInDays = Math.floor(diffInHours / 24);
    return `Updated ${diffInDays} days ago`;
  };

  const formatStars = (count: number): string => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <TouchableOpacity onPress={onPress} style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border }]}>
      <View style={styles.headerRow}>
        <Text style={[styles.trendingLabel, { color: theme.icon }]}>Trending repository</Text>
        <View style={styles.starRow}>
          <Text style={[styles.starIcon, { color: theme.text }]}>⭐</Text>
          <Text style={[styles.starLabel, { color: theme.text }]}>Star</Text>
          <View style={[styles.starBadge, { backgroundColor: theme.tint, borderColor: theme.border }]}>
            <Text style={styles.starBadgeText}>{formatStars(repository.stargazers_count)}</Text>
          </View>
        </View>
      </View>

      <View style={styles.repoInfo}>
        <View style={styles.repoIcon}><Text style={[styles.iconText, { color: theme.text }]}>📁</Text></View>
        <Text style={[styles.repoName, { color: colorScheme === 'dark' ? theme.text : theme.tint }]}>{repository.full_name}</Text>
      </View>

      <Text style={[styles.description, { color: theme.icon }]} numberOfLines={3}>
        {repository.description || 'No description available.'}
      </Text>

      <View style={styles.footerRow}>
        <Text style={[styles.updatedText, { color: theme.icon }]}>{getTimeAgo(repository.updated_at)}</Text>
        {!!repository.language && (
          <View style={styles.languageRow}>
            <View style={styles.languageDot} />
            <Text style={[styles.languageText, { color: theme.icon }]}>{repository.language}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  trendingLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  starRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  starIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  starLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginRight: 8,
  },
  starBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
    borderWidth: 1,
  },
  starBadgeText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  repoInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  repoIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 16,
  },
  repoName: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  updatedText: {
    fontSize: 12,
  },
  languageRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#f1e05a',
    marginRight: 6,
  },
  languageText: {
    fontSize: 12,
  },
});

export default RepoCard;
