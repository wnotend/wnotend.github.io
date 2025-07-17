function maxElement(arr) {
  var max = arr[0];
  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > max) {max = arr[i]}
  }
  return max;
}

function minElement(arr) {
  var min = arr[0];
  for (var i = 1; i < arr.length; i++) {
    if (arr[i] < min) {min = arr[i]}
  }
  return min;
}


class GenerateTask11 {
    constructor() {
        this.condition = '';
        this.answer = '';
        this.steps = [];
    }


    generateTask(codeTask, addInfo = false) {
        const optionsOfAlphabet = [
            ["десятичные цифры, 52 латинские буквы (с учётом регистра)", 62],
            ["десятичные цифры", 10],
            ['десятичные цифры, 26 прописных букв латинского алфавита', 36],
            ['26 заглавных букв латинского алфавита', 26]
        ];
    
        let randomChoice = Math.floor(Math.random() * optionsOfAlphabet.length);
        let textA = optionsOfAlphabet[randomChoice];
    
        // Задача №1. Поиск информационного объёма
        if (codeTask === 1) {
            let i = Math.floor(Math.random() * (15 - 7 + 1)) + 7;
            let spec = Math.pow(2, i) + ((Math.random() > 0.5 ? 1 : -1) * (textA[1] + Math.floor(Math.random() * 11) - 5));
            let N = textA[1] + spec;
            i = Math.ceil(Math.log2(N));
            let k = Math.floor(Math.random() * (380 - 90 + 1)) + 90;
            
            // Генерируем условия задачи
            while ((k * i) % 8 === 0) {
                i = Math.floor(Math.random() * (15 - 7 + 1)) + 7;
                spec = Math.pow(2, i) - textA[1] + Math.floor(Math.random() * 11) - 5;
                N = textA[1] + spec;
                i = Math.ceil(Math.log2(N));
                k = Math.floor(Math.random() * (380 - 90 + 1)) + 90;
            }
        
            let v = Math.ceil((k * i) / 8); // Количество байтов на один идентификатор
            let NUsers = Math.floor(Math.random() * (24 - 11 + 1)) + 11;
            let users = Math.pow(2, NUsers);
        
            // Добавляем доп. инфо, если задано
            if (addInfo) {
                var dop = Math.floor(Math.random() * 251);
                v += dop;
            }
        
            // Вычисление итогового размера базы
            let sizeBytes = users * v;
            let index = 0;
            const units = ['байт', 'Кбайт', 'Мбайт', 'Гбайт'];
            while (sizeBytes % 1024 === 0 && index < units.length - 1) {
                index++;
                sizeBytes /= 1024;
            }
            let unit = units[index];
        
            // Формулировка задачи
            this.answer = Math.round(sizeBytes);
            this.condition = `При регистрации в компьютерной системе каждому объекту присваивается идентификатор,\n` +
                             `состоящий из ${k} символов и содержащий ${textA[0]} и символы из ${spec}-символьного\n` +
                             `специального алфавита.\nВ базе данных для хранения каждого идентификатора отведено\n` +
                             `одинаковое и минимально возможное целое число байт. При этом используют посимвольное\n` +
                             `кодирование идентификаторов, все символы кодируют одинаковым и минимально возможным\n` +
                             `количеством бит.`;
            if (addInfo) {
                this.condition += ` <b>Кроме собственно идентификатора, для каждого пользователя в системе хранятся\n` +
                                 `дополнительные сведения, для чего отведено ${dop} байт на одного пользователя.</b>`;
            }
            this.condition += ` Определите объем памяти (в ${unit}), необходимый для хранения ${users} пользователей.\n` +
                              `В ответе запишите только целое число — количество ${unit}.`;
            if (!addInfo) {this.steps = [N, i, v, sizeBytes, users, unit]; }
            else {this.steps = [N, i, v - dop, v, sizeBytes, users, unit];}
                              
        }
      if (codeTask === 2) {
          let randomChoice = Math.floor(Math.random() * optionsOfAlphabet.length);
          let textA = optionsOfAlphabet[randomChoice];
          let i = Math.floor(Math.random() * (15 - 7 + 1)) + 7;
          if (i === 8) i = Math.floor(Math.random() * (15 - 9 + 1)) + 9;
          let spec = Math.pow(2, i) - textA[1] + Math.floor(Math.random() * 11) - 5;
          let N = textA[1] + spec;
          i = Math.ceil(Math.log2(N));
          let unit = ['Кбайт', 'Кбайт', 'Кбайт', 'Кбайт', 'Мбайт'][Math.floor(Math.random() * 5)];
          let sizeUnits = Math.floor(Math.random() * (23056 - 1998 + 1)) + 1998;
          let users = Math.floor(Math.random() * (85000 - 15000 + 1)) + 15000;
          let maxK = [], minK = [];
          let textSizeUnits = sizeUnits;
          if (unit === 'Кбайт') {
              sizeUnits *= 1024;
          } else if (unit === 'Мбайт') {
              textSizeUnits = Math.floor(Math.random() * (7 - 2 + 1)) + 2;
              sizeUnits = textSizeUnits * 1024 * 1024;
          }

          for (let k = 1; k < 10**6; k++) {
              let v = Math.ceil((k * i) / 8);
              if (v * users <= sizeUnits) {
                  maxK.push(k);
              }
              if (v * users >= sizeUnits) {
                  minK.push(k);
              }
          }
          let answer;
          var maxMin = ['максимально', 'минимально'][Math.floor(Math.random() * 2)];
          if (maxMin === 'максимально') {
              answer = maxElement(maxK);
              var item = 'не более';
          } else if (maxMin === 'минимально') {
              answer = minElement(minK);
              var item = 'не менее';
          }
          this.answer = answer;
          this.condition = `На предприятии каждой изготовленной детали присваивают серийный номер, 
          содержащий ${textA[0]} и символы из ${spec}-символьного специального алфавита. 
          В базе данных для хранения каждого серийного номера отведено одинаковое и минимально возможное число байт. 
          При этом используется посимвольное кодирование серийных номеров, все символы кодируются одинаковым 
          и минимально возможным числом бит. Известно, что для хранения ${users} 
          серийных номеров отведено <b>${item}</b> ${textSizeUnits} ${unit} памяти. 
          Определите <b>${maxMin}</b> возможную длину серийного номера. В ответе запишите только целое число. `;
        
          this.steps = [N, i, answer, users, unit, textSizeUnits];
        }
        
        // Задача про поиск максимальной мощности

        if (codeTask === 3) {
          let randomChoice = Math.floor(Math.random() * optionsOfAlphabet.length);
          let textA = optionsOfAlphabet[randomChoice];
          var N  = [8, 16, 32, 64, 128, 256, 512, 1024, 
            2048, 4096, 8192, 16384, 32768, 65536, 131072, 262144, 524288,
          1048576][Math.floor(Math.random() * 18)];
          var i = Math.ceil(Math.log2(N));
          let k = Math.floor(Math.random() * (780 - 90 + 1)) + 90;
          let users = Math.floor(Math.random() * (1000000 - 15000 + 1)) + 15000;
          let sizeBytes = Math.ceil(k * i / 8) * users;
          if (sizeBytes > 1048576) { sizeBytes -= sizeBytes % (1024 * 1024); }
          else {sizeBytes -= sizeBytes % 1024;}
          // Вычисление итогового размера базы
          let index = 0;
          const units = ['байт', 'Кбайт', 'Мбайт', 'Гбайт'];
          while (sizeBytes % 1024 === 0 && index < units.length - 1) {
              index++;
              sizeBytes /= 1024;
          }
          var textSizeUnits = sizeBytes;
          var unit = units[index];
          var answer = N / 2;
          var maxMin = 'максимально';
          var item = 'не более';
          this.answer = answer;
          this.condition = `На предприятии каждой изготовленной детали присваивают серийный номер, 
          состоящий из ${k} символов. В базе данных для хранения каждого серийного номера 
          отведено одинаковое и минимально возможное число байт. 
          При этом используется посимвольное кодирование серийных номеров, 
          все символы кодируются одинаковым и минимально возможным числом бит. 
          Известно, что для хранения ${users} серийных номеров доступно 
          не более ${textSizeUnits} ${unit} памяти. Определите максимально возможную мощность алфавита, 
          используемого для записи серийных номеров. В ответе запишите только целое число.`;

          this.steps = [answer, k, users, unit, textSizeUnits];

        }

         // Задача про поиск минимальной мощности

        if (codeTask === 4) {
          let randomChoice = Math.floor(Math.random() * optionsOfAlphabet.length);
          let textA = optionsOfAlphabet[randomChoice];
          var N  = [8, 16, 32, 64, 128, 256, 512, 1024, 
            2048, 4096, 8192, 16384, 32768, 65536, 131072, 262144, 524288,
          1048576][Math.floor(Math.random() * 18)];
          var i = Math.ceil(Math.log2(N));
          let k = Math.floor(Math.random() * (780 - 90 + 1)) + 90;
          let users = Math.floor(Math.random() * (1000000 - 15000 + 1)) + 15000;
          let sizeBytes = Math.ceil(k * i / 8) * users;
          if (sizeBytes > 1048576) { sizeBytes -= sizeBytes % (1024 * 1024); }
          else {sizeBytes -= sizeBytes % 1024;}
          // Вычисление итогового размера базы
          let index = 0;
          const units = ['байт', 'Кбайт', 'Мбайт', 'Гбайт'];
          while (sizeBytes % 1024 === 0 && index < units.length - 1) {
              index++;
              sizeBytes /= 1024;
          }
          let textSizeUnits = sizeBytes;
          let unit = units[index];
          let answer = N / 2 + 1;
          var maxMin = 'минимально';
          var item = 'не менее';
          this.answer = answer;
          this.condition = `На предприятии каждой изготовленной детали присваивают серийный номер, 
          состоящий из ${k} символов. В базе данных для хранения каждого серийного номера 
          отведено одинаковое и минимально возможное число байт. 
          При этом используется посимвольное кодирование серийных номеров, 
          все символы кодируются одинаковым и минимально возможным числом бит. 
          Известно, что для хранения ${users} серийных номеров доступно 
          не менее ${textSizeUnits} ${unit} памяти. Определите минимально возможную мощность алфавита, 
          используемого для записи серийных номеров. В ответе запишите только целое число.`;

          this.steps = [answer, k, users, unit, textSizeUnits];
        }

      }

