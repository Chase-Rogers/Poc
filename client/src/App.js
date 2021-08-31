import './App.css';
import ProductList from './components/ProductList/ProductList';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {

    return (
        <div className="App">
			<ToastContainer />
            <ProductList></ProductList>
        </div>
    );
}

export default App;
