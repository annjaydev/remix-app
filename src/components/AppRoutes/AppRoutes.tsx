import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import { FC } from 'react';

import { Home } from '../Home';
import { Layout } from '../Layout';
import { Remixes } from '../Remixes';
import { NotFound } from '../NotFound';
import { ScrollToTop } from '@/shared';

const AppRoutes: FC = () => (
  <BrowserRouter>
    <ScrollToTop>
      <Routes>
        <Route path="/" element={<Navigate to="/remix-app" replace />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/remix-app/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/remixes" element={<Layout />}>
          <Route index element={<Remixes />} />
        </Route>
      </Routes>
    </ScrollToTop>
  </BrowserRouter>
);
export default AppRoutes;
