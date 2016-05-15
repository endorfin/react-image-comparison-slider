import React from 'react';

class ImageComparisonSlider extends React.Component {

  constructor() {
    super();

    // states
    this.state = {
      container_styles: {
        position: "relative",
        width: "500px"
      },
      resize_styles: {
        position: "absolute",
        top: "0px",
        left: "0px",
        height: "100%",
        width: "50%",
        overflow: "hidden"
      },
      range_input_styles: {
        position: "absolute",
        display: "block",
        width: "90%",
        margin: "0 5%",
        bottom: "7%",
      },
      img_before_styles: {
        width: "100%"
      }
    };

    // handler
    this._handleResize = this._handleResize.bind(this);
    this._handleRangeInputChange = this._handleRangeInputChange.bind(this);
  }


  componentDidMount() {
    this._handleResize();
    window.addEventListener('resize', this._handleResize);
    this.refs.range.addEventListener('input', this._handleRangeInputChange)
  }


  _handleResize() {
    this.setState({
      img_after_styles: {
        width: this.refs.container.offsetWidth
      }
    })
  }


  _handleRangeInputChange() {
    const percent = event.target.value + '%';
    const copy = Object.assign({}, this.state.resize_styles);
    const resize_styles = Object.assign(copy, {
      width: percent
    });

    this.setState({ resize_styles });
  }


  render() {
    return(
      <div className="comparison__container" ref='container' style={this.state.container_styles} >
        <img className="comparison__img-before" ref="img_before" style={this.state.img_before_styles} src={this.props.img_before} />
        <div className="comparison__resize" ref='resize' style={this.state.resize_styles} >
          <img className="comparison__img-after" ref="img_after" style={this.state.img_after_styles} src={this.props.img_after} />
        </div>
        <input className="comparison__range-input" ref="range" style={this.state.range_input_styles} type="range" min="0" max="100" step="1" />
      </div>
    )
  }
};

ImageComparisonSlider.propTypes = {
  img_after: React.PropTypes.string.isRequired,
  img_before: React.PropTypes.string.isRequired
};

export default ImageComparisonSlider;
