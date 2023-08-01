import { Renderer } from "../renderer"
import { PageSnapshot } from "./page_snapshot"

export class PartialPageRenderer extends Renderer<HTMLBodyElement, PageSnapshot> {
  get shouldRender() {
    return this.newSnapshot.isVisitable
  }

  async render() {
    if (this.willRender) {
      await this.replaceElements()
    }
  }

  get newElement() {
    return this.newSnapshot.element
  }

  async replaceElements() {
    await this.preservingPermanentElements(async () => {
      Array.from(this.newElement.children).map((newElement) => {
        const currentElement = document.getElementById(newElement.id)
        if (currentElement instanceof HTMLElement && newElement instanceof HTMLElement) {
          currentElement.replaceWith(newElement)
        }
      })
    })
  }
}
