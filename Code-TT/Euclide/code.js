// Thuật toán Euclide Mở Rộng
function extendedEuclid(a, b) {
    // x0, x1, y0, y1 là các biến trung gian để tính x, y
    let x0 = 1, x1 = 0, y0 = 0, y1 = 1;
    let steps = [];

    // Đẩy dòng khởi tạo (trước khi vòng lặp) vào bảng
    steps.push({
        q: '-',
        r: '-',
        x: '-',
        y: '-',
        a: a,
        b: b,
        x2: x0,
        x1: x1,
        y2: y0,
        y1: y1
    });

    // Vòng lặp chính
    while (b !== 0) {
        let q = Math.floor(a / b);
        let r = a % b;

        // Tính x, y mới
        let newX = x0 - q * x1;
        let newY = y0 - q * y1;

        // Cập nhật a, b, x0, x1, y0, y1
        a = b;
        b = r;
        x0 = x1;
        x1 = newX;
        y0 = y1;
        y1 = newY;

        // Lưu trạng thái *sau* khi cập nhật
        steps.push({
            q: q,
            r: r,
            x: newX,
            y: newY,
            a: a,
            b: b,
            x2: x0,
            x1: x1,
            y2: y0,
            y1: y1
        });
    }

    // a cuối cùng là gcd, x0, y0 là nghiệm
    return {
        gcd: a,
        x: x0,
        y: y0,
        steps: steps
    };
}

function calculate() {
    let a = parseInt(document.getElementById('inputA').value);
    let b = parseInt(document.getElementById('inputB').value);

    if (isNaN(a) || isNaN(b)) {
        alert("Vui lòng nhập số hợp lệ!");
        return;
    }

    let result = extendedEuclid(a, b);
    let steps = result.steps;
    let gcd = result.gcd;
    let resultTable = '';

    // Hiển thị từng bước trong bảng
    steps.forEach(step => {
        resultTable += `
        <tr>
            <td>${step.q}</td>
            <td>${step.r}</td>
            <td>${step.x}</td>
            <td>${step.y}</td>
            <td>${step.a}</td>
            <td>${step.b}</td>
            <td>${step.x2}</td>
            <td>${step.x1}</td>
            <td>${step.y2}</td>
            <td>${step.y1}</td>
        </tr>`;
    });

    document.getElementById('resultTableBody').innerHTML = resultTable;

    // Hiển thị kết quả cuối cùng
    if (gcd === 1) {
        // x0, y0 là kết quả sau vòng lặp => result.x, result.y
        // Tính nghịch đảo của a mod b (chỉ cần nếu gcd=1)
        // Lưu ý: Lúc này b có thể đã thành 0, nên cần b gốc
        // => Lưu b gốc ngay từ đầu nếu cần. Ở đây ta chỉ in gcd=1
        document.getElementById('finalResult').innerText =
            `GCD = 1. (x, y) = (${result.x}, ${result.y}). ` +
            `Nghịch đảo của số a mod b cũng có thể tính dựa trên x.`;
    } else {
        document.getElementById('finalResult').innerText =
            `GCD = ${gcd}. Không có nghịch đảo vì gcd ≠ 1.`;
    }
}