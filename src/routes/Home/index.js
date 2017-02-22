import HomeView from './components/HomeView';
import { requireAuthentication } from 'containers/AuthenticatedComponent';

// Sync route definition
export default {
  component : requireAuthentication(HomeView)
}
