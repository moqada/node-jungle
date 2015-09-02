import minimatch from 'minimatch';


export function getTagValue(tags, key) {
  const tag = Array.find(tags, t => t.Key === key);
  return tag && tag.Value;
}


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
