document.addEventListener('DOMContentLoaded', () => {
  // 1. Control de Pestañas (Módulos)
  const tabButtons = document.querySelectorAll('.tab-btn');
  const modules = document.querySelectorAll('.module');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetModuleId = btn.getAttribute('data-module');

      tabButtons.forEach(b => b.classList.remove('active'));
      modules.forEach(m => m.classList.remove('active'));

      btn.classList.add('active');
      const targetModule = document.getElementById(targetModuleId);
      if (targetModule) {
        targetModule.classList.add('active');
      }
    });
  });

  // 2. Enlace seguro de botones
  const btn1 = document.getElementById('btn_ej1');
  const btn2 = document.getElementById('btn_ej2');
  const btn3 = document.getElementById('btn_ej3');
  const btn4 = document.getElementById('btn_ej4');

  if (btn1) btn1.addEventListener('click', calcularCuadratica);
  if (btn2) btn2.addEventListener('click', estimarPi);
  if (btn3) btn3.addEventListener('click', repartirCamellos);
  if (btn4) btn4.addEventListener('click', repartirPanes);
});

// --- FUNCIONES ---

function calcularCuadratica() {
  const a = parseFloat(document.getElementById('eq_a').value);
  const b = parseFloat(document.getElementById('eq_b').value);
  const c = parseFloat(document.getElementById('eq_c').value);
  const box = document.getElementById('res_ej1');
  const code = document.getElementById('code_ej1');

  if (isNaN(a) || isNaN(b) || isNaN(c) || a === 0) {
    code.textContent = "Error: Ingrese coeficientes válidos (a no puede ser 0).";
    box.classList.add('show');
    return;
  }

  const D = (b * b) - (4 * a * c);
  let salida = `Ecuación: ${a}x² + ${b}x + ${c} = 0\n`;
  salida += `Discriminante (D) = ${D}\n\n`;

  if (D > 0) {
    const x1 = (-b + Math.sqrt(D)) / (2 * a);
    const x2 = (-b - Math.sqrt(D)) / (2 * a);
    salida += `The equation has two roots,\n x1 = ${x1}\n x2 = ${x2}`;
  } else if (D === 0) {
    const x = -b / (2 * a);
    salida += `The equation has one root,\n x = ${x}`;
  } else {
    salida += `The equation has no real roots.`;
  }

  code.textContent = salida;
  box.classList.add('show');
}

function estimarPi() {
  const N = parseInt(document.getElementById('pi_n').value, 10);
  const box = document.getElementById('res_ej2');
  const code = document.getElementById('code_ej2');

  if (isNaN(N) || N <= 0) {
    code.textContent = "Error: Ingrese un número N válido mayor a 0.";
    box.classList.add('show');
    return;
  }

  let suma = 0;
  for (let i = 1; i <= N; i++) {
    suma += 1 / (i * i);
  }

  const pi_est = Math.sqrt(6 * suma);
  const diff = Math.abs(Math.PI - pi_est);

  let salida = `Número de términos (N) = ${N}\n\n`;
  salida += `Valor estimado de π = ${pi_est.toFixed(10)}\n`;
  salida += `Valor real (Math.PI) = ${Math.PI.toFixed(10)}\n\n`;
  salida += `Diferencia/Error = ${diff.toExponential(4)}`;

  code.textContent = salida;
  box.classList.add('show');
}

function repartirCamellos() {
  const camellos = parseInt(document.getElementById('camellos_total').value, 10);
  const box = document.getElementById('res_ej3');
  const code = document.getElementById('code_ej3');

  if (isNaN(camellos) || camellos <= 0) {
    code.textContent = "Error: Ingrese un número entero válido de camellos.";
    box.classList.add('show');
    return;
  }

  const totalPrestado = camellos + 1;
  const h1 = Math.floor(totalPrestado * (1 / 2));
  const h2 = Math.floor(totalPrestado * (1 / 3));
  const h3 = Math.floor(totalPrestado * (1 / 9));
  const totalRepartido = h1 + h2 + h3;
  const sobran = totalPrestado - totalRepartido;
  const gananciaBeremiz = sobran - 1;

  let salida = `Camellos iniciales = ${camellos}\n`;
  salida += `Camellos con el prestado (+1) = ${totalPrestado}\n\n`;
  salida += `Hermano 1 (1/2 de ${totalPrestado}) = ${h1} camellos\n`;
  salida += `Hermano 2 (1/3 de ${totalPrestado}) = ${h2} camellos\n`;
  salida += `Hermano 3 (1/9 de ${totalPrestado}) = ${h3} camellos\n`;
  salida += `---------------------------------------\n`;
  salida += `---------------------------------------\n\n`;
  salida += `Total repartido a hermanos = ${totalRepartido} camellos\n\n`;
  salida += `Sobran = ${sobran} camellos (1 para devolver el prestado y ${gananciaBeremiz} para Beremiz por su astucia).`;

  code.textContent = salida;
  box.classList.add('show');
}

// Ejercicio 4: Reparto de Panes (Resultados de monedas redondeados a enteros exactos)
function repartirPanes() {
  const pa = parseFloat(document.getElementById('panes_a').value);
  const pb = parseFloat(document.getElementById('panes_b').value);
  const monedas = parseFloat(document.getElementById('monedas').value);
  const box = document.getElementById('res_ej4');
  const code = document.getElementById('code_ej4');

  if (isNaN(pa) || isNaN(pb) || isNaN(monedas) || pa <= 0 || pb <= 0 || monedas <= 0) {
    code.textContent = "Error: Ingrese valores válidos mayores a 0.";
    box.classList.add('show');
    return;
  }

  const totalPanes = pa + pb;
  const terciosPorPan = 3;
  const totalTercios = totalPanes * terciosPorPan;
  const consumoPorPersona = totalTercios / 3;

  // Aporte real validando que no existan valores negativos
  const aporteA = Math.max(0, (pa * terciosPorPan) - consumoPorPersona);
  const aporteB = Math.max(0, (pb * terciosPorPan) - consumoPorPersona);
  const totalAportado = aporteA + aporteB;

  let monedasA = 0;
  let monedasB = 0;

  if (totalAportado > 0) {
    // Redondeo exacto a números enteros de monedas
    monedasA = Math.round((aporteA / totalAportado) * monedas);
    monedasB = monedas - monedasA; // Asegura que el total sea exacto sin pérdidas de redondeo
  }

  let salida = `Panes aportados: A = ${pa}, B = ${pb} (Total = ${totalPanes} panes)\n`;
  salida += `Total de tercios cortados = ${totalTercios}\n`;
  salida += `Cada viajero consume = ${consumoPorPersona} tercios\n\n`;
  salida += `Aportes reales al 3er viajero (Jeque):\n`;
  salida += `- Viajero A entrega: ${aporteA} tercios\n`;
  salida += `- Viajero B entrega: ${aporteB} tercios\n\n`;
  salida += `Reparto equitativo de las ${monedas} monedas de oro:\n`;
  salida += `- Monedas para Viajero A = ${monedasA} monedas\n`;
  salida += `- Monedas para Viajero B = ${monedasB} monedas`;

  code.textContent = salida;
  box.classList.add('show');
}