import { Container } from '@mui/material'
import { Route, Routes } from 'react-router-dom'
import { LoadingProgress } from './components/common/LoadingProgress'
import EditorPage from './components/Editor/EditorPage'
import { Playground } from './components/Playground'
import PostPage from './components/Post/PostPage'
import { SignInPage } from './components/SignIn/SignInPage'
import { AuthProvider } from './context/AuthContext'
import { LoadingProvider } from './context/LoadingContext'

export default function App() {
  return (
    <div className="App">
      <Container disableGutters>
        <AuthProvider>
          <LoadingProvider>
            <LoadingProgress />
            <Routes>
              <Route path="/*" element={<PostPage />} />
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/edit/*" element={<EditorPage />} />
              <Route path="/playground" element={<Playground />} />
            </Routes>
          </LoadingProvider>
        </AuthProvider>
      </Container>
    </div>
  )
}