    getTask() {
        return this.condition;
    }

    getAnswer() {
        return this.answer;
    }

    getStepByStep(codeTask, addInfo = false) {
        let result = '';
        if ((codeTask === 1) && (!addInfo)) {
            result += '<br><p><span style="color: red">ОШИБКА!</span></p><br><p>Проделай задачу пошагово, затем сгенерируй новую и попробуй снова!</p>'
            result += `<div class="help-block-line"><p>Чему равна мощность алфавита N?</p><input class="help-block-input"><div class="help-block-button" onclick="gotoNextStep(0)">ok</div>` +
            `<div class="help-block-verdict">НЕИЗВЕСТНО</div></div>`;
            result += `<div class="help-block-line"><p>Сколько бит необходимо выделить на один символ i?</p><input class="help-block-input"><div class="help-block-button" onclick="gotoNextStep(1)">ok</div>` +
            `<div class="help-block-verdict">НЕИЗВЕСТНО</div></div>`;
            result += `<div class="help-block-line"><p>Какое минимальное ЦЕЛОЕ количество байт выделяется на один идентификатор?</p><input class="help-block-input"><div class="help-block-button" onclick="gotoNextStep(2)">ok</div>` +
            `<div class="help-block-verdict">НЕИЗВЕСТНО</div></div>`;
            result += `<div class="help-block-line"><p>Для хранения ${this.steps[4]} идентификаторов необходимо выделить ${this.steps[5]}?</p><input class="help-block-input"><div class="help-block-button" onclick="gotoNextStep(3)">ok</div>` +
            `<div class="help-block-verdict">НЕИЗВЕСТНО</div></div>`;
        }
        else if ((codeTask === 1) && (addInfo)) {
            result += '<br><p><span style="color: red">ОШИБКА!</span></p><br><p>Проделай задачу пошагово, затем сгенерируй новую и попробуй снова!</p>'
            result += `<div class="help-block-line"><p>Чему равна мощность алфавита N?</p><input class="help-block-input"><div class="help-block-button" onclick="gotoNextStep(0)">ok</div>` +
            `<div class="help-block-verdict">НЕИЗВЕСТНО</div></div>`;
            result += `<div class="help-block-line"><p>Сколько бит необходимо выделить на один символ i?</p><input class="help-block-input"><div class="help-block-button" onclick="gotoNextStep(1)">ok</div>` +
            `<div class="help-block-verdict">НЕИЗВЕСТНО</div></div>`;
            result += `<div class="help-block-line"><p>Какое минимальное ЦЕЛОЕ количество байт выделяется на один идентификатор?</p><input class="help-block-input"><div class="help-block-button" onclick="gotoNextStep(2)">ok</div>` +
            `<div class="help-block-verdict">НЕИЗВЕСТНО</div></div>`;
            result += `<div class="help-block-line"><p>Какое количество байт выделяется на одного пользователя с учетом дополнительных сведений?</p><input class="help-block-input"><div class="help-block-button" onclick="gotoNextStep(3)">ok</div>` +
            `<div class="help-block-verdict">НЕИЗВЕСТНО</div></div>`;
            result += `<div class="help-block-line"><p>Для хранения сведений о ${this.steps[5]} пользователях необходимо выделить ${this.steps[6]}?</p><input class="help-block-input"><div class="help-block-button" onclick="gotoNextStep(4)">ok</div>` +
            `<div class="help-block-verdict">НЕИЗВЕСТНО</div></div>`;
        }
         else if ((codeTask === 2) && (!addInfo)) {
            // alert(this.steps);
            result += '<br><p><span style="color: red">ОШИБКА!</span></p><br><p>Проделай задачу пошагово, затем сгенерируй новую и попробуй снова!</p>'
            result += `<div class="help-block-line"><p>Чему равна мощность алфавита N?</p><input class="help-block-input"><div class="help-block-button" onclick="gotoNextStep(0)">ok</div>` +
            `<div class="help-block-verdict">НЕИЗВЕСТНО</div></div>`;
            result += `<div class="help-block-line"><p>Сколько бит необходимо выделить на один символ i?</p><input class="help-block-input"><div class="help-block-button" onclick="gotoNextStep(1)">ok</div>` +
            `<div class="help-block-verdict">НЕИЗВЕСТНО</div></div>`;
            result += `<div class="text-output"> Подбери длину серийного номера:</div>`
            var i = this.steps[1];
            var c = this.steps[3];
            var u = this.steps[4];
            var r = this.steps[5];
            result += `<input id="enterK" class="help-block-input" placeholder="Введите значение k" onchange="startCalc(${i}, ${c}, '${u}', ${r})">`
            result += `<div class="output"></div>`
        }

        else if ((codeTask === 3) || (codeTask === 4)) {
            // alert(this.steps);
            // this.steps = [k, users, unit, textSizeUnits];
              result += '<br><p><span style="color: red">ОШИБКА!</span></p><br><p>Проделай задачу пошагово, затем сгенерируй новую и попробуй снова!</p>';
            result += `<div class="help-block-line"><p>Воспользуйся калькулятором подбора</p></div></div>`;
            result += `<div class="text-output"> Подбери длину i - количество бит на один символ:</div>`
            var k = this.steps[1];
            var u = this.steps[2];
            var units = this.steps[3];
            var s = this.steps[4];
            result += `<input id="enter_i" class="help-block-input" placeholder="Введите значение i" onchange="startCalc_i(${k}, ${u}, '${units}', ${s})">`
            result += `<div class="output"></div>`
        }
        return result;
    }

