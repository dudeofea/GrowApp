#include <DHT.h>;

#define VALVE_PIN             2
#define SOIL_MOISTURE_PIN     14
#define DHT_SENSOR_PIN        15

DHT dht(DHT_SENSOR_PIN, DHT22);

int output_value;

void setup() {
  pinMode(VALVE_PIN, OUTPUT);
  Serial.begin(9600);
  Serial.println("Reading From the Sensor ...");
  delay(2000);
}

void loop() {
  Serial.print("Mositure : ");
  Serial.print(get_soil_moisture());
  Serial.println("%");
  Serial.print("Humidity: ");
  Serial.print(get_air_moisture());
  Serial.print(" %, Temp: ");
  Serial.print(get_air_temperature());
  Serial.println(" Celsius");
  if(get_soil_moisture() < 50){
    open_valve();
  }else{
    close_valve();
  }
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

