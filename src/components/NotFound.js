import React from 'react';
import './404.scss';
import nothingImg from '../assets/img/Yuru-Yuri Kyouko Toshinou its-fucking-nothing.svg';

function NotFound() {
  return (
    <main styleName="main_notfound">
      <div styleName="wrapper_notfound">
          {/* <img styleName="nothing" src={nothingImg}/> */}
          <object className="nothing" type="image/svg+xml" data={nothingImg}></object>
      </div>
    </main>
  );
}

export default NotFound;