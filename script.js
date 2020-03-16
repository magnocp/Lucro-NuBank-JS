function calcular(){
    var money = document.getElementById('txt1')
    var day = document.getElementById('txt2')
    var pas = document.getElementById('passo')
    var resuldo = document.getElementById('res')
    var checar = document.getElementsByName('escolha')

    var dinheiro = Number(money.value)
    var dias = Number(day.value)    
    var diasMeses = 30 * dias
    var periodo = Number(pas.value) 

    if(money.value.length == 0 || day.value.length == 0 || dinheiro < 0 || dia < 0){

        alert('Erro! Por favor digite os dados ou informe apenas dados positivos!')

    }else if(pas.value.length != 0 && periodo < dias || pas.value.length != 0 && checar[1].checked){                
        
        if( periodo < 0){
            alert("O período tem que ser positivo ou maior que a quantidade de dias")
        }
        else{
            // Dia
            if(checar[0].checked){
                var acres = 0              
                var divi = dias / periodo // quantas vezes o periodo vai repetir
                var dia = dias / divi // quantidade de dias em cada periodo
                var dinheiro2 = dinheiro
                var p = 1 // incremento periodo
                var d = 1 /// incremento dia
                var acresT = 0 
                var a = 0 // acrescenta                              
                
                while( p <= divi){
                                        
                    while (d <= dia){
                        lucro = (dinheiro * (0.011369863 / 100)) 
                        dinheiro += lucro
                        acres += lucro
                        d++              
                    }  
                    
                    acresT += acres   
                    if (p != 1){
                        dinheiro += dinheiro2 + acresT
                    }   
                    a += acresT                                
                    p++                                   
                }

                if( dias == 1 ){
                    resuldo.innerHTML = `O seu lucro em <strong>${dias}</strong> dia é de aproximadamente <strong>${a.toFixed(2).replace(".", ",")}</strong> <br>
                    ficando assim no total de <strong>${dinheiro.toFixed(2).replace(".", ",")}<strong>`
                }
                else{
                    resuldo.innerHTML = `O seu lucro em <strong>${dias}</strong> dias é de aproximadamente <strong>${a.toFixed(2).replace(".", ",")}</strong> <br>
                    ficando assim no total de <strong>${dinheiro.toFixed(2).replace(".", ",")}<strong>`
                }
                

            } 
            // Mês
            else if(checar[1].checked){
                var acres = 0              
                var divi = diasMeses / periodo // quantas vezes o periodo vai repetir
                var dia = diasMeses / divi // quantidade de dias em cada periodo
                var dinheiro2 = dinheiro
                var p = 1 // incremento periodo
                var d = 1 /// incremento dia
                var acresT = 0 
                var a = 0 // acrescenta                              
                
                while( p <= divi){
                                        
                    while (d <= dia){
                        lucro = (dinheiro * (0.011369863 / 100)) 
                        dinheiro += lucro
                        acres += lucro
                        d++              
                    }  
                    
                    acresT += acres   
                    if (p != 1){
                        dinheiro += dinheiro2 + acresT
                    }   
                    a += acresT                                
                    p++                                   
                }
                

                if( diasMeses == 1 ){
                    resuldo.innerHTML = `O seu lucro em <strong>${dias}</strong> mês é de aproximadamente <strong>${a.toFixed(2).replace(".", ",")}</strong> <br>
                    ficando assim no total de <strong>${dinheiro.toFixed(2).replace(".", ",")}<strong>`
                }
                else{
                    resuldo.innerHTML = `O seu lucro em <strong>${dias}</strong> meses é de aproximadamente <strong>${a.toFixed(2).replace(".", ",")}</strong> <br>
                    ficando assim no total de <strong>${dinheiro.toFixed(2).replace(".", ",")}<strong>`
                }    
            }                                 
            
        }   

    }else{  
        //Dia      
        if(checar[0].checked){
            var d = 1
            var acres = 0
                
            while (d <= dias){
                lucro = (dinheiro * (0.011369863 / 100)) 
                dinheiro += lucro
                acres += lucro 
                d++              
            }
            if( dias == 1 ){
                resuldo.innerHTML = `O seu lucro em <strong>${dias}</strong> dia é de aproximadamente <strong>${acres.toFixed(2).replace(".", ",")}</strong> <br>
                ficando assim no total de <strong>${dinheiro.toFixed(2).replace(".", ",")}<strong>`
            }
            else{
            resuldo.innerHTML = `O seu lucro em <strong>${dias}</strong> dias é de aproximadamente <strong>${acres.toFixed(2).replace(".", ",")}</strong> <br>
            ficando assim no total de <strong>${dinheiro.toFixed(2).replace(".", ",")}<strong>`
            }         
        }
        //Mês
        else if(checar[1].checked){            
            var d = 1
            var acres = 0
                
            while (d <= diasMeses){
                lucro = (dinheiro * (0.011369863 / 100)) 
                dinheiro += lucro
                acres += lucro 
                d++              
            }
            if( diasMeses == 1 ){
                resuldo.innerHTML = `O seu lucro em <strong>${dias}</strong> mês é de aproximadamente <strong>${acres.toFixed(2).replace(".", ",")}</strong> <br>
                ficando assim no total de <strong>${dinheiro.toFixed(2).replace(".", ",")}<strong>`
            }
            else{
            resuldo.innerHTML = `O seu lucro em <strong>${dias}</strong> meses é de aproximadamente <strong>${acres.toFixed(2).replace(".", ",")}</strong> <br>
            ficando assim no total de <strong>${dinheiro.toFixed(2).replace(".", ",")}<strong>`
            } 
        }     

    }

}