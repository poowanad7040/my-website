const generateButton = document.getElementById('generateNumber');
const resetButton = document.getElementById('resetButton');
const playerNameInput = document.getElementById('playerName');
const resultDiv = document.getElementById('result');
const playersListDiv = document.getElementById('playersList'); // ส่วนแสดงข้อมูลผู้เล่น

let usedNumbers = JSON.parse(localStorage.getItem('usedNumbers')) || []; // เก็บข้อมูลที่ใช้ไปแล้ว
let players = JSON.parse(localStorage.getItem('players')) || {}; // เก็บข้อมูลผู้เล่น

// ฟังก์ชันสุ่มเลข
generateButton.addEventListener('click', () => {
  const playerName = playerNameInput.value.trim();

  if (!playerName) {
    alert("กรุณากรอกชื่อก่อนสุ่ม");
    return;
  }

  // เช็คว่าเพิ่งสุ่มไปหรือยัง
  if (players[playerName]) {
    resultDiv.textContent = `${playerName} เคยสุ่มแล้วและได้หมายเลข ${players[playerName]}`;
    return;
  }

  // สุ่มตัวเลข 1-100 ที่ยังไม่ถูกใช้
  let randomNum;
  do {
    randomNum = Math.floor(Math.random() * 100) + 1; // สุ่มตัวเลข 1-100
  } while (usedNumbers.includes(randomNum)); // ตรวจสอบว่าตัวเลขซ้ำหรือไม่

  // เก็บตัวเลขที่ใช้แล้ว
  usedNumbers.push(randomNum);
  players[playerName] = randomNum; // บันทึกหมายเลขที่สุ่มให้ผู้เล่น

  // บันทึกข้อมูลใน localStorage
  localStorage.setItem('usedNumbers', JSON.stringify(usedNumbers));
  localStorage.setItem('players', JSON.stringify(players));

  // แสดงผลลัพธ์
  resultDiv.textContent = `${playerName} ได้หมายเลข: ${randomNum}`;

  // แสดงข้อมูลของผู้เล่นทั้งหมด
  showPlayersList();
});

// ฟังก์ชันแสดงข้อมูลของผู้เล่นทั้งหมด
function showPlayersList() {
  const playersData = JSON.parse(localStorage.getItem('players')) || {};
  let playersHTML = '<ul>';

  for (const [name, number] of Object.entries(playersData)) {
    playersHTML += `<li>${name} ได้หมายเลข ${number}</li>`;
  }

  playersHTML += '</ul>';
  playersListDiv.innerHTML = playersHTML;
}

// ฟังก์ชันรีเซ็ต
resetButton.addEventListener('click', () => {
  // ล้างข้อมูลทั้งหมด
  usedNumbers = [];
  players = {};
  localStorage.removeItem('usedNumbers'); // ลบข้อมูลใน localStorage
  localStorage.removeItem('players'); // ลบข้อมูลใน localStorage
  resultDiv.textContent = 'กรุณากรอกชื่อและกดสุ่ม';
  showPlayersList(); // แสดงข้อมูลที่เก็บไว้หลังรีเซ็ต
});

// เรียกฟังก์ชันเพื่อแสดงข้อมูลผู้เล่นเมื่อโหลดหน้า
showPlayersList();
