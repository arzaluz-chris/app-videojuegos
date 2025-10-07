import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { GamesService } from '../../../core/services/games.service';
import { Game } from '../../../shared/models/game.model';

@Component({
  selector: 'app-game-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './game-add.component.html',
  styleUrl: './game-add.component.scss'
})
export class GameAddComponent {
  gameForm: FormGroup;
  isLoading: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private gamesService: GamesService,
    private router: Router
  ) {
    this.gameForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: ['', [Validators.required, Validators.min(0)]],
      imageUrl: ['', [Validators.required, Validators.pattern(/^https?:\/\/.+/)]],
      platform: ['', Validators.required],
      tags: [''],
      rating: ['', [Validators.min(0), Validators.max(100)]]
    });
  }

  /**
   * Enviar formulario
   */
  onSubmit(): void {
    if (this.gameForm.invalid) {
      this.markFormGroupTouched(this.gameForm);
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const formValue = this.gameForm.value;

    // Convertir strings separados por comas en arrays
    const platforms = formValue.platform
      .split(',')
      .map((p: string) => p.trim())
      .filter((p: string) => p.length > 0);

    const tags = formValue.tags
      ? formValue.tags.split(',').map((t: string) => t.trim()).filter((t: string) => t.length > 0)
      : [];

    const newGame: Game = {
      id: '', // Se generará automáticamente
      title: formValue.title,
      description: formValue.description,
      price: parseFloat(formValue.price),
      imageUrl: formValue.imageUrl,
      platform: platforms,
      tags: tags,
      rating: formValue.rating ? parseFloat(formValue.rating) : undefined
    };

    try {
      this.gamesService.addGame(newGame);
      this.successMessage = 'Juego agregado exitosamente. Redirigiendo...';
      this.isLoading = false;

      setTimeout(() => {
        this.router.navigate(['/games']);
      }, 1500);
    } catch (error) {
      this.isLoading = false;
      this.errorMessage = 'Error al agregar el juego. Intenta de nuevo.';
      console.error('Error:', error);
    }
  }

  /**
   * Marcar todos los campos como tocados
   */
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  /**
   * Obtener mensaje de error para un campo
   */
  getErrorMessage(field: string): string {
    const control = this.gameForm.get(field);

    if (control?.hasError('required')) {
      return 'Este campo es requerido';
    }

    if (control?.hasError('minlength')) {
      const minLength = control.getError('minlength').requiredLength;
      return `Debe tener al menos ${minLength} caracteres`;
    }

    if (control?.hasError('min')) {
      return 'El valor debe ser mayor o igual a 0';
    }

    if (control?.hasError('max')) {
      return 'El valor debe ser menor o igual a 100';
    }

    if (control?.hasError('pattern')) {
      return 'Ingresa una URL válida (debe comenzar con http:// o https://)';
    }

    return '';
  }

  /**
   * Resetear formulario
   */
  resetForm(): void {
    this.gameForm.reset();
    this.successMessage = '';
    this.errorMessage = '';
  }
}
