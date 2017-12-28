// 6.地图
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './style.less';
import { switchNavMenu } from '../redux/actions/nav';
import { packData } from './data';
import { chinaData } from './china';

const d3 = require('d3');

class Visualization extends Component {
    hovered = (hover) => {
        return (d) => {
            d3.selectAll(d.ancestors().map((d) => { return d.node; })).classed('node--hover', hover);
        };
    }
    componentDidMount() {
        this.props.switchNavMenu('4');
        
        const width = 960;
        const height = 960;

        const svg = d3.select('.summary')
            .append('svg')
            .attr('width', width)
            .attr('height', height);
            
        const format = d3.format(',d'); // 把数据计数方式格式化，转化为带逗号 x,xxx 的格式
        
        const color = d3.scaleSequential(d3.interpolateMagma) // scaleSequential用于将连续性的数据映射为由预定义或者定制的插值函数决定的range
            .domain([-4, 4]);
        
        const stratify = d3.stratify()
            .parentId((d) => {
                return d.id.substring(0, d.id.lastIndexOf('.')); 
            });
        
        const pack = d3.pack()
            .size([width - 2, height - 2]) // 将此包布局的大小设置为指定的包含数字[width，height]的二元数组，并返回此包布局
            .padding(3); // 兄弟姐妹包之间的间隔
        
        const data = packData;
        const root = stratify(data)
            .sum(d => d.value)
            .sort((a, b) => b.value - a.value);
        
        pack(root);
        
        const node = svg.append('g')
            .selectAll('g')
            .data(root.descendants())
            .enter()
            .append('g')
            .attr('transform', d => `translate(${d.x},${d.y})`)
            // .attr('class', function(d) { return 'node' + (!d.children ? ' node--leaf' : d.depth ? '' : ' node--root'); })
            .each(function(d) { d.node = this; })
            .on('mouseover', this.hovered(true))
            .on('mouseout', this.hovered(false));
        
        node.append('circle')
            .attr('id', d => `node-${d.id}`)
            .attr('r', d => d.r)
            .style('fill', d => color(d.depth));
        
        const leaf = node.filter(d => !d.children);
        
        leaf.append('clipPath')
            .attr('id', d => `clip-${d.id}`)
            .append('use')
            .attr('xlink:href', d => `#node-${d.id}`);
        
        leaf.append('text')
            .attr('clip-path', d => `url(#clip-${d.id})`)
            .selectAll('tspan')
            .data(d => d.id.substring(d.id.lastIndexOf('.') + 1).split(/(?=[A-Z][^A-Z])/g))
            .enter()
            .append('tspan')
            .attr('x', 0)
            .attr('y', (d, i, nodes) => 13 + (i - nodes.length / 2 - 0.5) * 10)
            .text(d => d);
        
        node.append('title')
            .text(d => `${d.id}\n${format(d.value)}`);
    }
    render() {
        return (
            <div className='summary'/>
        );
    }
}
  
const mapStateToProps = state => ({ 

});

const mapDispatchToProps = dispatch => bindActionCreators({ 
    switchNavMenu
}, dispatch);
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Visualization));

// // 5、打包图（pack）
// import React, { Component } from 'react';
// import { withRouter } from 'react-router';
// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
// import './style.less';
// import { switchNavMenu } from '../redux/actions/nav';
// import { packData } from './data';

// const d3 = require('d3');

// class Visualization extends Component {
//     hovered = (hover) => {
//         return (d) => {
//             d3.selectAll(d.ancestors().map((d) => { return d.node; })).classed('node--hover', hover);
//         };
//     }
//     componentDidMount() {
//         this.props.switchNavMenu('4');
        
//         const width = 960;
//         const height = 960;

//         const svg = d3.select('.summary')
//             .append('svg')
//             .attr('width', width)
//             .attr('height', height);
            
//         const format = d3.format(',d'); // 把数据计数方式格式化，转化为带逗号 x,xxx 的格式
        
//         const color = d3.scaleSequential(d3.interpolateMagma) // scaleSequential用于将连续性的数据映射为由预定义或者定制的插值函数决定的range
//             .domain([-4, 4]);
        
//         const stratify = d3.stratify()
//             .parentId((d) => {
//                 return d.id.substring(0, d.id.lastIndexOf('.')); 
//             });
        
//         const pack = d3.pack()
//             .size([width - 2, height - 2]) // 将此包布局的大小设置为指定的包含数字[width，height]的二元数组，并返回此包布局
//             .padding(3); // 兄弟姐妹包之间的间隔
        
//         const data = packData;
//         const root = stratify(data)
//             .sum(d => d.value)
//             .sort((a, b) => b.value - a.value);
        
