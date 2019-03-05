import React, { Component } from "react";
import PropTypes from "prop-types";
import Linkify from "react-linkify";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const styles = {
  description: {
    fontSize: "14px",
    overflow: "hidden",
    margin: "10px 5px 5px",
    padding: 5,
    lineHeight: "21px",
    textOverflow: "ellipsis"
  },
  button: {
    fontSize: "0.7rem",
    padding: 10,
    margin: "5px 10px"
  }
};

// dynamicaly expandable/collapsable
class PlayerInfoDescription extends Component {
  state = { expanded: false };

  componentDidMount() {
    const innerWidth = this.innerRef.offsetWidth;
    const outerWidth = this.outerRef.offsetWidth;
    this.setState({ showMoreButton: innerWidth > outerWidth });
  }

  toggleMore = () => this.setState({ expanded: !this.state.expanded });

  render() {
    const { expanded, showMoreButton } = this.state;
    const { classes, description } = this.props;
    const [maxHeight, whiteSpace] = expanded
      ? ["100%", "pre-line"]
      : ["14px", "nowrap"];
    return (
      <>
        <Linkify properties={{ target: "_blank", rel: "noopener noreferrer" }}>
          <div
            ref={el => (this.outerRef = el)}
            className={classes.description}
            style={{ maxHeight, whiteSpace }}
          >
            <span ref={el => (this.innerRef = el)}>{description}</span>
          </div>
        </Linkify>
        {showMoreButton && (
          <Button
            className={classes.button}
            variant="text"
            disableRipple={true}
            onClick={this.toggleMore}
          >
            Show {expanded ? "Less" : "More"}
          </Button>
        )}
      </>
    );
  }
}

PlayerInfoDescription.propTypes = {
  classes: PropTypes.object.isRequired,
  description: PropTypes.string.isRequired
};

export default withStyles(styles)(PlayerInfoDescription);
