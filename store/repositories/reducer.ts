import { formatDateYYYYMMDD } from '@/constants/FormatDate';
import { setSelectedDate } from './actions';
import {
    FETCH_REPOS_FAILURE,
    FETCH_REPOS_REQUEST,
    FETCH_REPOS_SUCCESS,
    RepositoriesAction,
    RepositoriesState,
    SET_SELECTED_LANGUAGE,
    SET_SELECTED_VIEW,
    SET_SELECTED_DATE
} from './types';



const initialState: RepositoriesState = {
  items: [],
  loading: false,
  error: null,
  selectedView: 'Top 10',
  selectedLanguage: 'Any',
  selectedDate: formatDateYYYYMMDD(Date.now()), // Initialize with current date as a string
};

export const repositoriesReducer = (
  state: RepositoriesState = initialState,
  action: RepositoriesAction
): RepositoriesState => {
  switch (action.type) {
    case FETCH_REPOS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_REPOS_SUCCESS:
      return { ...state, loading: false, items: action.payload };
    case FETCH_REPOS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case SET_SELECTED_VIEW:
      return { ...state, selectedView: action.payload };
    case SET_SELECTED_LANGUAGE:
      return { ...state, selectedLanguage: action.payload };
    case SET_SELECTED_DATE:
      return { ...state, selectedDate: action.payload };
    default:
      return state;
  }
};
