import {Component, Input, HostBinding, OnInit} from '@angular/core'
import {DomSanitizer} from '@angular/platform-browser'
import {ok} from 'rambdax'

interface TopLeft {
  x: number,
  y: number,
}

@Component({
  selector: 'cell',
  templateUrl: './cell.component.html',
})
export class CellComponent implements OnInit {
  @Input() debug: boolean
  @Input() width: number
  @Input() height: number
  @Input() topLeft: TopLeft
  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    ok(this.width, this.height, this.topLeft)(Number, Number, {
      x: Number,
      y: Number,
    })
  }
  @HostBinding('style.grid-row')
  get gridRow() {
    return this.sanitizer.bypassSecurityTrustStyle(
      `${this.topLeft.y + 1} / span ${this.height}`
    )
  }
  @HostBinding('style.grid-column')
  get gridColumn() {
    return this.sanitizer.bypassSecurityTrustStyle(
      `${this.topLeft.x + 1} / span ${this.width}`
    )
  }
  @HostBinding('style.outline')
  get outlineCell() {
    return this.debug ? '2px solid green' : null
  }
  @HostBinding('style.border')
  get borderCell() {
    return this.debug ? '2px solid red' : null
  }
}
