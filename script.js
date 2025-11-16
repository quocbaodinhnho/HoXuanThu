// script.js

document.addEventListener('DOMContentLoaded', () => {
    // Chọn các phần tử
    const forgiveButton = document.getElementById('forgiveButton');
    const noButton = document.getElementById('noButton');
    const heartContainer = document.querySelector('.heart-container');
    const backgroundMusic = document.getElementById('backgroundMusic');

    // Tự động phát nhạc
    if (backgroundMusic) {
        backgroundMusic.play().catch(error => {
            console.log("Autoplay bị trình duyệt chặn, cần tương tác của người dùng.");
            // Thêm một sự kiện click vào body để bắt đầu nhạc nếu bị chặn
            document.body.addEventListener('click', () => backgroundMusic.play(), { once: true });
        });
    }

    // XỬ LÝ NÚT "YES" (THA LỖI)
    if (forgiveButton) {
        forgiveButton.addEventListener('click', () => {
            const apologyCard = document.querySelector('.apology-card');
            
            // Thêm hiệu ứng zoomOut trước khi chuyển trang
            apologyCard.classList.remove('animate__zoomIn');
            apologyCard.classList.add('animate__animated', 'animate__zoomOut');

            // Chuyển trang sau khi animation kết thúc
            apologyCard.addEventListener('animationend', () => {
                window.location.href = 'thankyou.html';
            }, { once: true }); // 'once: true' để sự kiện chỉ chạy 1 lần
        });
    }

    // XỬ LÝ NÚT "NO" (KHÔNG THA LỖI)
    if (noButton && forgiveButton) {
        let currentYesScale = 1; // Kích thước ban đầu của nút "Yes"
        let currentNoScale = 1;  // Kích thước ban đầu của nút "No"
        
        const messages = [
            "Em nỡ lòng nào? 😢",
            "Nghĩ lại đi mà!",
            "Anh sai thật rồi...",
            "Đừng mà... 😭",
            "Click 'Yes' đi em!",
            "Em chạy đâu cho thoát! 😜"
        ];
        let messageIndex = 0;

        // Dùng 'mouseover' để chạy ngay khi rê chuột vào
        noButton.addEventListener('mouseover', () => {
            
            // 1. Làm nút "Yes" to lên
            currentYesScale += 0.3;
            forgiveButton.style.transform = `scale(${currentYesScale})`;

            // 2. Làm nút "No" nhỏ đi và mờ đi
            currentNoScale -= 0.15;
            if (currentNoScale < 0.1) currentNoScale = 0;
            
            // 3. Di chuyển nút "No" ngẫu nhiên
            // Vị trí ngẫu nhiên trong khoảng -300px đến +300px (X)
            // và -150px đến +150px (Y)
            const randomX = (Math.random() - 0.5) * 600; 
            const randomY = (Math.random() - 0.5) * 300;
            
            noButton.style.transform = `translate(${randomX}px, ${randomY}px) scale(${currentNoScale})`;
            noButton.style.opacity = currentNoScale;
            
            // 4. Thay đổi thông điệp trên nút "No"
            noButton.innerText = messages[messageIndex % messages.length];
            messageIndex++;

            // 5. Nếu nút "No" biến mất, ẩn nó đi
            if (currentNoScale <= 0) {
                noButton.style.display = 'none';
            }
        });
    }

    // HIỆU ỨNG TRÁI TIM RƠI (Chạy trên cả 2 trang)
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        
        if (heartContainer) {
            heartContainer.appendChild(heart);
        } else {
            return; // Dừng nếu không tìm thấy container
        }

        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 3 + 9 + 's'; // 9-12s
        heart.style.width = Math.random() * 15 + 25 + 'px'; // 25-40px
        heart.style.height = heart.style.width; 
        heart.style.opacity = '0'; // Bắt đầu ẩn
        heart.style.animationDelay = Math.random() * 2 + 's';

        // Xóa trái tim khỏi DOM sau khi animation kết thúc
        heart.addEventListener('animationend', () => {
            heart.remove();
        });
    }

    // Tạo trái tim mới mỗi 200ms
    if (heartContainer) {
        setInterval(createHeart, 200);
    }
});