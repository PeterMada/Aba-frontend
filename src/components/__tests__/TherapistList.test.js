import React from 'react';
import { createContainer } from '../../../__testDoubles__/domManipulators';
import { TherapistList } from '../TherapistList/TherapistList'

describe('TherapistList', () => {
    let container, render;

    beforeEach(() => {
        ({ render, container } = createContainer());
    });

    it('render article', () => {
        render(<TherapistList />);

        expect(container.querySelector('article')).not.toBeNull();
    });

    it.skip('render a link to article', () => {

        render(<TherapistList />);

        expect(container.querySelector('article a')).not.toBeNull();
        expect(container.querySelector('article a').href.textContent).not.toBeNull();
        expect(container.querySelector('article a').href.textContent).not.toBeUndefined();
    })
});