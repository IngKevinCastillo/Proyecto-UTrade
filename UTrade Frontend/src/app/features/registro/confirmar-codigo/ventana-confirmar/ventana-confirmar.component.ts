import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ventana-confirmar',
  templateUrl: './ventana-confirmar.component.html',
  styleUrl: './ventana-confirmar.component.css',
})
export class VentanaConfirmarComponent implements OnInit {
  codigoVerificacion: string = '';
  codigoEsperado: string = '';

  constructor(
    public dialogRef: MatDialogRef<VentanaConfirmarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toast: ToastrService
  ) {
    this.codigoEsperado = data?.codigo ?? '';
  }

  ngOnInit(): void {}

  salir(): void {
    this.dialogRef.close();
  }

  confirmarCodigo(): void {
    if (this.codigoVerificacion.trim() === this.codigoEsperado) {
      this.toast.success('✅ Código correcto', 'Éxito', {
        timeOut: 3000,
        progressBar: true,
        closeButton: true,
      });
      this.dialogRef.close({ verificado: true });
    } else {
      this.toast.error('❌ Código incorrecto', 'Error', {
        timeOut: 3000,
        progressBar: true,
        closeButton: true,
      });
      this.codigoVerificacion = '';
    }
  }
}
