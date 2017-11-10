// 4、集群图（Chord）
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

        const data = [
            { id: 'flare', value: '' },
            { id: 'flare.analytics', value: '' },
            { id: 'flare.analytics.cluster', value: '' },
            { id: 'flare.analytics.cluster.AgglomerativeCluster', value: '3938' },
            { id: 'flare.analytics.cluster.CommunityStructure', value: '3812' },
            { id: 'flare.analytics.cluster.HierarchicalCluster', value: '6714' },
            { id: 'flare.analytics.cluster.MergeEdge', value: '743' },
            { id: 'flare.analytics.graph', value: '' },
            { id: 'flare.analytics.graph.BetweennessCentrality', value: '3534' },
            { id: 'flare.analytics.graph.LinkDistance', value: '5731' },
            { id: 'flare.analytics.graph.MaxFlowMinCut', value: '7840' },
            { id: 'flare.analytics.graph.ShortestPaths', value: '5914' },
            { id: 'flare.analytics.graph.SpanningTree', value: '3416' },
            // { id: 'flare.analytics.optimization', value: '' },
            // { id: 'flare.analytics.optimization.AspectRatioBanker', value: '7074' },
            // { id: 'flare.animate', value: '' },
            // { id: 'flare.animate.Easing', value: '17010' },
            // { id: 'flare.animate.FunctionSequence', value: '5842' },
            // { id: 'flare.animate.interpolate', value: '' },
            // { id: 'flare.animate.interpolate.ArrayInterpolator', value: '1983' },
            // { id: 'flare.animate.interpolate.ColorInterpolator', value: '2047' },
            // { id: 'flare.animate.interpolate.DateInterpolator', value: '1375' },
            // { id: 'flare.animate.interpolate.Interpolator', value: '8746' },
            // { id: 'flare.animate.interpolate.MatrixInterpolator', value: '2202' },
            // { id: 'flare.animate.interpolate.NumberInterpolator', value: '1382' },
            // { id: 'flare.animate.interpolate.ObjectInterpolator', value: '1629' },
            // { id: 'flare.animate.interpolate.PointInterpolator', value: '1675' },
            // { id: 'flare.animate.interpolate.RectangleInterpolator', value: '2042' },
            // { id: 'flare.animate.ISchedulable', value: '1041' },
            // { id: 'flare.animate.Parallel', value: '5176' },
            // { id: 'flare.animate.Pause', value: '449' },
            // { id: 'flare.animate.Scheduler', value: '5593' },
            // { id: 'flare.animate.Sequence', value: '5534' },
            // { id: 'flare.animate.Transition', value: '9201' },
            // { id: 'flare.animate.Transitioner', value: '19975' },
            // { id: 'flare.animate.TransitionEvent', value: '1116' },
            // { id: 'flare.animate.Tween', value: '6006' },
            // { id: 'flare.data', value: '' },
            // { id: 'flare.data.converters', value: '' },
            // { id: 'flare.data.converters.Converters', value: '721' },
            // { id: 'flare.data.converters.DelimitedTextConverter', value: '4294' },
            // { id: 'flare.data.converters.GraphMLConverter', value: '9800' },
            // { id: 'flare.data.converters.IDataConverter', value: '1314' },
            // { id: 'flare.data.converters.JSONConverter', value: '2220' },
            // { id: 'flare.data.DataField', value: '1759' },
            // { id: 'flare.data.DataSchema', value: '2165' },
            // { id: 'flare.data.DataSet', value: '586' },
            // { id: 'flare.data.DataSource', value: '3331' },
            // { id: 'flare.data.DataTable', value: '772' },
            // { id: 'flare.data.DataUtil', value: '3322' },
            // { id: 'flare.display', value: '' },
            // { id: 'flare.display.DirtySprite', value: '8833' },
            // { id: 'flare.display.LineSprite', value: '1732' },
            // { id: 'flare.display.RectSprite', value: '3623' },
            // { id: 'flare.display.TextSprite', value: '10066' }
        ];

        const width = 800;
        const height = 600;

        // 添加画布
        const svg = d3.select('.summary')
            .append('svg')
            .attr('width', width)
            .attr('height', height);

        const g = svg.append('g')
            .attr('transform', 'translate(40,0)');

        // 布局保存在变量cluster中，变量cluster可用于转换数据，size()设定尺寸，即转换后的各节点的坐标在哪一个范围内
        const cluster = d3.cluster()
            .size([height, width - 160]);
    
        const stratify = d3.stratify()
            .parentId(d => d.id.substring(0, d.id.lastIndexOf('.')));

        // 数据排序（正序）？
        const root = stratify(data)
            .sort((a, b) => (a.height - b.height) || a.id.localeCompare(b.id));
        
        // cluster转换数据
        cluster(root);
        
        // 节点间的曲线
        const link = g.selectAll('.link')
            .data(root.descendants().slice(1))
            .enter()
            .append('path')
            .attr('class', 'link')
            .attr('d', d => `M${d.y},${d.x}C${d.parent.y + 100},${d.x} ${d.parent.y + 100},${d.parent.x} ${d.parent.y},${d.parent.x}`);
        
        // 节点
        const node = g.selectAll('.node')
            .data(root.descendants())
            .enter()
            .append('g')
            .attr('class', d => `node${(d.children ? 'node--internal' : 'node--leaf')}`)
            .attr('transform', d => `translate(${d.y},${d.x})`);
        
        // 节点实心点
        node.append('circle')
            .attr('r', 2.5);
        
        // 节点文字
        node.append('text')
            .attr('dy', 3)
            .attr('x', (d) => { return d.children ? -8 : 8; })
            .style('text-anchor', (d) => { return d.children ? 'end' : 'start'; })
            .text(d => d.id.substring(d.id.lastIndexOf('.') + 1));
    }
    render() {
        return (
            <div className='summary' />
        );
    }
}
  
