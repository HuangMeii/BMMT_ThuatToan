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
// Hàm tạo chuỗi hiển thị ma trận dạng LaTeX
function displayMatrix(matrix, name) {
    let rows = [];
    for (let i = 0; i < matrix.length; i++) {
        // Thêm khoảng trắng giữa các phần tử để dễ đọc
        rows.push(matrix[i].map(num => num.toString().padEnd(2)).join(' & '));
    }
    return `
        <div class="math-matrix">
            ${name} = \\(\\left[ \\begin{matrix} 
            ${rows.join(' \\\\ ')} 
            \\end{matrix} \\right]\\)
        </div>
    `;
}

// Hàm render công thức toán học (sử dụng MathJax)
function renderMath() {
    if (typeof MathJax !== 'undefined') {
        MathJax.typeset();
    }
}
// Cập nhật placeholder cho ô nhập khóa
function updateKeyPlaceholder() {
    const size = document.getElementById('matrixSize').value;
    const keyInput = document.getElementById('key');
    if (size === '2') {
        keyInput.placeholder = "Nhập 4 chữ cái cho ma trận 2x2";
        keyInput.maxLength = 4;
    } else {
        keyInput.placeholder = "Nhập 9 chữ cái cho ma trận 3x3";
        keyInput.maxLength = 9;
    }
    keyInput.value = ''; // Xóa giá trị cũ khi thay đổi kích thước
}

// Chuyển ký tự sang số (A=0, B=1,..., Z=25)
function charToNum(c) {
    return c.toUpperCase().charCodeAt(0) - 65;
}

// Chuyển số sang ký tự
function numToChar(n) {
    return String.fromCharCode((n % 26 + 26) % 26 + 65);
}


// Tính định thức của ma trận
function determinant(matrix) {
    const size = matrix.length;
    if (size === 2) {
        return ((matrix[0][0] * matrix[1][1]) - (matrix[0][1] * matrix[1][0])) % 26;
    } else if (size === 3) {
        return (
            (matrix[0][0] * ((matrix[1][1] * matrix[2][2] - matrix[1][2] * matrix[2][1])) % 26) -
            (matrix[0][1] * ((matrix[1][0] * matrix[2][2] - matrix[1][2] * matrix[2][0])) % 26) +
            (matrix[0][2] * ((matrix[1][0] * matrix[2][1] - matrix[1][1] * matrix[2][0])) % 26)
        ) % 26;
    }
    return 0;
}

// Tìm nghịch đảo modulo 26
function modInverse(a, m) {
    a = (a % m + m) % m;
    for (let x = 1; x < m; x++) {
        if ((a * x) % m === 1) {
            return x;
        }
    }
    return -1; // Không tồn tại nghịch đảo
}

// Tạo ma trận khóa từ chuỗi
function createKeyMatrix(keyStr) {
    const size = parseInt(document.getElementById('matrixSize').value);
    if (keyStr.length !== size * size) {
        throw new Error(`Khóa phải có đúng ${size * size} ký tự cho ma trận ${size}x${size}`);
    }

    const matrix = new Array(size);
    for (let i = 0; i < size; i++) {
        matrix[i] = new Array(size);
        for (let j = 0; j < size; j++) {
            matrix[i][j] = charToNum(keyStr[i * size + j]);
        }
    }
    return matrix;
}

// Kiểm tra khóa hợp lệ
function isValidKey(keyMatrix) {
    const det = determinant(keyMatrix);
    return det !== 0 && modInverse(det, 26) !== -1;
}

// Tạo ma trận nghịch đảo cho ma trận 2x2
function inverseMatrix2x2(matrix) {
    const det = determinant(matrix);
    const detInv = modInverse((det + 26) % 26, 26);

    const adjugate = [
        [matrix[1][1], -matrix[0][1]],
        [-matrix[1][0], matrix[0][0]]
    ];

    const inverse = new Array(2);
    for (let i = 0; i < 2; i++) {
        inverse[i] = new Array(2);
        for (let j = 0; j < 2; j++) {
            inverse[i][j] = ((adjugate[i][j] % 26 + 26) % 26 * detInv) % 26;
        }
    }

    return inverse;
}

