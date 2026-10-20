#include <WiFi.h>
#include <WebServer.h>
#include <SPIFFS.h>
#include <DNSServer.h>

const char* ssid = "Lumenco-Learning";
const char* password = "12345678";

WebServer server(80);
DNSServer dnsServer;

String getContentType(String filename) {
    if(filename.endsWith(".html")) return "text/html";
    if(filename.endsWith(".css")) return "text/css";
    if(filename.endsWith(".js")) return "application/javascript";
    if(filename.endsWith(".png")) return "image/png";
    if(filename.endsWith(".jpg")) return "image/jpeg";
    return "text/plain";
}

void handleFileRead() {
    String path = server.uri();
    if (path == "/") path = "/index.html";
    
    if (SPIFFS.exists(path)) {
        File file = SPIFFS.open(path, "r");
        server.streamFile(file, getContentType(path));
        file.close();
    } else {
        // Redirect for Captive Portal
        server.sendHeader("Location", String("http://192.168.4.1/index.html"), true);
        server.send(302, "text/plain", "");
    }
}

void setup() {
    Serial.begin(115200);
    if (!SPIFFS.begin(true)) {
        Serial.println("SPIFFS Mount Failed");
        return;
    }

    WiFi.softAP(ssid, password);
    dnsServer.start(53, "*", WiFi.softAPIP());

    server.onNotFound(handleFileRead);
    server.begin();
    Serial.println("Lumenco Server Ready!");
}

void loop() {
    dnsServer.processNextRequest();
    server.handleClient();
}