const mapStateToProps = state => ({ 

});

const mapDispatchToProps = dispatch => bindActionCreators({ 
    switchNavMenu
 }, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Visualization));


// 3、弦图（Chord）
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

//         const matrix = [
//             [11975, 5871, 8916, 2868],
//             [1951, 10048, 2060, 6171],
//             [8010, 16145, 8090, 8045],
//             [1013, 990, 940, 6907]
//         ];

//         const width = 400;
//         const height = 400;
//         const outerRadius = Math.min(width, height) * 0.5 - 40;
//         const innerRadius = outerRadius - 30;

//         // 添加画布与设置
//         const svg = d3.select('.summary')
//             .append('svg')
//             .attr('width', width)
//             .attr('height', height);

//         // 生成器创建
//         const chord = d3.chord()
//             .padAngle(0.05) // 设置或获取相邻分组之间的间隔，默认为0
//             .sortSubgroups(d3.descending); // 设置或获取子分组的排序规则

//         const arc = d3.arc()
//             .innerRadius(innerRadius)
//             .outerRadius(outerRadius);

//         // 弦生成器
//         const ribbon = d3.ribbon()
//             .radius(innerRadius);

//         // 颜色与精度设置
//         const color = d3.scaleOrdinal()
//             .domain(d3.range(4))
//             .range(['#000000', '#FFDD89', '#957244', '#F26223']);
//         const formatValue = d3.formatPrefix(',.0', 1e3); // 将值转换为指定数字参考值的相应SI前缀的单位

//         const g = svg.append('g')
//             .attr('transform', `translate(${width / 2 },${height / 2})`)
//             .datum(chord(matrix));
        
//         // 绘制外部弦
//         const group = g.append('g')
//             .attr('class', 'groups')
//             .selectAll('g')
//             .data(d => d.groups)
//             .enter()
//             .append('g');

//         group.append('path')
//             .style('fill', d => color(d.index))
//             .style('stroke', d => d3.rgb(color(d.index)).darker())
//             .attr('d', arc);

//         // 绘制内部弦
//         g.append('g')
//             .attr('class', 'ribbons')
//             .selectAll('path')
//             .data(d => d)
//             .enter()
//             .append('path')
//             .attr('d', ribbon)
//             .style('fill', d => color(d.target.index))
//             .style('stroke', d => d3.rgb(color(d.target.index)).darker()) // 颜色变得更暗
//             .on('mouseover', () => {  // 鼠标划入时的事件
//                 d3.select(d3.event.target)
//                     .style('fill', 'yellow');
//             })
//             .on('mouseout', (d) => {  // 鼠标划出时的事件
//                 d3.select(d3.event.target)
//                     .transition()
//                     .duration(1000)
//                     .style('fill', color(d.target.index));
//             });
            
//         // 刻度盘
//         const groupTick = group.selectAll('.group-tick')
//             .data(d => (
//                 d3.range(0, d.value, 1000).map((value) => {
//                     // console.log(d)
//                     // console.log({ value:  value, angle: value * ((d.endAngle - d.startAngle) / d.value) + d.startAngle })
//                     return { value:  value, angle: value * ((d.endAngle - d.startAngle) / d.value) + d.startAngle };
//                 })
//             ))
//             .enter()
//             .append('g')
//             .attr('class', 'group-tick')
//             .attr('transform', d => `rotate(${(d.angle * 180 / Math.PI - 90)}) translate(${outerRadius },0)`);

