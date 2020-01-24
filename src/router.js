import HomeScreen from './screens/HomeScreen';
import Page1Screen from './screens/Page1Screen'

export default [
	{
		exact: true,
		component: HomeScreen,
		path: "/"
	},
	{
		component: Page1Screen,
		path: "/page1"
	}
]