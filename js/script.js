const algorithmContents = [
    {
        title: 'Thuật toán Lũy thừa nhanh (A<sup>k</sup> mod N)',
        content: `
            <main>
<section>
<h2>Nguyên lý</h2>
<p>Thuật toán lũy thừa nhanh giúp tính <strong>A<sup>k</sup> mod N</strong> một cách hiệu quả mà không cần thực hiện phép nhân trực tiếp, giúp tránh số quá lớn.</p>
</section>
<section>
<h2>Thuật toán Lũy thừa nhị phân</h2>
<p>Sử dụng phương pháp <strong>Exponentiation by Squaring</strong>:</p>
<ul>
    <li><strong>Nếu k chẵn:</strong> A<sup>k</sup> mod N = (A<sup>k/2</sup> × A<sup>k/2</sup>) mod N</li>
    <li><strong>Nếu k lẻ:</strong> A<sup>k</sup> mod N = (A × A<sup>(k-1)/2</sup> × A<sup>(k-1)/2</sup>) mod N</li>
</ul>
</section>
<section>
<h2>Ứng dụng</h2>
<ul>
    <li>Thuật toán RSA (mã hóa, giải mã).</li>
    <li>Hệ thống Diffie-Hellman (trao đổi khóa).</li>
    <li>Chữ ký số và bảo mật dữ liệu.</li>
</ul>
</section>
</main>
        `,
    },
    {
        title: 'Thuật toán Euclide',
        content: `
            <main>
<section>
<h2>Nguyên lý</h2>
<p>Thuật toán Euclide được sử dụng để tìm <strong>Ước số chung lớn nhất (GCD)</strong> của hai số nguyên a và b.</p>
<p>GCD(a, b) là số nguyên dương lớn nhất chia hết cả a và b.</p>
</section>
<section>
<h2>Thuật toán</h2>
<p>GCD được tính bằng phép chia liên tiếp:</p>
<p><strong>GCD(a, b) = GCD(b, a mod b)</strong></p>
<p>Thuật toán lặp lại cho đến khi b = 0, khi đó GCD là a.</p>
</section>
<section>
<h2>Thuật toán Euclide mở rộng</h2>
<p>Thuật toán mở rộng tìm nghiệm của phương trình:</p>
<p><strong>a × x + b × y = GCD(a, b)</strong></p>
<p>Được sử dụng để tính nghịch đảo modular trong RSA.</p>
</section>
<section>
<h2>Ứng dụng</h2>
<ul>
    <li>Rút gọn phân số.</li>
    <li>Kiểm tra số nguyên tố cùng nhau.</li>
    <li>Tính toán trong mật mã học (RSA, ECC).</li>
</ul>
</section>
</main>
        `,
    },
    {
        title: 'Phần tử sinh trong nhóm số học',
        content: `
        <section>
<h2>Khái niệm</h2>
<p>Một số <strong>g</strong> được gọi là phần tử sinh của một nhóm modulo <strong>n</strong> nếu:</p>
<p><strong>g^k mod n</strong> có thể tạo ra tất cả các phần tử từ 1 đến n - 1.</p>
</section>
<section>
<h2>Công thức</h2>
<p>Một số <strong>g</strong> là phần tử sinh của nhóm <strong>Z<sub>p</sub>*</strong> nếu:</p>
<p><strong>g^k mod p</strong> sinh ra mọi số từ 1 đến p - 1 khi k thay đổi.</p>
</section>
<section>
<h2>Ứng dụng</h2>
<ul>
    <li>Thuật toán Diffie-Hellman Key Exchange.</li>
    <li>Hệ mật mã ElGamal.</li>
    <li>Chữ ký số trong hệ thống DSA.</li>
</ul>
</section>
        `,
    },
    {
        title: 'Thuật toán Hill Cipher',
        content: `
           <main>
<section>
<h2>Nguyên lý</h2>
<p>Hill Cipher là thuật toán mã hóa theo khối, sử dụng đại số tuyến tính để mã hóa văn bản.</p>
<p>Dữ liệu được biểu diễn dưới dạng vector số và được nhân với một ma trận khóa.</p>
</section>
<section>
<h2>Mã hóa</h2>
<p>Giả sử ma trận khóa là K, văn bản gốc là vector P, thì bản mã C được tính bằng công thức:</p>
<p><strong>C = K × P mod 26</strong></p>
</section>
<section>
<h2>Giải mã</h2>
<p>Để giải mã, cần tìm ma trận nghịch đảo của K, ký hiệu là K⁻¹, sau đó tính:</p>
<p><strong>P = K⁻¹ × C mod 26</strong></p>
</section>
<section>
<h2>Ứng dụng</h2>
<p>Hill Cipher được sử dụng trong bảo mật thông tin và mật mã học cổ điển.</p>
</section>
</main>
        `,
    },
    {
        title: 'Thuật toán AES (Advanced Encryption Standard)',
        content: `
             <main>
<section>
<h2>Nguyên lý</h2>
<p>AES là thuật toán mã hóa đối xứng, sử dụng một khóa bí mật có độ dài 128-bit, 192-bit hoặc 256-bit.</p>
<p>Dữ liệu được chia thành các khối 128-bit và trải qua nhiều vòng biến đổi để tăng độ an toàn.</p>
</section>
<section>
<h2>Các bước chính</h2>
<ul>
    <li><strong>SubBytes:</strong> Thay thế từng byte bằng giá trị trong bảng S-box.</li>
    <li><strong>ShiftRows:</strong> Dịch chuyển các hàng trong ma trận dữ liệu.</li>
    <li><strong>MixColumns:</strong> Biến đổi dữ liệu bằng phép nhân ma trận.</li>
    <li><strong>AddRoundKey:</strong> XOR dữ liệu với khóa con.</li>
</ul>
</section>
<section>
<h2>Ứng dụng</h2>
<p>AES được sử dụng rộng rãi trong bảo mật WiFi (WPA2), HTTPS, và mã hóa tập tin.</p>
</section>
</main>
        `,
    },
    {
        title: 'Thuật toán DES (Data Encryption Standard)',
        content: `
<main>
<section>
<h2>Giới thiệu</h2>
<p>DES (Data Encryption Standard) là một thuật toán mã hóa khối được phát triển vào những năm 1970 bởi IBM và sau đó được Cơ quan An ninh Quốc gia Hoa Kỳ (NSA) chuẩn hóa.</p>
</section>
<section>
<h2>Nguyên lý hoạt động</h2>
<p>DES hoạt động trên các khối dữ liệu 64 bit và sử dụng khóa 56 bit. Thuật toán thực hiện 16 vòng biến đổi dữ liệu bằng các phép thế và hoán vị.</p>
</section>
<section>
<h2>Quá trình mã hóa</h2>
<ul>
    <li>Ban đầu, dữ liệu được hoán vị bằng Bảng Hoán Vị Ban Đầu (IP).</li>
    <li>Dữ liệu sau đó được chia thành hai nửa: trái (L) và phải (R).</li>
    <li>16 vòng lặp mã hóa với các khóa con được tạo từ khóa chính.</li>
    <li>Kết quả cuối cùng được hoán vị ngược (Inverse IP) để tạo bản mã.</li>
</ul>
</section>
<section>
<h2>Ứng dụng</h2>
<p>DES từng được sử dụng rộng rãi trong lĩnh vực bảo mật thông tin, nhưng ngày nay đã bị thay thế bởi AES do khả năng bảo mật cao hơn.</p>
</section>
</main>
        `,
    },
    {
        title: 'Thuật toán RSA (Rivest-Shamir-Adleman)',
        content: `
            <header>
<h1>Thuật toán RSA (Rivest-Shamir-Adleman)</h1>
</header>
<main>
<section>
    <h2>Nguyên lý</h2>
    <p>
        RSA là thuật toán mã hóa bất đối xứng (khóa công khai) dựa
        trên độ khó của phân tích số nguyên tố.
    </p>
    <p>Sử dụng hai khóa:</p>
    <ul>
        <li>
            Khóa công khai <strong>(e, n)</strong> dùng để mã hóa.
        </li>
        <li>
            Khóa bí mật <strong>(d, n)</strong> dùng để giải mã.
        </li>
    </ul>
</section>
<section>
    <h2>Cách tạo khóa</h2>
    <ol>
        <li>Chọn hai số nguyên tố lớn <em>p</em>, <em>q</em>.</li>
        <li>Tính <strong>n = p × q</strong>.</li>
        <li>
            Tính hàm Euler
            <strong>φ(n) = (p - 1) × (q - 1)</strong>.
        </li>
        <li>
            Chọn số <em>e</em> sao cho
            <strong>1 &lt; e &lt; φ(n)</strong> và GCD(e, φ(n)) = 1.
        </li>
        <li>
            Tính <em>d</em> sao cho
            <strong>(d × e) ≡ 1 mod φ(n)</strong> (nghịch đảo
            modular).
        </li>
        <li>
            Khóa công khai: <strong>(e, n)</strong>, Khóa bí mật:
            <strong>(d, n)</strong>.
        </li>
    </ol>
</section>
<section>
    <h2>Mã hóa & Giải mã</h2>
    <ul>
        <li>
            Mã hóa: <strong>C = M<sup>e</sup> mod n</strong>
        </li>
        <li>
            Giải mã: <strong>M = C<sup>d</sup> mod n</strong>
        </li>
    </ul>
</section>
</main>
        `,
    },
];

