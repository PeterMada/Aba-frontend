import React from 'react';

import cS from './VerticalGallery.module.scss';

export default ({ blockData }) => {
    return (
        <div className={cS.wrap}>
            {blockData.map((element, index) => (
                <img key={`verticalImg-${index}`} className={cS.img} src={`TODO/${element.url}`} />
            ))}
        </div>
    )
}