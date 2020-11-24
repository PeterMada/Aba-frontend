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
});