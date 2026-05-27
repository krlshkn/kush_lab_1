// Названия переменных
const varNames = [
    'остаток денежных средств', 'выручка', 'прибыль', 'активы', 'численность',
    'конкурентоспособность', 'объем продаж', 'инновационность', 'известность бренда',
    'материалоемкость', 'количество ремонтов', 'износ оборудования',
    'налоги в бюджет', 'социальная сфера', 'экологичность'
];

// Массив индексов x для каждой из 98 функций f
const fIndices = [
    7,8,9,10,11,12,4,5,8,9,11,6,7,8,9,10,11,12,13,2,5,7,8,9,11,
    2,4,7,8,11,3,7,8,9,10,11,13,1,8,13,2,5,10,1,7,9,11,12,1,10,
    11,12,2,3,1,7,8,9,13,2,3,1,8,12,1,7,8,11,1,2,3,4,5,6,7,8,
    7,8,9,10,11,12,4,5,8,9,11,6,7,8,9,10,11,12,13,2,5,7,8,9,11
];

let initialValues = [];
let fCoeffs = [];
let qCoeffs = [];

// Генерация случайного числа
function randomRange(min, max) {
    return min + Math.random() * (max - min);
}

// Генерация случайных значений
function generateRandomValues() {
    for (let i = 0; i < 15; i++) {
        let input = document.getElementById(`val_${i}`);
        if (input) input.value = randomRange(0.2, 0.8).toFixed(3);
    }
    
    for (let i = 0; i < 15; i++) {
        let input = document.getElementById(`lim_${i}`);
        if (input) input.value = randomRange(0.05, 0.3).toFixed(3);
    }
    
    for (let i = 0; i < 98; i++) {
        let aInput = document.getElementById(`f_a_${i}`);
        let bInput = document.getElementById(`f_b_${i}`);
        let cInput = document.getElementById(`f_c_${i}`);
        let dInput = document.getElementById(`f_d_${i}`);
        if (aInput) aInput.value = randomRange(0, 0.5).toFixed(3);
        if (bInput) bInput.value = randomRange(0.1, 0.5).toFixed(3);
        if (cInput) cInput.value = randomRange(0.1, 0.5).toFixed(3);
        if (dInput) dInput.value = randomRange(0.3, 1.0).toFixed(3);
    }
    
    for (let i = 0; i < 5; i++) {
        let aInput = document.getElementById(`q_a_${i}`);
        let bInput = document.getElementById(`q_b_${i}`);
        let cInput = document.getElementById(`q_c_${i}`);
        let dInput = document.getElementById(`q_d_${i}`);
        if (aInput) aInput.value = randomRange(0, 0.5).toFixed(3);
        if (bInput) bInput.value = randomRange(0.1, 0.5).toFixed(3);
        if (cInput) cInput.value = randomRange(0.1, 0.5).toFixed(3);
        if (dInput) dInput.value = randomRange(0.3, 1.0).toFixed(3);
    }
}

// Сбор данных из формы
function collectData() {
    for (let i = 0; i < 15; i++) {
        let val = parseFloat(document.getElementById(`val_${i}`).value);
        initialValues[i] = isNaN(val) ? 0.43 : Math.min(1, Math.max(0, val));
    }
    
    for (let i = 0; i < 98; i++) {
        fCoeffs[i] = [
            parseFloat(document.getElementById(`f_a_${i}`).value) || 0,
            parseFloat(document.getElementById(`f_b_${i}`).value) || 0.27,
            parseFloat(document.getElementById(`f_c_${i}`).value) || 0.27,
            parseFloat(document.getElementById(`f_d_${i}`).value) || 0.81
        ];
    }
    
    for (let i = 0; i < 5; i++) {
        qCoeffs[i] = [
            parseFloat(document.getElementById(`q_a_${i}`).value) || 0,
            parseFloat(document.getElementById(`q_b_${i}`).value) || 0.27,
            parseFloat(document.getElementById(`q_c_${i}`).value) || 0.27,
            parseFloat(document.getElementById(`q_d_${i}`).value) || 0.81
        ];
    }
}

// Функции f и q
function f(i, x) {
    let coeffs = fCoeffs[i-1];
    let xc = Math.min(1, Math.max(0, x));
    return coeffs[0] + coeffs[1] * xc + coeffs[2] * xc * xc + coeffs[3] * xc * xc * xc;
}

function q(i, x) {
    let coeffs = qCoeffs[i-1];
    let xc = Math.min(1, Math.max(0, x));
    return coeffs[0] + coeffs[1] * xc + coeffs[2] * xc * xc + coeffs[3] * xc * xc * xc;
}

