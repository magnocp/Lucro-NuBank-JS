const RESULT_ELEMENT = document.getElementById('res');
const CHOICE_ELEMENTS = document.getElementsByName('escolha');

const DAILY_FEE_RATE = 1 / 365;
const PERCENTAGE_CONVERSION = 100;

function formatCurrency(value) {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
}

function getCheckedChoice() {
  return Array.from(CHOICE_ELEMENTS).find(element => element.checked);
}

function getPeriodText(period, isPlural) {
  const periodName = getCheckedChoice().id === 'dia' ? 'dia' : 'mês';
  return `${period} ${isPlural ? periodName + 's' : periodName}`;
}

function calculateProfit(initialAmount, feeRate, days) {
  let currentAmount = initialAmount;
  let totalProfit = 0;

  for (let i = 0; i < days; i++) {
    const dailyProfit = currentAmount * feeRate;
    currentAmount += dailyProfit;
    totalProfit += dailyProfit;
  }

  return { finalAmount: currentAmount, totalProfit };
}

function calculateWithSteps(initialAmount, feeRate, totalDays, stepSize) {
  const periods = Math.floor(totalDays / stepSize);
  const daysPerPeriod = Math.ceil(totalDays / periods);

  let currentAmount = initialAmount;
  let totalProfit = 0;

  for (let i = 0; i < periods; i++) {
    const { finalAmount, profit } = calculateProfit(currentAmount, feeRate, daysPerPeriod);
    currentAmount = finalAmount + initialAmount + (i > 0 ? profit : 0);
    totalProfit += profit;
  }

  return { finalAmount: currentAmount, totalProfit };
}

function displayResult(days, totalProfit, finalAmount) {
  const periodText = getPeriodText(days, days > 1);
  const resultHtml = `
    O seu lucro em <strong>${periodText}</strong>
    é de aproximadamente <strong>${formatCurrency(totalProfit)}</strong><br>
    ficando assim no total de <strong>${formatCurrency(finalAmount)}</strong>
  `;
  RESULT_ELEMENT.innerHTML = resultHtml;
}

function validateInput(fees, money, days, step) {
  if ([fees, money, days].some(val => val === '') || [fees, money, days].some(val => parseFloat(val) < 0)) {
    throw new Error('Por favor, preencha todos os campos com valores positivos.');
  }
  
  if (step !== '' && (parseFloat(step) >= parseFloat(days) || getCheckedChoice().id === 'mes')) {
    throw new Error('O período deve ser menor que a quantidade de dias e não pode ser usado para meses.');
  }
  
  if (step !== '' && parseFloat(step) < 0) {
    throw new Error('O período deve ser um valor positivo.');
  }
}

function calculate(event) {
  event.preventDefault();
  
  try {
    const [fees, money, days, step] = [
      document.getElementById('fees').value.trim(),
      document.getElementById('txt1').value.trim(),
      document.getElementById('txt2').value.trim(),
      document.getElementById('passo').value.trim()
    ];

    validateInput(fees, money, days, step);

    const feeRate = parseFloat(fees) / PERCENTAGE_CONVERSION * DAILY_FEE_RATE;
    const totalDays = parseInt(days) * (getCheckedChoice().id === 'mes' ? 30 : 1);

    let result;
    if (step !== '') {
      result = calculateWithSteps(parseFloat(money), feeRate, totalDays, parseInt(step));
    } else {
      result = calculateProfit(parseFloat(money), feeRate, totalDays);
    }

    displayResult(parseInt(days), result.totalProfit, result.finalAmount);
  } catch (error) {
    alert(error.message);
  }
}
