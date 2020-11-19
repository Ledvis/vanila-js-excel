import { CurrentRoute } from '@/router/CurrentRoute';

/**
 * @description
 * @param {Object} date
 * @return {String}
 */
function fabricDate(date) {
  return date.toLocaleString('uk-UK', {
    year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
  });
}

/**
 * @description
 * @param {Array} states
 * @return {String}
 */
export function createTableList(states) {
  const list = states.map((dates, index) => {
    const created = fabricDate(new Date(dates.created));
    const modified = fabricDate(new Date(dates.modified));

    return `<li class="db__record">
              <a href="#spreadsheets/${dates.created}">Table number ${index + 1}</a>
              <strong class="db__created">
                <span class="db__date">${created}</span>
              </strong>
              <strong>
                <span class="db__date">${modified}</span>
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
          <span class="db__caption">Created</span>
          <span>Modified</span>
        </div>
        ${createTableList(states)}
      </div>`;
}
