import 'jsdom-global/register';
import React from 'react';
import ReactDOM from 'react-dom';
import Alerts from '../components/Alerts';
import TestUtils from 'react-addons-test-utils';
import { shallow, mount } from 'enzyme';
import expect, { createSpy, spyOn, isSpy } from 'expect';

describe('Component: Alerts', () => {

    it('displays an error message', () => {
        let alerts = [{
            "type": "failed",
            "text": "testing error message"
        }]

        let wrapper = shallow(<Alerts alerts={alerts} />);
        expect(wrapper.find('.error-msg').length).toBe(1);
        let message = wrapper.find('.msg-content');
        expect(message.text()).toBe("testing error message");
    });

    it('displays a success message', () => {
        let alerts = [{
            "type": "success",
            "text": "testing success message"
        }]

        let wrapper = shallow(<Alerts alerts={alerts} />);
        expect(wrapper.find('.success-msg').length).toBe(1);
        let message = wrapper.find('.msg-content');
        expect(message.text()).toBe("testing success message");
    });

    // it('is dismissable', () => {
    //     let alerts = [{
    //         "type": "success",
    //         "text": "testing success message"
    //     }]

    //     let wrapper = mount(<Alerts alerts={alerts} />);
    //     let dimissButton = wrapper.find('.dismiss');
    //     console.log(dimissButton.debug());
    //     dimissButton.simulate('click');

    //     console.log(wrapper.debug());
    //     expect(wrapper.find('.success-msg').length).toBe(0);
    // });

});