// Tạo ma trận nghịch đảo cho ma trận 3x3
function inverseMatrix3x3(matrix) {
    const det = determinant(matrix);
    const detInv = modInverse((det + 26) % 26, 26);

    // Tính ma trận phụ hợp (cofactor matrix)
    const cofactor = new Array(3);
    for (let i = 0; i < 3; i++) {
        cofactor[i] = new Array(3);
        for (let j = 0; j < 3; j++) {
            // Tính định thức của ma trận con 2x2
            const minorMatrix = [];
            for (let r = 0; r < 3; r++) {
                if (r !== i) {
                    const row = [];
                    for (let c = 0; c < 3; c++) {
                        if (c !== j) {
                            row.push(matrix[r][c]);
                        }
                    }
                    minorMatrix.push(row);
                }
            }

            // Tính định thức của ma trận con 2x2
            const minorDet = (minorMatrix[0][0] * minorMatrix[1][1] - minorMatrix[0][1] * minorMatrix[1][0]) % 26;

            // Áp dụng dấu cho phần tử phụ hợp
            cofactor[i][j] = ((i + j) % 2 === 0 ? minorDet : -minorDet) % 26;
            if (cofactor[i][j] < 0) cofactor[i][j] += 26;
        }
    }

    // Tính ma trận liên hợp (adjugate) bằng cách chuyển vị ma trận phụ hợp
    const adjugate = new Array(3);
    for (let i = 0; i < 3; i++) {
        adjugate[i] = new Array(3);
        for (let j = 0; j < 3; j++) {
            adjugate[i][j] = cofactor[j][i];
        }
    }

    // Tính ma trận nghịch đảo
    const inverse = new Array(3);
    for (let i = 0; i < 3; i++) {
        inverse[i] = new Array(3);
        for (let j = 0; j < 3; j++) {
            inverse[i][j] = (adjugate[i][j] * detInv) % 26;
        }
    }

    return inverse;
}

// Xử lý một khối ký tự với ma trận khóa
function processBlock(block, matrix) {
    const size = matrix.length;
    let result = '';
    const nums = block.split('').map(c => charToNum(c));

    for (let i = 0; i < size; i++) {
        let sum = 0;
        for (let j = 0; j < size; j++) {
            sum += matrix[i][j] * nums[j];
        }
        result += numToChar(sum % 26);
    }

    return result;
}

// Hiển thị ma trận đẹp
function formatMatrix(matrix) {
    const size = matrix.length;
    let html = '<div class="matrix-container">';
    html += '<span class="matrix-bracket">[</span>';
    html += '<div class="matrix-content">';

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            html += matrix[i][j];
            if (j < size - 1) html += ' &nbsp; ';
        }
        if (i < size - 1) html += '<br>';
    }

    html += '</div>';
    html += '<span class="matrix-bracket">]</span>';
    html += '</div>';

    return html;
}

// Hiển thị vector đẹp
function formatVector(vector) {
    let html = '<div class="matrix-container">';
    html += '<span class="matrix-bracket">[</span>';
    html += '<div class="matrix-content">';

    for (let i = 0; i < vector.length; i++) {
        html += vector[i];
        if (i < vector.length - 1) html += '<br>';
    }

    html += '</div>';
    html += '<span class="matrix-bracket">]</span>';
    html += '</div>';

    return html;
}
// Hiển thị chi tiết quá trình mã hóa từng khối ký tự
function showEncryptionDetails(keyMatrix, plaintextBlocks) {
    const size = keyMatrix.length;
    let detailsHTML = '<div class="process-step"><h4>Chi tiết mã hóa:</h4>'; // Khởi tạo biến detailsHTML

    for (let i = 0; i < plaintextBlocks.length; i++) {
        const block = plaintextBlocks[i];
        const nums = block.split('').map(c => charToNum(c));

        // Tính toán kết quả
        let resultNums = [];
        for (let j = 0; j < size; j++) {
            let sum = 0;
            for (let k = 0; k < size; k++) {
                sum += keyMatrix[j][k] * nums[k];
            }
            resultNums.push(sum % 26);
        }

        const resultChars = resultNums.map(n => numToChar(n)).join('');

        // Hiển thị chi tiết
        detailsHTML += `
    <div class="pair-details">
        <p><strong>Khối ${i + 1}: ${block} (${nums.join(',')}) → ${resultChars} (${resultNums.join(',')})</strong></p>
        <div class="matrix">`;

        // Hiển thị phép nhân ma trận
        for (let j = 0; j < size; j++) {
            let row = '[';
            for (let k = 0; k < size; k++) {
                row += `${keyMatrix[j][k]}${k < size - 1 ? ' ' : ''}`;
            }
            row += `]   ${j === Math.floor(size / 2) ? '×' : ' '}   [${nums.join(' ')}]   ${j === Math.floor(size / 2) ? '=' : ' '}   [`;

            let calcParts = [];
            for (let k = 0; k < size; k++) {
                calcParts.push(`${keyMatrix[j][k]}×${nums[k]}`);
            }
            row += `${calcParts.join(' + ')}]   ${j === Math.floor(size / 2) ? '=' : ' '}   [${resultNums[j]}] → [${numToChar(resultNums[j])}]   `;

            detailsHTML += row + '\n';
        }

        detailsHTML += `</div></div>`;
    }

    detailsHTML += '</div>';
    return detailsHTML;
}

