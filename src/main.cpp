#include <Arduino.h>
#include <ESPAsyncWebServer.h>
#include <ESPmDNS.h>
#include <AsyncJson.h>
#include <SPIFFS.h>

#include "wifi_credentials.h"

AsyncWebServer server(80);

void connectToWiFi(){
  Serial.print("Connecting to WiFi");
  WiFi.mode(WIFI_STA);
  WiFi.begin(SSID, PASSWORD);

  unsigned long startAttemptTime = millis();

  while(WiFi.status() != WL_CONNECTED && millis() - startAttemptTime < WIFI_TIMEOUT_MS){
    Serial.print(".");
    delay(100);
  }

  if(WiFi.status() != WL_CONNECTED){
    Serial.println(" Failed!");
    // take action
    ESP.restart();
  } else {
    Serial.print("Connected!");
    Serial.println(WiFi.localIP());
  }

}

void setup()
{
  Serial.begin(115200);
  Serial.println("Booted");

  connectToWiFi();

  SPIFFS.begin();

  MDNS.begin("smart-pipette");

  DefaultHeaders::Instance().addHeader("Access-Control-Allow-Origin", "*");
  DefaultHeaders::Instance().addHeader("Access-Control-Allow-Methods", "GET, PUT, POST, OPTIONS");
  DefaultHeaders::Instance().addHeader("Access-Control-Allow-Headers", "*");
  DefaultHeaders::Instance().addHeader("Referrer-Policy", "no-referrer");


  server.addHandler(new AsyncCallbackJsonWebHandler("/start", [](AsyncWebServerRequest*request, JsonVariant &json) {
    const JsonObject &jsonObj = json.as<JsonObject>();

    const int time = jsonObj["time"];
    const String case_1 = jsonObj["case_1"];
    const String case_2 = jsonObj["case_2"];
    const String case_3 = jsonObj["case_3"];
    const String case_4 = jsonObj["case_4"];
    const String case_5 = jsonObj["case_5"];

    Serial.print("Test time: ");
    Serial.print(time);
    Serial.println(" second");
    Serial.println("Case1 Test: " + case_1);
    Serial.println("Case2 Test: " + case_2);
    Serial.println("Case3 Test: " + case_3);
    Serial.println("Case4 Test: " + case_4);
    Serial.println("Case5 Test: " + case_5);
    Serial.println("---------------------");
    

    request->send(200, "OK");
  }));

  server.serveStatic("/", SPIFFS, "/").setDefaultFile("index.html");

  server.onNotFound([](AsyncWebServerRequest *request) {
    if (request->method() == HTTP_OPTIONS)
    {
      request->send(200);
    }
    else
    {
      Serial.println("Not found");
      request->send(404, "Not found");
    }
  });

  server.begin();
}

void loop() {
  // put your main code here, to run repeatedly:
}