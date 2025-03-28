             // Chuyển đổi giữa các tab
        function switchTab(tabName) {
          document.querySelectorAll('.tab').forEach(tab => {
              tab.classList.remove('active');
          });
          document.querySelectorAll('.tab-content').forEach(content => {
              content.classList.remove('active');
          });
          
          document.querySelector(`.tab[onclick="switchTab('${tabName}')"]`).classList.add('active');
          document.getElementById(tabName).classList.add('active');
      }
      
      // Kiểm tra số nguyên tố
      function isPrime(n) {
          if (n < 2) return false;
          if (n === 2) return true;
          if (n % 2 === 0) return false;
          for (let i = 3; i * i <= n; i += 2) {
              if (n % i === 0) return false;
          }
          return true;
      }
      
      // Tính lũy thừa modulo
      function modExp(base, exp, mod) {
          let result = 1n;
          base = BigInt(base) % BigInt(mod);
          exp = BigInt(exp);
          mod = BigInt(mod);
          
          while (exp > 0n) {
              if (exp % 2n === 1n) {
                  result = (result * base) % mod;
              }
              base = (base * base) % mod;
              exp = exp / 2n;
          }
          return Number(result);
      }
      
      // Tìm bậc của phần tử a trong Z*p
      function findOrder(a, p) {
          if (a % p === 0) return 0;
          let order = 1;
          let current = a % p;
          
          while (current !== 1) {
              current = (current * a) % p;
              order++;
              if (order > p) return p; // Tránh vòng lặp vô hạn
          }
          return order;
      }
      
      // Liệt kê các lũy thừa của a
      function getPowers(a, p) {
          let powers = [];
          let current = 1;
          for (let i = 1; i < p; i++) {
              current = (current * a) % p;
              powers.push(current);
          }
          return powers.join(", ");
      }
      
      // Tìm tất cả phần tử sinh
      function findPrimitiveRoots(p) {
          let results = [];
          let phi = p - 1;
          
          for (let a = 1; a < p; a++) {
              let order = findOrder(a, p);
              let isPrimitive = order === phi;
              results.push({ 
                  a, 
                  order, 
                  isPrimitive,
                  powers: getPowers(a, p)
              });
          }
          return results;
      }
      
      // Hàm tính Euler's totient function ϕ(n)
      function eulerPhi(n) {
          let result = n;
          for (let p = 2; p * p <= n; p++) {
              if (n % p === 0) {
                  while (n % p === 0) n /= p;
                  result -= result / p;
              }
          }
          if (n > 1) result -= result / n;
          return result;
      }
      
      // Tính toán và hiển thị kết quả
      function calculate() {
          const p = parseInt(document.getElementById('inputP').value);
          
          if (!isPrime(p)) {
              document.getElementById('status').innerHTML = 
                  `<div class="error">Vui lòng nhập một số nguyên tố hợp lệ (2 ≤ p ≤ 1000)</div>`;
              return;
          }
          
          const results = findPrimitiveRoots(p);
          let primitiveRoots = results.filter(r => r.isPrimitive).map(r => r.a);
          
          let resultText = "";
          if (primitiveRoots.length > 0) {
              resultText = `Nhóm Z*${p} có ϕ(${p-1})=${eulerPhi(p-1)} phần tử sinh: { ${primitiveRoots.join(", ")} }`;
          } else {
              resultText = `Nhóm Z*${p} không có phần tử sinh (điều này không xảy ra với p nguyên tố)`;
          }
          document.getElementById('resultText').innerHTML = `<strong>${resultText}</strong>`;
          
          let tbody = document.getElementById('resultBody');
          tbody.innerHTML = "";
          
          results.forEach(r => {
              let row = tbody.insertRow();
              if (r.isPrimitive) row.className = "primitive-root";
              
              row.insertCell(0).textContent = r.a;
              row.insertCell(1).textContent = r.order;
              row.insertCell(2).textContent = r.isPrimitive ? "✓ Là phần tử sinh" : "";
              row.insertCell(3).textContent = r.powers;
          });
          
          document.getElementById('status').innerHTML = 
              `<div class="success">Đã tìm thấy ${primitiveRoots.length} phần tử sinh trong Z*${p}</div>`;
      }
      
      // Xóa tất cả
      function clearAll() {
          document.getElementById('inputP').value = '';
          document.getElementById('resultText').innerHTML = '';
          document.getElementById('resultBody').innerHTML = '';
          document.getElementById('status').innerHTML = '';
      }
      
      // Hiển thị ví dụ mẫu
      function showExample() {
          document.getElementById('inputP').value = '17';
          document.getElementById('status').innerHTML = 
              `<div class="success">Đã tải ví dụ mẫu với p=17. Nhấn "Tìm Phần Tử Sinh" để xem kết quả.</div>`;
      }