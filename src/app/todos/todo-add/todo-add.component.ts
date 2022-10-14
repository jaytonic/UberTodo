import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.scss']
})
export class TodoAddComponent implements OnInit {
  @Output()
  newTodoEvent = new EventEmitter<string>();

  form = this.fb.group({
    description: [
      '',
      Validators.compose([Validators.required, Validators.minLength(3)]),
    ],
  });
  constructor(private fb: UntypedFormBuilder) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.form.valid) {
      this.newTodoEvent.emit(this.form.value.description);
      this.form.reset();
    }
  }

}
