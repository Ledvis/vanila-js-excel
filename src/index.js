import '@/scss/index.scss';
import { Router } from '@/router/Router';
import { Dashboard } from '@/pages/Dashboard';
import { Spreadsheets } from '@/pages/Spreadsheets';
import { NotFound } from '@/pages/NotFound';

new Router('#app', {
  routes: {
    dashboard: Dashboard,
    spreadsheets: Spreadsheets,
    notFound: NotFound,
  },
  defaultRoute: 'dashboard',
});
