import React from 'react';
import { createContainer } from '../../../__testDoubles__/domManipulators';

import { Time } from '../Time/Time';

describe('Time', () => {
    let container, render;

    beforeEach(() => {
        ({ container, render } = createContainer())
    });

    it('render time tag', () => {
        const today = new Date(2020, 9, 22);

        render(<Time timeString={today} />);

        expect(container.querySelector('time')).not.toBeNull();
    });

    it('render empty time tag when there is no param', () => {
        render(<Time />);

        expect(container.querySelector('time')).toBeNull();
    });

    it('render date in time tag', () => {
        const today = new Date(2020, 9, 22);

        render(<Time timeString={today} />);

        expect(container.querySelector('time').textContent).toEqual('22. 10. 2020');
    });


    it('render diferent date in time tag', () => {
        const today = new Date(2020, 10, 6);

        render(<Time timeString={today} />);

        expect(container.querySelector('time').textContent).toEqual('6. 11. 2020');
    });


    it('render January date in time tag', () => {
        const today = new Date(2020, 0, 1);

        render(<Time timeString={today} />);

        expect(container.querySelector('time').textContent).toEqual('1. 1. 2020');
    });
});