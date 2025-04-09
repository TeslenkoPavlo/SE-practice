document.addEventListener('DOMContentLoaded', function () {
  const modal = document.getElementById('welcomeModal');
  const startButton = document.getElementById('startNavigation');

  if (modal && startButton) {
    startButton.addEventListener('click', function () {
      modal.style.display = 'none';

      if (navigator.geolocation) {
        navigator.geolocation.watchPosition(function (position) {
          const userLat = position.coords.latitude;
          const userLon = position.coords.longitude;
          const targetLat = 49.587878;
          const targetLon = 34.542639;

          // Гаверсинус формула
          const R = 6371000; // Радіус Землі в метрах
          const lat1 = userLat * Math.PI / 180;
          const lat2 = targetLat * Math.PI / 180;
          const deltaLat = (targetLat - userLat) * Math.PI / 180;
          const deltaLon = (targetLon - userLon) * Math.PI / 180;

          const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
            Math.cos(lat1) * Math.cos(lat2) *
            Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);

          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          const distance = Math.round(R * c);

          document.getElementById('distanceValue').textContent = Math.max(0, distance - 10);

          // Перевірка досягнення пункту призначення
          if (distance <= 1) {
            const destinationModal = document.getElementById('destinationModal');
            if (destinationModal && destinationModal.style.display === 'none') {
              destinationModal.style.display = 'flex';
              const closeButton = document.getElementById('closeDestination');
              if (closeButton) {
                closeButton.onclick = function () {
                  destinationModal.style.display = 'none';
                  window.location.href = 'site.html';
                };
              }
            }
          }

          // Перевірка близькості до точок підказки
          const hints = [
            { lat: 49.587891, lon: 34.543045, text: 'Йдіть праворуч до маленьких сходів' },
            { lat: 49.587871, lon: 34.542943, text: 'Підніміться по сходам на другий поверх' },
            { lat: 49.587811, lon: 34.542771, text: 'Поверніть праворуч та йдіть до першого повороту' }
          ];

          const hintBox = document.getElementById('hintBox');
          let showingHint = false;

          for (const hint of hints) {
            const hintA = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
              Math.cos(lat1) * Math.cos(hint.lat * Math.PI / 180) *
              Math.sin((hint.lon - userLon) * Math.PI / 180) * Math.sin((hint.lon - userLon) * Math.PI / 180);
            const hintC = 2 * Math.atan2(Math.sqrt(hintA), Math.sqrt(1 - hintA));
            const hintDistance = Math.round(R * hintC);

            if (hintDistance <= 10) {
              hintBox.style.display = 'block';
              hintBox.textContent = hint.text;
              showingHint = true;
              break;
            }
          }

          if (!showingHint) {
            hintBox.style.display = 'none';
          }

          // Розрахунок напрямку
          const y = Math.sin(deltaLon) * Math.cos(lat2);
          const x = Math.cos(lat1) * Math.sin(lat2) -
            Math.sin(lat1) * Math.cos(lat2) * Math.cos(deltaLon);
          const bearing = (Math.atan2(y, x) * 180 / Math.PI + 360) % 360;

          gpsBearing = bearing;
          updateArrows();
        }, function (err) {
          let errorMsg = '';
          const distanceElement = document.getElementById('distanceValue');
          const modal = document.getElementById('welcomeModal');

          switch (err.code) {
            case 1:
              errorMsg = 'Будь ласка, надайте доступ до геолокації у налаштуваннях браузера та оновіть сторінку';
              modal.style.display = 'flex';
              modal.querySelector('p').textContent = errorMsg;
              break;
            case 2:
              errorMsg = 'Позиція недоступна. Перевірте GPS та спробуйте знову';
              break;
            case 3:
              errorMsg = 'Час очікування геолокації вичерпано. Спробуйте знову';
              break;
            default:
              errorMsg = 'Невідома помилка геолокації. Спробуйте оновити сторінку';
          }

          if (distanceElement) {
            distanceElement.textContent = 'Помилка';
          }
          console.error('Помилка визначення геолокації:', err);
        }, {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: 5000
        });
      } else {
        console.error('Геолокація не підтримується');
      }
    });
  }

  let gpsBearing = 0;
  let phoneHeading = 0;

  function updateArrows() {
    const topArrow = document.getElementById('gpsArrow');
    const bottomArrow = document.querySelector('.main-arrow.down');
    const topRotation = gpsBearing - phoneHeading - 45;
    const bottomRotation = topRotation + 180;

    if (topArrow) {
      topArrow.style.animation = 'none';
      topArrow.style.transform = `rotate(${topRotation}deg)`;
    }
    if (bottomArrow) {
      bottomArrow.style.animation = 'none';
      bottomArrow.style.transform = `rotate(${bottomRotation}deg)`;
    }
  }

  if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', function (event) {
      if (event.webkitCompassHeading) {
        phoneHeading = event.webkitCompassHeading;
      } else if (event.alpha) {
        phoneHeading = event.alpha;
      } else {
        phoneHeading = 0;
      }
      updateArrows();
    }, true);
  } else {
    console.error('DeviceOrientationEvent не підтримується');
  }
});
