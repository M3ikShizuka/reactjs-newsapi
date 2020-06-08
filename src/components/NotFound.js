import React from 'react';
import './404.scss';
import nothingImg from '../assets/img/Yuru-Yuri Kyouko Toshinou its-fucking-nothing.svg';

function NotFound() {
  return (
    <div styleName="wrapper">
        {/* <img styleName="nothing" src={nothingImg}/> */}
        <object className="nothing" type="image/svg+xml" data={nothingImg}></object>
    </div>
  );
}

export default NotFound;