import './App.css'

import { useContext } from 'react';
import { AuthContext } from './contexts/auth';
import AuthenticationRoute from './routes/AuthenticationRoute';
import OtherPageRoute from './routes/OtherPageRoute';

function App() {
  const { user } = useContext(AuthContext);
  return user? <OtherPageRoute/> : <AuthenticationRoute/>;
}

export default App
