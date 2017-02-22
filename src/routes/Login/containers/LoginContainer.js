import { connect } from 'react-redux';
import Login from '../components/Login';
import { loginUser } from 'redux/modules/auth';

const mapDispatchToProps = {
  onSubmit: loginUser
};

const mapStateToProps = (state, ownProps) => ({
  initialValues: {
    redirect: ownProps.location.query.next
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
