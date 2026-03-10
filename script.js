// إضافة تأثيرات تفاعلية للمشروبات

document.querySelectorAll('.btn-add').forEach(button => {
    button.addEventListener('click', function(e) {
        // تأثير الريبل عند الضغط
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        // الحصول على اسم المشروب
        const drinkName = this.parentElement.querySelector('.drink-name').textContent;
        
        // إظهار رسالة تأكيد
        console.log(`تمت إضافة ${drinkName} إلى السلة`);
        
        // يمكنك إضافة منطق إضافة المشروب إلى السلة هنا
        alert(`تمت إضافة ${drinkName} إلى السلة ✓`);
    });
});

// تأثير التمرير السلس عند الضغط على الأزرار
document.querySelectorAll('.btn-browse').forEach(button => {
    button.addEventListener('click', function() {
        document.querySelector('.drinks-section').scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    });
});