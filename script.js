// بيانات المنتجات لكل قسم
const products = {
    asmouzy: [
        { name: 'اسموزي فراولة', price: '25 ريال', image: 'images/asmouzy-strawberry.jpg' },
        { name: 'اسموزي مانجو', price: '25 ريال', image: 'images/asmouzy-mango.jpg' },
        { name: 'اسموزي شوكولاتة', price: '27 ريال', image: 'images/asmouzy-chocolate.jpg' },
        { name: 'اسموزي فانيليا', price: '25 ريال', image: 'images/asmouzy-vanilla.jpg' },
        { name: 'اسموزي توت', price: '26 ريال', image: 'images/asmouzy-berry.jpg' },
        { name: 'اسموزي جوز الهند', price: '26 ريال', image: 'images/asmouzy-coconut.jpg' }
    ],
    frappe: [
        { name: 'فرابيه قهوة', price: '20 ريال', image: 'images/frappe-coffee.jpg' },
        { name: 'فرابيه كراميل', price: '22 ريال', image: 'images/frappe-caramel.jpg' },
        { name: 'فرابيه فانيليا', price: '20 ريال', image: 'images/frappe-vanilla.jpg' },
        { name: 'فرابيه موكا', price: '23 ريال', image: 'images/frappe-mocha.jpg' },
        { name: 'فرابيه شوكولاتة بيضاء', price: '22 ريال', image: 'images/frappe-white-choco.jpg' },
        { name: 'فرابيه هازلنت', price: '23 ريال', image: 'images/frappe-hazelnut.jpg' }
    ],
    fresh: [
        { name: 'فرش برتقال', price: '18 ريال', image: 'images/fresh-orange.jpg' },
        { name: 'فرش رمان', price: '19 ريال', image: 'images/fresh-pomegranate.jpg' },
        { name: 'فرش مانجو', price: '18 ريال', image: 'images/fresh-mango.jpg' },
        { name: 'فرش أناناس', price: '18 ريال', image: 'images/fresh-pineapple.jpg' },
        { name: 'فرش جوافة', price: '17 ريال', image: 'images/fresh-guava.jpg' },
        { name: 'فرش مشكل', price: '20 ريال', image: 'images/fresh-mixed.jpg' }
    ],
    coffee: [
        { name: 'قهوة عربية', price: '15 ريال', image: 'images/coffee-arabic.jpg' },
        { name: 'قهوة تركية', price: '14 ريال', image: 'images/coffee-turkish.jpg' },
        { name: 'كابتشينو', price: '18 ريال', image: 'images/coffee-cappuccino.jpg' },
        { name: 'إسبريسو', price: '12 ريال', image: 'images/coffee-espresso.jpg' },
        { name: 'لاتيه', price: '17 ريال', image: 'images/coffee-latte.jpg' },
        { name: 'نسكافيه', price: '16 ريال', image: 'images/coffee-nescafe.jpg' }
    ]
};

// أسماء الأقسام بالعربية
const categoryNames = {
    asmouzy: 'الاسموزي',
    frappe: 'الفرابيه',
    fresh: 'الفرش',
    coffee: 'القهوة'
};

// الضغط على بطاقة القسم
document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', function() {
        const category = this.dataset.category;
        displayProducts(category);
    });
});

// عرض المنتجات
function displayProducts(category) {
    const productsSection = document.getElementById('productsSection');
    const categoryTitle = document.getElementById('categoryTitle');
    const productsGrid = document.getElementById('productsGrid');
    
    categoryTitle.textContent = categoryNames[category];
    productsGrid.innerHTML = '';
    
    products[category].forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">${product.price}</p>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
    
    productsSection.classList.remove('hidden');
    productsSection.scrollIntoView({ behavior: 'smooth' });
}

// زر الرجوع
document.querySelector('.btn-back').addEventListener('click', function() {
    document.getElementById('productsSection').classList.add('hidden');
    document.querySelector('.categories-section').scrollIntoView({ behavior: 'smooth' });
});

// الضغط على تصفح القائمة
document.querySelector('.btn-browse').addEventListener('click', function() {
    document.querySelector('.categories-section').scrollIntoView({ behavior: 'smooth' });
});
