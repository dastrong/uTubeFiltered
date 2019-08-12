import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import Linkify from "react-linkify";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
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
});

export default function PlayerInfoDescription({ description }) {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [showMoreButton, setButtonVisi] = useState(false);
  const outerRef = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    const outerWidth = outerRef.current.offsetWidth;
    const innerWidth = innerRef.current.offsetWidth;
    const shouldShowMoreButton = innerWidth > outerWidth;
    if (!shouldShowMoreButton) return;
    setButtonVisi(true);
  }, []);

  const [maxHeight, whiteSpace] = isOpen
    ? ["100%", "pre-line"]
    : ["14px", "nowrap"];

  return (
    <>
      <Linkify properties={{ target: "_blank", rel: "noopener noreferrer" }}>
        <div
          ref={outerRef}
          className={classes.description}
          style={{ maxHeight, whiteSpace }}
        >
          <span ref={innerRef}>{description}</span>
        </div>
      </Linkify>
      {showMoreButton && (
        <Button
          className={classes.button}
          variant="text"
          disableRipple={true}
          onClick={() => setIsOpen(state => !state)}
        >
          Show {isOpen ? "Less" : "More"}
        </Button>
      )}
    </>
  );
}

PlayerInfoDescription.propTypes = {
  description: PropTypes.string.isRequired
};
