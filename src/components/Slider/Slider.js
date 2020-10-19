import React, { useState } from 'react';
import Img from 'gatsby-image';

import cS from './Slider.module.scss';
import './SliderColors.scss';

// TODO Height of banner should be same for all slider
export default ({ blockData }) => {
    const [activeIndex, setActiveIndex] = useState(1);
    const [controlsColor, setControlsColor] = useState('white');

    const goToSlide = (e) => {
        e.preventDefault();
        setActiveIndex(parseInt(e.target.value));
        getSliderColor(parseInt(e.target.value));
    }

    const goToPrevSlide = (e) => {
        e.preventDefault();

        const numberOfSlides = blockData.length;
        let prevSliderNumber = activeIndex - 1;

        if (prevSliderNumber < 1) {
            prevSliderNumber = numberOfSlides;
        }

        setActiveIndex(prevSliderNumber);
        getSliderColor(prevSliderNumber);
    }

    const goToNextSlide = (e) => {
        e.preventDefault();

        const numberOfSlides = blockData.length;
        let nextSliderNumber = activeIndex + 1;

        if (nextSliderNumber > numberOfSlides) {
            nextSliderNumber = 1;
        }

        setActiveIndex(nextSliderNumber);
        getSliderColor(nextSliderNumber);
    }


    const getSliderColor = (currentSld) => {

        const currentSlider = blockData.find((slider, index) => (
            (index + 1) === currentSld
        ));

        if (currentSlider) {
            setControlsColor(currentSlider.ControlsColor.toLowerCase());
        }

    }

    return (
        < section className={cS.slider} >
            <a href='/' className={`${cS.slider__arrow} ${controlsColor}`} onClick={goToPrevSlide} rel='nofollow' title='Previous slide' aria-label='Previous slide'>
                <span className="visualHidden">Previous slide</span>
            </a>
            <a href='/' className={`${cS.slider__arrow} ${cS.slider__arrow__next} ${controlsColor}`} onClick={goToNextSlide} rel='nofollow' title='Next slide' aria-label='Next slide'>
                <span className="visualHidden">Next slide</span>
            </a>
            {
                blockData.map((slider, index) => (
                    <div key={`slider--${slider.id}`} className={(index + 1) === activeIndex ? `${cS.slider__slide} ${cS.active} ${cS.active}--${index}` : cS.slider__slide} >

                        <Img fluid={slider.SliderImg.childImageSharp.fluid} className={cS.img} loading="eager" />

                        <div className={cS.text}>
                            <h2 className={cS.text__title}>{slider.Title}</h2>
                            <p className={cS.text__perex}>{slider.Text}</p>
                        </div>
                    </div>
                ))
            }

            <div className={`${cS.nav} ${controlsColor}`}>
                {blockData.map((slider, index) => (
                    <button
                        key={`slider-nav--${(index + 1)}`}
                        className={(index + 1) === activeIndex ? `${cS.nav__circle} ${cS.nav__circle__active} active` : cS.nav__circle}
                        onClick={goToSlide}
                        value={(index + 1)}
                        aria-label={`Go to slide ${(index + 1)}`}>
                    </button>
                ))}
            </div>
        </section >

    )
};