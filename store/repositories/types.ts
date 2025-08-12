import { RepoCardRepository } from '@/components/RepoCard';

export interface RepositoriesState {
  items: RepoCardRepository[];
  loading: boolean;
  error: string | null;
  selectedView: string; 
  selectedLanguage: string;
  selectedDate: string;
}

export const FETCH_REPOS_REQUEST = 'FETCH_REPOS_REQUEST';
export const FETCH_REPOS_SUCCESS = 'FETCH_REPOS_SUCCESS';
export const FETCH_REPOS_FAILURE = 'FETCH_REPOS_FAILURE';
export const SET_SELECTED_VIEW = 'SET_SELECTED_VIEW';
export const SET_SELECTED_DATE = "SET_SELECTED_DATE";
export const SET_SELECTED_LANGUAGE = "SET_SELECTED_LANGUAGE";


interface FetchReposRequestAction {
  type: typeof FETCH_REPOS_REQUEST;
}

interface FetchReposSuccessAction {
  type: typeof FETCH_REPOS_SUCCESS;
  payload: RepoCardRepository[];
}

interface FetchReposFailureAction {
  type: typeof FETCH_REPOS_FAILURE;
  payload: string;
}

interface SetSelectedViewAction {
  type: typeof SET_SELECTED_VIEW;
  payload: string;
}

interface setSelectedLanguageAction{
  type : typeof SET_SELECTED_LANGUAGE;
  payload: string;
}

interface setSelectedDateAction {
  type : typeof SET_SELECTED_DATE;
  payload: string;
}

export type RepositoriesAction =
  | FetchReposRequestAction
  | FetchReposSuccessAction
  | FetchReposFailureAction
  | SetSelectedViewAction
  | setSelectedLanguageAction
  | setSelectedDateAction;
