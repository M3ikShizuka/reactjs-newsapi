import React from 'react';
import Moment from 'react-moment';
import LoadingBlock from "./LoadingBlock";
import './ArticleBlockItem.scss';
import imageLoading from '../assets/img/rem-loading.png';

function ArticleBlockItem(props) {
	let article = props.article;
    const calendarStrings = {
        lastDay : '[Yesterday at] LT',
        sameDay : '[Today at] LT',
        nextDay : '[Tomorrow at] LT',
        lastWeek : '[last] dddd [at] LT',
        nextWeek : 'dddd [at] LT',
        sameElse : 'YYYY-MM-DD HH:mm:ss'
    };

	return (
		<div styleName="article-block">
			<div styleName="article-image-block">
					{
						(() => {
							if (article.urlToImage === null) {
								return(
									<LoadingBlock
										title="No image"
										subTitle="Just because it doesn't exist"
										image={imageLoading}
									/>
								);
							}
							else if (
								article.urlToImage[0] === '$' &&
								article.urlToImage[1] === '{'
								) {
								return(
									<LoadingBlock
										title="No image"
										subTitle="Cause newsapi fucked up。"
										image={imageLoading}
									/>
								);
							}
							else {
								return(
									<img src={article.urlToImage}/>
								);
							}
						})()
					}
			</div>
			<div styleName="article-info-block">
				<h2>{article.title}</h2>
				<p>{article.description}</p>
				<div styleName="article-info">
					<p>{article.author}</p>
					<p>
                        <Moment
                            calendar={calendarStrings}
                        //  format='YYYY-MM-DD HH:mm:ss'
                         >
                            {article.publishedAt}
                        </Moment>
                    </p>
				</div>
			</div>
		</div>  
	);
}

export default ArticleBlockItem;

/*
"articles": [
	{
"source": {
"id": "the-washington-post",
"name": "The Washington Post"
},
"author": "Dana Hedgpeth",
"title": "Live updates: D.C. protesters push back against Trump’s show of federal force; fifth day of protests mostly peaceful - The Washington Post",
"description": "See the latest on protests in Washington on the police-involved killing of George Floyd in Minneapolis.",
"url": "https://www.washingtonpost.com/dc-md-va/2020/06/03/dc-protest-george-floyd-white-house/",
"urlToImage": "https://www.washingtonpost.com/wp-apps/imrs.php?src=https://d1i4t8bqe7zgj6.cloudfront.net/06-03-2020/t_9f1198c306164ff2a1737275866fe20f_name_Clip0057_MXF_16_05_09_25_Still001.jpg&w=1440",
"publishedAt": "2020-06-03T10:44:57Z",
"content": "When a protester lit a flag on fire at the White House long after curfew took effect, another protester beat out the flames with her hands. Ebony Chantelle Sherman became worried when other proteste… [+2488 chars]"
},
*/