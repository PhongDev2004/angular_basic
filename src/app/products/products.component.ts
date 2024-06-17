import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  @Input() items: any[] = [];
  @Output() emitID = new EventEmitter<{ itemId?: string; action: string }>();

  handleEditProduct(id: string) {
    this.emitID.emit({ itemId: id, action: 'edit' });
  }
  handleDeleteProduct(id: string) {
    this.emitID.emit({ itemId: id, action: 'delete' });
  }
}
