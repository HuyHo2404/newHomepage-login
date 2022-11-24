import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { AdminLayout, UserLayout } from './components/Layouts/AdminLayout/AdminLayout';
import AdminLayout from './components/Layouts/AdminLayout/AdminLayout';
import Account from './pages/Account';
import Campaign from './pages/Campaign';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import DACMember from './pages/DACMember';
import Advertiser from './pages/Advertiser';
import PageNotFound from './pages/PageNotFound';
import Sidebar from './components/Layouts/AdminLayout/Sidebar';

function App() {
  return (
  
      <div className="App">
        <Routes>
          <Route path="/" exact element={<Login />}></Route>
          <Route path="*" exact element={<PageNotFound />}></Route>
          <Route path="/login" element={<Login />}></Route>
          {/* <Route path="/register" element={<Register />}></Route> */}
          <Route path="/dac-member" element={<DACMember />}></Route>
          <Route path="/advertiser" element={<Advertiser />}></Route>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard  />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="campaign" element={<Campaign />} />
            <Route path="account" element={<Account />} />
          </Route>
        </Routes>
      </div>
  );
}
export default App;
