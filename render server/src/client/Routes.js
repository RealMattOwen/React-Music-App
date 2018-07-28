import React from 'react';
import App from './App';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import MyPlaylistsPage from './pages/MyPlaylistsPage';
import NewPlaylistPage from './pages/NewPlaylistPage';
import NotFoundPage from './pages/NotFoundPage';
import PlaylistPage from './pages/PlaylistPage';
import RenamePlaylistPage from './pages/RenamePlaylistPage';
import SignUpPage from './pages/SignUpPage';

export default [
    {
        ...App,
        routes: [
            {
                ...HomePage,
                exact: true,
                path: '/'
            },
            {
                ...LoginPage,
                exact: true,
                path: '/login'
            },
            {
                ...MyPlaylistsPage,
                exact: true,
                path: '/playlists'
            },
            {
                ...NewPlaylistPage,
                exact: true,
                path: '/playlists/new'
            },
            {
                ...PlaylistPage,
                exact: true,
                path: '/playlists/:playlistId'
            },
            {
                ...RenamePlaylistPage,
                exact: true,
                path: '/playlists/:playlistId/rename'
            },
            {
                ...SignUpPage,
                exact: true,
                path: '/signup'
            },
            {
                ...NotFoundPage
            }
        ]
    }
];