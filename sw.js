self.addEventListener('install', e => {
  self.skipWaiting(); // Activate immediately
});

self.addEventListener('activate', e => {
  console.log('Service Worker activated ✅');
});

self.addEventListener('message', e => {
  if (e.data.type === 'checkTime') {
    const { currentHour, currentMin } = e.data;

    if (parseInt(currentHour) === 22 && currentMin === 30) {
      self.registration.showNotification("⚠️ Vana'diel Alert", {
        body: "It's 22:30 Vana'diel time!",
        icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Circle-icons-alarm.svg/1024px-Circle-icons-alarm.svg.png"
      });
    }
  }
});
