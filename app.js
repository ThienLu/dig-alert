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
const msGameDay = (24 * 60 * 60 * 1000) / 25;
const basisDate = new Date(Date.UTC(2002, 5, 23, 15, 0, 0));

function updateVanaTime() {
  const now = new Date();
  const vanaMs = ((898 * 360 + 30) * 86400000) + (now.getTime() - basisDate.getTime()) * 25;
  const vHour = Math.floor((vanaMs % 86400000) / 3600000);
  const vMin = Math.floor((vanaMs % 3600000) / 60000);
  document.getElementById("vanaTime").textContent = `Time: ${String(vHour).padStart(2, '0')}:${String(vMin).padStart(2, '0')}`;

  // Send next notification when it's time
  if (navigator.serviceWorker && navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({ type: 'checkTime', currentHour: vHour, currentMin: vMin });
  }
}

setInterval(updateVanaTime, 1000);
