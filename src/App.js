import './App.css';
import Banner from './components/Banner';
import Dashboard from './components/Dashboard';
import { BannerProvider } from './contexts/BannerContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BannerProvider>
      <div>
        <Banner />
        <Dashboard />
        <ToastContainer />
      </div>
    </BannerProvider>
  );
}

export default App;
