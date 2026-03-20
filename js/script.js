document.addEventListener('DOMContentLoaded', function() {
    // --- DARK MODE TOGGLE ---
    const themeToggle = document.getElementById('themeToggle');
    const currentTheme = localStorage.getItem('theme');

    // Áp dụng theme đã lưu khi tải trang
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.textContent = '☀️';
    } else {
        themeToggle.textContent = '🌙';
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        themeToggle.textContent = isDark ? '☀️' : '🌙';
    });

    // --- Các chức năng cũ: tab, profile, nhắn tin ---

    // Xử lý tab (có data-tab)
    const tabButtons = document.querySelectorAll('.tab-btn[data-tab]');
    const tabPanes = document.querySelectorAll('.tab-pane');

    function switchTab(tabId) {
        tabPanes.forEach(pane => pane.classList.remove('active'));
        const activePane = document.getElementById(tabId);
        if (activePane) activePane.classList.add('active');

        tabButtons.forEach(btn => btn.classList.remove('active'));
        const activeButton = document.querySelector(`.tab-btn[data-tab="${tabId}"]`);
        if (activeButton) activeButton.classList.add('active');
    }

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            if (tabId) switchTab(tabId);
        });
    });

    // Tab Profile (mở link CV)
    const profileTab = document.getElementById('profileTabBtn');
    if (profileTab) {
        profileTab.addEventListener('click', function() {
            window.open('https://huuphan21.github.io/phanngochuu.github.io-my-cv/', '_blank');
        });
    }

    // Nút Nhắn tin (popup)
    const messageBtn = document.getElementById('messageBtn');
    if (messageBtn) {
        messageBtn.addEventListener('click', function() {
            const overlay = document.createElement('div');
            overlay.style.position = 'fixed';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100%';
            overlay.style.height = '100%';
            overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
            overlay.style.zIndex = '1000';
            overlay.style.display = 'flex';
            overlay.style.alignItems = 'center';
            overlay.style.justifyContent = 'center';

            const dialog = document.createElement('div');
            dialog.style.backgroundColor = '#fff';
            dialog.style.borderRadius = '12px';
            dialog.style.padding = '20px';
            dialog.style.width = '280px';
            dialog.style.textAlign = 'center';
            dialog.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)';
            dialog.innerHTML = `
                <h3 style="margin-top:0;">Chọn cách liên hệ</h3>
                <button id="chooseFB" style="margin:8px; padding:8px 16px; background:#4267B2; color:white; border:none; border-radius:6px; cursor:pointer;">📘 Facebook</button>
                <button id="chooseGMail" style="margin:8px; padding:8px 16px; background:#D44638; color:white; border:none; border-radius:6px; cursor:pointer;">📧 Gmail</button>
                <button id="closeDialog" style="margin:8px; padding:6px 12px; background:#ccc; border:none; border-radius:6px; cursor:pointer;">Đóng</button>
            `;
            overlay.appendChild(dialog);
            document.body.appendChild(overlay);

            const fbBtn = dialog.querySelector('#chooseFB');
            const gmailBtn = dialog.querySelector('#chooseGMail');
            const closeBtn = dialog.querySelector('#closeDialog');

            fbBtn.onclick = () => {
                window.open('https://www.facebook.com/phan.huu.2408', '_blank');
                document.body.removeChild(overlay);
            };
            gmailBtn.onclick = () => {
                window.location.href = 'mailto:phanngocxhuu@gmail.com?subject=Liên hệ từ trang cá nhân&body=Chào Phan Hữu,';
                document.body.removeChild(overlay);
            };
            closeBtn.onclick = () => {
                document.body.removeChild(overlay);
            };
        });
    }

    // Khởi tạo tab đầu tiên nếu chưa có active
    const anyActivePane = document.querySelector('.tab-pane.active');
    if (!anyActivePane) {
        const firstTab = document.querySelector('.tab-btn[data-tab]');
        if (firstTab) {
            const firstId = firstTab.getAttribute('data-tab');
            switchTab(firstId);
        }
    }
});