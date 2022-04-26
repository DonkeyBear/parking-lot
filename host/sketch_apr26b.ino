void setup() {
  Serial.begin(9600);
  for (int i = 0; i < 10; i++) {
    // 將 35 到 53 腳（奇數）設置為 INPUT
    pinMode(35 + i * 2, INPUT);
    pinMode(i + 2, INPUT);
  }
}

void loop() {
  
  int S[20];
  
  for (int i = 0; i < 10; i++) {
    S[i] = digitalRead(11 - i);
    S[i + 10] = digitalRead(53 - i * 2);
  }

  for (int i = 0; i < 20; i++) {
    Serial.print(S[i]);
  }
  Serial.println();
 
  delay(50);
}
