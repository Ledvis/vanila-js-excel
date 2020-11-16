import { CurrentRoute } from '@/router/CurrentRoute';

/**
 * @description
 * @param {Array} states
 * @return {String}
 */
export function createTableList(states) {
  const list = states.map((timestamp, index) => {
    const date = new Date(timestamp);

    return `<li class="db__record">
              <a href="#spreadsheets/${timestamp}">Table number ${index + 1}</a>
              <strong>
                <span class="db__date">${`${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`}</span>
                <span class="db__time">${`${date.getHours()}:${date.getMinutes()}`}</span>
              </strong>
            </li>`;
  }).join('');

  return `<ul class="db__list">
            ${list}
          </ul>`;
}

window._createNewSpreadsheet = () => {
  CurrentRoute.path = `#spreadsheets/${Date.now()}`;
};

/**
 * @description
 * @return {String}
 */
function createNewSpreadsheet() {
  return `<div class="db__new">
            <div class="db__view">
              <a onclick="_createNewSpreadsheet();" class="db__create">
                New <br /> Table
              </a>
            </div>
          </div>`;
}

/**
 * @description
 * @export
 * @param {Array} states
 * @return {String}
 */
export function createDashboard(states = []) {
  return `
      <div class="db__header">
        <h1>Excel Dashboard</h1>
      </div>
      ${createNewSpreadsheet()}
      <div class="db__table db__view">
        <div class="db__list-header">
          <span>Name</span>
          <span>Created</span>
        </div>
        ${createTableList(states)}
      </div>`;
}
