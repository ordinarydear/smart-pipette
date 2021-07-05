# smart-pipette

This project is a part of the pipetting robot project designed to receive user inputs. ESP32 is used as a web server where the contents is stored  from the SPIFFS filesystem. The UI is built from HTML, CSS, and JavaScript. 


# Setup

Update the file `wifi_credentials.h` with your SSID and PASSWORD.

```c
#define SSID "YOUR_SSID"
#define PASSWORD "YOUR_PASSWORD"
```
Upload filesystem image

Next compile and run the sketch.

Once the sketch is running you should be able to use a browser to open the device's UI.
**For better UI, Phone is recommended

```
http://smart-pipette.local
```
