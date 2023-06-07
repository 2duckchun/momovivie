export function usePagination(index: number) {
  let pageArray = [];

  if (index % 10 === 0) {
    for (let i = index - 9; i <= index; i++) {
      pageArray.push(i);
    }
  } else if (index % 10 !== 0) {
    const startIndex = Math.floor(index / 10) * 10 + 1;
    const endIndex = Math.floor(index / 10) * 10 + 10;
    for (let i = startIndex; i <= endIndex; i++) {
      pageArray.push(i);
    }
  }

  return pageArray;
}
