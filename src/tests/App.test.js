import 'jsdom-global/register';
import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import TestUtils from 'react-addons-test-utils';
import { shallow, mount } from 'enzyme';
import expect, { createSpy, spyOn, isSpy } from 'expect';

describe('Component: App', () => {

    //Smoke test
    it('displays the correct title', () => {
        let wrapper = shallow(<App />);
        let title = wrapper.find('h2');
        expect(title.text()).toBe("PhoneBook.io");
    });
});



