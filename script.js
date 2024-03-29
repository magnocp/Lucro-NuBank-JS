let result = document.getElementById('res')
let check = document.getElementsByName('escolha')

function formatCurrency(value) {
  value = value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })

  return value
}

function answer(time, add, total) {
  if (check[0].checked) {
    // dia
    result.innerHTML = `O seu lucro em <strong>${time} ${
      time == 1 ? 'dia' : 'dias'
    } </strong>
    é de aproximadamente <strong>${formatCurrency(
      add
    )}</strong> <br> ficando assim no total de <strong>${formatCurrency(
      total
    )}<strong>`
  } else if (check[1].checked) {
    // mês
    result.innerHTML = `O seu lucro em <strong>${time} ${
      time == 1 ? 'mês' : 'meses'
    } </strong>
    é de aproximadamente <strong>${formatCurrency(
      add
    )}</strong> <br> ficando assim no total de <strong>${formatCurrency(
      total
    )}<strong>`
  }
}

function calculate(event) {
  event.preventDefault()
  let fees = document.getElementById('fees').value.trim()
  let money = document.getElementById('txt1').value.trim()
  let day = document.getElementById('txt2').value.trim()
  let step = document.getElementById('passo').value.trim()

  let coin = Number(money)
  let daysMonths = 30 * day

  let timeCourse = day / step // quantas vezes o periodo vai repetir
  let daytimeCourse = day / timeCourse // quantidade de dias em cada periodo
  let money2 = coin
  let incrementTimeCourse = 1 // incremento periodo
  let incrementDay = 1 // incremento dia
  let acresT = 0
  let a = 0 // acrescenta

  let acres = 0

  let timeCourseMonth = daysMonths / step // quantas vezes o periodo vai repetir
  let dayTotal = daysMonths / timeCourseMonth // quantidade de dias em cada periodo

  if (
    money === '' ||
    day === '' ||
    fees === '' ||
    fees < 0 ||
    coin < 0 ||
    day < 0
  ) {
    alert('Erro! Por favor digite os dados ou informe apenas dados positivos!')
  } else if (
    (step !== '' && Number(step) < Number(day)) ||
    (step !== '' && check[1].checked)
  ) {
    if (step < 0) {
      alert('O período tem que ser positivo ou maior que a quantidade de dias')
    } else {
      // Dia
      if (check[0].checked) {
        while (incrementTimeCourse <= timeCourse) {
          while (incrementDay <= daytimeCourse) {
            profit = coin * (fees / 365 / 100)
            coin += profit
            acres += profit
            incrementDay++
          }

          acresT += acres
          if (incrementTimeCourse != 1) {
            coin += money2 + acresT
          }
          a += acresT
          incrementTimeCourse++
        }

        answer(day, a, coin)
      }
      // Mês
      else if (check[1].checked) {
        while (incrementTimeCourse <= timeCourseMonth) {
          while (incrementDay <= dayTotal) {
            profit = coin * (fees / 365 / 100)
            coin += profit
            acres += profit
            incrementDay++
          }

          acresT += acres
          if (incrementTimeCourse != 1) {
            coin += money2 + acresT
          }
          a += acresT
          incrementTimeCourse++
        }

        answer(day, a, coin)
      }
    }
  } else {
    //Dia
    if (check[0].checked) {
      while (incrementDay <= day) {
        profit = coin * (fees / 365 / 100)
        coin += profit
        acres += profit
        incrementDay++
      }

      answer(day, acres, coin)
    }
    //Mês
    else if (check[1].checked) {
      while (incrementDay <= daysMonths) {
        profit = coin * (fees / 365 / 100)
        coin += profit
        acres += profit
        incrementDay++
      }

      answer(day, acres, coin)
    }
  }
}
