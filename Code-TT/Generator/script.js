function isPrime(n) {
  if (n < 2) return false;
  for (let i = 2; i * i <= n; i++) {
      if (n % i === 0) return false;
  }
  return true;
}

function modExp(base, exp, mod) {
  let result = 1;
  while (exp > 0) {
      if (exp % 2 === 1) result = (result * base) % mod;
      base = (base * base) % mod;
      exp = Math.floor(exp / 2);
  }
  return result;
}

function findOrder(a, p) {
  let order = 1, value = a % p;
  while (value !== 1) {
      value = (value * a) % p;
      order++;
      if (order > p - 1) return p;
  }
  return order;
}

function findPrimitiveRoots(p) {
  let results = [];
  let phi = p - 1;
  for (let a = 1; a < p; a++) {
      let order = findOrder(a, p);
      let isPrimitive = order === phi;
      results.push({ a, order, isPrimitive });
  }
  return results;
}

function calculate() {
  const p = parseInt(document.getElementById("inputP").value);
  if (!isPrime(p)) {
      alert("Vui lòng nhập một số nguyên tố hợp lệ!");
      return;
  }
  const results = findPrimitiveRoots(p);
  let primitiveRoots = results.filter(r => r.isPrimitive).map(r => r.a);
  
  let resultText = primitiveRoots.length > 0
      ? `Tập các phần tử sinh của Z*_${p} = { ${primitiveRoots.join(", ")} }`
      : `Không có phần tử sinh trong Z*_${p}`;
  document.getElementById("resultText").textContent = resultText;
  
  let tbody = document.getElementById("resultBody");
  tbody.innerHTML = "";
  results.forEach(r => {
      let row = tbody.insertRow();
      row.insertCell(0).textContent = r.a;
      row.insertCell(1).textContent = r.order;
      row.insertCell(2).textContent = r.isPrimitive ? "✓" : "";
  });
}

fetch('noidung.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('bang-content').innerHTML = data;
            })
            .catch(error => console.error('Lỗi khi tải bang.html:', error));