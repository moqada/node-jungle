import minimatch from 'minimatch';


/**
 * Return value of tag
 *
 * @param {Object[]} tags tag object
 * @param {string} key key
 * @return {string}
 */
export function getTagValue(tags, key) {
  const tag = tags.find(t => t.Key === key);
  return tag && tag.Value;
}


/**
 * Return filtered objects
 *
 * @param {Object[]} configs configs
 * @param {Object[]} objects objects
 * @return {Object[]}
 */
export function filterObjects(configs, objects) {
  return configs.reduce((results, config) => {
    if (!config.query) {
      return results;
    }
    return results.filter(o => {
      return minimatch(o[config.key], config.query, {
        nobrace: true,
        noglobstar: true,
        noext: true
      });
    });
  }, objects);
}

export default {getTagValue, filterObjects};
