import { RepoCardRepository } from '@/components/RepoCard';
import { Dispatch } from 'redux';
import {
  FETCH_REPOS_FAILURE,
  FETCH_REPOS_REQUEST,
  FETCH_REPOS_SUCCESS,
  RepositoriesAction,
  SET_SELECTED_VIEW,
  SET_SELECTED_LANGUAGE,
  SET_SELECTED_DATE
} from './types';

export const setSelectedView = (view: string): RepositoriesAction => ({
  type: SET_SELECTED_VIEW,
  payload: view,
});

export const setSelectedLanguage = (language: string) => ({
  type: SET_SELECTED_LANGUAGE,
  payload: language,
});

export const setSelectedDate = (date: string) => ({
  type: SET_SELECTED_DATE,
  payload: date,
});



export const fetchRepositoriesByLanguageAndDate = (
  limit: number = 10,
  lang: string = "Any",
  date: string = '2020-01-10'
) => {
  return async (dispatch: Dispatch<RepositoriesAction>) => {
    try {
      dispatch({ type: FETCH_REPOS_REQUEST });
      const languageQuery = lang && lang !== 'Any' ? `language:${lang}+` : '';
      const query = `${languageQuery}created:>${date}`;

      const response = await fetch(
        `https://api.github.com/search/repositories?q=${query}&sort=stars&order=desc&per_page=${limit}`,
        {
          headers: {
            Authorization: `token ${process.env.GITHUB_TOKEN}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const items: RepoCardRepository[] = data.items;
      dispatch({ type: FETCH_REPOS_SUCCESS, payload: items });
    } catch (e: any) {
      dispatch({ type: FETCH_REPOS_FAILURE, payload: e?.message ?? 'Unknown error' });
    }
  };
};
