import React from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { Button, Upload, Icon, message, Input } from 'antd';

const Dragger = Upload.Dragger;

export default class Crop extends React.Component {
    constructor() {
        super();
        this.state = {
            imgUrl: '',
            selectImgUrl: ''
        };
    }

    componentDidMount() {
        // console.log(this.refs.cropper.getCanvasData());
    }

    cropImage = () => {
        if (this.refs.cropper.getCroppedCanvas() === 'null') {
            return false;
        }
        this.setState({
            imgUrl: this.refs.cropper.getCroppedCanvas({ width: 640, height: 360 }).toDataURL()
        });
    }

    render() {
        const props = {
            action: '',
            accept: '.jpg,.png',
            beforeUpload: (file) => {
                const selectImgUrl = window.URL.createObjectURL(file);
                this.setState({
                    selectImgUrl: selectImgUrl
                });
                return false;
            },
        };
        return (
            <div>
                <Upload {...props}>
                    <Button className="file" type="primary">选择图片</Button>
                </Upload>
                <Cropper
                    ref="cropper"
                    src={this.state.selectImgUrl || 'https://gss0.bdstatic.com/-4o3dSag_xI4khGkpoWK1HF6hhy/baike/h%3D250/sign=63f3c5378fd6277ff612353d183a1f63/500fd9f9d72a6059c1dfb0962034349b023bba6b.jpg'}
                    style={{ height: 300, width: '100%' }}
                    aspectRatio={16 / 9}
                    guides={false}
                    // background={false}
                    cropBoxResizable={false}
                    crop={this._crop} 
                    dragMode="move"
                    modal={false}
                />
                <Button type="primary" size="large" onClick={this.cropImage} style={{ margin: '10px' }}>
                    确认裁剪
                </Button>
                <div className="previewImg">
                    <img src={this.state.imgUrl} alt=""/>
                </div>
            </div>
            
        );
    }
}