#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ArduinoJson.h>

// Constants for connection
int httpPort = 8001;
const char ssid[] = "myNetwork";
const char pass[] = "myPassword";
const char *host = "192.168.1.12";
String ConnectionString = "parvg555"; // ye kya randirona hai

// Global Variables
WiFiClient client;
const String url = "/ping/" + ConnectionString;
const String PingString = "GET " + url + " HTTP/1.1\r\n" + "Host:" + host + "\r\n" + "Connection: close\r\n\r\n";

// Example Ping String
// GET /ping/parvg555 HTTP/1.1
// Host: 192.168.1.12
// Connection: close

void setup()
{
  Serial.begin(115200);
  delay(250);
  Serial.println();
  Serial.println();

  // Chutiyo ne begin ke bina hi connect kari ja re
  client.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }

  Serial.println();
  Serial.println("Connected to WiFi");
}

// Connects to host server at given IP and listens to GET requests, return a boolean value if response is received.
bool SetComplete()
{
  if (client.connect(host, httpPort))
  {
    String url = "/setComplete/" + ConnectionString;
    client.print(String("GET ") + url + " HTTP/1.1\r\n" + "Host: " + host + "\r\n" + "Connection: close\r\n\r\n");
    unsigned long timeout = millis();
    while (client.available() == 0)
    {
      if (millis() - timeout > 500)
      {
        Serial.println("OFFLINE");
        client.stop();
        return false;
      }
    }
    return true;
  }
  return false;
}

//  Establishes a connection to the server using the IP and port provided. It sends a GET request
//  and waits for a response. If a response is received, it processes and prints non-empty lines,
//  waits for 5 seconds, and checks if a certain task is complete. Otherwise, it prints "No response."
//  Finally, it closes the connection.
void loop()
{
  if (client.connect(host, httpPort))
  {
    client.print(PingString);
    unsigned long timeout = millis();
    bool receivedResponse = false;

    while (millis() - timeout <= 500)
    {
      if (client.available())
      {
        receivedResponse = true;
        break;
      }
    }

    if (receivedResponse)
    {
      while (client.available())
      {
        String line = client.readStringUntil('\r');
        line.trim();
        if (!line.isEmpty() && line != "null")
        {
          Serial.println(line);
          delay(5000);
          while (!SetComplete())
          {
          }
        }
      }
    }
    else
      Serial.println("No response received.");
    client.stop();
  }
  else
  {
    Serial.println("OFFLINE");
  }
}
