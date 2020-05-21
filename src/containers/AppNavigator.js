import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import LoginScr from "../view/Auth/LoginScr";
import WelcomeLoginScr from "../view/Auth/WelcomeLoginScr";
import WelcomeSignUpScr from "../view/Auth/WelcomeSignUpScr";
//RENTER
import CustomerIndexScr from "../view/Customer/IndexScr";
import ProductDetailScr from "../view/Customer/ProductDetailScr";
import SignUpCustomerScr from "../view/Customer/SignUpScr";
//PROVIDER
import ProviderIndexScr from "../view/Provider/IndexScr";
import SignUpProviderScr from "../view/Provider/SignUpScr";
//AUTH
import SplashScr from "../view/SplashScr";

const AppNavigator = createStackNavigator(
  {
    Splash: { screen: SplashScr },
    //AUTH
    WelcomeLogin: { screen: WelcomeLoginScr },
    WelcomeSignUp: { screen: WelcomeSignUpScr },
    Login: { screen: LoginScr },

    //RENTER
    SignUpCustomer: { screen: SignUpCustomerScr },
    CustomerIndex: { screen: CustomerIndexScr },
    ProductDetail: { screen: ProductDetailScr },

    //PROVIDER
    SignUpProvider: { screen: SignUpProviderScr },
    ProviderIndex: { screen: ProviderIndexScr },
  },
  {
    initialRouteName: "Splash",
  }
);

export default createAppContainer(AppNavigator);
