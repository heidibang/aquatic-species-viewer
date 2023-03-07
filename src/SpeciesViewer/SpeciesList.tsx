import React from 'react';
import { FC, useMemo, useState } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Checkbox,
  Divider,
  ListSubheader,
  Typography,
} from '@mui/material';

export const speciesDict: { [key: string]: string } = {
  'White Hake': 'white-hake',
  'Atlantic Chub Mackerel': 'atlantic-chub-mackerel',
  'Shortfin Squid': 'shortfin-squid',
  'Sugar Kelp': 'sugar-kelp',
  'Atlantic Halibut': 'atlantic-halibut',
  'Black Grouper': 'black-grouper',
  'Striped Marlin': 'striped-marlin',
  'Pacific Oyster': 'pacific-oyster',
  'Atlantic Salmon': 'atlantic-salmon',
  Butterfish: 'butterfish',
};

interface SpeciesListProps {
  updateSelectedSpecies: (species: string) => void;
  favoriteSpecies: string[];
}

export const SpeciesList: FC<SpeciesListProps> = ({ updateSelectedSpecies, favoriteSpecies }) => {
  const [checked, setChecked] = useState(false);

  const memoizedListItems = useMemo(
    () =>
      checked
        ? favoriteSpecies.map((species, idx) => (
            <ListItem disablePadding key={`${species}_${idx}`}>
              <ListItemButton sx={{ paddingBottom: '1px' }} onClick={() => updateSelectedSpecies(speciesDict[species])}>
                <ListItemText primary={species} />
              </ListItemButton>
            </ListItem>
          ))
        : Object.keys(speciesDict).map((species, idx) => (
            <ListItem disablePadding key={`${species}_${idx}`}>
              <ListItemButton
                sx={{
                  paddingBottom: '1px',
                  '&:hover': {
                    background: '#f5f5f5',
                  },
                }}
                onClick={() => updateSelectedSpecies(speciesDict[species])}
              >
                <ListItemText primary={species} />
              </ListItemButton>
            </ListItem>
          )),
    [checked, favoriteSpecies, updateSelectedSpecies]
  );

  return (
    <Box sx={{ width: 220, minWidth: 220, bgcolor: 'background.paper' }}>
      <List>
        <ListSubheader sx={{ fontSize: '1.2rem' }}>Species List</ListSubheader>
        <Divider />
        <ListItem
          secondaryAction={
            <Checkbox edge="start" size="small" onChange={() => setChecked(!checked)} checked={checked} />
          }
          sx={{ justifyContent: 'space-around' }}
        >
          <Typography variant="body2" sx={{ marginLeft: '50px' }}>
            View Favorites
          </Typography>
        </ListItem>
        {memoizedListItems}
      </List>
    </Box>
  );
};

export default React.memo(SpeciesList);
