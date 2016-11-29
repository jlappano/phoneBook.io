import 'jsdom-global/register';
import React from 'react';
import ReactDOM from 'react-dom';
import ContactForm from '../components/ContactForm';
import TestUtils from 'react-addons-test-utils';
import { shallow, mount } from 'enzyme';
import expect, { createSpy, spyOn, isSpy } from 'expect';

//Smoke test
it('displays the correct title', () => {
    let wrapper = shallow(<ContactForm />);
    let title = wrapper.find('h4');
    expect(title.text()).toBe("New Contact");
});

it('displays the default phone information of the United States', () => {
    let wrapper = shallow(<ContactForm />);
    let countryInput = wrapper.find('#countryInput');
    expect(countryInput.props().defaultValue).toBe("United States");

    let phoneInput = wrapper.find('#phoneInput');
    expect(phoneInput.props().defaultValue).toBe("+1");
});

it('validates empty inputs with a red border', () => {
    let wrapper = mount(<ContactForm />);
    wrapper.find({ type: "submit" }).simulate('click');

    expect(wrapper.ref('name').hasClass('required')).toBe(true);
    expect(wrapper.ref('context').hasClass('required')).toBe(true);
});

it('validates empty inputs with an error message', () => {
    let wrapper = mount(<ContactForm />);
    wrapper.find({ type: "submit" }).simulate('click');
    expect(wrapper.find('.error-msg').length).toBe(1);
});