// Hiển thị chi tiết quá trình giải mã từng khối ký tự
function showDecryptionDetails(inverseKeyMatrix, ciphertextBlocks) {
    const size = inverseKeyMatrix.length;
    let detailsHTML = '<div class="process-step"><h4>Chi tiết giải mã:</h4>'; // Khởi tạo biến detailsHTML

    for (let i = 0; i < ciphertextBlocks.length; i++) {
        const block = ciphertextBlocks[i];
        const nums = block.split('').map(c => charToNum(c));

        // Tính toán kết quả
        let resultNums = [];
        for (let j = 0; j < size; j++) {
            let sum = 0;
            for (let k = 0; k < size; k++) {
                sum += inverseKeyMatrix[j][k] * nums[k];
            }
            resultNums.push(sum % 26);
        }

        const resultChars = resultNums.map(n => numToChar(n)).join('');

        // Hiển thị chi tiết
        detailsHTML += `
    <div class="pair-details">
        <p><strong>Khối ${i + 1}: ${block} (${nums.join(',')}) → ${resultChars} (${resultNums.join(',')})</strong></p>
        <div class="matrix">`;

        // Hiển thị phép nhân ma trận
        for (let j = 0; j < size; j++) {
            let row = '[';
            for (let k = 0; k < size; k++) {
                row += `${inverseKeyMatrix[j][k]}${k < size - 1 ? ' ' : ''}`;
            }
            row += `]   ${j === Math.floor(size / 2) ? '×' : ' '}   [${nums.join(' ')}]   ${j === Math.floor(size / 2) ? '=' : ' '}   [`;

            let calcParts = [];
            for (let k = 0; k < size; k++) {
                calcParts.push(`${inverseKeyMatrix[j][k]}×${nums[k]}`);
            }
            row += `${calcParts.join(' + ')}]   ${j === Math.floor(size / 2) ? '=' : ' '}   [${resultNums[j]}] [${numToChar(resultNums[j])}]`;

            detailsHTML += row + '\n';
        }

        detailsHTML += `</div></div>`;
    }

    detailsHTML += '</div>';
    return detailsHTML;
}
function encrypt() {
    try {
        let processHTML = '';
        const keyStr = document.getElementById('key').value;
        const plaintext = document.getElementById('plaintext').value;
        const size = parseInt(document.getElementById('matrixSize').value);
        const requiredLength = size * size;

        if (!keyStr || keyStr.length !== requiredLength) {
            throw new Error(`Khóa phải có đúng ${requiredLength} ký tự cho ma trận ${size}x${size}`);
        }

        if (!plaintext) {
            throw new Error("Vui lòng nhập văn bản cần mã hóa");
        }

        const keyMatrix = createKeyMatrix(keyStr);
        if (!isValidKey(keyMatrix)) {
            throw new Error("Ma trận khóa không khả nghịch modulo 26");
        }

        // Làm sạch và chuẩn hóa văn bản
        const cleanText = plaintext.toUpperCase().replace(/[^A-Z]/g, '');
        if (cleanText.length === 0) {
            throw new Error("Văn bản không chứa ký tự chữ cái nào");
        }

        // Thêm padding nếu cần
        let paddedText = cleanText;
        const remainder = paddedText.length % size;
        if (remainder !== 0) {
            const paddingChar = paddedText[paddedText.length - 1];
            paddedText += paddingChar.repeat(size - remainder);
        }

        // Tạo các khối ký tự để xử lý
        const plaintextBlocks = [];
        for (let i = 0; i < paddedText.length; i += size) {
            plaintextBlocks.push(paddedText.substr(i, size));
        }

        // Mã hóa từng khối
        let ciphertext = '';
        for (let i = 0; i < plaintextBlocks.length; i++) {
            ciphertext += processBlock(plaintextBlocks[i], keyMatrix);
        }

        document.getElementById('ciphertext').value = ciphertext;

        // Hiển thị thông tin chi tiết
        const det = determinant(keyMatrix);
        const detInv = modInverse(det, 26);
        let matrixInfo = document.getElementById('matrixInfo');
        matrixInfo.innerHTML = displayMatrix(keyMatrix, 'K') +
            `<p>Định thức = ${det}</p>` +
            `<p>Nghịch đảo định thức mod 26 = ${detInv}</p>`;
        renderMath();
        // Thêm chi tiết giải mã từng khối
        processHTML += showEncryptionDetails(keyMatrix, plaintextBlocks);

        processHTML += `
    <div class="process-step">
        <h4>Kết quả giải mã:</h4>
        <p>${ciphertext}</p>
    </div>
`;

        document.getElementById('processSteps').innerHTML = processHTML;
        document.getElementById('status').innerHTML =
            `<div class="success">Mã hóa thành công! Đã xử lý ${plaintextBlocks.length} khối ký tự.</div>`;

    } catch (error) {
        document.getElementById('status').innerHTML =
            `<div class="error">Lỗi: ${error.message}</div>`;
    }
}

