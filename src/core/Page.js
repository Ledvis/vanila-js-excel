/**
 * @description
 * @export
 * @class Page
 */
export class Page {
  /**
   * @description
   * @memberof Page
   */
  getRoot() {
    throw new Error('getRoot method should be provided!');
  }

  /**
   * @description
   * @memberof Page
   */
  mounted() {
    this.child?.mounted();
  }

  /**
   * @description
   * @memberof Page
   */
  destroyed() {
    this.child?.destroyed();
  }
}
