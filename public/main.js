var ticket = [];

function generateTicket() {
    $.ajax({
        method: 'GET',
        url: '/generateTicket',
        success: function(data) {
            ticket =  data;
            showTicket();
        }
      });
}

function showTicket() {
    for (i = 0; i < 54; i++) {
        if (ticket[i] === 0) {
            document.getElementById('item' + (i + 1)).innerHTML = "*";
        } else {
            document.getElementById('item' + (i + 1)).innerHTML = ticket[i];
        }
    }
    var changeBorder = document.getElementById('grid1');
    changeBorder.style.border = "3px dashed rgb(255, 255, 81)";
}



// Pulling out numbers
function startGame() {
    var randomNumbers = document.getElementById('demo');
    counter1 = 0;
    counter2 = 0;
    counter3 = 0;
    counter4 = 0;
    counter5 = 0;
    counter6 = 0;

    $.ajax({
        method: 'GET',
        url: '/startGame',
        success: function(data) {
            randomNumbers.innerHTML =  data;
        }
      });

    // check for winning numbers
    for (i = 0; i < 54; i++) {
        if (document.getElementById('item' + (i + 1)).innerText === randomNumbers.innerText) {
            
            document.getElementById('item' + (i + 1)).style.backgroundColor = "rgb(0, 183, 255)";
            document.getElementById('item' + (i + 1)).style.color = "rgb(255, 255, 81)";
            

            if ( 0 <= i && i < 9) {
                counter1++
                if (counter1 == 5) {
                    alert('WINNER');
                }
            }else if ( 9 <= i && i < 18) {
                counter2++
                if (counter2 == 5) {
                    alert('WINNER');
                }
            }else if ( 18 <= i && i < 27) {
                counter3++
                if (counter3 == 5) {
                    alert('WINNER');
                }
            }else if ( 27 <= i && i < 36) {
                counter4++
                if (counter4 == 5) {
                    alert('WINNER');
                }
            }else if ( 36 <= i && i < 45) {
                counter5++
                if (counter5 == 5) {
                    alert('WINNER');
                }
            }else if ( 45 <= i && i < 54) {
                counter6++
                if (counter6 == 5) {
                    alert('WINNER');
                }
            }
            //rgb(0, 255, 128) - green color
        }
        

    }
    setTimeout(startGame, 2000);
}












