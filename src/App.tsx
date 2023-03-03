import AppBar from '@mui/material/AppBar';
import Card from '@mui/material/Card';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { SpeciesList } from './SpeciesViewer/SpeciesList';
import { SpeciesView } from './SpeciesViewer/SpeciesView';
import { useState } from 'react';
import { StyledCard } from './Styled';

const theme = createTheme();

export default function App() {
  const [selectedSpecies, setSelectedSpecies] = useState<string>('');
  const [favoriteSpecies, setFavoriteSpecies] = useState<string[]>([]);

  const updateSelectedSpecies = (species: string) => {
    setSelectedSpecies(species);
  };

  const updateFavoriteSpecies = (species: string) => {
    if (favoriteSpecies.includes(species)) {
      setFavoriteSpecies(favoriteSpecies.filter((s) => s !== species));
    } else {
      setFavoriteSpecies([...favoriteSpecies, species]);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="sticky" sx={{ width: '100%' }}>
        <Toolbar>
          <Typography variant="h4" color="inherit">
            Aquatic Life Species Information Center
          </Typography>
        </Toolbar>
      </AppBar>
      <main style={{ marginTop: theme.spacing(4) }}>
        
        {/* Species List */}
        <Grid container spacing={3}>
          <Grid item xs="auto" sx={{ marginLeft: '10px' }}>
            <Card>
              <SpeciesList
                updateSelectedSpecies={updateSelectedSpecies}
                favoriteSpecies={favoriteSpecies}
              ></SpeciesList>
            </Card>
          </Grid>

          {/* Species Viewer */}
          <Grid container sx={{ width: '900px', margin: '10px' }}>
            <Box
              sx={{
                height: '100%',
                bgcolor: 'background.paper',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              {selectedSpecies ? (
                <Card>
                  <SpeciesView
                    selectedSpecies={selectedSpecies}
                    updateFavoriteSpecies={updateFavoriteSpecies}
                    favoriteSpecies={favoriteSpecies}
                  />
                </Card>
              ) : (
                <StyledCard
                  sx={{
                    marginTop: '15px',
                    width: '800px',
                    height: '510px',
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  Select a species to view information.
                </StyledCard>
              )}
            </Box>
          </Grid>
        </Grid>
      </main>
    </ThemeProvider>
  );
}