    getStepList() {
        return this.steps;
    }
}


var content = [{
  'header-block': 'Задание №11.1',
  'progress-block': 0,
  'task-block': 1,
  'task-addinfo': false,
  'description': 'Поиск информационного объёма V'
  },
  {
  'header-block': 'Задание №11.2',
  'progress-block': 0,
  'task-block': 1,
  'task-addinfo': true,
  'description': 'Поиск информационного объёма V + дополнительные сведения'
  },
  {
  'header-block': 'Задание №11.3',
  'progress-block': 0,
  'task-block': 2,
  'description': 'Поиск максимальной/минимальной длины k'
  },
  {
  'header-block': 'Задание №11.4',
  'progress-block': 0,
  'task-block': 3,
  'description': 'Поиск максимальной мощности алфавита N'
  },
    {
  'header-block': 'Задание №11.5',
  'progress-block': 0,
  'task-block': 4,
  'description': 'Поиск минимальной мощности алфавита N'
  }
];

const countTasks = 5;
var numberStep = 0;
var maxSol = 0;
var activeTasks = [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
var solverTasks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var checkAnswerButtonFlag = true;
task = new GenerateTask11();

var currentStep = 0;
var stepList = [];
var stackErrors = [];

function drawProgress() {
  for (var i in [0, 1, 2]) {
    // element.style.backgroundColor = 'red';
    document.getElementsByClassName('block')[i].style.backgroundColor = 'white';
  }
  for (var i = 0; i < progress; i++) {
    document.getElementsByClassName('block')[i].style.backgroundColor = '#1283b7';
  }
}

function startLearning() {
  // document.getElementsByClassName('start-block')[0].style.display = 'none';
  var startBlock = document.getElementsByClassName('start-block')[0];
  document.getElementsByClassName('main')[0].removeChild(startBlock);
  generateLearning(0);
}

function generateLearning(number) {
  numberStep = number;
  var main = document.getElementsByClassName('main')[0];
  var mainBlock = document.getElementsByClassName('main-block')[0];
  main.removeChild(mainBlock);
  
  var mainBlock = document.createElement('div');
  mainBlock.className = 'main-block';
  main.appendChild(mainBlock);
  
  var headerBlock = document.createElement('div');
  headerBlock.className = 'header-block';
  headerBlock.innerHTML = content[number]['header-block'];
  
  var progressBlock = document.createElement('div');
  progressBlock.className = 'progress-block';
  // progressBlock.innerHTML = content[numberStep]['progress-block'];
  // loadingBlock.innerHTML = 'loading-block';
  var progressBlockLine = document.createElement('div');
  progressBlockLine.className = 'progress-block-line';
  var blockText = '';
  for (var i = 0; i < countTasks; i++) {blockText += `<div class="block" onclick="goToNextTask(${i})">${i + 1}</div>`}
  progressBlockLine.innerHTML = blockText;
  progressBlock.appendChild(progressBlockLine);

  
  var progressBlockStack = document.createElement('div');
  progressBlockStack.className = 'progress-block-next';
  progressBlockStack.innerHTML = 'stack';
  progressBlockStack.onclick = () => {gotoStack()}
  progressBlock.appendChild(progressBlockStack);

  var taskBlock = document.createElement('div');
  taskBlock.className = 'task-block';
  var numberTypeTask = content[numberStep]['task-block'];
  task.generateTask(content[number]['task-block'], content[number]['task-addinfo'])
  numberTypeTask = task.getTask();
  taskBlock.innerHTML = numberTypeTask;

  var answerBlock = document.createElement('div');
  answerBlock.className = 'answer-block';
  // answerBlock.innerHTML = 'answer-block';
  // var answerBlockText = document.createElement('div');
  // answerBlockText.className = 'answer-block-text';
  // answerBlockText.innerHTML = 'Ответ:';
  // answerBlock.appendChild(answerBlockText);
  var answerBlockInput = document.createElement('input');
  answerBlockInput.className = 'answer-block-input';
  answerBlockInput.innerHTML = '';
  answerBlock.appendChild(answerBlockInput);
  var answerBlockButton = document.createElement('div');
  answerBlockButton.className = 'answer-block-button';
  answerBlockButton.onclick = () => { checkAnswer(number);}
  answerBlockButton.innerHTML = 'Проверить';
  answerBlock.appendChild(answerBlockButton);

  var helpBlock = document.createElement('div');
  helpBlock.className = 'help-block';
  helpBlock.innerHTML = task.getStepByStep(content[numberStep]['task-block'], content[numberStep]['task-addinfo']);
  currentStep = 0
  stepList = task.getStepList();

  var generateBlock = document.createElement('div');
  generateBlock.className = 'generate-block';
  generateBlock.innerHTML = `<div class="generate-block-button" onclick="goToNextTask(${number}, true)"> СГЕНЕРИРОВАТЬ ЗАДАЧУ </div>`;

  mainBlock.appendChild(headerBlock);
  mainBlock.appendChild(progressBlock);
  mainBlock.appendChild(taskBlock);
  mainBlock.appendChild(answerBlock);
  mainBlock.appendChild(helpBlock);
  mainBlock.appendChild(generateBlock);


  document.getElementsByClassName('block')[number].style.backgroundColor = '#1283b7';
  document.getElementsByClassName('block')[number].style.color = 'white';
  for (var i = 0; i < countTasks; i++) {document.getElementsByClassName('block')[i].style.display = 'flex';}
  for (var i = 0; i < countTasks; i++) {
  if (solverTasks[i] == 0) { document.getElementsByClassName('block')[i].style.border = '1px solid #1283b7'; }
  else if ((solverTasks[i] == 1)) {document.getElementsByClassName('block')[i].style.border = '1px solid lime'}
  else if ((solverTasks[i] == -1)) {document.getElementsByClassName('block')[i].style.border = '1px solid red'}
    
  }

  // drawProgress();
}

function goToNextTask(number, flag=false) {
  if ((activeTasks[number] == 1) || (flag == true)) {
    generateLearning(number);
    checkAnswerButtonFlag = true;
    for (var i = 0; i < activeTasks.length; i++) {activeTasks[i] = 1;}
    activeTasks[number] = 0;
    for (var i = 0; i < countTasks; i++) {
      document.getElementsByClassName('block')[i].style.backgroundColor = 'white';
      document.getElementsByClassName('block')[i].style.color = '#1283b7';
    }
    document.getElementsByClassName('block')[number].style.backgroundColor = '#1283b7';
    document.getElementsByClassName('block')[number].style.color = 'white';
    // alert(number);
    }
}

function checkAnswer(number) {
  var answerUser = document.getElementsByClassName('answer-block-input')[0].value;
  if (checkAnswerButtonFlag == false) { return 0};
  if (answerUser == task.getAnswer()) { //task.getAnswer()
      // alert('Правильно! Вам открылось следующее задание, можно перейти к нему!');
      document.getElementsByClassName('task-block')[0].style.border = '1px solid lime';
      maxSol = Math.max(maxSol, number + 1);
      solverTasks[number] = 1;
      document.getElementsByClassName('block')[number].style.border = '1px solid lime';
      // for (var i = 0; i <= maxSol; i++) {document.getElementsByClassName('block')[i].style.display = 'flex';}
  } else {
    checkAnswerButtonFlag = false;
    solverTasks[number] = -1;
    document.getElementsByClassName('block')[number].style.border = '1px solid red';
    document.getElementsByClassName('task-block')[0].style.border = '1px solid red';
    document.getElementsByClassName('help-block')[0].style.display = 'flex';
    document.getElementsByClassName('generate-block-button')[0].style.display = 'flex';
    document.getElementsByClassName('answer-block-input')[0].disabled = true;
    stackErrors.push(number);
  }
  
}



function gotoNextStep(currentStep) {
  var ans = document.getElementsByClassName('help-block-input')[currentStep];
  var verdict = document.getElementsByClassName('help-block-verdict')[currentStep];
  if (ans.value == stepList[currentStep]) {
    verdict.innerHTML = 'ВЕРНО';
    verdict.style.color = 'lime';
    verdict.style.border = '1px solid lime';
  } else {
    verdict.innerHTML = 'НЕВЕРНО';
    verdict.style.color = 'red';
    verdict.style.border = '1px solid red';
  }
}

function checkFinallyStep() {
  var ans = document.getElementsByClassName('help-block-input-finally')[0];
  var verdict = document.getElementsByClassName('help-block-verdict-finally')[0];
  if (ans.value == task.getAnswer()) {
    verdict.innerHTML = 'ВЕРНО';
    verdict.style.color = 'lime';
    verdict.style.border = '1px solid lime';
  } else {
    verdict.innerHTML = 'НЕВЕРНО';
    verdict.style.color = 'red';
    verdict.style.border = '1px solid red';
  }
}

function startCalc(i, counts, unit, r) {
  var k = document.getElementById('enterK').value;
  var v = Math.ceil(k * i / 8) * counts;
  var size = 1024;
  if (unit == 'Мбайт') {size = size * 1024};
  var verdict = `НЕ ПРЕВЫШАЕТ ${r} ${unit}`
  if (v / size > r) {verdict = `ПРЕВЫШАЕТ ${r} ${unit}`}
  document.getElementsByClassName('output')[0].innerHTML = `<div class="text-output">Информационный объём одного серийного номера:</div>` +
  `<div class="result-output"> v = k * i / 8 = ${k} * ${i} / 8 = ${k * i / 8}  ≈ ${Math.ceil(k * i / 8)} байт </div>` +
  `<div class="text-output">На хранение данных о ${counts} деталях потребуется: </div>` + 
  `<div class="result-output"> ${Math.ceil(k * i / 8)} * ${counts}  = ${v} байт = ${v / size} ${unit} </div>` +
  `<div class="verdict-output"> ${verdict} </div>` +
  `<div class="help-block-line"><p>Запишите и проверьте ответ: </p><input class="help-block-input-finally"><div class="help-block-button" onclick="checkFinallyStep()">ok</div>` +
            `<div class="help-block-verdict-finally">НЕИЗВЕСТНО</div></div>`;
}

function startCalc_i(k, counts, unit, r) {
  var i = document.getElementById('enter_i').value;
  var v = Math.ceil(k * i / 8) * counts;
  var size = 1024;
  if (unit == 'Мбайт') {size = size * 1024};
  var verdict = `НЕ ПРЕВЫШАЕТ ${r} ${unit}`
  if (v / size > r) {verdict = `ПРЕВЫШАЕТ ${r} ${unit}`}
  document.getElementsByClassName('output')[0].innerHTML = `<div class="text-output">Информационный объём одного серийного номера:</div>` +
  `<div class="result-output"> v = k * i / 8 = ${k} * ${i} / 8 = ${k * i / 8}  ≈ ${Math.ceil(k * i / 8)} байт </div>` +
  `<div class="text-output">На хранение данных о ${counts} деталях потребуется: </div>` + 
  `<div class="result-output"> ${Math.ceil(k * i / 8)} * ${counts}  = ${v} байт = ${v / size} ${unit} </div>` +
  `<div class="verdict-output"> ${verdict} </div>` +
  `<div class="help-block-line"><p>Запишите и проверьте ответ: </p><input class="help-block-input-finally"><div class="help-block-button" onclick="checkFinallyStep()">ok</div>` +
            `<div class="help-block-verdict-finally">НЕИЗВЕСТНО</div></div>`;
}


function gotoStack() {
  if (stackErrors.length == 0) {
    alert("На данный момент отработок нет!")
    return 0;
  };

  alert(stackErrors);
}
