import { title } from 'process';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './products-form.component.html',
  styleUrl: './products-form.component.scss',
})
export class ProductsFormComponent implements OnChanges {
  @Input() isAction: boolean = false;
  @Input() itemId: string = '';
  @Input() itemName: string = '';
  @Output() newItemEvent = new EventEmitter<{ id?: string; title: string }>();

  productForm!: FormGroup;

  constructor() {
    this.productForm = new FormGroup({
      title: new FormControl('', Validators.required),
    });
  }

  ngOnChanges(data: SimpleChanges): void {
    if (data['itemName'] && data['itemName'].currentValue !== undefined) {
      this.productForm.patchValue({
        title: this.itemName,
      });
    }
  }

  onSubmit() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    if (this.isAction && this.itemId) {
      this.newItemEvent.emit({
        id: this.itemId,
        title: this.productForm.value.title,
      });
    } else {
      this.newItemEvent.emit({
        title: this.productForm.value.title,
      });
    }
    this.productForm.reset();
  }
}
