import { createContext, useReducer, useContext } from 'react';
import { SaloonsContext, Saloon } from '../../@types/Saloons';
import { Filter } from '../../@types/Filter';

const initialState: SaloonsContext = {
  saloons: [],
  saloonDetail: null,
  filters: {},
  filtersOpen: false,
};

export type SaloonsAction =
  | { type: 'setSaloons'; saloons: Saloon[] }
  | { type: 'setSaloonDetail'; saloon: Saloon }
  | { type: 'toggleFiltersOpen'; status: boolean }
  | { type: 'setFilters'; filters: Filter };
export type SaloonsDispatch = React.Dispatch<SaloonsAction>;

const SaloonsStataContext = createContext<SaloonsContext | undefined>(
  undefined
);
const SaloonDispatchContext = createContext<SaloonsDispatch | undefined>(
  undefined
);

const saloonReducer = (
  state: SaloonsContext,
  action: SaloonsAction
): SaloonsContext => {
  switch (action.type) {
    case 'setSaloons':
      return { ...state, saloons: action.saloons };
    case 'setSaloonDetail':
      return { ...state, saloonDetail: action.saloon };
    case 'toggleFiltersOpen':
      return { ...state, filtersOpen: action.status };
    case 'setFilters':
      return { ...state, filters: action.filters };
    default:
      throw new Error(`Type ${(action as any).type} is not recognized`);
  }
};

const SaloonProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(saloonReducer, initialState);

  return (
    <SaloonsStataContext.Provider value={state}>
      <SaloonDispatchContext.Provider value={dispatch}>
        {children}
      </SaloonDispatchContext.Provider>
    </SaloonsStataContext.Provider>
  );
};

const useSaloonState = () => {
  const context = useContext(SaloonsStataContext);

  if (context === undefined) {
    throw new Error('useSaloonState must be proved within SaloonProvider');
  }

  return context;
};

const useSaloonDispatch = () => {
  const context = useContext(SaloonDispatchContext);

  if (context === undefined) {
    throw new Error('useSaloonDispatch must be proved within SaloonProvider');
  }

  return context;
};

export { SaloonProvider, useSaloonState, useSaloonDispatch };
