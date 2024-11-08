import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { BrowserMultiFormatReader, IScannerControls, BarcodeFormat } from '@zxing/browser';

@Component({
  selector: 'app-barcode-scanner',
  templateUrl: './barcode-scanner-component.component.html',
  styleUrls: ['./barcode-scanner-component.component.css']
})
export class BarcodeScannerComponent implements OnInit, OnDestroy {
  @ViewChild('video', { static: false }) videoElement!: ElementRef<HTMLVideoElement>;

  codeReader: BrowserMultiFormatReader = new BrowserMultiFormatReader();
  controls: IScannerControls | null = null;

  // Propiedades necesarias
  resultText: string = '';   // Resultado del código de barras escaneado
  scanning: boolean = false; // Estado del escaneo

  ngOnInit(): void {}

  startScanning(): void {
    this.scanning = true;

    const formats = [BarcodeFormat.QR_CODE, BarcodeFormat.CODE_128, BarcodeFormat.EAN_13];

    BrowserMultiFormatReader.listVideoInputDevices().then((videoInputDevices: MediaDeviceInfo[]) => {
      if (videoInputDevices.length > 0) {
        const selectedDeviceId = videoInputDevices[0].deviceId;

        this.codeReader.decodeFromVideoDevice(selectedDeviceId, this.videoElement.nativeElement, (result, error) => {
          if (result) {
            this.resultText = result.getText(); // Guarda el resultado del código escaneado
            console.log('Código detectado:', this.resultText);
            this.stopScanning();
          }
          if (error) {
            console.error('Error de escaneo:', error);
          }
        }).then((controls) => {
          this.controls = controls; // Guarda el control para detener el escaneo
        });
      }
    }).catch((err) => {
      console.error('Error al acceder a la cámara:', err);
    });
  }

  stopScanning(): void {
    if (this.controls) {
      this.controls.stop();
    }
    this.scanning = false;
  }

  printCode(): void {
    const printWindow: Window | null = window.open('', '', 'height=400,width=600');
    if (printWindow) {
      printWindow.document.write('<html><head><title>Imprimir Código</title></head><body>');
      printWindow.document.write('<h1>Código Detectado</h1>');
      printWindow.document.write('<p>' + this.resultText + '</p>');
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      printWindow.print();
    } else {
      console.error('No se pudo abrir la ventana de impresión.');
    }
  }

  ngOnDestroy(): void {
    this.stopScanning();
  }
}
