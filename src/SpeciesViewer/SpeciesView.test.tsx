import axios from 'axios';
import { SpeciesView } from './SpeciesView';
import { speciesMock } from '../mocks/speciesMock';
import { act, render, waitFor } from '@testing-library/react';

jest.mock('axios');

describe('SpeciesView', () => {
  const defaultProps = {
    selectedSpecies: 'hippy-hoppus',
    favoriteSpecies: [],
    updateFavoriteSpecies: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('displays the species name and scientific name', async () => {
    (axios.get as jest.MockedFunction<typeof axios>).mockResolvedValue({ data: [speciesMock] });

    await act(async () => {
      const { getByText } = render(<SpeciesView {...defaultProps} />);

      setTimeout(async () => {
        await waitFor(() => {
          expect(getByText('Hippy hoppus')).toBeInTheDocument();
          expect(getByText('Under the Sea')).toBeInTheDocument();
        });
      }, 2000);
    });
  });
});