//         pack(root);
        
//         const node = svg.append('g')
//             .selectAll('g')
//             .data(root.descendants())
//             .enter()
//             .append('g')
//             .attr('transform', d => `translate(${d.x},${d.y})`)
//             // .attr('class', function(d) { return 'node' + (!d.children ? ' node--leaf' : d.depth ? '' : ' node--root'); })
//             .each(function(d) { d.node = this; })
//             .on('mouseover', this.hovered(true))
//             .on('mouseout', this.hovered(false));
        
//         node.append('circle')
//             .attr('id', d => `node-${d.id}`)
//             .attr('r', d => d.r)
//             .style('fill', d => color(d.depth));
        
//         const leaf = node.filter(d => !d.children);
        
//         leaf.append('clipPath')
//             .attr('id', d => `clip-${d.id}`)
//             .append('use')
//             .attr('xlink:href', d => `#node-${d.id}`);
        
//         leaf.append('text')
//             .attr('clip-path', d => `url(#clip-${d.id})`)
//             .selectAll('tspan')
//             .data(d => d.id.substring(d.id.lastIndexOf('.') + 1).split(/(?=[A-Z][^A-Z])/g))
//             .enter()
//             .append('tspan')
//             .attr('x', 0)
//             .attr('y', (d, i, nodes) => 13 + (i - nodes.length / 2 - 0.5) * 10)
//             .text(d => d);
        
//         node.append('title')
//             .text(d => `${d.id}\n${format(d.value)}`);
//     }
//     render() {
//         return (
//             <div className='summary'/>
//         );
//     }
// }
  
// const mapStateToProps = state => ({ 

// });

// const mapDispatchToProps = dispatch => bindActionCreators({ 
//     switchNavMenu
// }, dispatch);

// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Visualization));


// 4、集群图（Chord）
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

//         const data = [
//             { id: '世界', value: '' },
//             { id: '世界-中国', value: '' },
//             { id: '世界-中国-浙江', value: '' },
//             { id: '世界-中国-浙江-杭州', value: '3938' },
//             { id: '世界-中国-浙江-宁波', value: '3812' },
//             { id: '世界-中国-浙江-温州', value: '6714' },
//             { id: '世界-中国-浙江-绍兴', value: '743' },
//             { id: '世界-中国-河南', value: '' },
//             { id: '世界-中国-河南-郑州', value: '3534' },
//             { id: '世界-中国-河南-商丘', value: '5731' },
//             { id: '世界-中国-河南-洛阳', value: '7840' },
//             { id: '世界-中国-河南-开封', value: '5914' },
//             { id: '世界-中国-河南-永城', value: '3416' }
//         ];

//         const width = 800;
//         const height = 600;

//         // 添加画布
//         const svg = d3.select('.summary')
//             .append('svg')
//             .attr('width', width)
//             .attr('height', height);

//         const g = svg.append('g')
//             .attr('transform', 'translate(40,0)');

//         // 布局保存在变量浙江中，变量浙江可用于转换数据，size()设定尺寸，即转换后的各节点的坐标在哪一个范围内
//         const 浙江 = d3.cluster() // 效果和 d3.tree() 一样
//             .size([height, width - 160]);
    
//         const stratify = d3.stratify()
//             .parentId(d => d.id.substring(0, d.id.lastIndexOf('-')));
        
//         // 数据排序（正序）
//         const root = stratify(data)
//             .sort((a, b) => (a.height - b.height) || a.id.localeCompare(b.id));

//         // 浙江转换数据
//         浙江(root);

//         // 节点间的曲线
//         const link = g.selectAll('.link')
//             .data(root.descendants().slice(1))
//             .enter()
//             .append('path')
//             .attr('class', 'link')
//             .attr('d', d => `M${d.y},${d.x}C${d.parent.y + 100},${d.x} ${d.parent.y + 100},${d.parent.x} ${d.parent.y},${d.parent.x}`);
        
//         // 节点
//         const node = g.selectAll('.node')
//             .data(root.descendants())
//             .enter()
//             .append('g')
//             .attr('class', d => `node${(d.children ? 'node--internal' : 'node--leaf')}`)
//             .attr('transform', d => `translate(${d.y},${d.x})`);
        
//         // 节点实心点
//         node.append('circle')
//             .attr('r', 2.5);
        
//         // 节点文字
//         node.append('text')
//             .attr('dy', 3)
//             .attr('x', (d) => { return d.children ? -8 : 8; })
//             .style('text-anchor', (d) => { return d.children ? 'end' : 'start'; })
//             .text(d => d.id.substring(d.id.lastIndexOf('-') + 1));
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
// }, dispatch);

// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Visualization));


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