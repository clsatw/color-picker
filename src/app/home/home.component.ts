import { Component, OnInit, ViewContainerRef } from '@angular/core';
// import { ColorPickerService, Rgba } from 'ngx-color-picker';
import { ColorPicker } from 'nativescript-color-picker';
import { Color } from 'tns-core-modules/Color';
import { MqttProvider } from '../../providers/mqtt/mqtt';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  interval = 3; // default 3 seconds
  btnText = 'Random color';
  showStyle = true;
  timer: any;
  selectedColor: number;  // color in hex format
  // toggle = false;
  picker = new ColorPicker();

  // public selectedColor: string;
  constructor(
    private mqtt: MqttProvider,
    public vcRef: ViewContainerRef,
    // private cpService: ColorPickerService
  ) { }

  ngOnInit() {
    this.showARGBPicker();
  }

  public showARGBPicker(): void {
    this.picker.show('#3489db', 'ARGB').then((result) => {
      // console.dir(result);
      console.log('color int: ' + result);
      this.selectedColor = this.setLedColor(result);
    }).catch((err) => {
      console.log(err);
    });
  }

  setLedColor(color: number | {}): number {
    let hexCol: number;
    /*
    let rgb = {
      r: '',
      g: '',
      b: '',
    };
    */
    // hexCol = parseInt(color.slice(1), 16);
    if (typeof color === 'number') {
      hexCol = parseInt(color.toString(16), 16);
    }
    this.mqtt.callArestWithParam('ledColor', hexCol);
    return hexCol;
    /*
        console.log('color: ', parseInt(color.slice(1), 16));
        const hsva = this.cpService.stringToHsva(color, true);
        rgba = this.cpService.hsvaToRgba(hsva);
        rgb.r = (rgba.r * 255).toFixed();
        rgb.g = (rgba.g * 255).toFixed();
        rgb.b = (rgba.b * 255).toFixed();
        this.mqtt.callArestWithParam('led', rgb.r, rgb.g, rgb.b);
        console.log(rgb);
        return rgb;
        */
  }

  randomColor(): void {
    let color; // = 16777215;

    this.showStyle = !this.showStyle;
    if (this.showStyle) {
      this.btnText = 'Stop Random Color';
      this.timer = setInterval(() => {
        // tslint:disable-next-line:no-bitwise
        // web ver
        // color = '#' + ('00000' + ((Math.random() * 16777216) << 0).toString(16)).substr(-6);
        color = (Math.floor(Math.random() * 1677215) + 1);
        console.log('color: ', color);
        // +d means force d a number
        // this.color = '#' + (+d).toString(16);
        this.setLedColor(color);
      }, this.interval * 1000); // unit second
    } else {
      this.btnText = 'Random Color';
      clearInterval(this.timer);
    }
  }
}
