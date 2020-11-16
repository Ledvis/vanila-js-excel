import { $ } from '@/core/Dom';
import { CurrentRoute } from '@/router/CurrentRoute';

/**
 * @description
 * @export
 * @class Router
 */
export class Router {
  /**
   *Creates an instance of Router.
   * @param {String} selector
   * @param {Object.<String, any>} routes
   * @memberof Router
   */
  constructor(selector, routes) {
    this.$placeholder = $(selector);
    this.changeRoute = this.changeRoute.bind(this);
    this.routes = routes;

    this.init();
  }

  /**
   * @description
   * @memberof Router
   */
  init() {
    window.addEventListener('hashchange', this.changeRoute);
    this.changeRoute();
  }

  /**
   * @description
   * @memberof Router
   */
  changeRoute() {
    if (this.page) this.page.destroyed();

    const existedRoutes = Object.keys(this.routes);
    const PageClass = existedRoutes.includes(CurrentRoute.name) ? this.routes[CurrentRoute.name] : this.routes.notFound;

    this.page = new PageClass();
    this.$placeholder.clear();
    this.$placeholder.append(this.page.getRoot());
    this.page.mounted();
  }
}
