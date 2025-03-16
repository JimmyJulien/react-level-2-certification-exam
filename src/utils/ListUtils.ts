function shuffle(list: string[]): string[] {
  return list
    .map((item) => ({ item, sort: Math.random() }))
    .sort((item1, item2) => item1.sort - item2.sort)
    .map(({ item }) => item);
}

export const ListUtils = Object.freeze({
  shuffle,
});
