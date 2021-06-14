import {connect} from "react-redux";
import MyAccount from "./MyAccount";
import {logOut} from "../../../store/actions/authActions";

const mapStateToProps = (state: any) => ({
    profile: state.profile.profile
})

const MyAccountContainer = connect(mapStateToProps, {logOut})(MyAccount);

export default MyAccountContainer;