#include <DHT.h>;

#define VALVE_PIN             2
#define SOIL_MOISTURE_PIN     14
#define DHT_SENSOR_PIN        15

DHT dht(DHT_SENSOR_PIN, DHT22);

void setup() {
  pinMode(VALVE_PIN, OUTPUT);
  Serial.begin(115200);
  delay(4000);
}

void loop() {
  //0: do nothing, 1: open valve, 2: close valve
  long cmd = Serial.parseInt();
  if(cmd == 1){
    open_valve();
  }else if(cmd == 2){
    close_valve();
  }
  //then return data as a result
  Serial.print(get_soil_moisture());
  Serial.print(",");
  Serial.print(get_air_moisture());
  Serial.print(",");
  Serial.println(get_air_temperature());
  delay(2000);
}

//returns a soil moisture percentage
int get_soil_moisture(){
  int raw_value = analogRead(SOIL_MOISTURE_PIN);
  //1024 is 0% and 300 is 100%
  return map(constrain(raw_value, 300, 1024), 300, 1024, 100, 0);
}

float get_air_moisture(){
  return dht.readHumidity();
}

float get_air_temperature(){
  return dht.readTemperature();
}

void open_valve() {
  digitalWrite(VALVE_PIN, HIGH);
}

void close_valve() {
  digitalWrite(VALVE_PIN, LOW);
}