// Система дифференциальных уравнений
function system(x) {
    let dx = new Array(15);
    
    dx[0] = (1 / initialValues[0]) * (f(1, x[4]) * f(2, x[5]) * f(3, x[6]) * f(4, x[9]) * f(5, x[12]) * f(6, x[13]) * (q(1, x[0]) + q(2, x[0]) - q(3, x[0])));
    dx[1] = (1 / initialValues[1]) * (f(7, x[2]) * f(8, x[11]) * x[12] * f(10, x[13]) * f(11, x[14]) * (q(1, x[1]) + q(5, x[1]) - q(4, x[1])));
    dx[2] = (1 / initialValues[2]) * (f(17, x[13]) * f(12, x[4]) * f(13, x[5]) * f(14, x[6]) * f(18, x[14]) * f(15, x[9]) * f(16, x[12]) * q(2, x[2]) - q(5, x[2]));
    dx[3] = (1 / initialValues[3]) * (f(25, x[10]) * f(19, x[0]) * f(20, x[4]) * f(21, x[5]) * f(22, x[6]) * f(26, x[13]) * f(23, x[7]) * f(24, x[9]) * f(27, x[14]) * q(2, x[3]) - f(28, x[8]));
    dx[4] = (1 / initialValues[4]) * (f(29, x[0]) * f(30, x[5]) * f(31, x[6]) * f(32, x[7]) * f(33, x[9]) * f(34, x[10]) * f(35, x[12]) * (q(1, x[4]) + q(2, x[4]) + q(3, x[4])) - f(36, x[8]));
    dx[5] = (1 / initialValues[5]) * (f(37, x[0]) * f(38, x[2]) * f(39, x[3]) * f(40, x[6]) * f(41, x[7]) * (q(1, x[5]) + q(3, x[5])) - f(42, x[8]));
    dx[6] = (1 / initialValues[6]) * (f(43, x[3]) * f(44, x[5]) * f(45, x[12]) * f(46, x[13]) * (q(3, x[6]) + q(4, x[6])) - f(47, x[8]));
    dx[7] = (1 / initialValues[7]) * (f(48, x[3]) * f(49, x[5]) * f(50, x[6]) * f(51, x[10]) * f(52, x[12]) * f(53, x[14]) * q(3, x[7]) - (f(54, x[4]) * f(55, x[8])));
    dx[8] = (1 / initialValues[8]) * (f(56, x[2]) * f(57, x[5]) * (q(1, x[8]) + q(3, x[8]) + q(4, x[8])) - (f(58, x[3]) * f(59, x[4]) * f(60, x[6]) * f(61, x[7]) * f(62, x[9])));
    dx[9] = (1 / initialValues[9]) * (f(63, x[0]) * f(64, x[5]) * f(65, x[10]) * f(66, x[11]) * f(67, x[12]) * f(68, x[13]) * (q(2, x[9]) + q(5, x[9])) - f(69, x[8]));
    dx[10] = (1 / initialValues[10]) * (f(70, x[3]) * f(71, x[5]) * f(72, x[7]) * f(73, x[9]) * f(74, x[12]) * (q(1, x[10]) + q(3, x[10])) - f(75, x[4]) * f(76, x[6]));
    dx[11] = (1 / initialValues[11]) * (f(77, x[1]) * f(78, x[2]) * f(79, x[3]) * (q(1, x[11]) + q(2, x[11]) + q(5, x[11])) - f(80, x[8]));
    dx[12] = (1 / initialValues[12]) * (f(81, x[0]) * f(82, x[2]) * f(83, x[3]) * f(84, x[4]) * f(85, x[5]) * f(86, x[9]) * f(87, x[13]) * (q(1, x[12]) + q(2, x[12])) - q(4, x[12]));
    dx[13] = (1 / initialValues[13]) * (f(88, x[0]) * f(89, x[6]) * f(90, x[9]) * f(91, x[12]) * (q(2, x[13]) + q(3, x[13])) - q(5, x[13]));
    dx[14] = (1 / initialValues[14]) * (f(92, x[1]) * f(93, x[2]) * f(94, x[3]) * f(95, x[5]) * f(96, x[7]) * f(97, x[8]) * f(98, x[10]) * (q(1, x[14]) + q(2, x[14]) + q(5, x[14])) - q(3, x[14]));
    
    for (let i = 0; i < 15; i++) {
        if (isNaN(dx[i])) dx[i] = 0;
        dx[i] = Math.min(3, Math.max(-3, dx[i]));
    }
    return dx;
}

