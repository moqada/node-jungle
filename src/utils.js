export function getTagValue(tags, key) {
  const tag = Array.find(tags, t => t.Key === key);
  return tag && tag.Value;
}

export default {getTagValue};
