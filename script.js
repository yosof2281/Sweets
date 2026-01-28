/* script.js
   Vanilla JS to:
   - generate menu cards from a menu array
   - handle cart (add/remove/quantity)
   - compute total
   - build WhatsApp order message and open wa.me link
*/

/* -------------------------
   Editable Menu Array
   Each item:
   - id: unique identifier
   - name: Arabic name
   - price: number (EGP)
   - desc: Arabic description
   - color: placeholder color for the image box (can be replaced by image URL later)
----------------------------*/
const MENU = [
  {
    id: 'pistachio',
    name: "بستاشيو أبو السعود (ربع كيلو)",
    price: 300,
    desc: "شوكولاتة فاخرة محشية فستق كامل، طعم غني ومميز لعشاق البستاشيو 💚🍫",
    color: "#eeddc2"
  },
  {
    id: 'dolma',
    name: "دولمة أبو السعود (ربع كيلو)",
    price: 250,
    desc: "دولمة فستق محشية بعناية، طرية ومغلفة بالسمن البلدي وطعمها تقيل ومميز 💚✨",
    color: "#f6f0d9"
  }
];

/* -------------------------
   Cart representation:
   - cart[itemId] = { item: MENU object, qty: number }
----------------------------*/
const cart = {};

/* ----- DOM Elements ----- */
const menuListEl = document.getElementById('menu-list');
const cartItemsEl = document.getElementById('cart-items');
const cartEmptyEl = document.getElementById('cart-empty');
const totalPriceEl = document.getElementById('total-price');
const placeOrderBtn = document.getElementById('place-order');
const customerNameEl = document.getElementById('customer-name');
const customerPhoneEl = document.getElementById('customer-phone');
const customerAddressEl = document.getElementById('customer-address');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

/* ----- Helper: format price ----- */
function formatPrice(n) {
  return `${n} ج.م`;
}

/* ----- Render Menu ----- */
function renderMenu(){
  menuListEl.innerHTML = '';
  MENU.forEach(item => {
    const card = document.createElement('article');
    card.className = 'menu-card';

    // Placeholder image box (color). Replace with <img> later if URL provided.
    const imgBox = document.createElement('div');
    imgBox.className = 'menu-image';
    imgBox.style.background = `linear-gradient(180deg, ${item.color}, rgba(200,180,160,0.6))`;
    imgBox.textContent = 'صورة';
    imgBox.setAttribute('aria-hidden', 'true');

    const body = document.createElement('div');
    body.className = 'menu-body';

    const title = document.createElement('div');
    title.className = 'menu-title';
    title.textContent = item.name;

    const desc = document.createElement('div');
    desc.className = 'menu-desc';
    desc.textContent = item.desc;

    const bottomRow = document.createElement('div');
    bottomRow.className = 'card-actions';

    const price = document.createElement('div');
    price.className = 'menu-price';
    price.textContent = formatPrice(item.price);

    const addBtn = document.createElement('button');
    addBtn.className = 'btn-vintage';
    addBtn.textContent = 'أضف للطلب';
    addBtn.addEventListener('click', () => addToCart(item.id));

    bottomRow.appendChild(price);
    bottomRow.appendChild(addBtn);

    body.appendChild(title);
    body.appendChild(desc);
    body.appendChild(bottomRow);

    card.appendChild(imgBox);
    card.appendChild(body);

    menuListEl.appendChild(card);
  });
}

/* ----- Cart operations ----- */
function addToCart(itemId, qty = 1){
  const item = MENU.find(i => i.id === itemId);
  if(!item) return;
  if(cart[itemId]){
    cart[itemId].qty += qty;
  } else {
    cart[itemId] = { item, qty };
  }
  renderCart();
}

function removeFromCart(itemId){
  delete cart[itemId];
  renderCart();
}

function updateQty(itemId, qty){
  if(!cart[itemId]) return;
  const q = Math.max(0, Math.floor(Number(qty) || 0));
  if(q <= 0){
    removeFromCart(itemId);
  } else {
    cart[itemId].qty = q;
  }
  renderCart();
}

