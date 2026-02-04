// --- 1. ฐานข้อมูลภาษา (Dictionary) 3 ภาษา ---
const translations = {
    th: {
        langBtn: 'TH',
        appTitle: 'สามหลั่น (Fee)',
        reset: 'รีเซ็ต',
        items: 'รายการ',
        total: 'รวม',
        baht: 'บ.',
        fullBaht: 'บาท',
        checkout: 'คิดเงิน / รับเงิน',
        modalTitle: 'สรุปรายการ & รับเงิน',
        totalPay: 'ยอดรวมต้องชำระ',
        inputMoney: 'กดตามเงินที่รับมา:',
        received: 'รับเงินมา:',
        change: 'เงินทอน:',
        missing: 'ขาดอีก:',
        done: 'เสร็จสิ้น (คนต่อไป)',
        touchToAdd: 'แตะเพิ่ม',
        // ชื่อรายการมาตรฐาน (Default)
        names: {
            adult_thai: 'ผู้ใหญ่ (ไทย)',
            child_thai: 'เด็ก (ไทย)',
            adult_foreign: 'ผู้ใหญ่ (ต่างชาติ)',
            child_foreign: 'เด็ก (ต่างชาติ)',
            moto: 'รถมอเตอร์ไซค์',
            car4: 'รถยนต์ 4 ล้อ',
            car6: 'รถยนต์ 6 ล้อ',
            car_heavy: 'รถยนต์ >6-10 ล้อ',
            camp_fee: 'ค่ากางเต็นท์ (คน/คืน)',
            tent_rent_3: 'เช่าเต็นท์ (3 คน)',
            pillow: 'หมอน',
            mat: 'แผ่นรองนอน',
            sleeping_bag: 'ถุงนอน'
        }
    },
    en: {
        langBtn: 'EN',
        appTitle: 'Samlan NP Fee',
        reset: 'Reset',
        items: 'Items',
        total: 'Total',
        baht: 'THB',
        fullBaht: 'THB',
        checkout: 'Checkout',
        modalTitle: 'Summary & Payment',
        totalPay: 'Total Amount',
        inputMoney: 'Received Cash:',
        received: 'Received:',
        change: 'Change:',
        missing: 'Missing:',
        done: 'Done (Next)',
        touchToAdd: 'Tap to Add',
        names: {
            adult_thai: 'Adult (Thai)',
            child_thai: 'Child (Thai)',
            adult_foreign: 'Adult (Foreign)',
            child_foreign: 'Child (Foreign)',
            moto: 'Motorcycle',
            car4: 'Car (4 Wheels)',
            car6: 'Car (6 Wheels)',
            car_heavy: 'Vehicle (>6-10 Wheels)',
            camp_fee: 'Camping Fee (pp/night)',
            tent_rent_3: 'Rent Tent (3 Pax)',
            pillow: 'Pillow',
            mat: 'Sleeping Mat',
            sleeping_bag: 'Sleeping Bag'
        }
    },
    cn: {
        langBtn: 'CN',
        appTitle: '三兰瀑布 (费用)',
        reset: '重置',
        items: '项目',
        total: '总计',
        baht: '泰铢',
        fullBaht: '泰铢',
        checkout: '结账 / 收款',
        modalTitle: '摘要和付款',
        totalPay: '应付总额',
        inputMoney: '收到的现金:',
        received: '已收:',
        change: '找零:',
        missing: '缺少:',
        done: '完成 (下一位)',
        touchToAdd: '点击添加',
        names: {
            adult_thai: '成人 (泰国)',
            child_thai: '儿童 (泰国)',
            adult_foreign: '成人 (外国)',
            child_foreign: '儿童 (外国)',
            moto: '摩托车',
            car4: '汽车 (4轮)',
            car6: '汽车 (6轮)',
            car_heavy: '大型车 (>6-10轮)',
            camp_fee: '露营费 (每人/晚)',
            tent_rent_3: '租用帐篷 (3人)',
            pillow: '枕头',
            mat: '睡垫',
            sleeping_bag: '睡袋'
        }
    }
};

