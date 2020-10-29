import React, { useState } from 'react';
import BackgroundImage from 'gatsby-background-image';

import MaxWidthWrap from './../MaxWidthWrap/MaxWidthWrap';

import remark from 'remark';
import recommended from 'remark-preset-lint-recommended';
import remarkHtml from 'remark-html';

import cS from './TextOnSlider.module.scss';

export default ({ blockData, backgroundData }) => {
    const [activeIndex, setActiveIndex] = useState(1);


    const goToSlide = (e) => {
        e.preventDefault();
        setActiveIndex(parseInt(e.target.value));
    }

    const goToPrevSlide = (e) => {
        e.preventDefault();
        const numberOfSlides = blockData.length;
        let prevSliderNumber = activeIndex - 1;

        if (prevSliderNumber < 1) {
            prevSliderNumber = numberOfSlides;
        }

        setActiveIndex(prevSliderNumber);
    }

    const goToNextSlide = (e) => {
        e.preventDefault();
        const numberOfSlides = blockData.length;
        let nextSliderNumber = activeIndex + 1;

        if (nextSliderNumber > numberOfSlides) {
            nextSliderNumber = 1;
        }

        setActiveIndex(nextSliderNumber);
    }
    return (
        <>
            <BackgroundImage
                //className={cS.img}
                fluid={backgroundData.childImageSharp.fluid}
            //backgroundColor={`#040e18`}
            //style={{ backgroundAttachment: `fixed` }}
            >
                <div className={cS.textOuter}>
                    <div className={`${cS.textInner} ${cS.slider}`}>

                        {blockData.length > 1 &&
                            <>
                                <a href='/' className={cS.slider__arrow} onClick={goToPrevSlide} rel='nofollow' title='Previous slide' aria-label='Previous slide'>
                                    <span className="visualHidden">Previous slide</span>
                                </a>
                                <a href='/' className={`${cS.slider__arrow} ${cS.slider__arrow__next}`} onClick={goToNextSlide} rel='nofollow' title='Next slide' aria-label='Next slide'>
                                    <span className="visualHidden">Next slide</span>
                                </a>
                            </>
                        }

                        <div className={cS.sliderWrap}>
                            {blockData.map((slider, index) => (
                                <div key={index} className={(index + 1) === activeIndex ? `${cS.slider__slide} ${cS.active}` : cS.slider__slide}>
                                    {slider.ShowTitle &&
                                        <h2 className={cS.title}>{slider.Title}</h2>
                                    }


                                    <div
                                        className={cS.text}
                                        dangerouslySetInnerHTML={{ __html: remark().use(recommended).use(remarkHtml).processSync(slider.Text).toString() }}>
                                    </div>

                                    {slider?.TextUnder?.length > 0 &&
                                        <p className={cS.textUnder}>{slider.TextUnder}</p>
                                    }
                                </div>
                            ))}
                        </div>

                    </div>

                    {blockData.length > 1 &&
                        <div className={cS.nav}>
                            {blockData.map((slider, index) => (
                                <button
                                    key={`slider-nav--${(index + 1)}`}
                                    className={(index + 1) === activeIndex ? `${cS.nav__circle} ${cS.nav__circle__active}` : cS.nav__circle}
                                    onClick={goToSlide}
                                    value={(index + 1)}
                                    aria-label={`Go to slide ${(index + 1)}`}>
                                </button>
                            ))}
                        </div>
                    }
                </div>
            </BackgroundImage>
        </>
    )
}