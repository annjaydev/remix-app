import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { FC } from 'react';

import Home from '@/components/Home/Home';
import Layout from '../Layout/Layout';
import NotFound from '../NotFound/NotFound';
import Remixes from '../Remixes/Remixes';
import ScrollToTop from '@/shared/ScrollToTop/ScrollToTop';

const AppRoutes: FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="remixes" element={<Remixes />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </ScrollToTop>
    </BrowserRouter>
  );
};
export default AppRoutes;