// --- 2. ค่าเริ่มต้น (Default Items) ---

const defaultItems = [
    { id: 'adult_thai', price: 20 },
    { id: 'child_thai', price: 10 },
    { id: 'adult_foreign', price: 100 },
    { id: 'child_foreign', price: 50 },
    { id: 'moto', price: 20 },
    { id: 'car4', price: 30 },
    { id: 'car6', price: 100 },
    { id: 'car_heavy', price: 200 }, // มากกว่า 6 ล้อ แต่ไม่เกิน 10 ล้อ
    { id: 'camp_fee', price: 30 },   // ค่ากางเต็นท์
    { id: 'tent_rent_3', price: 225 }, // เช่าเต็นท์ 3 คน
    { id: 'pillow', price: 10 },     // หมอน
    { id: 'mat', price: 20 },        // แผ่นรองนอน
    { id: 'sleeping_bag', price: 30 } // ถุงนอน
];

let feeItems = [];
let cart = {};
let receivedMoney = 0;
// ลำดับการเปลี่ยนภาษา: TH -> EN -> CN -> TH
const langOrder = ['th', 'en', 'cn'];
let currentLang = localStorage.getItem('app_lang') || 'th';

document.addEventListener('DOMContentLoaded', () => {
    loadItems();
    updateUILanguage();
    renderItems();
    calculateTotal();
});

// --- ระบบเปลี่ยนภาษา 3 จังหวะ ---
function toggleLanguage() {
    let index = langOrder.indexOf(currentLang);
    index = (index + 1) % langOrder.length;
    currentLang = langOrder[index];
    localStorage.setItem('app_lang', currentLang);
    updateUILanguage();
    renderItems();
    calculateTotal();
}

function updateUILanguage() {
    const t = translations[currentLang];
    document.getElementById('lang-btn-text').innerText = t.langBtn;
    
    if(document.getElementById('app-title')) document.getElementById('app-title').innerText = t.appTitle;
    if(document.getElementById('btn-reset')) document.getElementById('btn-reset').innerText = t.reset;
    if(document.getElementById('lbl-items')) document.getElementById('lbl-items').innerText = t.items;
    if(document.getElementById('lbl-total')) document.getElementById('lbl-total').innerText = t.total;
    if(document.getElementById('unit-baht')) document.getElementById('unit-baht').innerText = t.baht;
    if(document.getElementById('btn-checkout')) document.getElementById('btn-checkout').innerText = t.checkout;
    
    if(document.getElementById('modal-title')) document.getElementById('modal-title').innerText = t.modalTitle;
    if(document.getElementById('lbl-total-pay')) document.getElementById('lbl-total-pay').innerText = t.totalPay;
    if(document.getElementById('unit-baht-modal')) document.getElementById('unit-baht-modal').innerText = t.fullBaht;
    if(document.getElementById('lbl-received-money')) document.getElementById('lbl-received-money').innerText = t.inputMoney;
    if(document.getElementById('lbl-received')) document.getElementById('lbl-received').innerText = t.received;
    if(document.getElementById('unit-baht-received')) document.getElementById('unit-baht-received').innerText = t.fullBaht;
    if(document.getElementById('lbl-change')) document.getElementById('lbl-change').innerText = t.change;
    if(document.getElementById('unit-baht-change')) document.getElementById('unit-baht-change').innerText = t.fullBaht;
    if(document.getElementById('btn-done')) document.getElementById('btn-done').innerText = t.done;
}

// --- ฟังก์ชันดึงชื่อ ---
function getItemName(item, lang) {
    if (item.customNames && item.customNames[lang]) {
        return item.customNames[lang];
    }
    if (translations[lang].names[item.id]) {
        return translations[lang].names[item.id];
    }
    return item.customNames?.en || item.customNames?.th || item.name || 'Unknown';
}

