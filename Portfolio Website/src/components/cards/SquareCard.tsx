import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
  Grid,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { ChevronLeft, ChevronRight, Github } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Windows Form Application for a Restaurant',
    description:
      "The Windows Form Application is designed for managing a restaurant's table reservations. It includes functionality for users to log in and register, and it supports three types of users: Admin, User, and Guest.",
    images: [
      'RegistrationWindows.png',
      'MainMenuwindows.png',
      'Mainpagewindows.png',
      'InsertNonAdminwindows.png',
      'ModifyWindows.png',
      'ModifyWindows2.png',
      'Deletewindows.png',
    ],
    repoLink: 'https://github.com/gergopopovici/Windows-Form-Applicaton-Database',
  },
  {
    id: 2,
    title: 'Basic Java Snake Game',
    description: 'I implemented a basic Java Snake game using the Model-View-Controller design pattern.',
    images: ['mainMenuSnake.png', 'helpMenuSnake.png', 'GamePlaySnake.png', 'LeaderBoardSnake.png'],
    repoLink: 'https://github.com/gergopopovici/Basic-Snake-Game',
  },
  {
    id: 3,
    title: 'Rental Property Listing Website',
    description:
      'This web application, with a Hungarian user interface, allows users to advertise and sell apartments. Features include: Login as admin or user (registration required for the latter) Guest: view listings, search, filter User: guest functionalities + manage own listings (including images) - send messages to other users Admin: user functionalities + delete any listing - list and search users - promote user to admin - revoke admin rights',
    images: [
      'listingPropertyWebsite.png',
      'LoginPropertyListing.png',
      'registrationPropertyListing.png',
      'propertyWebisteIndexPage.png',
      'pictureUploadingPropertyWebsite1.png',
      'pictureUploadingPropertyWebsite2.png',
      'messagePropertyWebsite.png',
    ],
    repoLink: 'https://github.com/gergopopovici/PropertyWebsite',
  },
  {
    id: 4,
    title: 'Basic Java Snake Game',
    description: 'I implemented a basic Java Snake game using the Model-View-Controller design pattern.',
  },
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleNextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => (prev + 1) % (selectedProject.images?.length || 1));
    }
  };

  const handlePrevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex(
        (prev) => (prev - 1 + (selectedProject.images?.length ?? 1)) % (selectedProject.images?.length ?? 1),
      );
    }
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: (theme) => theme.palette.background.default, minHeight: '100vh' }}>
      <Typography variant="h3" align="center" gutterBottom>
        My Projects
      </Typography>

      <Grid container spacing={2} justifyContent="center">
        {projects.map((project) => (
          <Grid item xs={12} sm={6} md={4} key={project.id}>
            <Card
              sx={{
                width: '100%',
                height: 300,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': { transform: 'scale(1.05)' },
              }}
              onClick={() => {
                setSelectedProject(project);
                setCurrentImageIndex(0);
              }}
            >
              <CardContent>
                <Typography gutterBottom variant="h6">
                  {project.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {project.description.substring(0, 80)}...
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={!!selectedProject} onClose={() => setSelectedProject(null)} maxWidth="md" fullWidth={fullScreen}>
        {selectedProject && (
          <>
            <DialogTitle>{selectedProject.title}</DialogTitle>
            <DialogContent dividers>
              <Typography variant="body1">{selectedProject.description}</Typography>
              <Box
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 3, flexDirection: 'column' }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
                  <IconButton onClick={handlePrevImage}>
                    <ChevronLeft size={24} />
                  </IconButton>
                  <IconButton onClick={handleNextImage}>
                    <ChevronRight size={24} />
                  </IconButton>
                </Box>
                <img
                  src={selectedProject.images?.[currentImageIndex]}
                  alt={`${selectedProject.title} screenshot ${currentImageIndex + 1}`}
                  style={{ width: '100%', maxWidth: '500px', borderRadius: '8px' }}
                />
              </Box>
            </DialogContent>
            <DialogActions>
              {selectedProject.repoLink && (
                <Button
                  variant="outlined"
                  component="a"
                  href={selectedProject.repoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  startIcon={<Github size={18} />}
                >
                  View Code
                </Button>
              )}
              <Button onClick={() => setSelectedProject(null)}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
}
