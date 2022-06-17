export enum CONTROL_BUTTON_STATES {
  SETUP = 0,
  PLAY = 1,
  STOP = 2
}

export class ControlButton {
  private _elem: HTMLButtonElement

  set stage (v: number) {
    this._elem.dataset.stage = '' + v
  }

  get stage (): number {
    //TODO: Handle internally?
    const elemStage = this._elem.dataset.stage || '-1'
    const stage = parseInt(elemStage, 10)

    if (isNaN(stage)) {
      return -1
    }

    return stage
  }

  set onclick (v: ((ev: MouseEvent) => unknown) | null) {
    this._elem.onclick = v
  }

  get onclick () {
    return this._elem.onclick
  }

  constructor (elem: HTMLButtonElement) {
    this._elem = elem
  }

  focus (): void {
    this._elem.focus()
  }

  setIcon (state: CONTROL_BUTTON_STATES) {
    switch (state) {
      case CONTROL_BUTTON_STATES.SETUP:
        this._elem.textContent = '◉'
        break;
      case CONTROL_BUTTON_STATES.PLAY:
        this._elem.textContent = '▷'
        break
      case CONTROL_BUTTON_STATES.STOP:
        this._elem.textContent = '▧'
        break
      default:
        break;
    }
  }
}
