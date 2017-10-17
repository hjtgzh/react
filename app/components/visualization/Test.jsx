import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './style.less';
import { switchNavMenu } from '../redux/actions/nav';

const d3 = require('d3');

class Visualization extends Component {
    componentDidMount() {
        this.props.switchNavMenu('3');

        const width = 300;  // 画布的宽度
        const height = 300;   // 画布的高度
        const svg = d3.select('.summary')     // 选择文档中的.summary元素
            .append('svg')          // 添加一个svg元素
            .attr('width', width)       // 设定宽度
            .attr('height', height);    // 设定高度

        const dataset = [2.5, 2.1, 1.7, 1.3, 0.9, 0.4];
        const linear = d3.scaleLinear()
            .domain([0, d3.max(dataset)])
            .range([0, 250]);
        const axis = d3.axisBottom(20)
            .ticks(5)          // 指定刻度的数量
            .scale(linear);      // 指定比例尺            
        svg.append('g')
            .attr('transform', `translate(${20},${200})`) // 指定刻度的位置
            .call(axis);
        const rectHeight = 25;   // 每个矩形所占的像素高度(包括空白)
        svg.selectAll('rect')
           .data(dataset)
           .enter()
           .append('rect')
           .attr('x', 20)
           .attr('y', (d, i) => (i + 1) * rectHeight)
           .attr('width', d => linear(d))
           .attr('height', rectHeight - 2)
           .attr('fill', 'steelblue');
    }
    render() {
        return (
            <div className="summary" />
        );
    }
}
  
const mapStateToProps = state => ({ 

});

const mapDispatchToProps = dispatch => bindActionCreators({ 
    switchNavMenu
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Visualization));