// --- 1. ฐานข้อมูลภาษา (Dictionary) 3 ภาษา ---
const translations = {
    th: {
        langBtn: 'TH', appTitle: 'น้ำตกสามหลั่น', reset: 'รีเซ็ต', items: 'รายการ', total: 'รวม', baht: 'บ.',
        fullBaht: 'บาท', checkout: 'คิดเงิน / รับเงิน', modalTitle: 'สรุปรายการ & รับเงิน', totalPay: 'ยอดรวมต้องชำระ',
        inputMoney: 'กดตามเงินที่รับมา:', received: 'รับเงินมา:', change: 'เงินทอน:', missing: 'ขาดอีก:',
        done: 'เสร็จสิ้น (คนต่อไป)', touchToAdd: 'แตะเพิ่ม', 
        nightUnit: 'คืน',
        // หัวข้อหมวดหมู่
        headers: {
            person: '🎫 ค่าบริการบุคคล (Entrance Fee)',
            vehicle: '🚗 ยานพาหนะ (Vehicles)',
            sleep: '⛺ ที่พัก & อุปกรณ์ (Accommodation)'
        },
        // หน่วยนับ
        units: {
            person: 'คน', vehicle: 'คัน', tent: 'หลัง', item: 'ใบ', set: 'ชุด'
        },
        names: {
            adult_thai: 'ผู้ใหญ่ (ไทย)', child_thai: 'เด็ก (ไทย)', adult_foreign: 'ผู้ใหญ่ (ต่างชาติ)', child_foreign: 'เด็ก (ต่างชาติ)',
            moto: 'รถมอเตอร์ไซค์', car4: 'รถยนต์ 4 ล้อ', car6: 'รถยนต์ 6 ล้อ', car_heavy: 'รถยนต์ >6-10 ล้อ',
            camp_fee: 'ค่ากางเต็นท์', tent_rent_3: 'เช่าเต็นท์ (3 คน)', pillow: 'หมอน', mat: 'แผ่นรองนอน', sleeping_bag: 'ถุงนอน'
        }
    },
    en: {
        langBtn: 'EN', appTitle: 'Samlan NP Fee', reset: 'Reset', items: 'Items', total: 'Total', baht: 'THB',
        fullBaht: 'THB', checkout: 'Checkout', modalTitle: 'Summary & Payment', totalPay: 'Total Amount',
        inputMoney: 'Received Cash:', received: 'Received:', change: 'Change:', missing: 'Missing:',
        done: 'Done (Next)', touchToAdd: 'Tap to Add', 
        nightUnit: 'Nights',
        headers: {
            person: '🎫 Entrance Fee', vehicle: '🚗 Vehicles', sleep: '⛺ Accommodation'
        },
        units: {
            person: 'Pax', vehicle: 'Unit', tent: 'Unit', item: 'Pcs', set: 'Set'
        },
        names: {
            adult_thai: 'Adult (Thai)', child_thai: 'Child (Thai)', adult_foreign: 'Adult (Foreign)', child_foreign: 'Child (Foreign)',
            moto: 'Motorcycle', car4: 'Car (4 Wheels)', car6: 'Car (6 Wheels)', car_heavy: 'Vehicle (>6-10 Wheels)',
            camp_fee: 'Camping Fee', tent_rent_3: 'Rent Tent (3 Pax)', pillow: 'Pillow', mat: 'Sleeping Mat', sleeping_bag: 'Sleeping Bag'
        }
    },
    cn: {
        langBtn: 'CN', appTitle: '三兰瀑布 (费用)', reset: '重置', items: '项目', total: '总计', baht: '泰铢',
        fullBaht: '泰铢', checkout: '结账 / 收款', modalTitle: '摘要和付款', totalPay: '应付总额',
        inputMoney: '收到的现金:', received: '已收:', change: '找零:', missing: '缺少:',
        done: '完成 (下一位)', touchToAdd: '点击添加', 
        nightUnit: '晚',
        headers: {
            person: '🎫 门票', vehicle: '🚗 车辆', sleep: '⛺ 住宿 & 租赁'
        },
        units: {
            person: '人', vehicle: '辆', tent: '顶', item: '个', set: '套'
        },
        names: {
            adult_thai: '成人 (泰国)', child_thai: '儿童 (泰国)', adult_foreign: '成人 (外国)', child_foreign: '儿童 (外国)',
            moto: '摩托车', car4: '汽车 (4轮)', car6: '汽车 (6轮)', car_heavy: '大型车 (>6-10轮)',
            camp_fee: '露营费', tent_rent_3: '租用帐篷 (3人)', pillow: '枕头', mat: '睡垫', sleeping_bag: '睡袋'
        }
    }
};

