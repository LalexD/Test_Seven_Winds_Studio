import { TreeResponse } from 'src/api/Api';

export function updateItemById<T extends TreeResponse>(items: T[], id: number, newItem: T): T[] {
  return items.map((item) => {
    if (item.id === id) {
      return { ...item, ...newItem };
    }
    if (item.child && Array.isArray(item.child)) {
      return { ...item, child: updateItemById(item.child, id, newItem) };
    }
    return item;
  });
}

export function addItemInParentById<T extends TreeResponse>(items: T[], parentId: number, newItem: T) {
  items.forEach((item) => {
    if (item.id === parentId) {
      item.child = item.child ? [...item.child, newItem] : [newItem];
    }
    if (item.child && Array.isArray(item.child) && item.child.length > 0) {
      addItemInParentById(item.child, parentId, newItem);
    }
  });
}

export function deleteItemInChildById<T extends TreeResponse>(items: T[], itemId: number) {
  items.forEach((item) => {
    if (item.child && Array.isArray(item.child) && item.child.length > 0) {
      const findItem = item.child?.find((child) => child.id === itemId);
      if (!!findItem) {
        item.child = item.child.filter((child) => child.id !== itemId);
      }
      deleteItemInChildById(item.child, itemId);
    }
  });
}
