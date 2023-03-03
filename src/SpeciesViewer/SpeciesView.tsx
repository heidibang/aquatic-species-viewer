import { Star, StarOutline } from '@mui/icons-material';
import { CardMedia, Typography, Box, IconButton, Grid, styled, CircularProgress } from '@mui/material';
import axios from 'axios';
import { FC, useEffect, useState } from 'react';
import { speciesDict } from './SpeciesList';
import { StyledCard } from '../Styled';
import { SpeciesData } from '../models/types';

interface SpeciesViewProps {
  selectedSpecies: string;
  favoriteSpecies: string[];
  updateFavoriteSpecies: (species: string) => void;
}

function createMarkup(text: string) {
  return { __html: text };
}

export const SpeciesView: FC<SpeciesViewProps> = ({ selectedSpecies, favoriteSpecies, updateFavoriteSpecies }) => {
  const [selectedSpeciesData, setSelectedSpeciesData] = useState<SpeciesData | null>(null);
  const [loading, setLoading] = useState(false);

  const speciesCommonName = Object.keys(speciesDict).find((key) => speciesDict[key] === selectedSpecies) || '';

  const getSpeciesData = async (selectedSpecies: string) => {
    const proxyUrl = 'https://api.allorigins.win/raw?url=';
    const apiUrl = `https://www.fishwatch.gov/api/species/${selectedSpecies}`;

    try {
      setLoading(true);
      const res = await axios.get(proxyUrl + encodeURIComponent(apiUrl));
      const data = res.data[0];

      setSelectedSpeciesData({
        scientific_name: data['Scientific Name'],
        habitat: data.Habitat,
        population_status: data['Population Status'],
        research: data.Research,
        photo: data['Species Illustration Photo'],
        last_update: data.last_update,
      });
    } catch (error) {
      console.log(`There was an error retrieving species data: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedSpecies) {
      getSpeciesData(selectedSpecies);
    }
  }, [selectedSpecies]);

  return (
    <>
      <Grid container spacing={2} justifyContent="space-between">
        <Grid item xs={11}>
          <Typography variant="h5" align="center" fontWeight={'bold'}>
            {speciesCommonName}
          </Typography>

          <Typography fontStyle={'italic'} variant="subtitle1" align="center">
            {selectedSpeciesData?.scientific_name}
          </Typography>
          <Grid item xs={1} sx={{ alignContent: 'center' }}>
            <IconButton onClick={() => updateFavoriteSpecies(speciesCommonName)}>
              {favoriteSpecies.includes(speciesCommonName) ? <Star /> : <StarOutline />}
            </IconButton>
          </Grid>
        </Grid>
        <Box
          sx={{
            width: '100%',
            justifyContent: 'space-between',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '20px',
          }}
        >
          <CardMedia
            component="img"
            sx={{
              width: '300px',
            }}
            image={selectedSpeciesData?.photo?.src}
            alt={selectedSpeciesData?.photo?.alt}
            title={selectedSpeciesData?.photo?.title}
          />
        </Box>

        <Grid item xs={12} sm={6}>
          <Box sx={{ marginTop: '20px', bgcolor: 'background.paper' }}>
            <StyledCard variant="outlined">
              <Typography variant="h6">Habitat</Typography>
              {loading ? (
                <CircularProgress />
              ) : selectedSpeciesData?.habitat ? (
                <div dangerouslySetInnerHTML={createMarkup(selectedSpeciesData?.habitat || '')} />
              ) : (
                <Typography variant="body1" fontStyle={'italic'}>
                  No information available.
                </Typography>
              )}
            </StyledCard>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box sx={{ marginTop: '20px' }}>
            <StyledCard variant="outlined">
              <Typography variant="h6">Population Status</Typography>
              {loading ? (
                <CircularProgress />
              ) : selectedSpeciesData?.research ? (
                <div dangerouslySetInnerHTML={createMarkup(selectedSpeciesData?.research || '')} />
              ) : (
                <Typography variant="body1" fontStyle={'italic'}>
                  No information available.
                </Typography>
              )}
            </StyledCard>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ marginTop: '20px' }}>
            <StyledCard variant="outlined">
              <Typography variant="h6">Research</Typography>{' '}
              {loading ? (
                <CircularProgress />
              ) : selectedSpeciesData?.research ? (
                <div dangerouslySetInnerHTML={createMarkup(selectedSpeciesData?.research || '')} />
              ) : (
                <Typography variant="body1" fontStyle={'italic'}>
                  No information available.
                </Typography>
              )}
            </StyledCard>
          </Box>
        </Grid>
      </Grid>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          marginTop: 'auto',
          paddingBottom: '10px',
        }}
      >
        <Typography variant="body1" align="right" fontStyle="italic">
          Last Updated:
        </Typography>
        <Typography variant="body1" align="right" fontStyle="italic" sx={{ marginLeft: '6px', marginRight: '6px' }}>
          {selectedSpeciesData?.last_update}
        </Typography>
      </Box>
    </>
  );
};