// Giải mã văn bản
function decrypt() {
    try {
        let processHTML = '';
        const keyStr = document.getElementById('key').value;
        const ciphertext = document.getElementById('ciphertext').value;
        const size = parseInt(document.getElementById('matrixSize').value);
        const requiredLength = size * size;

        if (!keyStr || keyStr.length !== requiredLength) {
            throw new Error(`Khóa phải có đúng ${requiredLength} ký tự cho ma trận ${size}x${size}`);
        }

        if (!ciphertext) {
            throw new Error("Vui lòng nhập bản mã cần giải mã");
        }

        if (ciphertext.length % size !== 0) {
            throw new Error(`Độ dài bản mã phải chia hết cho ${size}`);
        }

        const keyMatrix = createKeyMatrix(keyStr);
        if (!isValidKey(keyMatrix)) {
            throw new Error("Ma trận khóa không khả nghịch modulo 26");
        }

        // Tạo ma trận nghịch đảo
        let inverseKeyMatrix;
        if (size === 2) {
            inverseKeyMatrix = inverseMatrix2x2(keyMatrix);
        } else {
            inverseKeyMatrix = inverseMatrix3x3(keyMatrix);
        }

        // Làm sạch và chuẩn hóa văn bản
        const cleanText = ciphertext.toUpperCase().replace(/[^A-Z]/g, '');
        if (cleanText.length === 0) {
            throw new Error("Bản mã không chứa ký tự chữ cái nào");
        }

        // Tạo các khối ký tự để xử lý
        const ciphertextBlocks = [];
        for (let i = 0; i < cleanText.length; i += size) {
            ciphertextBlocks.push(cleanText.substr(i, size));
        }

        // Giải mã từng khối
        let plaintext = '';
        for (let i = 0; i < ciphertextBlocks.length; i++) {
            plaintext += processBlock(ciphertextBlocks[i], inverseKeyMatrix);
        }

        document.getElementById('decryptedText').value = plaintext;

        // Hiển thị thông tin chi tiết
        const det = determinant(keyMatrix);
        const detInv = modInverse(det, 26);
        let matrixInfo = document.getElementById('matrixInfo');
        matrixInfo.innerHTML = displayMatrix(keyMatrix, 'K') + '<br>' +
            displayMatrix(inverseKeyMatrix, 'K^{-1}') +
            `<p>Định thức = ${det}</p>` +
            `<p>Nghịch đảo định thức mod 26 = ${detInv}</p>`;
        renderMath();

        // Thêm chi tiết giải mã từng khối
        processHTML += showDecryptionDetails(inverseKeyMatrix, ciphertextBlocks);

        processHTML += `
    <div class="process-step">
        <h4>Kết quả giải mã:</h4>
        <p>${plaintext}</p>
    </div>
`;

        document.getElementById('processSteps').innerHTML = processHTML;
        document.getElementById('status').innerHTML =
            `<div class="success">Giải mã thành công! Đã xử lý ${ciphertextBlocks.length} khối ký tự.</div>`;

    } catch (error) {
        document.getElementById('status').innerHTML =
            `<div class="error">Lỗi: ${error.message}</div>`;
    }
}

// Tạo khóa ngẫu nhiên
function generateRandomKey() {
    let keyMatrix;
    let keyStr;
    let det;
    let detInv;

    do {
        keyStr = '';
        for (let i = 0; i < 4; i++) {
            keyStr += String.fromCharCode(Math.floor(Math.random() * 26) + 65);
        }

        keyMatrix = createKeyMatrix(keyStr);
        det = determinant(keyMatrix);
        detInv = modInverse(det, 26);
    } while (det === 0 || detInv === -1);

    document.getElementById('key').value = keyStr;
    document.getElementById('status').innerHTML =
        `<div class="success">Đã tạo khóa ngẫu nhiên: ${keyStr} (Định thức = ${det}, Nghịch đảo = ${detInv})</div>`;
}

// Xóa tất cả
function clearAll() {
    document.getElementById('key').value = '';
    document.getElementById('plaintext').value = '';
    document.getElementById('ciphertext').value = '';
    document.getElementById('decryptedText').value = '';
    document.getElementById('processSteps').innerHTML = '';
    document.getElementById('status').innerHTML = '';
}

// Hiển thị ví dụ mẫu
function showExample() {
    document.getElementById('key').value = 'HILL';
    document.getElementById('plaintext').value = 'ATTACK AT DAWN';
    document.getElementById('status').innerHTML =
        `<div class="success">Đã tải ví dụ mẫu với khóa "HILL" và văn bản "ATTACK AT DAWN". Nhấn "Mã hóa" để xem kết quả.</div>`;
}
