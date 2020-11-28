/**
 * @description
 * @return {Array}
 * @export
 */
export function fetchStateEntries() {
  const states = [];

  for (let index = 0; index < localStorage.length; index++) {
    const stateKey = localStorage.key(index);

    if (stateKey.includes('spreadsheet')) {
      const created = JSON.parse(stateKey.split(':')[1]);
      const modified = JSON.parse(localStorage.getItem(stateKey)).modifiedState;

      states.push({
        created,
        modified,
      });
    }
  }

  return states;
}
