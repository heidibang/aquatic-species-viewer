import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import { SpeciesList } from './SpeciesList';

describe('SpeciesList', () => {
  const updateSelectedSpecies = jest.fn();
  const favoriteSpecies = ['White Hake', 'Shortfin Squid'];

  it('displays the species list', () => {
    const { getByText } = render(
      <SpeciesList updateSelectedSpecies={updateSelectedSpecies} favoriteSpecies={favoriteSpecies} />
    );

    expect(getByText('Species List')).toBeInTheDocument();
    expect(getByText('White Hake')).toBeInTheDocument();
    expect(getByText('Shortfin Squid')).toBeInTheDocument();
    expect(getByText('Sugar Kelp')).toBeInTheDocument();
    expect(getByText('View Favorites')).toBeInTheDocument();
  });

  it('updates selected species when a non-favorite species is clicked', () => {
    const { getByText } = render(
      <SpeciesList updateSelectedSpecies={updateSelectedSpecies} favoriteSpecies={favoriteSpecies} />
    );

    fireEvent.click(getByText('Atlantic Chub Mackerel'));

    expect(updateSelectedSpecies).toHaveBeenCalledWith('atlantic-chub-mackerel');
  });

  it('updates selected species when a favorite species is clicked', () => {
    const { getByText } = render(
      <SpeciesList updateSelectedSpecies={updateSelectedSpecies} favoriteSpecies={favoriteSpecies} />
    );

    fireEvent.click(getByText('View Favorites'));
    fireEvent.click(getByText('White Hake'));

    expect(updateSelectedSpecies).toHaveBeenCalledWith('white-hake');
  });
});
