import React from "react";
import ApngComponent from 'react-apng';
import LoadingBlock from './LoadingBlock';
import imageLoading from '../assets/img/rem-loading.png';
import imageNothing from '../assets/img/shinjionchair.png';
import imageNoMore from '../assets/img/kyouko-its-fucking-nothing.png';

const MessagesBlocks = {
    messageLoading: () => {
        return (
            <LoadingBlock
                title="Loading."
                subTitle="ロード中。。。"
                image={imageLoading}
            />
        );
    },

    messageEndNothingFound: () => {
        return (
            <LoadingBlock
                title="Nothing here."
                subTitle="ここは終わり。"
                image={imageNothing}
            />
        );
    },

    messageEndNoMoreItems: () => {
        return (
            <LoadingBlock
                title="That's All Folks!"
                subTitle="(ﾉ>_<)ﾉ"
                image={imageNoMore}
            />
        );
    }
}

export default MessagesBlocks;