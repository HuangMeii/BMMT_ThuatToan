function charToNumber(c) {
  return c.charCodeAt(0) - 'A'.charCodeAt(0);
}

function numberToChar(n) {
  return String.fromCharCode((n % 26 + 26) % 26 + 'A'.charCodeAt(0));
}

function createKeyMatrix(key) {
  let n = Math.sqrt(key.length);
  let matrix = Array(n).fill(0).map(() => Array(n).fill(0));
  for (let i = 0; i < key.length; i++) {
      matrix[Math.floor(i / n)][i % n] = charToNumber(key[i]);
  }
  return matrix;
}

function multiplyMatrixVector(matrix, vector) {
  let n = matrix.length;
  let result = Array(n).fill(0);
  for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
          result[i] += matrix[i][j] * vector[j];
      }
      result[i] = (result[i] % 26 + 26) % 26;
  }
  return result;
}

function determinant(matrix) {
  let n = matrix.length;
  if (n === 1) return matrix[0][0] % 26;
  let det = 0;
  for (let i = 0; i < n; i++) {
      let subMatrix = matrix.slice(1).map(row => row.filter((_, j) => j !== i));
      det += (i % 2 === 0 ? 1 : -1) * matrix[0][i] * determinant(subMatrix);
      det = (det % 26 + 26) % 26;
  }
  return det;
}

function modInverse(det, mod) {
  for (let i = 1; i < mod; i++) {
      if ((det * i) % mod === 1) return i;
  }
  return -1;
}

function inverseMatrix(matrix) {
  let n = matrix.length;
  let det = determinant(matrix);
  let invDet = modInverse(det, 26);
  if (invDet === -1 || det === 0) {
      alert("❌ Không thể tính ma trận nghịch đảo! Vui lòng chọn khóa khác.");
      return null;
  }

  let adjMatrix = Array(n).fill(0).map(() => Array(n).fill(0));
  for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
          let subMatrix = matrix.filter((_, k) => k !== i).map(row => row.filter((_, l) => l !== j));
          let cofactor = (determinant(subMatrix) * ((i + j) % 2 === 0 ? 1 : -1)) % 26;
          adjMatrix[j][i] = (cofactor * invDet + 26) % 26;
      }
  }
  return adjMatrix;
}

function displayMatrix(matrix, title) {
  let html = `<h4>${title}</h4><div class="matrix">`;
  for (let row of matrix) {
      html += '<div class="matrix-row">';
      for (let cell of row) {
          html += `<div class="matrix-cell">${cell}</div>`;
      }
      html += '</div>';
  }
  html += '</div>';
  return html;
}

function encryptText() {
  let key = document.getElementById("key").value.toUpperCase();
  let text = document.getElementById("plaintext").value.toUpperCase().replace(/[^A-Z]/g, "");

  let n = Math.sqrt(key.length);
  if (n * n !== key.length) {
      alert("Khóa không hợp lệ! Độ dài phải là bình phương của một số nguyên.");
      return;
  }

  let keyMatrix = createKeyMatrix(key);
  
  // Hiển thị keyMatrix khi mã hóa
  document.getElementById("matrixInfo").innerHTML = displayMatrix(keyMatrix, "Ma trận khóa (Key Matrix):");
  
  while (text.length % n !== 0) text += text[text.length - 1];

  let result = "";
  let steps = "";
  for (let i = 0; i < text.length; i += n) {
      let block = text.substring(i, i + n).split("").map(charToNumber);
      let encryptedBlock = multiplyMatrixVector(keyMatrix, block);
      let encryptedText = encryptedBlock.map(numberToChar).join("");
      result += encryptedText;
      steps += `🔹 [${text.substring(i, i + n)}] → [${encryptedText}]<br>`;
  }

  document.getElementById("result").innerText = "Bản mã: " + result;
  document.getElementById("steps").innerHTML = steps;
}

function decryptText() {
  let key = document.getElementById("key").value.toUpperCase();
  let text = document.getElementById("plaintext").value.toUpperCase().replace(/[^A-Z]/g, "");

  let n = Math.sqrt(key.length);
  let keyMatrix = createKeyMatrix(key);
  let invMatrix = inverseMatrix(keyMatrix);

  if (!invMatrix) return;

  // Chỉ hiển thị inverseMatrix khi giải mã
  document.getElementById("matrixInfo").innerHTML = displayMatrix(invMatrix, "Ma trận nghịch đảo (Inverse Matrix):");

  let result = "";
  let steps = "";
  for (let i = 0; i < text.length; i += n) {
      let block = text.substring(i, i + n).split("").map(charToNumber);
      let decryptedBlock = multiplyMatrixVector(invMatrix, block);
      let decryptedText = decryptedBlock.map(numberToChar).join("");
      result += decryptedText;
      steps += `🔹 [${text.substring(i, i + n)}] → [${decryptedText}]<br>`;
  }

  document.getElementById("result").innerText = "Giải mã: " + result;
  document.getElementById("steps").innerHTML = steps;
}

fetch('bang.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('bang-content').innerHTML = data;
            })
            .catch(error => console.error('Lỗi khi tải bang.html:', error));
            