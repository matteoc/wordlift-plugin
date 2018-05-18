import { connect } from "react-redux";

import EntitySelect from "./EntitySelect";
import { close, setValue } from "./actions";
import {
  addEntityRequest,
  createEntityRequest
} from "../AutoCompleteEntitySelect/actions";

const mapStateToProps = ({ open, value, items }) => ({ open, value, items });

const mapDispatchToProps = dispatch => ({
  onInputChange: value => dispatch(setValue(value)),
  onCancel: () => dispatch(close()),
  createEntity: value => dispatch(createEntityRequest(value)),
  selectEntity: item => dispatch(addEntityRequest(item))
});

export default connect(mapStateToProps, mapDispatchToProps)(EntitySelect);