// Метод Рунге-Кутты 4-го порядка
function rungeKutta4(y0, t0, tf, n) {
    let t = new Array(n);
    let y = new Array(n);
    let h = (tf - t0) / (n - 1);
    
    t[0] = t0;
    y[0] = y0.slice();
    
    for (let step = 0; step < n - 1; step++) {
        let k1 = system(y[step]);
        let k2 = system(y[step].map((val, i) => val + h/2 * k1[i]));
        let k3 = system(y[step].map((val, i) => val + h/2 * k2[i]));
        let k4 = system(y[step].map((val, i) => val + h * k3[i]));
        
        let nextY = new Array(15);
        for (let i = 0; i < 15; i++) {
            nextY[i] = y[step][i] + h/6 * (k1[i] + 2*k2[i] + 2*k3[i] + k4[i]);
            if (isNaN(nextY[i])) nextY[i] = y[step][i];
            nextY[i] = Math.min(1, Math.max(0, nextY[i]));
        }
        y[step + 1] = nextY;
        t[step + 1] = t[step] + h;
    }
    return {t, y};
}

// Отрисовка графика
function drawGraph() {
    collectData();
    
    const canvas = document.getElementById('graphCanvas');
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const padding = 50;
    
    const result = rungeKutta4(initialValues, 0, 1, 100);
    
    let perVarMax = new Array(15).fill(0);
    for (let v = 0; v < 15; v++) {
        for (let i = 0; i < result.y.length; i++) {
            perVarMax[v] = Math.max(perVarMax[v], result.y[i][v]);
        }
        if (perVarMax[v] === 0) perVarMax[v] = 1;
    }

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, width, height);
    
    // Оси
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();
    
    ctx.fillStyle = 'black';
    ctx.font = '12px Arial';
    ctx.fillText('Время', width/2 - 20, height - 10);
    ctx.save();
    ctx.translate(15, height/2);
    ctx.rotate(-Math.PI/2);
    ctx.fillText('Значение', -20, 0);
    ctx.restore();
    
    // Сетка
    for (let i = 0; i <= 5; i++) {
        let x = padding + i * (width - 2*padding) / 5;
        let y = height - padding - i * (height - 2*padding) / 5;
        
        ctx.beginPath();
        ctx.moveTo(x, padding);
        ctx.lineTo(x, height - padding);
        ctx.strokeStyle = '#ddd';
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
        
        ctx.fillStyle = '#666';
        ctx.fillText((i/5).toFixed(1), x - 10, height - padding + 15);
        ctx.fillText((i/5).toFixed(1), padding - 25, y + 3);
    }
    
    const colors = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf', '#f0a3ff', '#a0a0a0', '#ffd700', '#00ced1', '#ff69b4'];
    
    for (let v = 0; v < 15; v++) {
        ctx.beginPath();
        ctx.strokeStyle = colors[v % colors.length];
        ctx.lineWidth = 1.5;
        let first = true;
        for (let i = 0; i < result.t.length; i++) {
            let x = padding + (result.t[i] / 1) * (width - 2*padding);
            let y = height - padding - result.y[i][v] * (height - 2*padding);
            // let normValue = result.y[i][v] / perVarMax[v];
            // let y = height - padding - normValue * (height - 2*padding);
            if (first) {
                ctx.moveTo(x, y);
                first = false;
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.stroke();
    }
    
    ctx.font = '9px Arial';
    let legendX = width - 155;
    let legendY = padding + 5;
    for (let i = 0; i < 15; i++) {
        ctx.fillStyle = colors[i % colors.length];
        ctx.fillRect(legendX, legendY + i * 16, 10, 10);
        ctx.fillStyle = 'black';
        let shortName = varNames[i].substring(0, 14);
        ctx.fillText(shortName, legendX + 12, legendY + i * 16 + 9);
    }
    
    ctx.fillStyle = '#333';
    ctx.font = 'bold 14px Arial';
    ctx.fillText('Динамика переменных', width/2 - 80, 25);
}

// Отрисовка полярной диаграммы
function drawPolar() {
    collectData();
    
    const canvas = document.getElementById('polarCanvas');
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width/2;
    const centerY = height/2;
    const radius = 200;
    
    const result = rungeKutta4(initialValues, 0, 1, 100);
    
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, width, height);
    
    for (let r = 0.2; r <= 1; r += 0.2) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius * r, 0, 2*Math.PI);
        ctx.strokeStyle = '#ccc';
        ctx.stroke();
        ctx.fillStyle = '#666';
        ctx.font = '9px Arial';
        ctx.fillText(r.toFixed(1), centerX + radius * r - 8, centerY - 3);
    }
    
    const angles = [];
    for (let i = 0; i < 15; i++) {
        angles.push(i * 2 * Math.PI / 15);
    }
    
    const timePoints = [0, 25, 50, 75, 99];
    const colors = ['blue', 'green', 'orange', 'red', 'purple'];
    const labels = ['t=0', 't=0.25', 't=0.5', 't=0.75', 't=1.0'];
    
    for (let tpIdx = 0; tpIdx < timePoints.length; tpIdx++) {
        const idx = timePoints[tpIdx];
        const points = [];
        
        for (let i = 0; i < 15; i++) {
            let val = result.y[idx][i];
            let rVal = radius * Math.min(1, Math.max(0, val));
            let x = centerX + rVal * Math.cos(angles[i] - Math.PI/2);
            let y = centerY + rVal * Math.sin(angles[i] - Math.PI/2);
            points.push({x, y});
        }
        
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
            ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.closePath();
        ctx.strokeStyle = colors[tpIdx];
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.fillStyle = colors[tpIdx] + '20';
        ctx.fill();
    }
    
    for (let i = 0; i < 15; i++) {
        let labelX = centerX + (radius + 12) * Math.cos(angles[i] - Math.PI/2);
        let labelY = centerY + (radius + 12) * Math.sin(angles[i] - Math.PI/2);
        ctx.fillStyle = 'black';
        ctx.font = '9px Arial';
        ctx.fillText(`L${i+1}`, labelX - 6, labelY);
    }
    
    ctx.fillStyle = '#333';
    ctx.font = 'bold 12px Arial';
    ctx.fillText('Полярная диаграмма', centerX - 65, 25);
    
    let legendX = width - 100;
    let legendY = 60;
    for (let i = 0; i < timePoints.length; i++) {
        ctx.fillStyle = colors[i];
        ctx.fillRect(legendX, legendY + i*18, 12, 12);
        ctx.fillStyle = 'black';
        ctx.font = '10px Arial';
        ctx.fillText(labels[i], legendX + 15, legendY + i*18 + 10);
    }
}

