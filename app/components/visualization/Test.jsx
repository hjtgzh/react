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

        // 画布周边的空白
        const padding = { left: 30, right: 30, top: 20, bottom: 20 };

        // 定义一个数组
        const dataset = [10, 20, 30, 40, 33, 24, 12, 5];

        // x轴的比例尺
        const xScale = d3.scaleBand() // 序数比例尺
        .domain(d3.range(dataset.length)) // [0, 1, 2, 3, 4, 5, 6, 7] 数组
        .rangeRound([0, width - padding.left - padding.right]); // [0, 240] 连续域

        // y轴的比例尺
        const yScale = d3.scaleLinear() // 线性比例尺
        .domain([0, d3.max(dataset)]) // [0, 40]
        .range([height - padding.top - padding.bottom, 0]); // [240, 0]

        // 定义x轴
        const xAxis = d3.axisBottom()
            .scale(xScale);
                
        // 定义y轴
        const yAxis = d3.axisLeft()
            .scale(yScale);

        // 矩形之间的空白
        const rectPadding = 4;

        // 添加矩形元素
        const rects = svg.selectAll('.MyRect') // 将要添加的元素
            .data(dataset)
            .enter()
            .append('rect')
            .attr('transform', `translate(${padding.left},${padding.top})`)
            .attr('x', (d, i) => xScale(i) + rectPadding / 2)
            .attr('y', () => {
                const min = yScale.domain()[0];
                return yScale(min);
            })
            // .transition()               // 启动过渡
            // .delay((d, i) => 1000 * i)
            // .duration(1000)
            // .ease(d3.easeLinear)
            // .ease(d3.easeQuadOut)
            .attr('y', d => yScale(d))
            .attr('width', xScale.bandwidth() - rectPadding)
            .attr('height', d => height - padding.top - padding.bottom - yScale(d))
            .attr('fill', '#369')
            .on('mouseover', () => {
                d3.select(d3.event.target)
                    .attr('fill', 'yellow');
            })
            .on('mouseout', () => {
                d3.select(d3.event.target)
                    .transition()
                    .duration(1000)
                    .attr('fill', '#369');
            });
 
        // 添加文字元素
        const texts = svg.selectAll('.MyText')
            .data(dataset)
            .enter()
            .append('text')
            .attr('transform', `translate(${padding.left},${padding.top})`)
            .attr('x', (d, i) => xScale(i))
            .attr('y', d => yScale(d))
            .attr('dx', () => xScale.bandwidth() / 2 - rectPadding * 2)
            .attr('dy', () => 20)
            .text(d => d);
            
        // 添加x轴
        svg.append('g')
            .attr('class', 'axis')
            .attr('transform', `translate(${padding.left},${height - padding.bottom})`)
            .call(xAxis); 
            
        // 添加y轴
        svg.append('g')
            .attr('class', 'axis')
            .attr('transform', `translate(${padding.left},${padding.top})`)
            .call(yAxis);
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