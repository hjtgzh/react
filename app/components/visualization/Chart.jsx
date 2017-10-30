import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './style.less';
import { switchNavMenu } from '../redux/actions/nav';

const d3 = require('d3');

class Visualization extends Component {
    componentDidMount() {
        this.props.switchNavMenu('4');

        const width = 300;  // 画布的宽度
        const height = 300;   // 画布的高度
        const svg = d3.select('.summary')     // 选择文档中的.summary元素
            .append('svg')          // 添加一个svg元素
            .attr('width', width)       // 设定宽度
            .attr('height', height);    // 设定高度

        const nodes = [{ name: '桂林' }, { name: '广州' },
            { name: '厦门' }, { name: '杭州' },
            { name: '上海' }, { name: '青岛' },
            { name: '天津' }];

        const edges = [{ source: 0, target: 1 }, { source: 0, target: 2 },
            { source: 0, target: 3 }, { source: 1, target: 4 },
            { source: 1, target: 5 }, { source: 1, target: 6 }];
        // console.log(nodes)
        // console.log(edges)

        const colors = d3.scaleOrdinal(d3.schemeCategory10);
        
        const simulation = d3.forceSimulation(nodes)
            .force('charge', d3.forceManyBody())
            .force('link', d3.forceLink(edges))
            .force('center', d3.forceCenter(width / 2, height / 2));

        const node = svg.append('g')
            .selectAll('line')
            .data(nodes)
            .enter()
            .append('circle')
            .attr('r', 10)
            .attr('fill', (d, i) => colors(i))
            .call(d3.drag().on('start', (d) => {
                if (!d3.event.active) simulation.alphaTarget(0.3).restart();
                d.fx = d.x;
                d.fy = d.y;
            })
            .on('drag', (d) => {
                d.fx = d3.event.x;
                d.fy = d3.event.y;
            })
            .on('end', (d) => {
                if (!d3.event.active) simulation.alphaTarget(0);
                d.fx = null;
                d.fy = null;
            }));

        const edge = svg.append('g')
            .selectAll('line')
            .data(edges)
            .enter()
            .append('line')
            .attr('stroke', '#ccc')
            .attr('stroke-width', 1);
        
        // 添加描述节点的文字
        const texts = svg.selectAll('text')
            .data(nodes)
            .enter()
            .append('text')
            .style('fill', 'black')
            .attr('dx', 10)
            .attr('dy', 8)
            .text(d => d.name);
        
        // 力导向图布局 force 有一个事件 tick，每进行到一个时刻，都要调用它，更新的内容就写在它的监听器里就好
        simulation.nodes(nodes)
            .on('tick', () => { // 对于每一个时间间隔
                // 更新连线坐标
                edge.attr('x1', d => d.source.x)
                    .attr('y1', d => d.source.y)
                    .attr('x2', d => d.target.x)
                    .attr('y2', d => d.target.y);
                
                // 更新节点坐标
                node.attr('cx', d => d.x)
                        .attr('cy', d => d.y);

                // 更新文字坐标
                texts.attr('x', d => d.x)
                .attr('y', d => d.y);
            });

        simulation.force('link')
            .links(edges);
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


// 饼图
// import React, { Component } from 'react';
// import { withRouter } from 'react-router';
// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
// import './style.less';
// import { switchNavMenu } from '../redux/actions/nav';

// const d3 = require('d3');

// class Visualization extends Component {
//     componentDidMount() {
//         this.props.switchNavMenu('4');

//         const width = 300;  // 画布的宽度
//         const height = 300;   // 画布的高度
//         const svg = d3.select('.summary')     // 选择文档中的.summary元素
//             .append('svg')          // 添加一个svg元素
//             .attr('width', width)       // 设定宽度
//             .attr('height', height);    // 设定高度

//         // 定义一个数组
//         const dataset = [10, 20, 30, 35, 33, 24, 12, 5];
//         const pie = d3.pie();   // 不能和下面的合并简写
//         const pieData = pie(dataset);
//         console.log(pieData)

//         const arc = d3.arc()    // 弧生成器
//             .innerRadius(0)
//             .outerRadius(100);

//         const arcs = svg.selectAll('g')
//             .data(pieData)
//             .enter()
//             .append('g')
//             .attr('transform', 'translate(150, 150)');

//         const color = d3.scaleOrdinal(d3.schemeCategory10); // 有十种颜色的颜色比例尺

//         arcs.append('path')
//             .attr('fill', (d, i) => color(i))
//             .attr('d', d => arc(d)); // 调用弧生成器，得到路径值
            
//         arcs.append('text')
//             .attr('transform', d => {
//                 console.log(arc.centroid(d))
//                 return `translate(${arc.centroid(d)})`;
//             })
//             .attr('text-anchor', 'middle')
//             .text(d => d.data);
//     }
//     render() {
//         return (
//             <div className="summary" />
//         );
//     }
// }
  
// const mapStateToProps = state => ({ 

// });

// const mapDispatchToProps = dispatch => bindActionCreators({ 
//     switchNavMenu
// }, dispatch);

// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Visualization));