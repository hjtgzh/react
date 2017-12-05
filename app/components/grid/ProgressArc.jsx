import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const d3 = require('d3');

class ProgressArc extends Component {
    componentDidMount() {
        this.addArc();
        this.addArc().remove();
        this.addArc()
            .transition()
            .duration(750)
            .call(this.arcTween, (2 * Math.PI) * this.props.data.value, this.arc());
    }

    getSVG = () => {
        return (
            d3.select(`#${this.props.arcID}`).select('g')
        );
    };

    arc = () => {
        const { width, height } = this.props;
        const radius = Math.min(width, height) / 2;
        return (
            d3.arc()
                .innerRadius(radius - 10)
                .outerRadius(radius)
                .startAngle(0)
        );
    };
  
    addArc = () => {
        return (
            this.getSVG().append('path')
                .datum({ endAngle: 0 })
                .style('fill', '#BA6A5D')
                .attr('d', this.arc())
        );
    };
  
    arcTween = (transition, newAngle, arc) => {
        transition.attrTween('d', (d) => {
            const interpolate = d3.interpolate(d.endAngle, newAngle);
            const newArc = d;
            return (t) => {
                newArc.endAngle = interpolate(t);
                return arc(newArc);
            };
        });
    };
  
    render() {
        const { width, height, arcID, data } = this.props;
        return (
            <svg id={arcID} height={width} width={height}>
                <g transform={`translate(${width / 2},${height / 2})`}>
                    <text style={{ textAnchor: 'middle' }}>
                        <tspan x="0" dy="0" className="summary--tiles--value">
                            {`${(data.value * 100).toFixed(2)}%`}
                        </tspan>
                        <tspan x="0" dy="20" className="summary--tiles--label">
                            { data.text }
                        </tspan>
                    </text>
                </g>
            </svg>
        );
    }
}
  
const mapStateToProps = state => ({ 

});

const mapDispatchToProps = dispatch => bindActionCreators({ 
    
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProgressArc));