import CardBase from '../game/card-base';

export default class CardGrid extends CardBase {
  textValue: Phaser.GameObjects.Text;
  cardtype: any;
  private _value: any;
  constructor(data) {
    let { value, type } = data;
    super(data);
    this.textValue = new Phaser.GameObjects.Text(this.scene, 0, -53, 'pressstart', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
    this.add(this.textValue);
    this.value = value;
    this.cardtype = type;
  }
  set value(newValue) {
    this._value = newValue;
    this.textValue.text = this._value;
    this.textValue.x = -45;
    this.textValue.tint = 0;
  }
  get value() {
    return this._value;
  }

  set highlighted(highlight) {
    if (highlight) {
      let color = 0xcccc88;
      this.spriteCard.tint = color;
      this.spriteImage.tint = color;
    } else {
      this.spriteCard.tint = 0xffffff;
      this.spriteImage.tint = 0xffffff;
    }
  }
}
