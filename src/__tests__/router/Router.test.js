import { Router } from '@/router/Router';
import { Dashboard } from '@/pages/Dashboard';
import { Spreadsheets } from '@/pages/Spreadsheets';
import { NotFound } from '@/pages/NotFound';

jest.mock('@/assets/spreadsheets.png', () => ({}));

describe('description', function() {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="app"></div>
    `;
    document.addEventListener = jest.fn((_event, callback) => {
      callback();
    });
  });

  it('should', () => {
    const routes = {
      dashboard: Dashboard,
      spreadsheets: Spreadsheets,
      notFound: NotFound,
    };
    const defaultRoute = 'dashboard';

    window.location.hash = '#dashboard';
    const router = new Router('#app', {
      routes,
      defaultRoute,
    });
    router.changeRoute = jest.fn();

    expect(router.routes).toEqual(routes);
    expect(router.defaultRoute).toEqual(defaultRoute);

    window.location.hash = '#spreadsheets/1607407558959';
    router.changeRoute();

    expect(router.changeRoute).toHaveBeenCalled();
  });
});
