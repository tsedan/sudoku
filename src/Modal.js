import React from 'react';
import KeyHandler, { KEYPRESS } from 'react-key-handler';
import './App.css';

const Modal = props => {
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
              <td className="optionData" onClick={() => { props.handleAddNum(0) }}><span className="buttonEvents">&#10006;</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Modal;
