import React from 'react';
import './404.scss';
import nothingImg from '../static/img/Yuru-Yuri Kyouko Toshinou its-fucking-nothing.svg';

function NotFound() {
  return (
    <div className="wrapper">
        {/* <img className="nothing" src={nothingImg}/> */}
        <object class="nothing" type="image/svg+xml" data={nothingImg}></object>
    </div>
  );
}

export default NotFound;