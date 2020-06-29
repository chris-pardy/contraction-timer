import { ticks } from './ticks';

const conn = indexedDB.open('contractions');
conn.onupgradeneeded = () => {
  const db = conn.result;
  db.createObjectStore('ticks', { keyPath: 'time' });
}
conn.onsuccess = e => {
  const db = conn.result;
  const transaction = db.transaction('ticks', 'readonly');
  const store = transaction.objectStore('ticks');
  const itemsRequest = store.getAll();
  let tickOffest = 0;
  let updateQueue = null;
  itemsRequest.onsuccess = () => {
    const data = itemsRequest.result;
    tickOffest = Math.max(tickOffest, ...data.map(({ time }) => time))
    data.sort((d1, d2) => d1.time - d2.time);
    ticks.update($ticks => [...data, ...$ticks]);
  }
  transaction.commit();
  const backgroundUpdate = () => {
    if (updateQueue === null || updateQueue.length === 0) {
      return;
    }
    console.log('Updating', updateQueue)
    const transaction = db.transaction('ticks', 'readwrite');
    const store = transaction.objectStore('ticks');
    updateQueue.forEach(i => store.add(i));
    const previous = updateQueue;
    updateQueue = null;
    tickOffest = Math.max(tickOffest, ...previous.map(({ time }) => time));
    transaction.oncomplete = () => {
      console.log('wrote data');
    }
    transaction.onerror = () => {
      console.log('Error', transaction.error);
      if (updateQueue === null) {
        updateQueue = previous;
      } else {
        updateQueue = [...previous, ...updateQueue];
      }
      setTimeout(backgroundUpdate, 1);
    }
    transaction.error;
  }
  ticks.subscribe($ticks => {
    updateQueue = $ticks.filter(({ time }) => time > tickOffest);
    setTimeout(backgroundUpdate, 1);
  })
}
