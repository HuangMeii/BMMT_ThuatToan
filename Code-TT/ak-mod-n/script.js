function calculate() {
  const a = parseInt(document.getElementById('a').value);
  const k = parseInt(document.getElementById('k').value);
  const n = parseInt(document.getElementById('n').value);

  if (isNaN(a) || isNaN(k) || isNaN(n)) {
      alert("Vui lòng nhập đầy đủ giá trị!");
      return;
  }

  if (k === 0) {
      document.getElementById('finalResult').innerText = "Kết quả: 1";
      return;
  }

  const binaryK = k.toString(2).split('').reverse(); 
  let b = 1;
  let A = a % n;

  if (binaryK[0] === "1") {
      b = A;
  }

  const binaryRow = document.getElementById('binaryRow');
  const aRow = document.getElementById('aRow');
  const bRow = document.getElementById('bRow');
  const headerRow = document.getElementById('headerRow');
  headerRow.innerHTML = '<th></th>';

  binaryRow.innerHTML = '<th>k<sub>i</sub></th>';
  aRow.innerHTML = '<th>A</th>';
  bRow.innerHTML = '<th>B</th>';

  for (let i = 0; i < binaryK.length; i++) {
      const K_i = parseInt(binaryK[i]);
      if (i > 0) {
          A = (A * A) % n;
      }
      if (K_i === 1 && i > 0) {
          b = (b * A) % n;
      }
      headerRow.innerHTML += `<th>${i}</th>`;
      binaryRow.innerHTML += `<td>${K_i}</td>`;
      aRow.innerHTML += `<td>${A}</td>`;
      bRow.innerHTML += `<td>${b}</td>`;
  }

  document.getElementById('finalResult').innerText = `Kết quả: ${b}`;
  document.getElementById('resultTable').style.display = 'table';
}