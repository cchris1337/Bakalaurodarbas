// screenshoot funckija - padaro kalendoriaus nuotrauką.
function takeScreenshot() {
    let screenshotButton = document.getElementById('screenshotButton');
    screenshotButton.style.display = 'none';
    let options = {
        backgroundColor: null 
    };

    html2canvas(document.getElementById('calendar'), options).then(function(canvas) {

        var newCanvas = document.createElement('canvas');
        newCanvas.width = canvas.width;
        newCanvas.height = canvas.height;
        

        var context = newCanvas.getContext('2d');

        
        context.fillStyle = '#FFFFFF';
        context.fillRect(0, 0, canvas.width, canvas.height);


        context.drawImage(canvas, 0, 0);


        var link = document.createElement('a');
        link.download = 'Kalendorius.png';
        link.href = newCanvas.toDataURL();
        link.click();
        screenshotButton.style.display = 'block';
        totalHoursElement.style.display = 'block';
        weekendsElement.style.display = 'block';
    });
}


// Nustatom variables kaip lithuanianholidays, pasiemam variables iš localstorage.

window.addEventListener('DOMContentLoaded', (event) => {
    let lithuanianHolidays = [
        [16, 2], 
        [11, 3], 
        [6, 7],  
        [15, 8], 
        [1, 5],  
        [24, 6], 
        [25, 12],
        [26, 12], 
        [6, 1],  
        [2, 11]
    ];
    document.getElementById('screenshotButton').addEventListener('click', takeScreenshot);


    let totalHours = localStorage.getItem('totalHours');
    let dateValues = JSON.parse(localStorage.getItem('dateValues'));
    let weekend = JSON.parse(localStorage.getItem('weekend')); 
    console.log(dateValues);

    let vaizdas = document.getElementById('vaizdas');
  

    let hoursElem = document.createElement('p');
    hoursElem.textContent = 'Visos valandos : ' + totalHours;
    vaizdas.appendChild(hoursElem);


    let weekendElem = document.createElement('p');
    weekendElem.textContent = 'Savaitgaliai : ' + (weekend ? 'Taip' : 'Ne');

    vaizdas.appendChild(weekendElem);
  
    let sum = 0;
    let count= 0;

    // Patikrinam ar savaitgaliai yra pažymėti ir pagal tau nustatom jų values.
    dateValues.forEach((item) => {    
        lithuanianHolidays.forEach((holiday) => {
        if (item.day === holiday[0] && item.month === holiday[1]) {
            item.value = "Holiday";
            count -= 1;
          }
        });
        if(weekend === false){
        if (item.weekday === "Šeštadienis" || item.weekday === "Sekmadienis") {
          item.value = "Weekend";

        }}
        if(!isNaN(item.value)){
            sum += Number(item.value);
            count += 1;
        }
           
    });
   // Skaičiavimai plačiau READM.
    let x = 0;

    if((Number(totalHours) - (24*count - (count * 8 + sum))) <= 0){
            x = (totalHours/count); 
            
    
    let check = 0;
    let datev = JSON.parse(JSON.stringify(dateValues));
    console.log(dateValues)
        dateValues.forEach((item, index) => {

            
            if (item.value !== "Weekend" && item.value !== "Holiday") {
                
                if(Number(item.value) + x + 8 < 24)
                {
                    count -= 1;

                if(check == 0)
                {
                    datev[index].value = x;
                    check = 1; 
                    
                }
                else
                {

                    
                if (index !== 0 && Number(dateValues[index - 1].value) < Number(item.value)) {
                    datev[index].value = x;
                    if (Number(item.value) / Number(dateValues[index - 1].value) >= 0.5 || Number(dateValues[index - 1].value) == 0) {
                        console.log(datev[index ].value)
                        datev[index - 1].value +=  x * 0.5;
                        datev[index].value -=  x * 0.5;
                        console.log(datev[index].value)
                        console.log(index)
                    } else {
                        datev[index - 1].value +=  1;
                        datev[index].value -= 1;
                    }
                }
                else if (index !== 0 && Number(dateValues[index - 1].value) > Number(item.value)) {
                    datev[index].value = x;
                    if (Number(dateValues[index - 1].value) / Number(item.value) >= 0.5 || Number(item.value) == 0) {
                        console.log(datev[index - 1].value)
                        console.log(index)
                        datev[index - 1].value -=  x * 0.5;
                        datev[index].value +=  x * 0.5;
                        
                    } else {
                        datev[index - 1].value -=  1;
                        datev[index].value += 1;
                    }
                }
                 else {
                   
                    datev[index].value = x;
                }

                
            }
            totalHours -= Number(datev[index].value);
            }
                else
                {
                    
                  
                    if(Number(item.value)+8 < 24)
                    {
                        
                        datev[index].value = 24 - Number(item.value)-8;
                        totalHours = Number(totalHours) - datev[index].value ;
                        

                    }
                    else
                    {

                        datev[index].value = 0;

                    }
                    
                    check = 0;
                    count -= 1;
                    
                    
                    if(count == 0)
                    {
                        x = totalHours;
                        
                        if(Number(datev[index - 1].value) + x < 16)
                        {
                            console
                            datev[index - 1].value += x;
                        }
                    }
                    else
                    {
                        x = ((totalHours) / count);
                    }
                    
                    
                }
            }
            
            
           
            
        });


        var sum1 = datev.reduce(function(a, b) {
            if (!isNaN(b.value)) {
                return a + b.value;
            } else {
                return a;
            }
        }, 0);
        

        

        if(sum1 < totalHours)
        {
            let dateElem = document.createElement('div');
            let weekdayText = document.createElement('span');
            weekdayText.textContent = 'Nepakanka ';
            dateElem.appendChild(weekdayText);
            calendar.appendChild(dateElem);

        }
        else{

        
        
        

        

// Suskaičiuotus duomenys parodome ekrane.
        datev.forEach((item, index) => {
            
            let dateElem = document.createElement('div');
            dateElem.classList.add('calendar-day');
            if (item.value === "Holiday") {
                dateElem.classList.add('holiday');
            } else if (item.value === "Weekend") {
                dateElem.classList.add('weekend');
            }
        
            let dateText = document.createElement('span');
            dateText.textContent = 'Data: ' + item.day + '/' + item.month;
            dateElem.appendChild(dateText);
        
            let weekdayText = document.createElement('span');
            weekdayText.textContent = 'Diena: ' + item.weekday;
            dateElem.appendChild(weekdayText);
        
            if (!isNaN(item.value)) {
                let hours = Math.floor(item.value);
                let minutes = Math.round((item.value - hours) * 60);
            
                let box = document.createElement('div');
                box.style.border = "1px solid black";
                box.style.padding = "10px";
                box.style.margin = "10px";
                box.style.display = "inline-block";
            
                let hoursText = document.createElement('span');
                hoursText.textContent = hours + 'h ' + minutes + 'min';
                box.appendChild(hoursText);
            
                let label = document.createElement('span');
                label.textContent = 'Reikalingos valandos ';
                dateElem.appendChild(label);
                dateElem.appendChild(box);
            }
            
            
            else{
                let label = document.createElement('span');
                let relaxText = document.createTextNode("Relax");
                dateElem.appendChild(label);
                dateElem.appendChild(relaxText);
            }
        
            calendar.appendChild(dateElem);
        });
        
        }
        
        
        
        
        }
    else {
        let dateElem = document.createElement('div');
        let weekdayText = document.createElement('span');
        weekdayText.textContent = 'Nepakanka valandų';
        dateElem.appendChild(weekdayText);
        calendar.appendChild(dateElem);
    }
        

   

    

    
});
