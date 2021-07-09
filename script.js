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
  var money = document.getElementById('txt1')
  var day = document.getElementById('txt2')
  var pas = document.getElementById('passo')

  var dinheiro = Number(money.value)
  var dias = Number(day.value)
  var diasMeses = 30 * dias
  var periodo = Number(pas.value)

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
        var acres = 0
        var divi = dias / periodo // quantas vezes o periodo vai repetir
        var dia = dias / divi // quantidade de dias em cada periodo
        var dinheiro2 = dinheiro
        var p = 1 // incremento periodo
        var d = 1 /// incremento dia
        var acresT = 0
        var a = 0 // acrescenta

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
        var acres = 0
        var divi = diasMeses / periodo // quantas vezes o periodo vai repetir
        var dia = diasMeses / divi // quantidade de dias em cada periodo
        var dinheiro2 = dinheiro
        var p = 1 // incremento periodo
        var d = 1 /// incremento dia
        var acresT = 0
        var a = 0 // acrescenta

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
      var d = 1
      var acres = 0

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
      var d = 1
      var acres = 0

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
