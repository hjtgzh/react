import React, { Component } from 'react';
import d3Chart from 'd3';

export default class Chart extends Component {
    componentDidMount() {
        const el = document.querySelector('#chart');
        d3Chart.create(el, {
            width: '100%',
            height: '300px'
        }, this.getChartState());
    }

    componentDidUpdate() {
        const el = document.querySelector('#chart');
        d3Chart.update(el, this.getChartState());
    }

    getChartState() {
        return {
            data: this.props.data,
            domain: this.props.domain
        };
    }

    componentWillUnmount() {
        const el = document.querySelector('#chart');
        d3Chart.destroy(el);
    }

    render() {
        return (
            <div id="chart"/>
        );
    }
}