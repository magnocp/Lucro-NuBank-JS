let resuldo = document.getElementById('res')
let checar = document.getElementsByName('escolha')

function formatCurrency(value) {
  value = value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })

  return value
}

function answer(tempo, acrescimo, total, dMes = 1) {
  if (checar[0].checked) {
    // dia
    resuldo.innerHTML = `O seu lucro em <strong>${tempo}</strong> ${
      tempo == 1 ? 'dia' : 'dias'
    } 
    é de aproximadamente <strong>${formatCurrency(
      acrescimo
    )}</strong> <br> ficando assim no total de <strong>${formatCurrency(
      total
    )}<strong>`
  } else if (checar[1].checked) {
    // mês
    resuldo.innerHTML = `O seu lucro em <strong>${tempo}</strong> ${
      tempo == 1 ? 'mês' : 'meses'
    } 
    é de aproximadamente <strong>${formatCurrency(
      acrescimo
    )}</strong> <br> ficando assim no total de <strong>${formatCurrency(
      total
    )}<strong>`
  }
}

function calculate() {
  let money = document.getElementById('txt1')
  let day = document.getElementById('txt2')
  let pas = document.getElementById('passo')

  let dinheiro = Number(money.value)
  let dias = Number(day.value)
  let diasMeses = 30 * dias
  let periodo = Number(pas.value)

  if (
    money.value.length == 0 ||
    day.value.length == 0 ||
    dinheiro < 0 ||
    dias < 0
  ) {
    alert('Erro! Por favor digite os dados ou informe apenas dados positivos!')
  } else if (
    (pas.value.length != 0 && periodo < dias) ||
    (pas.value.length != 0 && checar[1].checked)
  ) {
    if (periodo < 0) {
      alert('O período tem que ser positivo ou maior que a quantidade de dias')
    } else {
      // Dia
      if (checar[0].checked) {
        let acres = 0
        let divi = dias / periodo // quantas vezes o periodo vai repetir
        let dia = dias / divi // quantidade de dias em cada periodo
        let dinheiro2 = dinheiro
        let p = 1 // incremento periodo
        let d = 1 /// incremento dia
        let acresT = 0
        let a = 0 // acrescenta

        while (p <= divi) {
          while (d <= dia) {
            lucro = dinheiro * (0.011369863 / 100)
            dinheiro += lucro
            acres += lucro
            d++
          }

          acresT += acres
          if (p != 1) {
            dinheiro += dinheiro2 + acresT
          }
          a += acresT
          p++
        }

        answer(dias, a, dinheiro)
      }
      // Mês
      else if (checar[1].checked) {
        let acres = 0
        let divi = diasMeses / periodo // quantas vezes o periodo vai repetir
        let dia = diasMeses / divi // quantidade de dias em cada periodo
        let dinheiro2 = dinheiro
        let p = 1 // incremento periodo
        let d = 1 /// incremento dia
        let acresT = 0
        let a = 0 // acrescenta

        while (p <= divi) {
          while (d <= dia) {
            lucro = dinheiro * (0.011369863 / 100)
            dinheiro += lucro
            acres += lucro
            d++
          }

          acresT += acres
          if (p != 1) {
            dinheiro += dinheiro2 + acresT
          }
          a += acresT
          p++
        }

        answer(dias, a, dinheiro, diasMeses)
      }
    }
  } else {
    //Dia
    if (checar[0].checked) {
      let d = 1
      let acres = 0

      while (d <= dias) {
        lucro = dinheiro * (0.011369863 / 100)
        dinheiro += lucro
        acres += lucro
        d++
      }
      answer(dias, acres, dinheiro)
    }
    //Mês
    else if (checar[1].checked) {
      let d = 1
      let acres = 0

      while (d <= diasMeses) {
        lucro = dinheiro * (0.011369863 / 100)
        dinheiro += lucro
        acres += lucro
        d++
      }

      answer(dias, acres, dinheiro, diasMeses)
    }
  }
}
