import { Star, StarOutline } from '@mui/icons-material';
import { CardMedia, Typography, Box, IconButton, Grid, CircularProgress, Button } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { speciesDict } from './SpeciesList';
import { StyledCard } from '../Styled';
import { SpeciesData } from '../models/types';
import { getSpeciesData } from '../api/getSpeciesData';

interface SpeciesViewProps {
  selectedSpecies: string;
  favoriteSpecies: string[];
  updateFavoriteSpecies: (species: string) => void;
}

function createMarkup(text: string) {
  return { __html: text };
}

export const SpeciesView: FC<SpeciesViewProps> = ({ selectedSpecies, favoriteSpecies, updateFavoriteSpecies }) => {
  const [selectedSpeciesData, setSelectedSpeciesData] = useState<SpeciesData>({
    scientific_name: '',
    habitat: '',
    population_status: '',
    research: '',
    photo: {
      src: '',
      alt: '',
      title: '',
    },
    last_update: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const speciesCommonName = Object.keys(speciesDict).find((key) => speciesDict[key] === selectedSpecies) || '';

  useEffect(() => {
    (async () => {
      try {
        if (selectedSpecies) {
          setLoading(true);
          const data = await getSpeciesData(selectedSpecies);
          setSelectedSpeciesData(data);
        }
      } catch (error) {
        console.log(`Error fetching species data: ${error}`);
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, [selectedSpecies]);

  return (
    <>
      {error ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
          <Typography variant="body1" color="error" align="center" sx={{ marginBottom: '10px' }}>
            Error fetching species data.
          </Typography>
          <Button variant="outlined" onClick={() => window.location.reload()}>
            Retry
          </Button>
        </Box>
      ) : (
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
      )}
    </>
  );
};
