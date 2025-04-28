#include <SoftwareSerial.h>
#include <Adafruit_Fingerprint.h>
#include <SPI.h>
#include <MFRC522.h>

// --------- Fingerprint Config ----------
#define FPS_RX 2  // Pin 2 as RX
#define FPS_TX 3  // Pin 3 as TX
SoftwareSerial fingerSerial(FPS_RX, FPS_TX);
Adafruit_Fingerprint finger(&fingerSerial);

// --------- RFID Config ----------
#define SS_PIN 10
#define RST_PIN 9
MFRC522 mfrc522(SS_PIN, RST_PIN);

// Setup
void setup() {
  Serial.begin(9600);
  while (!Serial); // Wait for serial port to connect (for Leonardo/Micro)

  // Fingerprint Sensor Setup
  fingerSerial.begin(9600);
  if (finger.begin()) {
    Serial.println("Fingerprint sensor found!");
    finger.getTemplateCount();
    Serial.print("Sensor contains "); Serial.print(finger.templateCount); Serial.println(" templates");
  } else {
    Serial.println("Did not find fingerprint sensor :(");
    while (1) { delay(1); }
  }

  // RFID Setup
  SPI.begin();
  mfrc522.PCD_Init();
  Serial.println("Scan your fingerprint or RFID card...");
}

void loop() {
  // Check Fingerprint
  int fingerprintID = getFingerprintID();
  if (fingerprintID >= 0) {
    Serial.print("Fingerprint ID detected: ");
    Serial.println(fingerprintID);
    delay(2000); // avoid multiple detections
  }

  // Check RFID
  if (mfrc522.PICC_IsNewCardPresent() && mfrc522.PICC_ReadCardSerial()) {
    Serial.print("RFID UID tag: ");
    String rfidUID = "";
    for (byte i = 0; i < mfrc522.uid.size; i++) {
      rfidUID += String(mfrc522.uid.uidByte[i] < 0x10 ? "0" : "");
      rfidUID += String(mfrc522.uid.uidByte[i], HEX);
    }
    rfidUID.toUpperCase();
    Serial.println(rfidUID);
    mfrc522.PICC_HaltA(); // Halt PICC
    delay(2000); // avoid multiple detections
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

  // found a match
  return finger.fingerID;
}
