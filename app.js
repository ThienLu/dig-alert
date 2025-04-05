// Register service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').then(reg => {
    console.log('Service Worker registered ✅');
  }).catch(err => console.error('SW registration failed:', err));
}

// Ask for notification permission
function requestPermission() {
  Notification.requestPermission().then(result => {
    if (result === 'granted') {
      alert("Notifications enabled!");
    } else {
      alert("Notifications denied.");
    }
  });
}

// Vana'diel time calc
const msRealDay = 24 * 60 * 60 * 1000; // milliseconds in a real day
const basisDate = new Date(Date.UTC(2002, 5, 23, 15, 0, 0));

function updateVanaTime() {
  const now = new Date();
  const vanaDate = ((898 * 360 + 30) * msRealDay) + (now.getTime() - basisDate.getTime()) * 25;

  const vHour = Math.floor((vanaDate % msRealDay) / (60 * 60 * 1000));
  const vMin = Math.floor((vanaDate % (60 * 60 * 1000)) / (60 * 1000));

  // Send next notification when it's time
  if (navigator.serviceWorker && navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({ type: 'checkTime', currentHour: vHour, currentMin: vMin });
  }
}

setInterval(updateVanaTime, 1000);
