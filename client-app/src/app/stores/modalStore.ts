/* The ModalStore class is a MobX store that manages the state of a modal, allowing it to be opened and
closed with different content. */
import { makeAutoObservable } from "mobx";

interface Modal {
  open: boolean;
  body: JSX.Element | null;
}
//use modeal store for popup Modal
export default class ModalStore {
  modal: Modal = {
    open: false,
    body: null,
  };
  constructor() {
    makeAutoObservable(this);
  }
  openModal = (content: JSX.Element) => {
    this.modal.open = true;
    this.modal.body = content;
  };
  closeModal = () => {
    this.modal.open = false;
    this.modal.body = null;
  };
}
