import { Box, Container, Paper } from '@mui/material'
import { Route, Routes } from 'react-router-dom'
import { LoadingProgress } from './components/common/LoadingProgress'
import EditorPage from './components/Editor/EditorPage'
import { Playground } from './components/Playground'
import PostPage from './components/Post/PostPage'
import { SignInPage } from './components/SignIn/SignInPage'
import { AuthProvider } from './context/AuthContext'
import { LoadingProvider } from './context/LoadingContext'

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <LoadingProvider>
          <Container maxWidth="md">
            <LoadingProgress />
            <Paper>
              <Box p={4}>
                <Routes>
                  <Route path="/*" element={<PostPage />} />
                  <Route path="/signin" element={<SignInPage />} />
                  <Route path="/edit/*" element={<EditorPage />} />
                  <Route path="/playground" element={<Playground />} />
                </Routes>
              </Box>
            </Paper>
          </Container>
        </LoadingProvider>
      </AuthProvider>
    </div>
  )
}

export default App
