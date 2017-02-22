import { connect } from 'react-redux';
import Header from '../components/Header';
import {logoutUser} from '../redux/modules/auth';

/*  Object of action creators (can also be function that returns object).
 Keys will be passed as props to presentational components. Here we are
 implementing our wrapper around increment; the component doesn't care   */

const mapDispatchToProps = {
  handleLogout: logoutUser
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
