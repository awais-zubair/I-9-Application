import * as React from "react";
import { Component } from "react";
import "../styles/modal.css";
import { ModalProps } from "../props/modal-props";

export default class Modal extends Component<ModalProps> {

    private hide(event: React.MouseEvent): void {
        event.preventDefault();
        this.props.show(false);
    }

    render() {
        if (this.props.visible) {
            return (
                <div className="modal-outer" onClick={(event) => this.hide(event)}>
                    <section className="modal-content">
                        {this.props.children}
                    </section>
                </div>);
        } else {
            return null;
        }
    }

}
