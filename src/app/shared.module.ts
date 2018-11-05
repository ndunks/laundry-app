import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule, MatIconModule, MatInputModule, MatFormFieldModule, MatListModule, MatMenuModule, MatToolbarModule } from "@angular/material";


@NgModule({
    imports: [
      CommonModule,
      ReactiveFormsModule,
      MatButtonModule,
      MatIconModule,
      MatInputModule,
      MatFormFieldModule,
      MatListModule,
      MatMenuModule,
      MatToolbarModule
    ],
    exports: [
        CommonModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatFormFieldModule,
        MatListModule,
        MatMenuModule,
        MatToolbarModule
      ]
  })
export class SharedModule {}