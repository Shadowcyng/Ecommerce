import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

//pages
import Home from './pages/Home';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Signin from './pages/Signin';
import Register from './pages/Register';
import Products from './pages/Products';
import AuthRoute from './utill/AuthRoute';
import Shipping from './pages/Shipping';
import Payment from './pages/Payment';
import PlaceOrder from './pages/PlaceOrder';
import NotFound from './pages/NotFound';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import themeFile from './utill/theme';
//Redux
import axios from 'axios';
import Profile from './pages/Profile';

//material ui
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

axios.defaults.baseURL = 'http://localhost:5000/api/';

const App = () => {
	const theme = createMuiTheme(themeFile);
	return (
		<MuiThemeProvider theme={theme}>
			<BrowserRouter>
				<div className='grid-container'>
					<NavBar />
					<main className='main'>
						<Switch>
							<Route exact path='/' component={Home} />
							<AuthRoute exact path='/signin' component={Signin} />
							<AuthRoute exact path='/register' component={Register} />
							<AuthRoute exact path='/profile/:id' component={Profile} />
							<Route exact path='/products' component={Products} />
							<Route exact path='/product/:id' component={Product} />
							<Route exact path='/cart/:id?' component={Cart} />
							<Route exact path='/cart' component={Cart} />
							<Route exact path='/shipping' component={Shipping} />
							<Route exact path='/payment' component={Payment} />
							<Route exact path='/placeorder' component={PlaceOrder} />
							<Route exact path='*' component={NotFound} />
						</Switch>
					</main>
					<Footer />
				</div>
			</BrowserRouter>
		</MuiThemeProvider>
	);
};

export default App;