//         // 刻度尺
//         groupTick.append('line') 
//             .attr('stroke', '#000')
//             .attr('x2', 4);

//         // 刻度文字
//         groupTick.filter(d => d.value % 5e3 === 0)
//             .append('text')
//             .attr('x', 8)
//             .attr('dy', '.35em')
//             .attr('transform', (d) => { return d.angle > Math.PI ? 'rotate(180) translate(-16)' : null; })
//             .style('text-anchor', (d) => { return d.angle > Math.PI ? 'end' : null; })
//             .text(d => formatValue(d.value));
//     }
//     render() {
//         return (
//             <div className='summary' />
//         );
//     }
// }
  
// const mapStateToProps = state => ({ 

// });

// const mapDispatchToProps = dispatch => bindActionCreators({ 
//     switchNavMenu
//  }, dispatch);

// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Visualization));


// 2、力图(force)
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

//         const nodes = [{ name: '桂林'  }, { name: '广州'  },
//             { name: '厦门'  }, { name: '杭州'  },
//             { name: '上海'  }, { name: '青岛'  },
//             { name: '天津' }];

//         const edges = [{ source: 0, target: 1  }, { source: 0, target: 2  },
//             { source: 0, target: 3  }, { source: 1, target: 4  },
//             { source: 1, target: 5  }, { source: 1, target: 6 }];

//         const colors = d3.scaleOrdinal(d3.schemeCategory10); // d3颜色引入
        
//         // 创建一个新的模拟来布局图形
//         const simulation = d3.forceSimulation(nodes)
//             .force('charge', d3.forceManyBody())
//             .force('link', d3.forceLink(edges))
//             .force('center', d3.forceCenter(width / 2, height / 2));

//         const node = svg.append('g')
//             .selectAll('line')
//             .data(nodes)
//             .enter()
//             .append('circle')
//             .attr('r', 10)
//             .attr('fill', (d, i) => colors(i))
//             .call(d3.drag().on('start', (d) => {
//                 if (!d3.event.active) simulation.alphaTarget(0.3).restart(); // restart是重新恢复模拟
//                 d.fx = d.x; // d.x是当前位置，d.fx是固定位置
//                 d.fy = d.y;
//             })
//             .on('drag', (d) => {
//                 d.fx = d3.event.x;
//                 d.fy = d3.event.y;
//             })
//             .on('end', (d) => {
//                 if (!d3.event.active) simulation.alphaTarget(0);
//                 d.fx = null; // 解除dragged中固定的坐标
//                 d.fy = null;
//             }));

//         const edge = svg.append('g')
//             .selectAll('line')
//             .data(edges)
//             .enter()
//             .append('line')
//             .attr('stroke', '#ccc')
//             .attr('stroke-width', 1);
        
//         // 添加描述节点的文字
//         const texts = svg.selectAll('text')
//             .data(nodes)
//             .enter()
//             .append('text')
//             .style('fill', 'black')
//             .attr('dx', 10)
//             .attr('dy', 8)
//             .text(d => d.name);
        
//         // 力导向图布局 force 有一个事件 tick，每进行到一个时刻，都要调用它，更新的内容就写在它的监听器里就好
//         simulation.nodes(nodes)
//             .on('tick', () => { // 对于每一个时间间隔
//                 // 更新连线坐标
//                 edge.attr('x1', d => d.source.x)
//                     .attr('y1', d => d.source.y)
//                     .attr('x2', d => d.target.x)
//                     .attr('y2', d => d.target.y);
                
//                 // 更新节点坐标
//                 node.attr('cx', d => d.x)
//                     .attr('cy', d => d.y);

//                 // 更新文字坐标
//                 texts.attr('x', d => d.x)
//                     .attr('y', d => d.y);
//             })
//             .force('link')
//             .links(edges);
//     }
//     render() {
//         return (
//             <div className='summary' />
//         );
//     }
// }
  
// const mapStateToProps = state => ({ 

// });

// const mapDispatchToProps = dispatch => bindActionCreators({ 
//     switchNavMenu
//  }, dispatch);

// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Visualization));


// 1、饼图(pie)
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
//             <div className='summary' />
//         );
//     }
// }
  
// const mapStateToProps = state => ({ 

// });

// const mapDispatchToProps = dispatch => bindActionCreators({ 
//     switchNavMenu
//  }, dispatch);

// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Visualization));