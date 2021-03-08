import { $ } from '@/core/Dom';
import { Page } from '@/core/Page';
import img from '@/assets/spreadsheets.png';

/**
 * @description
 * @export
 * @class NotFound
 * @extends {Page}
 */
export class NotFound extends Page {
  /**
   * @description
   * @return {Object}
   * @memberof NotFound
   */
  getRoot() {
    const $root = $.create('div', 'outerContainer');

    $root.html(`
      <div class="innerContainer">
        <div align="center">
          <div style="margin: 18px 0; white-space: nowrap;">
            <a href="//support.google.com/docs/">
              <img src="${img}" alt="Google logo" height="35px">
            </a>
          </div>
          <p class="errorMessage" style="padding-top: 50px">Sorry, unable to open the file at this time.</p>
          <p> Please check the address and try again. </p>
          <div style="background: #F0F6FF; border: 1px solid black; margin-top: 35px; padding: 10px 25px; width: 500px;
          ">
            <p><strong>Get stuff done with Google Drive</strong></p>
            <p>Apps in Google Drive make it easy to create, store and share online documents, spreadsheets, 
              presentations and more.</p>
            <p>Learn more at <a href="https://drive.google.com/start/apps">drive.google.com/start/apps</a>.</p>
          </div>
        </div>
      </div>`);

    return $root;
  }
}