// --- 2. ค่าเริ่มต้น (Default Items) ---
// เพิ่ม category และ unitKey เพื่อใช้จัดหมวดหมู่
const defaultItems = [
    // หมวดบุคคล (Person)
    { id: 'adult_thai', price: 20, category: 'person', unitKey: 'person' },
    { id: 'child_thai', price: 10, category: 'person', unitKey: 'person' },
    { id: 'adult_foreign', price: 100, category: 'person', unitKey: 'person' },
    { id: 'child_foreign', price: 50, category: 'person', unitKey: 'person' },
    
    // หมวดยานพาหนะ (Vehicle)
    { id: 'moto', price: 20, category: 'vehicle', unitKey: 'vehicle' },
    { id: 'car4', price: 30, category: 'vehicle', unitKey: 'vehicle' },
    { id: 'car6', price: 100, category: 'vehicle', unitKey: 'vehicle' },
    { id: 'car_heavy', price: 200, category: 'vehicle', unitKey: 'vehicle' },
    
    // หมวดที่พัก (Sleep) -> คิดตามคืน
    { id: 'camp_fee', price: 30, category: 'sleep', unitKey: 'person' },
    { id: 'tent_rent_3', price: 225, category: 'sleep', unitKey: 'tent' },
    { id: 'pillow', price: 10, category: 'sleep', unitKey: 'item' },
    { id: 'mat', price: 20, category: 'sleep', unitKey: 'item' },
    { id: 'sleeping_bag', price: 30, category: 'sleep', unitKey: 'item' }
];

let feeItems = [];
let cart = {};
let cartNights = {}; // เก็บจำนวนคืนของแต่ละรายการ (Night Stamping)
let currentNights = 1; // ค่าคืนปัจจุบันที่เลือกจากปุ่ม (Sticky Switch)
let receivedMoney = 0;

const langOrder = ['th', 'en', 'cn'];
let currentLang = localStorage.getItem('app_lang') || 'th';

document.addEventListener('DOMContentLoaded', () => {
    loadItems();
    updateUILanguage();
    setNights(1); // เริ่มต้น 1 คืนเสมอ
    renderItems();
    calculateTotal();
});

