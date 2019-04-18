# color-picker
nativescript and web app

home.component.ts has to deal with nativescript and angular coz nativescript doesnt' support ngx-color-picker module. we have to use nativescript-color-picker module for nativescript.
may be we need to have a seperated home.component.tns.ts.

to upgrade sdkmanager - c:\android\android-sdk\tools\bin\sdkmanager --update

this prove to work on android
    tns platform add android
    tns prepare android
    tns doctor - to maker sure enviromnet is set up porolery.
    connect mobile to usb port
    tns device - to make sure it detects the phone.

    tns run android --bundle
    
    usage: https://cloud.arest.io/630206/ledColor?key=1obqzch8x3e7e626&params=16711680
    0xff0000 (red color) = decimal 16711680 