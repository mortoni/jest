import React from 'react';
import App from './App';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new EnzymeAdapter() });
/**
 * Factory function to create a ShallowWrapper for the app component
 * @function
 * @param {object} props - Component props specific to this setup
 * @param {object} state - Initial state for setup.
 * @returns {ShallowWrapper}
 */
const setup = (props={}, state=null) => {
    const wrapper = shallow(<App {...props}/>);
    if(state) wrapper.setState(state);
    return wrapper;
}

/**
 * Return ShallowWrapper containing node(s) with the give data-test at value.
 * @function
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper to search within.
 * @param {string} val - Value of data-test attribute for search.
 * @returns {ShallowWrapper}
 */
const findByTestAttr = (wrapper, val) => {
    return  wrapper.find(`[data-test="${val}"]`);
}

it('renders without crashing', () => {
    const wrapper = setup();
    const appComponent = findByTestAttr(wrapper, 'component-app');
    expect(appComponent.length).toBe(1);
});

it('renders increments button', () => {
    const wrapper = setup();
    const button = findByTestAttr(wrapper, 'increment-button');
    expect(button.length).toBe(1);
});

it('renders counter display', () => {
    const wrapper = setup();
    const counterDisplay = findByTestAttr(wrapper, 'counter-display');
    expect(counterDisplay.length).toBe(1);
});

it('counter starts at 0', () => {
    const wrapper = setup();
    const initialCounterState = wrapper.state('counter');
    expect(initialCounterState).toBe(0);
});

it('clicking button increments counter', () => {
    const counter = 7;
    const wrapper = setup(null, { counter });

    // find button and click
    const button = findByTestAttr(wrapper, 'increment-button');
    button.simulate('click');
    wrapper.update();

    // find display and test value
    const counterDisplay = findByTestAttr(wrapper, 'counter-display');
    expect(counterDisplay.text()).toContain(counter + 1);
});

it('clicking button decrement counter', () => {
    const counter = 7;
    const wrapper = setup(null, { counter });

    // find button and click
    const button = findByTestAttr(wrapper, 'decrement-button');
    button.simulate('click');
    wrapper.update();

    // find display and test value
    const counterDisplay = findByTestAttr(wrapper, 'counter-display');
    expect(counterDisplay.text()).toContain(counter - 1);
});

it('clicking button decrement to no count bellow 0', () => {
    const counter = 0;
    const wrapper = setup(null, { counter });

    // find button and click
    const button = findByTestAttr(wrapper, 'decrement-button');
    button.simulate('click');
    wrapper.update();

    // find display and test value
    const counterDisplay = findByTestAttr(wrapper, 'counter-display');
    expect(counterDisplay.text()).toContain(counter);
});