// --- ฟังก์ชันเลือกจำนวนคืน (Sticky Night Logic) ---
function setNights(n) {
    currentNights = n;
    // อัปเดตสีปุ่ม (ถ้าปุ่มถูกสร้างแล้ว)
    const btns = document.querySelectorAll('.night-btn');
    if(btns.length > 0) {
        btns.forEach((btn, index) => {
            if (index + 1 === n) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }
    if (navigator.vibrate) navigator.vibrate(30);
}

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

function getItemName(item, lang) {
    if (item.customNames && item.customNames[lang]) return item.customNames[lang];
    if (translations[lang].names[item.id]) return translations[lang].names[item.id];
    return item.customNames?.en || item.customNames?.th || item.name || 'Unknown';
}

function loadItems() {
    const saved = localStorage.getItem('samlan_items');
    if (saved) { feeItems = JSON.parse(saved); } 
    else { feeItems = JSON.parse(JSON.stringify(defaultItems)); }
}

// --- ฟังก์ชัน Render แบบแยกโซน (Zoning) ---
function renderItems() {
    const container = document.getElementById('items-container');
    container.innerHTML = '';
    const t = translations[currentLang];
    
    // กำหนดลำดับการแสดงผลหมวดหมู่
    const categories = ['person', 'vehicle', 'sleep'];
    
    categories.forEach(cat => {
        // 1. สร้างหัวข้อหมวดหมู่
        container.innerHTML += `<div class="col-12"><div class="zone-header">${t.headers[cat]}</div></div>`;

        // 2. ถ้าเป็นหมวด Sleep ให้แทรก "ปุ่มเลือกคืน" (Sticky Bar)
        if (cat === 'sleep') {
            const nightBar = `
            <div class="col-12 sticky-top night-selector-bar">
                <div class="d-flex align-items-center justify-content-center">
                    <span class="me-2 fw-bold text-secondary small" style="opacity:0.7">เลือกคืน:</span>
                    <button class="btn night-btn ${currentNights===1?'active':''}" onclick="setNights(1)">1</button>
                    <button class="btn night-btn ${currentNights===2?'active':''}" onclick="setNights(2)">2</button>
                    <button class="btn night-btn ${currentNights===3?'active':''}" onclick="setNights(3)">3</button>
                    <button class="btn night-btn ${currentNights===4?'active':''}" onclick="setNights(4)">4</button>
                    <button class="btn night-btn ${currentNights===5?'active':''}" onclick="setNights(5)">5</button>
                    <span class="ms-2 fw-bold text-success small">${t.nightUnit}</span>
                </div>
            </div>`;
            container.innerHTML += nightBar;
        }

        // 3. กรองรายการเฉพาะหมวดนั้นมาแสดง
        const itemsInCat = feeItems.filter(i => (i.category || 'person') === cat);
        
        itemsInCat.forEach(item => {
            const qty = cart[item.id] || 0;
            const stampedNights = cartNights[item.id] || 1; // ดึงคืนที่จำไว้
            
            const textClass = qty > 0 ? 'text-success' : 'text-muted';
            const cardBorderClass = qty > 0 ? 'border-success border-2' : 'border-0';
            const shadowStyle = qty > 0 ? 'box-shadow: 0 4px 10px rgba(40, 167, 69, 0.3);' : '';
            const displayName = getItemName(item, currentLang);
            const unitName = t.units[item.unitKey || 'item'];

            // แสดง Badge จำนวนคืน (เฉพาะหมวด sleep ที่มีการเลือกแล้ว)
            let nightLabel = '';
            if (item.category === 'sleep' && qty > 0) {
                nightLabel = `<span class="badge bg-warning text-dark mt-1 rounded-pill px-3 py-2 align-self-center" style="font-size: 0.9rem;">x ${stampedNights} ${t.nightUnit}</span>`;
            }

            const html = `
            <div class="col-6 col-md-4 col-lg-3">
                <div class="card shadow-sm h-100 ${cardBorderClass}" id="card-${item.id}" 
                     style="border-radius: 15px; position: relative; overflow: hidden; transition: all 0.2s; ${shadowStyle}">
                    
                    <div class="card-body card-press-effect text-center d-flex flex-column justify-content-center p-2"
                         onclick="updateCart('${item.id}', 1)"
                         style="cursor: pointer; min-height: 150px; padding-bottom: 50px !important;"> 
                        
                        <div class="fw-bold text-dark fs-6">${displayName}</div>
                        <div class="fw-bold fs-5 mt-1" style="color: black;">${item.price} ${t.baht}</div>
                        
                        <div class="display-4 fw-bold ${textClass} my-1 transition-text" id="qty-${item.id}">${qty}</div>
                        <div class="small fw-bold text-secondary">${unitName}</div>
                        ${nightLabel}

                        <div class="d-none d-md-block small text-muted opacity-25 mt-2">${t.touchToAdd}</div>
                    </div>

                    <button class="btn btn-danger btn-press-effect rounded-circle shadow-sm d-flex align-items-center justify-content-center p-0" 
                            onclick="event.stopPropagation(); updateCart('${item.id}', -1)"
                            style="position: absolute; bottom: 10px; left: 10px; width: 45px; height: 45px; z-index: 10;">
                        <span class="fw-bold fs-3">-</span>
                    </button>
                </div>
            </div>`;
            container.innerHTML += html;
        });
    });
}

function updateCart(id, change) {
    if (navigator.vibrate) navigator.vibrate(40);
    if (!cart[id]) cart[id] = 0;
    
    const item = feeItems.find(i => i.id === id);

    // --- Logic : ฉลาดเลือก (Smart Update) ---
    if (change > 0) { 
        // กรณีพี่กดปุ่ม (+) หรือจิ้มที่การ์ด
        
        // เช็ค 3 เด้ง: 
        // 1. เป็นหมวดที่พักใช่ไหม? (category == 'sleep')
        // 2. ในตะกร้ามีรายการนี้อยู่แล้วใช่ไหม? (cart > 0)
        // 3. จำนวนคืนที่เลือกใหม่ มันไม่ตรงกับของเดิมใช่ไหม? (คืนไม่ตรง)
        if (item.category === 'sleep' && cart[id] > 0 && cartNights[id] !== currentNights) {
            
            // ✅ ถ้าใช่: ให้อัปเดตแค่ "จำนวนคืน" พอ (จำนวนคนห้ามเพิ่ม!)
            cartNights[id] = currentNights;
            
        } else {
            // ✅ ถ้าไม่ใช่ (เช่น คืนตรงกันแล้ว หรือ เป็นรายการใหม่แกะกล่อง): ให้เพิ่มจำนวนคนตามปกติ
            if (item.category === 'sleep') {
                cartNights[id] = currentNights; // เซ็ตคืนให้เป็นปัจจุบัน
            } else {
                cartNights[id] = 1; // หมวดอื่นบังคับ 1 คืนเสมอ
            }
            cart[id] += 1; // เพิ่มคน
        }

    } else {
        // กรณีพี่กดปุ่มลบ (-) ให้ทำงานเหมือนเดิม
        if (cart[id] > 0) cart[id] += change;
    }

    // ถ้าลบจนเหลือ 0 ให้รีเซ็ตคืนเป็น 1 (ล้างค่าให้สะอาด)
    if (cart[id] === 0) cartNights[id] = 1;

    renderItems();
    calculateTotal();
}

function calculateTotal() {
    let totalCount = 0;
    let totalPrice = 0;
    feeItems.forEach(item => {
        const qty = cart[item.id] || 0;
        if (qty > 0) {
            const nights = cartNights[item.id] || 1;
            totalPrice += (qty * item.price * nights);
            totalCount += qty;
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

    // ใช้ div แทน ul เพื่อรองรับหัวข้อหมวด
    const contentDiv = document.getElementById('summary-content');
    contentDiv.innerHTML = '';
    
    const categories = ['person', 'vehicle', 'sleep'];
    
    categories.forEach(cat => {
        // หาของในหมวดนี้ที่มีการเลือก
        const itemsInCat = feeItems.filter(i => (i.category || 'person') === cat && (cart[i.id] > 0));
        
        if (itemsInCat.length > 0) {
            // หัวข้อในใบเสร็จ
            contentDiv.innerHTML += `<div class="fw-bold text-success border-bottom mb-2 mt-2 pb-1" style="font-size:1.1rem">${t.headers[cat]}</div>`;
            
            const ul = document.createElement('ul');
            ul.className = 'list-group list-group-flush mb-2';
            
            itemsInCat.forEach(item => {
                const qty = cart[item.id];
                const nights = cartNights[item.id] || 1;
                const itemTotal = qty * item.price * nights;
                const displayName = getItemName(item, currentLang);
                const unitName = t.units[item.unitKey || 'item'];

                let detailText = `x ${qty} ${unitName}`;
                // ถ้าหมวดนอน ให้โชว์คืนด้วย
                if (item.category === 'sleep') {
                    detailText += ` <span class="badge bg-warning text-dark rounded-pill">(${nights} ${t.nightUnit})</span>`;
                }

                const li = `
                <li class="list-group-item d-flex justify-content-between align-items-center ps-0 pe-0">
                    <div>
                        <span class="fw-bold text-dark">${displayName}</span><br>
                        <span class="text-muted fs-5">${detailText}</span>
                    </div>
                    <span class="fw-bold fs-5">${itemTotal.toLocaleString()}</span>
                </li>`;
                ul.innerHTML += li;
            });
            contentDiv.appendChild(ul);
        }
    });

    document.getElementById('modal-total').innerText = total.toLocaleString();
    
    // เคลียร์ค่า Note
    if(document.getElementById('txn-note')) document.getElementById('txn-note').value = '';
    
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
    cart = {}; 
    cartNights = {}; 
    setNights(1); // รีเซ็ตคืนกลับเป็น 1 เสมอ
    renderItems(); 
    calculateTotal(); 
    receivedMoney = 0;
    if(document.getElementById('txn-note')) document.getElementById('txn-note').value = '';
}

// --- หน้าตั้งค่า (ปรับปรุงให้เลือกหมวดหมู่ได้) ---
function openSettings() {
    const password = prompt("Password (Admin):");
    if (password === "Samlan_admin") {
        const container = document.getElementById('settings-list');
        container.innerHTML = '';
        
        feeItems.forEach((item, index) => {
            const nameTh = item.customNames?.th || translations.th.names[item.id] || '';
            const nameEn = item.customNames?.en || translations.en.names[item.id] || '';
            const nameCn = item.customNames?.cn || translations.cn.names[item.id] || '';
            
            // เลือกหมวดหมู่ปัจจุบัน
            const isPerson = (item.category === 'person') ? 'selected' : '';
            const isVehicle = (item.category === 'vehicle') ? 'selected' : '';
            const isSleep = (item.category === 'sleep') ? 'selected' : '';

            container.innerHTML += `
                <div class="card p-3 border bg-light mb-3 shadow-sm">
                    <div class="row g-2">
                        <div class="col-12"><label class="small text-muted fw-bold">ชื่อรายการ</label></div>
                        <div class="col-12">
                            <div class="input-group input-group-sm mb-1"><span class="input-group-text">TH</span><input type="text" class="form-control name-th" value="${nameTh}"></div>
                            <div class="input-group input-group-sm mb-1"><span class="input-group-text">EN</span><input type="text" class="form-control name-en" value="${nameEn}"></div>
                            <div class="input-group input-group-sm"><span class="input-group-text">CN</span><input type="text" class="form-control name-cn" value="${nameCn}"></div>
                        </div>
                        <div class="col-6 mt-2"><label class="small text-muted">ราคา</label><input type="number" class="form-control item-price" value="${item.price}"></div>
                        <div class="col-6 mt-2">
                            <label class="small text-muted">หมวดหมู่</label>
                            <select class="form-select form-select-sm item-category">
                                <option value="person" ${isPerson}>บุคคล</option>
                                <option value="vehicle" ${isVehicle}>ยานพาหนะ</option>
                                <option value="sleep" ${isSleep}>ที่พัก (คิดตามคืน)</option>
                            </select>
                        </div>
                        <div class="col-12 mt-2 text-end"><button class="btn btn-danger btn-sm w-100" onclick="deleteItemConfig(this)">🗑️ ลบ</button></div>
                        <input type="hidden" class="item-id" value="${item.id}">
                        <input type="hidden" class="item-unit" value="${item.unitKey || 'item'}">
                    </div>
                </div>`;
        });
        
        const settingsBody = document.querySelector('#settingsModal .modal-body');
        if(!document.getElementById('btn-restore-default')) {
            const hr = document.createElement('hr'); hr.className = 'my-4'; settingsBody.appendChild(hr);
            const btnRestore = document.createElement('button'); btnRestore.id = 'btn-restore-default';
            btnRestore.className = 'btn btn-outline-danger btn-sm w-100'; btnRestore.innerText = 'คืนค่าเดิมทั้งหมด (Factory Reset)';
            btnRestore.onclick = restoreDefaults; settingsBody.appendChild(btnRestore);
        }
        new bootstrap.Modal(document.getElementById('settingsModal')).show();
    } else if (password !== null) { alert("รหัสผ่านผิดครับ!"); }
}

function addNewItemConfig() {
    const container = document.getElementById('settings-list');
    const div = document.createElement('div');
    div.className = 'card p-3 border bg-light mb-3 shadow-sm';
    div.innerHTML = `<div class="row g-2"><div class="col-12"><label class="small text-muted fw-bold">รายการใหม่</label></div><div class="col-12"><input type="text" class="form-control form-control-sm mb-1 name-th" placeholder="ชื่อไทย"><input type="text" class="form-control form-control-sm name-en" placeholder="English"></div><div class="col-6 mt-2"><input type="number" class="form-control item-price" value="0" placeholder="ราคา"></div><div class="col-6 mt-2"><select class="form-select form-select-sm item-category"><option value="person">บุคคล</option><option value="vehicle">ยานพาหนะ</option><option value="sleep">ที่พัก</option></select></div><div class="col-12 mt-2"><button class="btn btn-danger btn-sm w-100" onclick="deleteItemConfig(this)">🗑️ ลบ</button></div><input type="hidden" class="item-id" value="custom_${Date.now()}"><input type="hidden" class="item-unit" value="item"></div>`;
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
        const nameCn = card.querySelector('.name-cn') ? card.querySelector('.name-cn').value : '';
        const category = card.querySelector('.item-category').value;
        const unitKey = card.querySelector('.item-unit').value; 
        
        newItems.push({ id: id, price: price, category: category, unitKey: unitKey, customNames: { th: nameTh, en: nameEn, cn: nameCn } });
    });
    feeItems = newItems;
    localStorage.setItem('samlan_items', JSON.stringify(feeItems));
    cart = {}; cartNights = {}; renderItems(); calculateTotal();
    bootstrap.Modal.getInstance(document.getElementById('settingsModal')).hide();
}

function restoreDefaults() {
    if(confirm('ยืนยันคืนค่าโรงงาน? รายการที่เพิ่มเองจะหายไปทั้งหมด')) {
        localStorage.removeItem('samlan_items');
        loadItems(); cart = {}; cartNights = {}; renderItems(); calculateTotal();
        bootstrap.Modal.getInstance(document.getElementById('settingsModal')).hide();
    }
}

// ฟังก์ชันวัดความสูง Navbar แบบแม่นยำ 100%
function updateNavHeight() {
    const nav = document.querySelector('.navbar');
    if (nav) {
        const height = nav.getBoundingClientRect().height;
        document.documentElement.style.setProperty('--nav-height', height + 'px');
    }
}
// สั่งให้ทำงานเมื่อโหลดหน้าจอ, หมุนจอ, และหลังจากวาดรายการเสร็จ
window.addEventListener('load', updateNavHeight);
window.addEventListener('resize', updateNavHeight);

setTimeout(updateNavHeight, 500);