/* ----- Render Cart ----- */
function renderCart(){
  cartItemsEl.innerHTML = '';
  const entries = Object.values(cart);

  if(entries.length === 0){
    cartEmptyEl.style.display = 'block';
  } else {
    cartEmptyEl.style.display = 'none';
  }

  let total = 0;
  entries.forEach(entry => {
    const li = document.createElement('li');
    li.className = 'cart-item';

    const meta = document.createElement('div');
    meta.className = 'meta';

    const name = document.createElement('div');
    name.className = 'name';
    name.textContent = entry.item.name;

    const priceSmall = document.createElement('div');
    priceSmall.className = 'price-small';
    priceSmall.textContent = formatPrice(entry.item.price);

    meta.appendChild(name);
    meta.appendChild(priceSmall);

    // Quantity controls
    const qtyCtr = document.createElement('div');
    qtyCtr.className = 'qty-controls';

    const minus = document.createElement('button');
    minus.type = 'button';
    minus.textContent = '−';
    minus.title = 'نقص';
    minus.addEventListener('click', ()=> updateQty(entry.item.id, entry.qty - 1));

    const qtyInput = document.createElement('input');
    qtyInput.type = 'number';
    qtyInput.min = 1;
    qtyInput.value = entry.qty;
    qtyInput.addEventListener('change', (e)=> updateQty(entry.item.id, e.target.value));

    const plus = document.createElement('button');
    plus.type = 'button';
    plus.textContent = '+';
    plus.title = 'زيادة';
    plus.addEventListener('click', ()=> updateQty(entry.item.id, entry.qty + 1));

    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.title = 'إزالة';
    removeBtn.textContent = '✕';
    removeBtn.addEventListener('click', ()=> removeFromCart(entry.item.id));

    qtyCtr.appendChild(minus);
    qtyCtr.appendChild(qtyInput);
    qtyCtr.appendChild(plus);
    qtyCtr.appendChild(removeBtn);

    // append to li
    li.appendChild(meta);
    li.appendChild(qtyCtr);

    cartItemsEl.appendChild(li);

    total += entry.item.price * entry.qty;
  });

  totalPriceEl.textContent = formatPrice(total);
}

/* ----- Place Order (WhatsApp) ----- */
function placeOrder(){
  // Basic validation
  const name = customerNameEl.value.trim();
  const phone = customerPhoneEl.value.trim();
  const address = customerAddressEl.value.trim();

  if(!name || !phone || !address){
    alert('الرجاء تعبئة الاسم ورقم الهاتف والعنوان قبل الإرسال.');
    return;
  }

  const entries = Object.values(cart);
  if(entries.length === 0){
    alert('سلة الطلب فارغة. الرجاء إضافة أصناف قبل الإرسال.');
    return;
  }

  // Build message (Arabic)
  let msgLines = [];
  msgLines.push('طلب من حلويات أبو السعود');
  msgLines.push(`الاسم: ${name}`);
  msgLines.push(`الهاتف: ${phone}`);
  msgLines.push(`العنوان: ${address}`);
  msgLines.push('');
  msgLines.push('الطلبات:');

  let total = 0;
  entries.forEach(e=>{
    msgLines.push(`- ${e.item.name} × ${e.qty} = ${e.item.price * e.qty} ج.م`);
    total += e.item.price * e.qty;
  });

  msgLines.push('');
  msgLines.push(`الإجمالي: ${total} ج.م`);
  msgLines.push('');
  msgLines.push('شكراً لكم، الرجاء تأكيد الطلب.');

  const message = encodeURIComponent(msgLines.join('\n'));

  // WhatsApp number:
  // Given number "01125933005" is an Egyptian mobile number.
  // For wa.me links we need international format without '+'.
  // Egypt country code is 20 -> 201125933005
  const waNumberIntl = '201125933005';
  const waLink = `https://wa.me/${waNumberIntl}?text=${message}`;

  // open WhatsApp in new tab/window
  window.open(waLink, '_blank');

  // Optionally, we can keep the cart or clear it. We'll clear it for a fresh start.
  // If you prefer to keep the cart, comment out the following lines.
  for(const key of Object.keys(cart)) delete cart[key];
  renderCart();
  // Clear form
  customerNameEl.value = '';
  customerPhoneEl.value = '';
  customerAddressEl.value = '';
}

/* ----- Event Listeners ----- */
document.addEventListener('DOMContentLoaded', ()=> {
  renderMenu();
  renderCart();

  placeOrderBtn.addEventListener('click', placeOrder);

  // simple nav toggle for mobile
  navToggle.addEventListener('click', ()=>{
    if(navLinks.style.display === 'flex'){
      navLinks.style.display = 'none';
    } else {
      navLinks.style.display = 'flex';
      navLinks.style.flexDirection = 'column';
      navLinks.style.gap = '8px';
    }
  });
});