let currentIndex = 0;
let intervalTime = 5000;
let interval;
const contentSection = document.getElementById('content-section');

// Hàm render nội dung vào section
function renderContent(index) {
    const algorithm = algorithmContents[index];
    if (!algorithm) return;

    const htmlContent = `
        <h1>${algorithm.title}</h1>
        ${algorithm.content}
    `;
    contentSection.innerHTML = htmlContent;
}

// Hàm cập nhật nội dung với hiệu ứng fade
function updateContent() {
    contentSection.classList.add('fade-out');
    setTimeout(() => {
        renderContent(currentIndex);
        currentIndex = (currentIndex + 1) % algorithmContents.length;
        contentSection.classList.remove('fade-out');
        contentSection.classList.add('fade-in');
    }, 500); // Chờ 0.5s trước khi thay đổi nội dung
    setTimeout(() => {
        contentSection.classList.remove('fade-in');
    }, 1000); // Xóa fade-in sau khi hoàn tất
}

// Bắt đầu tự động chuyển đổi
function startAutoSwitching(time) {
    clearInterval(interval);
    interval = setInterval(updateContent, time);
}

// Khởi tạo nội dung đầu tiên
window.addEventListener('load', () => {
    renderContent(0);
    startAutoSwitching(intervalTime);
});

