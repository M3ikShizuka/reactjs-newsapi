import React from "react";
import "./LoadingBlock.scss";

class LoadingBlock extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div styleName="loading-block">
                <div styleName="loading-info">
                    <h4>{this.props.title}</h4>
                    <p>{this.props.subTitle}</p>
                </div>
                <img styleName="loading-img" src={this.props.image}/>
            </div>
        );
    }
}

export default LoadingBlock;