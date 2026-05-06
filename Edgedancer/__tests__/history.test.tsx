import React from 'react';
import History from '@/app/(tabs)/history';
import { render } from '@testing-library/react-native';
import { RepoProvider } from '@/providers/repositoryProviders';
import { createMockStepTrackerDao } from '../__mocks__/mockStepTrackerDAO';

jest.mock('expo-router', () => {
  const actual = jest.requireActual('expo-router');

  return {
    ...actual,
    useFocusEffect: (cb: any) => {
      setTimeout(() => {
        cb();
      }, 0);
    },
  };
});
describe('<History />', () => {
  const mockDao = createMockStepTrackerDao();

  const wrapper = ({ children }: React.PropsWithChildren) => (
    <RepoProvider dao={mockDao}>
      {children}
    </RepoProvider>
  );

  test('Text renders correctly on History', () => {
    const { getByText } = render(<History />, { wrapper });

    getByText('Edit app/history.tsx to edit this screen.');
  });
});