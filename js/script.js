const algorithmContents = [
  {
      title: 'Thuật toán Lũy thừa nhanh (<strong><em>a<sup>k</sup> mod n</em></strong>)',
      content: `
          <main>
<section>
<h2>Khái niệm</h2>
<p>Thuật toán <strong><em>a<sup>k</sup> mod n</em></strong> được sử dụng để tính phần dư của phép chia <strong><em>a<sup>k</sup></em></strong> (lũy thừa của a với số mũ k) cho n. Đây là một bài toán thường gặp trong lý thuyết số và mật mã học.</p>
</section>

<section>
<h2>Nguyên lý</h2>
<p>Thuật toán lũy thừa nhanh giúp tính <strong><em>a<sup>k</sup> mod n</em></strong> một cách hiệu quả mà không cần thực hiện phép nhân trực tiếp, giúp tránh số quá lớn.</p>
</section>

<section>
<h2>Ứng dụng</h2>
<ul>
  <li>Thuật toán RSA (mã hóa, giải mã).</li>
  <li>Hệ thống Diffie-Hellman (trao đổi khóa).</li>
  <li>Chữ ký số và bảo mật dữ liệu.</li>
</ul>
<button onclick="window.open('Code-TT/ak-mod-n/index.html', '_blank')">Xem chi tiết</button>
</section>
</main>
      `,
    },
    {
      title: 'Thuật toán Euclide mở rộng',
      content: `
          <main>
      <section>
      
      <section>
      <h2>Định nghĩa</h2>
      <p>Thuật toán Euclide mở rộng là một phiên bản mở rộng của thuật toán Euclide, được sử dụng để tìm ước số chung lớn nhất (GCD) của hai số nguyên <strong>a</strong> và <strong>b</strong>, đồng thời tìm hai số nguyên <strong>x</strong> và <strong>y</strong> sao cho:</p>
      <p style = "margin-left: 20px;"><strong><em>a × x + b × y = GCD(a, b)</em></strong></p>
      <p>Đây được gọi là <strong><em>định lý Bézout</em></strong>, và các số <strong><em>x</em></strong>, <strong><em>y</em></strong> được gọi là <strong><em>hệ số Bézout</em></strong>.</p>
      <p>Thuật toán Euclide mở rộng không chỉ cho biết GCD của hai số mà còn giúp giải phương trình tuyến tính Diophantine và tìm nghịch đảo modulo, một ứng dụng quan trọng trong lý thuyết số và mật mã học.</p>
      </section>
      
      <section>
      <h2>Ứng dụng</h2>
      <ul>
          <li>Rút gọn phân số.</li>
          <li>Kiểm tra số nguyên tố cùng nhau.</li>
          <li>Tính toán trong mật mã học (RSA, ECC).</li>
      </ul>
      <button onclick="window.open('Code-TT/Euclide/index.html', '_blank')">Xem chi tiết</button>
      </section>
      </main>
      `,
      
    },
    {
      title: 'Phần tử sinh ',
      content: `
      <section>
        <h2>Khái niệm</h2>
        <p>Một số <strong>g</strong> là phần tử sinh của một nhóm modulo <strong>n</strong> nếu:</p>
        <p><strong><em>g<sup>k</sup> mod n</em></strong> có thể tạo ra tất cả các phần tử từ 1 đến n - 1.</p>
        <p>Nói cách khác, khi lấy lũy thừa của <strong>g</strong> theo modulo <strong>n</strong>, ta sẽ nhận được tất cả các phần tử trong nhóm.</p>
      </section>
      
      <section>
        <h2>Công thức</h2>
        <p>Một số <strong>g</strong> là phần tử sinh của nhóm <strong>Z<sub>p</sub>*</strong> nếu:</p>
        <p><strong> <em>g<sup>k</sup> mod p</em></strong> sinh ra mọi số từ 1 đến p - 1 khi k thay đổi.</p>
        <p>Điều kiện để <strong>g</strong> là phần tử sinh:</p>
        <ul>
          <li>gcd(g, p) = 1 (tức là <strong>g</strong> nguyên tố cùng nhau với <strong>p</strong>).</li>
          <li>Giá trị <strong><em>g<sup>k</sup> mod p</em></strong> không lặp lại cho đến khi k = p - 1.</li>
        </ul>
      </section>
      
      <section>
        <h2>Ứng dụng</h2>
        <ul>
          <li>Thuật toán Diffie-Hellman Key Exchange – trao đổi khóa.</li>
          <li>Hệ mật mã ElGamal – tạo khóa công khai và chữ ký số.</li>
          <li>Chữ ký số trong hệ thống DSA (Digital Signature Algorithm).</li>
          <li>Tính toán logarithm rời rạc và bảo mật mật mã học.</li>
        </ul>
        <button onclick="window.open('Code-TT/Generator/index.html', '_blank')">Xem chi tiết</button>
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
              <p>Bảo mật thông tin và mật mã học cổ điển.</p>
              <button style="margin-top:13px;" onclick="window.open('Code-TT/Hill/index.html', '_blank')">Xem chi tiết</button>
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
<p>AES là thuật toán <strong><em>mã hóa đối xứng</em></strong>, sử dụng một <em><strong>khóa bí mật</em></strong> có độ dài 128-bit, 192-bit hoặc 256-bit.</p>
<p>Dữ liệu được chia thành các khối 128-bit và trải qua <em><strong>nhiều vòng biến đổi</em></strong> để tăng độ an toàn.</p>
</section>
<section>
<h2>Các bước chính</h2>
<ul>
    <li><strong><em>SubBytes:</em></strong> Thay thế từng byte bằng giá trị trong bảng S-box.</li>
    <li><strong><em>ShiftRows:</em></strong> Dịch chuyển các hàng trong ma trận dữ liệu.</li>
    <li><strong><em>MixColumns:</em></strong> Biến đổi dữ liệu bằng phép nhân ma trận.</li>
    <li><strong><em>AddRoundKey:</em></strong> XOR dữ liệu với khóa con.</li>
</ul>
</section>
<section>
<h2>Ứng dụng</h2>
<p>AES được sử dụng rộng rãi trong bảo mật WiFi (WPA2), HTTPS, và mã hóa tập tin.</p>
<button style="margin-top:10px;" onclick="window.open('Code-TT/Ceasar/index.html', '_blank')">Xem chi tiết</button>
</section>
</main>
        `,
    },

    {
        title: 'Thuật toán RSA (Rivest-Shamir-Adleman)',
        content: `
<main>
<section>
    <h2>Nguyên lý</h2>
    <p>
        RSA là thuật toán <strong><em>mã hóa bất đối xứng (khóa công khai)</em></strong> dựa trên độ khó của phân tích số nguyên tố.
    </p>
    <p>Sử dụng hai khóa:</p>
    <ul>
        <li>
            Khóa công khai <strong><em>(e, n)</em></strong> dùng để mã hóa.
        </li>
        <li>
            Khóa bí mật <strong><em>(d, n)</em></strong> dùng để giải mã.
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
            <strong>(d × e) ≡ 1 mod φ(n)</strong> 
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
    <button onclick="window.open('Code-TT/RSA/index.html', '_blank')">Xem chi tiết</button>
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
        let username = document.getElementById('contact_username').value.trim();
        if (message === '') {
            alert('Vui lòng nhập nội dung trước khi gửi!');
            return;
        }

        let url =
            'https://67e66af66530dbd3110fe369.mockapi.io/hmmmm/huangmei';  

        fetch(url, { 
          method: 'POST',
          headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            // Chuyển đổi dữ liệu thành JSON
            // body: JSON.stringify({ message: message })
            // Chuyển đổi dữ liệu thành FormData
          body: JSON.stringify({ 
            Username: username,
            Message: message }) 
          })
            .then((response) => response.json())
            .then((data) => {
                alert('Ý kiến của bạn đã được gửi!');
                document.getElementById('contact_message').value = '';
                document.getElementById('contact_username').value = '';
                console.log(data);
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Đã xảy ra lỗi khi gửi ý kiến của bạn!');
            });
    });
