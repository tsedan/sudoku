import React from 'react';
import './App.css';

const Modal = props => {
  return (
    <div className="modal">
      <div className="modal-content" id="modalContent">
        <table>
          <tbody>
            <tr>
              <td className="optionData"><span className="buttonEvents">1</span></td>
              <td className="optionData"><span className="buttonEvents">2</span></td>
              <td className="optionData"><span className="buttonEvents">3</span></td>
              <td className="optionData"><span className="buttonEvents">4</span></td>
              <td className="optionData"><span className="buttonEvents">5</span></td>
              <td className="optionData"><span className="buttonEvents">6</span></td>
              <td className="optionData"><span className="buttonEvents">7</span></td>
              <td className="optionData"><span className="buttonEvents">8</span></td>
              <td className="optionData"><span className="buttonEvents">9</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Modal;
