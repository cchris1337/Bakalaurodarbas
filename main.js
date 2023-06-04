document.addEventListener('DOMContentLoaded', (event) => {

    // ELEMENTAI
    //-----------------------------------------------------------------------------------------------------------------
    var datos_ivedimas = document.getElementById('datosivedimas');
    var teksto_ivedimas = document.getElementById('tekstoivedimas');
    var pirmyn = document.getElementById('pirmyn');
    var atgal = document.getElementById('atgal');
    var modal = document.getElementById('modal');
    var modalinis_atsaukti = document.getElementById('modalatsaukti');
    var modalinis_sutikti = document.getElementById('modalsutikti');
    var skaiciuoti = document.getElementById('skaiciuoti');
    var prideti_savaitgalius = document.getElementById('pridetisavaitgalius');
    var ivedimas = document.getElementById('ivedimas');
    var modaltekstas = document.getElementById('modaltekstas');
    let toggle = document.getElementById('toggle');
    var datostekstoivedimas = document.getElementById('datostekstoivedimas');
    var inputgroup = document.getElementById('input-group');
    var weekdaydisplay = document.getElementById('weekday-display');
    var weekdayvalueinput = document.getElementById('weekday-value-input');

    
    
    //-----------------------------------------------------------------------------------------------------------------
    // Tam tikri variables.
    var inputHours = [];
    var currentIndex = 0;
    var check = 0;
    var currentWeekdayIndex = 0;
    
    var weekdays = ['Pirmadienis', 'Antradienis', 'Trečiadienis', 'Ketvirtadienis', 'Penktadienis', 'Šeštadienis', 'Sekmadienis'];
    var weekdayValues = weekdays.map(() => 0); 
    //-----------------------------------------------------------------------------------------------------------------
    //Paziurim koks toggle value.
    toggle.addEventListener('change', function() {
      if(this.checked) {
          check = 1; // vienodas

          startup();
      } else {
        startup();
          check = 0; // individualus
      }
  });
    //-----------------------------------------------------------------------------------------------------------------
    // Nustatom data ir padarom limitus.
    var today = new Date();
    today.setDate(today.getDate() + 2);
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var  yyyy = today.getFullYear();
    datos_ivedimas.min = yyyy + '-' + mm + '-' + dd;
    //-----------------------------------------------------------------------------------------------------------------
    // Limitai bei priemimas datos.
    function createHourInput(date) {
  
      var div = document.createElement('div');
      var label = document.createElement('label');
      label.textContent = date.toDateString();
      var input = document.createElement('input');
      input.type = 'number';
      input.min = 0;
      input.max = 16;
      input.classList.add('inputHour');
      input.addEventListener('input', function() {
        updateValidity(input, 0, 16);
        if (input.value === '') {
          input.value = 0;
        }
      });
      div.appendChild(label);
      div.appendChild(input);
      return div;
    }

    //-----------------------------------------------------------------------------------------------------------------  
    // Patikrinam kad data tinkama.
    function updateValidity(input, min, max) {
      var num = parseInt(input.value);
      if (num >= min && num <= max) {
        input.classList.add('valid');
        input.classList.remove('invalid');
      } else {
        input.classList.add('invalid');
        input.classList.remove('valid');
      }
    }
    //-----------------------------------------------------------------------------------------------------------------
    // Tikrinam ar numeris atinka norma.
    function isValidNumber(input, min, max) {
      var num = parseInt(input.value);
      return !isNaN(num) && num >= min && num <= max;
    }
    //-----------------------------------------------------------------------------------------------------------------
    
    function updateView() {
      ivedimas.innerHTML = '';
      ivedimas.appendChild(inputHours[currentIndex]);
      atgal.disabled = currentIndex === 0;
      pirmyn.disabled = currentIndex === inputHours.length - 1;
    }
    //-----------------------------------------------------------------------------------------------------------------
    function startup() {
      // values paleidžiam iš naujo į vietas perkraunant arba įjungiant .
      teksto_ivedimas.readOnly = true;
      teksto_ivedimas.value = "";
      datos_ivedimas.value = "";
      skaiciuoti.disabled = true;
      var inputHours = [];
      var currentIndex = 0;
      var check = 0;
      ivedimas.style.display = 'none';
      inputgroup.style.display = 'none';
      datostekstoivedimas.style.display = 'none';
      
    } 
    startup();
    //-----------------------------------------------------------------------------------------------------------------
    //pakeiciam tam tikrus priemimus : teksto_ivedimas į write/read.
    datos_ivedimas.addEventListener('input', function() {
      console.log('New value in datos_ivedimas: ' + this.value);
  
      var totalHours = parseFloat(teksto_ivedimas.value);
      teksto_ivedimas.readOnly = false;
  
      if (isNaN(totalHours)) {
  
      } else {
        skaiciuoti.disabled = false;
      }
    });
    //-----------------------------------------------------------------------------------------------------------------
    // patikrinam teksto ivedimą ir pradedam kurti 3 įvedimo skirtį.
    teksto_ivedimas.addEventListener('input', function() {
     
      console.log('New value in teksto_ivedimas: ' + this.value);
      var totalHours = parseFloat(teksto_ivedimas.value);
      if (totalHours <= 0 || !Number.isInteger(totalHours)) {
        teksto_ivedimas.value = "";
        if (!isNaN(totalHours)) {
          alert("Įveskite galiojantį skaičių, didesnį nei 0, visų valandų lauke.");
        }
        return;
      }
      inputHours = [];
      var startDate = new Date();
      startDate.setDate(startDate.getDate() + 1);
      var endDate = new Date(datos_ivedimas.value);
      endDate.setDate(endDate.getDate() - 1);
      while (startDate <= endDate) {
        inputHours.push(createHourInput(new Date(startDate)));
        
        startDate.setDate(startDate.getDate() + 1);
      }
      currentIndex = 0;
      updateView();
      if(check == 1)
      {
      skaiciuoti.disabled = false;
      ivedimas.style.display = 'block';
      datostekstoivedimas.style.display = 'block';

    }
    else{
      skaiciuoti.disabled = false;
      inputgroup.style.display = 'block';
      datostekstoivedimas.style.display = 'block';
    }
    });

    //-----------------------------------------------------------------------------------------------------------------
    // atgal mygtukas : tikrinam ar atitinka reikiamus duomenis ir išsaugojam įvestą skaičių į masyvą. 
    atgal.addEventListener('click', function() {
      if(check == 1)
      {
      if (currentIndex > 0) {
        var inputElement = inputHours[currentIndex].querySelector('input');
        var number = inputElement.value;
        if (number !== '') {
          if (!isValidNumber(inputElement, 0, 16)) {
            inputElement.classList.add('invalid');
            var value = parseInt(inputElement.value);
            if (value > 16) {
              inputElement.value = 16;
              alert('Įvestas skaičius buvo didesnis nei 16. Pakeista į 16.');
            } else if (value < 0) {
              inputElement.value = 0;
              alert('Įvestas skaičius buvo mažesnis nei 0. Pakeista į 0.');
            }
          } else {
            inputElement.classList.remove('invalid');
          }
        }
        currentIndex--;
        updateView();
      }
    }
    else
    {
      if (currentWeekdayIndex > 0) {
        var inputElement = document.getElementById('weekday-value-input');
        var number = inputElement.value;
        if (number !== '') {
          if (!isValidNumber(inputElement, 0, 16)) {
            inputElement.classList.add('invalid');
            var value = parseInt(inputElement.value);
            if (value > 16) {
              inputElement.value = 16;
              weekdayValues[currentWeekdayIndex] = 16;
              alert('Įvestas skaičius buvo didesnis nei 16. Pakeista į 16.');
            } else if (value < 0) {
              inputElement.value = 0;
              weekdayValues[currentWeekdayIndex] = 0;
              alert('Įvestas skaičius buvo mažesnis nei 0. Pakeista į 0.');
            }
          } else {
            inputElement.classList.remove('invalid');
          }
        }
        weekdayValues[currentWeekdayIndex] = parseInt(inputElement.value);
        currentWeekdayIndex--;
        weekdaydisplay.textContent = weekdays[currentWeekdayIndex];
        weekdayvalueinput.value = weekdayValues[currentWeekdayIndex];
        atgal.disabled = currentWeekdayIndex === 0;
        pirmyn.disabled = currentWeekdayIndex === weekdays.length - 1;
      }
    }
  });
    weekdayvalueinput.addEventListener('input', function() {
      weekdayValues[currentWeekdayIndex] = parseInt(this.value);
  });
    //-----------------------------------------------------------------------------------------------------------------
    // taipat tikrinam duomenis kaip ir atgal ir įvesta skaičių įrašom į masyvą.
    pirmyn.addEventListener('click', function() {
      if(check == 1)
      {
      if (currentIndex < inputHours.length - 1) {
        var inputElement = inputHours[currentIndex].querySelector('input');
        var number = inputElement.value;
        if (number === '') {
          currentIndex++;
          updateView();
        }
        if (isValidNumber(inputElement, 0, 16)) {
          currentIndex++;
          updateView();
          inputElement.classList.remove('invalid');
        } else {
          inputElement.classList.add('invalid');
          var value = parseInt(inputElement.value);
          if (value > 16) {
            inputElement.value = 16;
            
            alert('Įvestas skaičius buvo didesnis nei 16. Pakeista į 16.');
            
          } else if (value < 0) {
            inputElement.value = 0;
            alert('Įvestas skaičius buvo mažesnis nei 0. Pakeista į 0.');
            
          }
        }
      }
    }
    else{
      if (currentWeekdayIndex < weekdays.length - 1) {
        var inputElement = document.getElementById('weekday-value-input');
        var number = inputElement.value;
        if (number === '') {
          currentWeekdayIndex++;
          weekdaydisplay.textContent = weekdays[currentWeekdayIndex];
          weekdayvalueinput.value = weekdayValues[currentWeekdayIndex];
          atgal.disabled = currentWeekdayIndex === 0;
          pirmyn.disabled = currentWeekdayIndex === weekdays.length - 1;
        }
        if (isValidNumber(inputElement, 0, 16)) {
          currentWeekdayIndex++;
          weekdaydisplay.textContent = weekdays[currentWeekdayIndex];
          weekdayvalueinput.value = weekdayValues[currentWeekdayIndex];
          atgal.disabled = currentWeekdayIndex === 0;
          pirmyn.disabled = currentWeekdayIndex === weekdays.length - 1;
          inputElement.classList.remove('invalid');
        } else {
          inputElement.classList.add('invalid');
          var value = parseInt(inputElement.value);
          if (value > 16) {
            
            inputElement.value = 16;
            alert('Įvestas skaičius buvo didesnis nei 16. Pakeista į 16.');
            weekdayValues[currentWeekdayIndex] = 16;
            console.log(weekdayValues)
          } else if (value < 0) {
            
            inputElement.value = 0;
            weekdayValues[currentWeekdayIndex] = 0;
            
            alert('Įvestas skaičius buvo mažesnis nei 0. Pakeista į 0.');
            
          }
        }
      }
    }
    });

    //-----------------------------------------------------------------------------------------------------------------

    inputHours.forEach(input => {
      var inputElement = input.querySelector('input');
      inputElement.addEventListener('input', function() {
        if (isValidNumber(inputElement, 0, 16) || inputElement.value === '') {
          inputElement.classList.remove('invalid');
        }
      });
    });
  
    //-----------------------------------------------------------------------------------------------------------------

    // Skaičiuojam atižvelgę į ivestus duomenys, sukuriam modalą, kur patvirtinus įrašytus duomenys juos įšsaugom  į localstorage, kuriuos naudosime calclulate.js .
    skaiciuoti.addEventListener('click', function() {
      
      
      var inputElement = inputHours[currentIndex].querySelector('input');  

      var value2 = weekdayValues[currentWeekdayIndex];
      if (value2 > 16 || value2 < 0) {
        alert('Įvesties reikšmė turi būti tarp 0 ir 16. Prašome pataisyti prieš skaičiavimą.');
        return;
      }
      var value = parseInt(inputElement.value);
      if (value > 16 || value < 0) {
        alert('Įvesties reikšmė turi būti tarp 0 ir 16. Prašome pataisyti prieš skaičiavimą.');
        return;
      }
  
      var results = [];
      results.push('Date: (' + datos_ivedimas.value + ')');
      results.push('Visos valandos: (' + teksto_ivedimas.value + ')');
      
     

  
      var dateValues = [];  
      if(check == 0)
      {
        results.push('{Diena : laikas}')
        for (let i = 0; i < 7; i++) {
        results.push('{' + weekdays[i] + ' : ' + weekdayValues[i] + ' } ')
      }}
      else
      {
         results.push('Užimtos valandos {data/mėnuo : valanda}: ');
      }
      inputHours.forEach(input => {
        var value = input.querySelector('input').value || 0;
        var date = new Date(input.querySelector('label').textContent);
        var day = date.getDate();
        var month = date.getMonth() + 1;  
        var weekday = ["Sekmadienis", "Pirmadienis", "Antradienis", "Trečiadienis", "Ketvirtadienis", "Penktadienis", "Šeštadienis"][date.getDay()];

  
        if(check == 1)
      {
        results.push( '{' + day + '/' + month + ' : ' + value + ' h } ');
        }

  
      
        dateValues.push({
          day: day,
          month: month,
          weekday: weekday,
          value: value
        });
  
      });

        

      
 
      
    if(check == 0)
    {
      dateValues.forEach(item => {
        let index = weekdays.indexOf(item.weekday);
        if (index !== -1) {
          item.value = weekdayValues[index];
        }
      });}
      console.log(weekdayValues)
      console.log(dateValues);
      
      localStorage.setItem('totalHours', teksto_ivedimas.value);
      localStorage.setItem('dateValues', JSON.stringify(dateValues));
  

      modal.style.display = "block";
      modaltekstas.textContent = results.join('\n');
    });
    //-----------------------------------------------------------------------------------------------------------------

    // atšaukiam mygtukas.
    modalinis_atsaukti.addEventListener('click', function() {
      modal.style.display = "none";
    });
    //-----------------------------------------------------------------------------------------------------------------

    // sutikti mygtukas ir patikrinam įvestus duomenis.
    modalinis_sutikti.addEventListener('click', function() {
      modal.style.display = "none";
  
      localStorage.setItem('weekend', prideti_savaitgalius.checked);
  
      skaiciuoti.disabled = true;
  

      window.location.href = 'results.html';
    });
  
  });
  