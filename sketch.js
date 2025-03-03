let input;
let slider;
let button;
let select;
let iframe;
let isBouncing = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  textSize(32);
  input = createInput();
  input.position(10, 10);
  slider = createSlider(28, 50, 32); // 創建滑桿，範圍從28到50，初始值為32
  slider.position(input.x + input.width + 10, 10); // 將滑桿放置在文字框旁邊
  button = createButton('跳動');
  button.position(slider.x + slider.width + 10, 10); // 將按鈕放置在滑桿旁邊
  button.mousePressed(toggleBounce); // 當按鈕被按下時，切換跳動狀態

  select = createSelect();
  select.position(button.x + button.width + 10, 10); // 將選單放置在按鈕旁邊
  select.option('淡江大學');
  select.option('淡江教科');
  select.option('第三周');
  select.changed(handleSelectChange); // 當選單選項改變時，調用 handleSelectChange 函數

  iframe = createElement('iframe');
  iframe.position(100, 100);
  iframe.size(windowWidth - 200, windowHeight - 200);
  iframe.hide();
}

function toggleBounce() {
  isBouncing = !isBouncing;
}

function handleSelectChange() {
  let selectedOption = select.value();
  if (selectedOption === '淡江大學') {
    iframe.attribute('src', 'https://www.tku.edu.tw');
    iframe.show();
  } else if (selectedOption === '淡江教科') {
    iframe.attribute('src', 'https://www.et.tku.edu.tw');
    iframe.show();
  } else if (selectedOption === '第三周') {
    iframe.attribute('src', 'https://hackmd.io/@vojhQ4yNSkWfQnRxP_-npA/HyuAF9zoyg');
    iframe.show();
  }
}

function draw() {
  background(0); // 設置背景為黑色
  fill(255); // 設置文字為白色
  textSize(slider.value()); // 根據滑桿的值設置文字大小
  let message = input.value();
  let repeatedMessage = message.split('').join(' '); // 在每個字符之間添加空格
  for (let y = 0; y < height; y += textSize() * 2) { // 增加行與行之間的間隔
    for (let x = 0; x < width; x += textWidth(repeatedMessage) + 20) { // 增加字與字之間的間隔
      let yOffset = 0;
      if (isBouncing) {
        yOffset = sin((x + y + frameCount) * 0.05) * 10; // 讓文字上下跳動，每個字符跳動的頻率都不一樣
      }
      text(repeatedMessage, x, y + textSize() / 2 + yOffset);
    }
  }
}
