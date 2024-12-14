export function addDataIndex(dict) {
  const newValue = { dataIndex: dict.title, ...dict };
  return newValue;
}
