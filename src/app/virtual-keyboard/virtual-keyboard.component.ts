import { Component, Input, Output, EventEmitter } from '@angular/core';
import Keyboard from 'simple-keyboard';

@Component({
  selector: 'app-virtual-keyboard',
  templateUrl: './virtual-keyboard.component.html',
  styleUrls: ['./virtual-keyboard.component.scss']
})
export class VirtualKeyboardComponent {
  @Input() activeField: string = ''; // השדה הפעיל
  @Output() inputChanged = new EventEmitter<{ field: string, value: string }>(); // נשלח את הקלט חזרה למרכיב ההורה

  keyboard!: Keyboard;
  inputValue: string = ''; // ערך הקלט הנוכחי

  ngAfterViewInit() {
    this.keyboard = new Keyboard({
      onChange: input => this.onInputChange(input),
      layout: {
        default: [
          "0 1 2 3 4 5 6 7 8 9 /",
          "ק ר א ט ו ן ם פ",
          "ש ד ג כ ע י ח ל ך ף",
          "ז ס ב ה נ מ צ ת ץ {bksp}",
          "{space}"
        ],
        shift: [
          "! @ # $ % ^ & * ( ) _ +",
          "ש ד ג כ ע י ח ל ך ף",
          "ז ס ב ה נ מ צ ת ץ {bksp}",
          "{space}"
        ]
      },
      display: {
        "{bksp}": "⌫",
        "{space}": "⎵"
      },
      rtl: true // טקסט מימין לשמאל
    });
  }

  // עדכון הערך של השדה כאשר יש שינוי במקלדת
  onInputChange(input: string) {
    this.inputValue = input;
    this.inputChanged.emit({ field: this.activeField, value: input }); // שולחים את הקלט למרכיב ההורה
  }

  // כאשר המשתמש מקליד בתוך שדה טקסט, מעדכנים את המקלדת עם הערך החדש
  setInputValue(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    this.keyboard.setInput(input);
  }
}
