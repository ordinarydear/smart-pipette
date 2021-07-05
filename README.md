# smart-pipette

This project is a part of the pipetting robot project designed to receive user inputs. ESP32 is used as a web server where the contents are stored  from the SPIFFS filesystem. The UI is built from HTML, CSS, and JavaScript. 


# Setup

1) Update the file `wifi_credentials.h` with your SSID and PASSWORD.

```c
#define SSID "YOUR_SSID"
#define PASSWORD "YOUR_PASSWORD"
```
2) Upload filesystem image

3) Next compile and run the sketch.

4) Once the sketch is running you should be able to use a browser to open the device's UI.

```
http://smart-pipette.local
```
**For a better UI, Phone is recommended
