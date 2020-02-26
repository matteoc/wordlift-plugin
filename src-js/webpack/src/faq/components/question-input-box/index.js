/**
 * QuestionInputBox for adding a new question
 * @since 3.26.0
 * @author Naveen Muthusamy
 *
 */

/**
 * External dependencies.
 */
import React from "react";
import { connect } from "react-redux";
/**
 * Internal dependencies.
 */
import "./index.scss";
import { updateQuestionOnInputChange } from "../../actions";

class QuestionInputBox extends React.Component {
  render() {
    return (
      <input
        type={"text"}
        value={this.props.question}
        className={"wl-question-input-box"}
        placeholder={"Add Your question here"}
        onChange={event => {
          const action = updateQuestionOnInputChange();
          action.payload = event.target.value;
          this.props.dispatch(action);
        }}
      />
    );
  }
}

export default connect(state => ({
  question: state.faqModalOptions.question
}))(QuestionInputBox);
