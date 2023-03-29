"use strict";

import { openDB, deleteDB, wrap, unwrap } from 'https://cdn.jsdelivr.net/npm/idb@7/+esm';

const DBNAME = "TaskDB";
const DBOS = "Tasks";

const db = await openDB(DBNAME, 1, {
  upgrade(db) {
    const store = db.createObjectStore(DBOS, {
      keyPath: 'id',
      autoIncrement: true,
    });
    store.createIndex('id', 'id');
  },
});
export async function getTask(key) {
  return (await db).get(DBOS, key);
};
export async function updateTask(taskId, taskName, taskCategory, dueDate, dueTime, isDone) {
  return (await db).put(DBOS, {
    id: taskId,
    name: taskName,
    category: taskCategory,
    dueDate: dueDate,
    dueTime: dueTime,
    isDone: isDone
  })
};
export async function addTask(taskId, taskName, taskCategory, dueDate, dueTime) {
  return (await db).add(DBOS, {
    id: taskId,
    name: taskName,
    category: taskCategory,
    dueDate: dueDate,
    dueTime: dueTime,
    isDone: 0
  });
};
export async function deleteTask(key) {
  return (await db).delete(DBOS, key);
};
export async function clearTask() {
  return (await db).clear(DBOS);
};
export async function keys() {
  return (await db).getAllKeys(DBOS);
};
export async function countKeys() {
  return (await db).count(DBOS);
};
export async function getAllTask() {
  return (await db).getAll(DBOS);
};