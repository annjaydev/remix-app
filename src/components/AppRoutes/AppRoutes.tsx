import { Route, Routes, HashRouter, Navigate } from 'react-router-dom';
import { FC } from 'react';

import { Home } from '../Home';
import { Layout } from '../Layout';
import { Remixes } from '../Remixes';
import { NotFound } from '../NotFound';
import { ScrollToTop } from '@/shared';

const AppRoutes: FC = () => (
  <HashRouter>
    <ScrollToTop>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="remixes" element={<Remixes />} />
        </Route>
      </Routes>
    </ScrollToTop>
  </HashRouter>
);
export default AppRoutes;
