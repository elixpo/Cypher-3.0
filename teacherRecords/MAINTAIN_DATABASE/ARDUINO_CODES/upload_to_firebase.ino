#include <ESP8266WiFi.h> // or use WiFi.h if ESP32
#include <FirebaseESP8266.h> // or FirebaseESP32.h for ESP32
#include <SoftwareSerial.h>
#include <Adafruit_Fingerprint.h>
#include <SPI.h>
#include <MFRC522.h>
#include <NTPClient.h>
#include <WiFiUdp.h>

// -------- Wi-Fi Details --------
#define WIFI_SSID "YOUR_WIFI_NAME"
#define WIFI_PASSWORD "YOUR_WIFI_PASSWORD"

// -------- Firebase Details --------
#define FIREBASE_HOST "your-project-id.firebaseio.com"   // without https://
#define FIREBASE_AUTH "your_database_secret"             // From project settings

// --------- Fingerprint Config ----------
#define FPS_RX 2  // D4
#define FPS_TX 3  // D3
SoftwareSerial fingerSerial(FPS_RX, FPS_TX);
Adafruit_Fingerprint finger(&fingerSerial);

// --------- RFID Config ----------
#define SS_PIN D8
#define RST_PIN D0
MFRC522 mfrc522(SS_PIN, RST_PIN);

// --------- Firebase Setup ----------
FirebaseData firebaseData;

// --------- Time Setup ----------
WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, "pool.ntp.org", 0, 60000); // UTC, refresh every 60s

void setup() {
  Serial.begin(9600);
  
  // WiFi Connection
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi...");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println(" connected.");

  // Initialize Firebase
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  Firebase.reconnectWiFi(true);

  // Initialize Fingerprint
  fingerSerial.begin(9600);
  if (finger.begin()) {
    Serial.println("Fingerprint sensor found!");
  } else {
    Serial.println("Fingerprint sensor not found.");
    while (1) { delay(1); }
  }
  
  // Initialize RFID
  SPI.begin();
  mfrc522.PCD_Init();

  // Initialize NTP Client
  timeClient.begin();

  Serial.println("Ready to scan...");
}

void loop() {
  timeClient.update(); // update time
  
  // Check Fingerprint
  int fingerprintID = getFingerprintID();
  if (fingerprintID >= 0) {
    Serial.print("Fingerprint ID detected: ");
    Serial.println(fingerprintID);
    uploadAttendance("fingerprint", String(fingerprintID));
    delay(2000); // avoid double scan
  }

  // Check RFID
  if (mfrc522.PICC_IsNewCardPresent() && mfrc522.PICC_ReadCardSerial()) {
    Serial.print("RFID UID: ");
    String rfidUID = "";
    for (byte i = 0; i < mfrc522.uid.size; i++) {
      rfidUID += String(mfrc522.uid.uidByte[i] < 0x10 ? "0" : "");
      rfidUID += String(mfrc522.uid.uidByte[i], HEX);
    }
    rfidUID.toUpperCase();
    Serial.println(rfidUID);
    uploadAttendance("rfid", rfidUID);
    mfrc522.PICC_HaltA(); // Halt card
    delay(2000);
  }
}

// Function to get fingerprint ID
int getFingerprintID() {
  uint8_t p = finger.getImage();
  if (p != FINGERPRINT_OK) return -1;
  
  p = finger.image2Tz();
  if (p != FINGERPRINT_OK) return -1;

  p = finger.fingerFastSearch();
  if (p != FINGERPRINT_OK) return -1;

  return finger.fingerID;
}

// Function to upload attendance to Firebase
void uploadAttendance(String type, String id) {
  String timestamp = timeClient.getFormattedTime();

  String path = "/attendance_logs/" + String(millis()); // use millis() to make unique key
  FirebaseJson json;
  json.set("type", type);
  json.set("id", id);
  json.set("timestamp", timestamp);

  if (Firebase.setJSON(firebaseData, path.c_str(), json)) {
    Serial.println("Data uploaded successfully.");
  } else {
    Serial.print("Firebase error: ");
    Serial.println(firebaseData.errorReason());
  }
}