// Отрисовка всех полей ввода (98 функций f)
function renderUI() {
    // Начальные значения
    let html = '';
    for (let i = 0; i < varNames.length; i++) {
        html += `<div class="param-row">
                    <span>${varNames[i]}</span>
                    <input type="number" id="val_${i}" value="${(0.43 + (i - 7) * 0.01).toFixed(3)}" step="0.01" min="0" max="1">
                </div>`;
    }
    document.getElementById('initial-values').innerHTML = html;
    
    // Ограничения
    html = '';
    for (let i = 0; i < varNames.length; i++) {
        html += `<div class="param-row">
                    <span>${varNames[i]}</span>
                    <input type="number" id="lim_${i}" value="0.1" step="0.01" min="0" max="1">
                </div>`;
    }
    document.getElementById('limits').innerHTML = html;
    
    // 98 функций полиномов f
    html = '';
    for (let i = 0; i < 98; i++) {
        let xIndex = fIndices[i];
        html += `<div class="poly-row">
                    <b>f<sub>${i+1}</sub>(x<sub>${xIndex}</sub>)</b> = 
                    <input type="number" id="f_a_${i}" value="0" step="0.01" min="0" max="1" style="width:55px"> +
                    <input type="number" id="f_b_${i}" value="0.27" step="0.01" min="0" max="1" style="width:55px">·x<sub>${xIndex}</sub> +
                    <input type="number" id="f_c_${i}" value="0.27" step="0.01" min="0" max="1" style="width:55px">·x<sub>${xIndex}</sub>² +
                    <input type="number" id="f_d_${i}" value="0.81" step="0.01" min="0" max="1" style="width:55px">·x<sub>${xIndex}</sub>³
                </div>`;
    }
    document.getElementById('polynomials').innerHTML = html;
    
    // 5 возмущений q
    html = '';
    for (let i = 0; i < 5; i++) {
        html += `<div class="poly-row">
                    <b>q<sub>${i+1}</sub>(x)</b> = 
                    <input type="number" id="q_a_${i}" value="0" step="0.01" min="0" max="1" style="width:55px"> +
                    <input type="number" id="q_b_${i}" value="0.27" step="0.01" min="0" max="1" style="width:55px"> * sin(
                    <input type="number" id="q_c_${i}" value="0.27" step="0.01" min="0" max="1" style="width:55px">·t +
                    <input type="number" id="q_d_${i}" value="0.81" step="0.01" min="0" max="1" style="width:55px">)
                </div>`;
    }
    document.getElementById('perturbations').innerHTML = html;
}

// Инициализация и обработчики
document.getElementById('runBtn').onclick = () => {
    document.getElementById('graphContainer').style.display = 'block';
    document.getElementById('polarContainer').style.display = 'none';
    drawGraph();
};

document.getElementById('polarBtn').onclick = () => {
    document.getElementById('graphContainer').style.display = 'none';
    document.getElementById('polarContainer').style.display = 'block';
    drawPolar();
};

document.getElementById('randomBtn').onclick = () => {
    generateRandomValues();
    if (document.getElementById('graphContainer').style.display !== 'none') {
        drawGraph();
    } else {
        drawPolar();
    }
};

document.getElementById('resetBtn').onclick = () => {
    location.reload();
};

renderUI();
drawGraph();

console.log('Приложение загружено! Нажмите кнопки для работы.');
