import React from 'react';
import KeyHandler, { KEYPRESS } from 'react-key-handler';
import './App.css';

const Modal = props => { //352 512
  return (
    <div className="modal">
      <KeyHandler
        keyEventName={KEYPRESS}
        keyValue="1"
        onKeyHandle={() => { props.handleAddNum(1) }}
      />
      <KeyHandler
        keyEventName={KEYPRESS}
        keyValue="2"
        onKeyHandle={() => { props.handleAddNum(2) }}
      />
      <KeyHandler
        keyEventName={KEYPRESS}
        keyValue="3"
        onKeyHandle={() => { props.handleAddNum(3) }}
      />
      <KeyHandler
        keyEventName={KEYPRESS}
        keyValue="4"
        onKeyHandle={() => { props.handleAddNum(4) }}
      />
      <KeyHandler
        keyEventName={KEYPRESS}
        keyValue="5"
        onKeyHandle={() => { props.handleAddNum(5) }}
      />
      <KeyHandler
        keyEventName={KEYPRESS}
        keyValue="6"
        onKeyHandle={() => { props.handleAddNum(6) }}
      />
      <KeyHandler
        keyEventName={KEYPRESS}
        keyValue="7"
        onKeyHandle={() => { props.handleAddNum(7) }}
      />
      <KeyHandler
        keyEventName={KEYPRESS}
        keyValue="8"
        onKeyHandle={() => { props.handleAddNum(8) }}
      />
      <KeyHandler
        keyEventName={KEYPRESS}
        keyValue="9"
        onKeyHandle={() => { props.handleAddNum(9) }}
      />
      <KeyHandler
        keyEventName={KEYPRESS}
        keyValue="0"
        onKeyHandle={() => { props.handleAddNum(0) }}
      />
      <div className="modal-content" id="modalContent">
        <table>
          <tbody>
            <tr>
              <td className="optionData" onClick={() => { props.handleAddNum(1) }}><span className="buttonEvents">1</span></td>
              <td className="optionData" onClick={() => { props.handleAddNum(2) }}><span className="buttonEvents">2</span></td>
              <td className="optionData" onClick={() => { props.handleAddNum(3) }}><span className="buttonEvents">3</span></td>
              <td className="optionData" onClick={() => { props.handleAddNum(4) }}><span className="buttonEvents">4</span></td>
              <td className="optionData" onClick={() => { props.handleAddNum(5) }}><span className="buttonEvents">5</span></td>
              <td className="optionData" onClick={() => { props.handleAddNum(6) }}><span className="buttonEvents">6</span></td>
              <td className="optionData" onClick={() => { props.handleAddNum(7) }}><span className="buttonEvents">7</span></td>
              <td className="optionData" onClick={() => { props.handleAddNum(8) }}><span className="buttonEvents">8</span></td>
              <td className="optionData" onClick={() => { props.handleAddNum(9) }}><span className="buttonEvents">9</span></td>
              <td className="optionData" onClick={() => { props.handleAddNum(0) }}><span className="buttonEvents">
                <svg aria-hidden="true" data-prefix="fas" data-icon="times" className="svg-inline--fa fa-times fa-w-11" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="-130 -60 600 600"><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg>
              </span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Modal;
