import React, { Component } from 'react';
import { withRouter, Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Carousel } from 'antd';
import { fetchHomeList } from '../redux/actions/home';
import './style.less';

class Home extends Component {
    componentDidMount() {
        // this.props.fetchHomeList();
    }
    cardChange = (a, b, c) => {
        console.log(a, b, c)
    }
    render() {
        return (
            <div className="home-content">
                <Carousel afterChange={this.cardChange} autoplay>
                    <div className="cardItem">
                        <Link href="https://www.baidu.com/?tn=95846469_hao_pg">
                            <img src="https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/bd_logo1_31bdc765.png" title="百度搜索"/>
                        </Link>
                    </div>
                    <div className="cardItem">
                        <Link href="https://weibo.com/?sudaref=www.baidu.com&display=0&retcode=6102">
                            <img src="https://gss2.bdstatic.com/-fo3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=d7924a4e8013632715edc535a9b4c7d1/838ba61ea8d3fd1f877974a83a4e251f95ca5f34.jpg" title="新浪微博"/>
                        </Link>
                    </div>
                    <div className="cardItem">
                        <Link href="https://www.jd.com/">
                            <img src="https://ss0.bdstatic.com/-0U0bnSm1A5BphGlnYG/tam-ogel/20d5c57e839fa986939e2e6aec94728b_222_222.jpg" title="京东"/>
                        </Link>
                    </div>
                    <div className="cardItem">
                        <Link href="http://www.qq.com/">
                            <img src="https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=ce79769a30f33a879e6d071cfe677705/34fae6cd7b899e5114f3cfbe48a7d933c8950d1e.jpg" title="QQ"/>
                        </Link>
                    </div>
                </Carousel>
            </div>
        );
    }
}

const mapStateToProps = state => ({ 
    
});

const mapDispatchToProps = dispatch => bindActionCreators({ 
    
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));