function loadItems() {
    const saved = localStorage.getItem('samlan_items');
    if (saved) {
        feeItems = JSON.parse(saved);
        // เช็คว่ารายการ saved มีครบเท่า default ไหม ถ้าไม่ครบ (เพราะเพิ่งเพิ่มใหม่) ให้ merge
        // (แต่เพื่อความง่าย แนะนำให้กด Reset ค่าโรงงานจะดีสุดครับ)
    } else {
        feeItems = JSON.parse(JSON.stringify(defaultItems));
    }
}

function renderItems() {
    const container = document.getElementById('items-container');
    container.innerHTML = '';
    const t = translations[currentLang];

    feeItems.forEach(item => {
        const qty = cart[item.id] || 0;
        const textClass = qty > 0 ? 'text-success' : 'text-muted';
        const cardBorderClass = qty > 0 ? 'border-success border-2' : 'border-0';
        const shadowStyle = qty > 0 ? 'box-shadow: 0 4px 10px rgba(40, 167, 69, 0.3);' : '';

        const displayName = getItemName(item, currentLang);

        const html = `
        <div class="col-6 col-md-4 col-lg-3">
            <div class="card shadow-sm h-100 ${cardBorderClass}" id="card-${item.id}" 
                 style="border-radius: 15px; position: relative; overflow: hidden; transition: all 0.2s; ${shadowStyle}">
                
                <div class="card-body card-press-effect text-center d-flex flex-column justify-content-center p-2"
                     onclick="updateCart('${item.id}', 1)"
                     style="cursor: pointer; min-height: 140px; padding-bottom: 50px !important;"> 
                    
                    <div class="fw-bold text-dark fs-6">${displayName}</div>
                    
                    <div class="fw-bold fs-5 mt-1" style="color: black;">${item.price} ${t.baht}</div>
                    
                    <div class="display-4 fw-bold ${textClass} my-1 transition-text" id="qty-${item.id}">
                        ${qty}
                    </div>

                    <div class="d-none d-md-block small text-muted opacity-25">${t.touchToAdd}</div>
                </div>

                <button class="btn btn-danger btn-press-effect rounded-circle shadow-sm d-flex align-items-center justify-content-center p-0" 
                        onclick="event.stopPropagation(); updateCart('${item.id}', -1)"
                        style="position: absolute; bottom: 10px; left: 10px; width: 45px; height: 45px; z-index: 10;">
                    <span class="fw-bold fs-3">-</span>
                </button>

            </div>
        </div>
        `;
        container.innerHTML += html;
    });
}

function updateCart(id, change) {
    if (navigator.vibrate) navigator.vibrate(40);
    if (!cart[id]) cart[id] = 0;
    if (change === -1 && cart[id] === 0) return;
    cart[id] += change;

    const qtyElement = document.getElementById(`qty-${id}`);
    const cardElement = document.getElementById(`card-${id}`);
    
    qtyElement.innerText = cart[id];

    if (cart[id] > 0) {
        qtyElement.classList.remove('text-muted');
        qtyElement.classList.add('text-success');
        cardElement.style.boxShadow = "0 4px 10px rgba(40, 167, 69, 0.3)";
        cardElement.classList.add('border', 'border-success');
    } else {
        qtyElement.classList.remove('text-success');
        qtyElement.classList.add('text-muted');
        cardElement.style.boxShadow = "";
        cardElement.classList.remove('border', 'border-success');
    }
    calculateTotal();
}

function calculateTotal() {
    let totalCount = 0;
    let totalPrice = 0;
    feeItems.forEach(item => {
        const qty = cart[item.id] || 0;
        if (qty > 0) {
            totalCount += qty;
            totalPrice += (qty * item.price);
        }
    });
    document.getElementById('total-count').innerText = totalCount;
    document.getElementById('total-price').innerText = totalPrice.toLocaleString();
    return totalPrice;
}

function showSummary() {
    const total = calculateTotal();
    const t = translations[currentLang];
    if (total === 0) { alert(currentLang === 'th' ? 'ยังไม่ได้เลือกรายการครับ' : 'No items selected'); return; }

    const list = document.getElementById('summary-list');
    list.innerHTML = '';
    
    feeItems.forEach(item => {
        const qty = cart[item.id] || 0;
        if (qty > 0) {
            const displayName = getItemName(item, currentLang);
            list.innerHTML += `<li class="list-group-item d-flex justify-content-between align-items-center fs-5"><span>${displayName} <small class="text-muted">x${qty}</small></span><span class="fw-bold">${(item.price * qty).toLocaleString()}</span></li>`;
        }
    });

    document.getElementById('modal-total').innerText = total.toLocaleString();
    receivedMoney = 0;
    updateChangeDisplay();
    new bootstrap.Modal(document.getElementById('paymentModal')).show();
}

function addMoney(amount) { receivedMoney += amount; updateChangeDisplay(); }
function clearMoney() { receivedMoney = 0; updateChangeDisplay(); }

function updateChangeDisplay() {
    const total = calculateTotal();
    const change = receivedMoney - total;
    const t = translations[currentLang];
    
    document.getElementById('money-received').innerText = receivedMoney.toLocaleString();
    const changeEl = document.getElementById('money-change');
    const lblChange = document.getElementById('lbl-change');
    
    if (receivedMoney < total) {
        lblChange.innerText = t.missing;
        lblChange.className = "fs-4 fw-bold text-danger";
        changeEl.innerText = (total - receivedMoney).toLocaleString();
        changeEl.className = "text-danger fw-bold display-2 mx-2";
    } else {
        lblChange.innerText = t.change;
        lblChange.className = "fs-4 fw-bold";
        changeEl.innerText = change.toLocaleString();
        changeEl.className = "text-success fw-bold display-2 mx-2";
    }
}

function finishTransaction() {
    bootstrap.Modal.getInstance(document.getElementById('paymentModal')).hide();
    resetApp();
}

function resetApp() {
    cart = {}; renderItems(); calculateTotal(); receivedMoney = 0;
}

// --- ระบบตั้งค่าแบบใหม่ ---
function openSettings() {
    const password = prompt("Password (Admin):");
    if (password === "Samlan_admin") {
        const container = document.getElementById('settings-list');
        container.innerHTML = '';
        
        feeItems.forEach((item, index) => {
            const nameTh = item.customNames?.th || translations.th.names[item.id] || '';
            const nameEn = item.customNames?.en || translations.en.names[item.id] || '';
            const nameCn = item.customNames?.cn || translations.cn.names[item.id] || '';

            container.innerHTML += `
                <div class="card p-3 border bg-light mb-3 shadow-sm">
                    <div class="row g-2">
                        <div class="col-12">
                            <label class="small text-muted fw-bold">ชื่อรายการ (3 ภาษา)</label>
                        </div>
                        <div class="col-12">
                            <div class="input-group input-group-sm mb-1"><span class="input-group-text" style="width: 40px;">TH</span><input type="text" class="form-control name-th" value="${nameTh}" placeholder="ชื่อไทย"></div>
                            <div class="input-group input-group-sm mb-1"><span class="input-group-text" style="width: 40px;">EN</span><input type="text" class="form-control name-en" value="${nameEn}" placeholder="English Name"></div>
                            <div class="input-group input-group-sm"><span class="input-group-text" style="width: 40px;">CN</span><input type="text" class="form-control name-cn" value="${nameCn}" placeholder="中文名"></div>
                        </div>
                        <div class="col-6 mt-2"><label class="small text-muted">ราคา</label><input type="number" class="form-control item-price" value="${item.price}"></div>
                        <div class="col-6 mt-2 text-end d-flex align-items-end justify-content-end"><button class="btn btn-danger btn-sm w-100" onclick="deleteItemConfig(this)">🗑️ ลบ</button></div>
                        <input type="hidden" class="item-id" value="${item.id}">
                    </div>
                </div>`;
        });
        
        // เพิ่มปุ่ม "คืนค่าโรงงาน" ในหน้าตั้งค่า
        const settingsBody = document.querySelector('#settingsModal .modal-body');
        // (เช็คว่ามีปุ่มหรือยัง ถ้ายังไม่มีค่อยเพิ่ม)
        if(!document.getElementById('btn-restore-default')) {
            const hr = document.createElement('hr');
            hr.className = 'my-4';
            settingsBody.appendChild(hr);
            
            const btnRestore = document.createElement('button');
            btnRestore.id = 'btn-restore-default';
            btnRestore.className = 'btn btn-outline-danger btn-sm w-100';
            btnRestore.innerText = 'คืนค่าเดิมทั้งหมด (Factory Reset)';
            btnRestore.onclick = restoreDefaults;
            settingsBody.appendChild(btnRestore);
        }

        new bootstrap.Modal(document.getElementById('settingsModal')).show();
    } else if (password !== null) {
        alert("รหัสผ่านผิดครับ!");
    }
}

