// ฟังก์ชันสำหรับเรนเดอร์รายชื่ออุทยานแยกตามจังหวัดในสไตล์ Accordion (ย่อ/ขยายได้ + คุมโทนสว่าง)

function renderNationalParksAccordion(containerId, parksDataByProvince) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = '';
  const section = document.createElement('div');
  section.className = 'park-province-section';

  Object.keys(parksDataByProvince).forEach(provinceName => {
    const parksList = parksDataByProvince[provinceName];
    
    // สร้าง Accordion Card
    const accordion = document.createElement('div');
    accordion.className = 'province-accordion';

    // แถบหัวข้อจังหวัด
    const header = document.createElement('div');
    header.className = 'province-header';
    header.innerHTML = `
      <div>
        <span>จังหวัด${provinceName}</span>
        <span class="province-badge">${parksList.length} แห่ง</span>
      </div>
      <span class="accordion-arrow">▼</span>
    `;

    // อีเวนต์คลิกเปิด-ปิด
    header.addEventListener('click', () => {
      accordion.classList.toggle('open');
    });

    // คอนเทนเนอร์รายการอุทยาน
    const content = document.createElement('div');
    content.className = 'province-content';

    parksList.forEach(park => {
      const parkCard = document.createElement('div');
      parkCard.className = 'park-card-light';
      
      const mapUrl = park.lat != null && park.lng != null
        ? `https://www.google.com/maps/search/?api=1&query=${park.lat},${park.lng}`
        : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(park.name)}`;

      parkCard.innerHTML = `
        <div class="park-card-name">${park.name}</div>
        <div>
          <a href="${mapUrl}" target="_blank" rel="noopener" class="park-card-link">
            📍 เปิดใน Google Maps
          </a>
        </div>
      `;
      content.appendChild(parkCard);
    });

    accordion.appendChild(header);
    accordion.appendChild(content);
    section.appendChild(accordion);
  });

  container.appendChild(section);
}
