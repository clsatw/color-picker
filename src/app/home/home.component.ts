import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ColorPickerService, Rgba } from 'ngx-color-picker';
import { MqttProvider } from '../../providers/mqtt/mqtt';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  interval = 3000;
  btnText: string;
  showStyle: boolean;
  timer: any;
  color = '#800880';
  // toggle = false;

  public selectedColor: string;
  constructor(
    private mqtt: MqttProvider,
    public vcRef: ViewContainerRef,
    private cpService: ColorPickerService
  ) {}

  setLedColor(color: string): number {
    let hexCol: number;

    /*
    let rgb = {
      r: '',
      g: '',
      b: '',
    };
    */
    hexCol = parseInt(color.slice(1), 16);
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

  randomColor() {
    let color; // = 16777215;

    this.showStyle = !this.showStyle;
    if (this.showStyle) {
      this.btnText = 'Stop Random Color';
      this.timer = setInterval(() => {
        // tslint:disable-next-line:no-bitwise
        color =
          '#' +
          ('00000' + ((Math.random() * 16777216) << 0).toString(16)).substr(-6);
        // color -= 1000;
        console.log('color: ', color);
        // const d = (Math.floor(Math.random() * 1677215) + 1);
        // +d means force d a number
        // this.color = '#' + (+d).toString(16);
        this.setLedColor(color);
      }, this.interval);
    } else {
      this.btnText = 'Random Color';
      clearInterval(this.timer);
    }
  }
}
