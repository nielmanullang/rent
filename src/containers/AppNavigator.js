import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import LoginScr from "../view/Auth/LoginScr";
import SignUpScr from "../view/Auth/SignUpScr";
import WelcomeScr from "../view/Auth/WelcomeScr";
//RENTER
import CustomerIndexScr from "../view/Customer/IndexScr";
import ProductDetailScr from "../view/Customer/ProductDetailScr";
//PROVIDER
import ProviderIndexScr from "../view/Provider/IndexScr";
//AUTH
import SplashScr from "../view/SplashScr";

const AppNavigator = createStackNavigator(
  {
    Splash: { screen: SplashScr },
    //AUTH
    Welcome: { screen: WelcomeScr },
    Login: { screen: LoginScr },
    SignUp: { screen: SignUpScr },

    //RENTER
    CustomerIndex: { screen: CustomerIndexScr },
    ProductDetail: { screen: ProductDetailScr },

    //PROVIDER
    ProviderIndex: { screen: ProviderIndexScr },
  },
  {
    initialRouteName: "Splash",
  }
);

export default createAppContainer(AppNavigator);
