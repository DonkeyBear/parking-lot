// #include <Led4digit74HC595.h>

// Led4digit74HC595 myLedDisplay(A2, A1, A0); // 接腳:(SCLK, RCLK, DIO)

void setup() {
  Serial.begin(9600);
  for (int i = 0; i < 20; i++) {
    // 將 34 到 53 腳設置為 INPUT
    pinMode(i + 34, INPUT);
  }
}

void loop() {
  // myLedDisplay.loopShow(); // 每一次loop都要呼叫這個函式

  int S[20];
  // char S_char[20];
 
  for (int i = 0; i < 10; i++) {
    S[i] = digitalRead(52 - i * 2);
    S[i + 10] = digitalRead(53 - i * 2);
  }

  /*
  for (int i = 0; i < 20; i++) {
    S_char[i] = S[i] + 48; // ASCII code: 48 == '0', 49 == '1'
  }
  Serial.println(S_char);
  */

  for (int i = 0; i < 20; i++) {
    Serial.print(S[i]);
  }
  Serial.println();
 
  delay(1000);

  /*
  int count = 0;
  for (int i = 0; i < 20; i++) {
    if (S[i] == 1) {
      count++;
    }
  }
  myLedDisplay.setNumber(count); // 顯示數字內容
  */
}