// Sự kiện hover cho các icon
document.querySelectorAll('.m10').forEach((icon, index) => {
    icon.addEventListener('mouseenter', function () {
        clearInterval(interval);
        contentSection.classList.add('fade-out');
        setTimeout(() => {
            renderContent(index);
            contentSection.classList.remove('fade-out');
            contentSection.classList.add('fade-in');
        }, 500);
        startAutoSwitching(35000); // Khi hover, dừng 40s
    });

    icon.addEventListener('mouseleave', function () {
        startAutoSwitching(5000); // Trở lại 5s sau khi rời chuột
    });
});

// Xử lý form feedback
document
    .getElementById('feedbackForm')
    .addEventListener('submit', function (event) {
        event.preventDefault();

        let message = document.getElementById('contact_message').value.trim();
        if (message === '') {
            alert('Vui lòng nhập nội dung trước khi gửi!');
            return;
        }

        let url =
            'https://docs.google.com/spreadsheets/d/1Pqq4HkE1OFqJ4dfjDn3TMlWCSoPabO-iA1knbizbxOM/edit?gid=0#gid=0'; // Thay bằng URL Web App thực tế
        let formData = new FormData();
        formData.append('message', message);

        fetch(url, { method: 'POST', body: formData })
            .then((response) => response.text())
            .then((data) => {
                alert('Ý kiến của bạn đã được gửi!');
                document.getElementById('contact_message').value = '';
            })
            .catch((error) => console.error('Lỗi:', error));
    });