function addNewItemConfig() {
    const container = document.getElementById('settings-list');
    const div = document.createElement('div');
    div.className = 'card p-3 border bg-light mb-3 shadow-sm';
    div.innerHTML = `<div class="row g-2"><div class="col-12"><label class="small text-muted fw-bold">รายการใหม่</label></div><div class="col-12"><div class="input-group input-group-sm mb-1"><span class="input-group-text" style="width: 40px;">TH</span><input type="text" class="form-control name-th" value="" placeholder="ชื่อไทย"></div><div class="input-group input-group-sm mb-1"><span class="input-group-text" style="width: 40px;">EN</span><input type="text" class="form-control name-en" value="" placeholder="English Name"></div><div class="input-group input-group-sm"><span class="input-group-text" style="width: 40px;">CN</span><input type="text" class="form-control name-cn" value="" placeholder="中文名"></div></div><div class="col-6 mt-2"><label class="small text-muted">ราคา</label><input type="number" class="form-control item-price" value="0"></div><div class="col-6 mt-2 text-end d-flex align-items-end justify-content-end"><button class="btn btn-danger btn-sm w-100" onclick="deleteItemConfig(this)">🗑️ ลบ</button></div><input type="hidden" class="item-id" value="custom_${Date.now()}"></div>`;
    container.appendChild(div);
}

function deleteItemConfig(btn) { btn.closest('.card').remove(); }

function saveSettings() {
    const cards = document.querySelectorAll('#settings-list .card');
    let newItems = [];
    cards.forEach(card => {
        const id = card.querySelector('.item-id').value;
        const price = parseInt(card.querySelector('.item-price').value) || 0;
        const nameTh = card.querySelector('.name-th').value;
        const nameEn = card.querySelector('.name-en').value;
        const nameCn = card.querySelector('.name-cn').value;
        newItems.push({ id: id, price: price, customNames: { th: nameTh, en: nameEn, cn: nameCn } });
    });
    feeItems = newItems;
    localStorage.setItem('samlan_items', JSON.stringify(feeItems));
    cart = {}; renderItems(); calculateTotal();
    bootstrap.Modal.getInstance(document.getElementById('settingsModal')).hide();
}

function restoreDefaults() {
    if(confirm('ยืนยันคืนค่าโรงงาน? รายการที่เพิ่มเองจะหายไปทั้งหมด')) {
        localStorage.removeItem('samlan_items');
        loadItems(); cart = {}; renderItems(); calculateTotal();
        bootstrap.Modal.getInstance(document.getElementById('settingsModal')).hide();
    }
}