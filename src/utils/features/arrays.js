export function arraysHaveSameElements(arr1, arr2) {
    return arr1.length === arr2.length && arr1.every(element => arr2.includes(element));
}