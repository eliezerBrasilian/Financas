package com.ifinancas.navigation

//noinspection UsingMaterialAndMaterial3Libraries
import android.annotation.SuppressLint
import android.os.Build
import androidx.annotation.RequiresApi
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.padding
import androidx.compose.material.Scaffold
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.navigation.NavHostController
import androidx.navigation.NavType
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.navArgument
import androidx.navigation.navigation
import com.ifinancas.components.CustomBottomBar
import com.ifinancas.data.enums.Tags
import com.ifinancas.screens.Splash
import com.ifinancas.screens.welcomeLogin.WelcomeSignUp
import com.ifinancas.ui.screens.chart.ChartScreen
import com.ifinancas.ui.screens.extras.ExtrasScreen
import com.ifinancas.ui.screens.financialBalanceSelected.FinancialBalanceSelected
import com.ifinancas.ui.screens.home.Home
import com.ifinancas.ui.screens.login.Login
import com.ifinancas.ui.screens.presentation.Presentation
import com.ifinancas.ui.screens.profile.Profile
import com.ifinancas.ui.screens.register.RegisterScreen
import com.ifinancas.ui.screens.signUp.SignUp
import com.ifinancas.ui.screens.transactionsHistory.TransactionsHistory
import com.ifinancas.ui.screens.welcomeLogin.WelcomeLogin
import com.ifinancas.ui.viewModel.AuthViewModel
import com.ifinancas.ui.viewModel.FinancialOperationsViewModel
import com.ifinancas.ui.viewModel.PopUpHomeViewModel
import com.ifinancas.ui.viewModel.PopUpOfertaViewModel
import com.ifinancas.ui.viewModel.UserViewModel

@SuppressLint(
    "NewApi", "UnusedMaterialScaffoldPaddingParameter", "ComposableDestinationInComposeScope"
)
@RequiresApi(Build.VERSION_CODES.O)
@Composable
fun MainAppNavigation(
    navController: NavHostController,
    authViewModel: AuthViewModel,
    popUpHomeViewModel: PopUpHomeViewModel,
    financialOperationsViewModel: FinancialOperationsViewModel,
    userViewModel: UserViewModel,
    popUpOfertaViewModel: PopUpOfertaViewModel,
) {

    Scaffold(bottomBar = { CustomBottomBar(navController, popUpHomeViewModel) }) { pv ->
        NavHost(navController = navController,
            route = "navHost",
            //startDestination = "appNavigation",
            startDestination = "splashNav",
            modifier = Modifier
                .padding(0.dp)
                .background(Color.White),
            builder = {

                navigation(startDestination = NavigationScreens.SPLASH, route = "splashNav") {
                    composable(route = NavigationScreens.SPLASH) {
                        Splash(nav = navController)
                    }
                }

                navigation(
                    startDestination = NavigationScreens.PRESENTATION, route = "authNavigation"
                ) {
                    composable(route = NavigationScreens.PRESENTATION) {
                        Presentation(nav = navController)
                    }
                    composable(route = NavigationScreens.WELCOME_LOGIN) {
                        WelcomeLogin(nav = navController, authViewModel, userViewModel)
                    }
                    composable(route = NavigationScreens.WELCOME_SIGN_UP) {
                        WelcomeSignUp(nav = navController, authViewModel, userViewModel)
                    }
                    composable(route = NavigationScreens.LOGIN) {
                        Login(nav = navController, authViewModel, userViewModel)
                    }
                    composable(route = NavigationScreens.SIGN_UP) {
                        SignUp(nav = navController, authViewModel, userViewModel)
                    }
                }

                navigation(
                    startDestination = BottomBarScreen.Home.route,
                    route = "appNavigation"
                ) {
                    composable(BottomBarScreen.Home.route) {
                        Home(
                            navController,
                            popUpHomeViewModel,
                            financialOperationsViewModel,
                            userViewModel,
                            pv,
                            popUpOfertaViewModel
                        )
                    }
                    composable(NavigationScreens.PROFILE) {
                        val clearDataOnExit = {
                            authViewModel.signOut()
                            userViewModel.clearAllData()
                            financialOperationsViewModel.resetBalance()
                            navController.navigate("authNavigation") {
                                popUpTo("appNavigation") {
                                    inclusive = true
                                }
                            }
                        }
                        Profile(navController, userViewModel, clearDataOnExit)
                    }
                    composable(BottomBarScreen.Historico.route) {
                        TransactionsHistory(
                            pv,
                            financialOperationsViewModel,
                        )
                    }
                    composable(
                        NavigationScreens.FINANCIAL_BALANCE_SELECTED + "/{tag}",
                        arguments = listOf(navArgument(name = "tag") { type = NavType.StringType })
                    ) { backStackEntry ->
                        val tag = backStackEntry.arguments?.getString("tag")

                        FinancialBalanceSelected(
                            pv,
                            financialOperationsViewModel,
                            tag,
                            navController
                        )
                    }

                    composable(
                        NavigationScreens.REGISTER + "/{tag}",
                        arguments = listOf(navArgument(name = "tag") { type = NavType.StringType })
                    ) { backStackEntry ->
                        val tag = backStackEntry.arguments?.getString("tag")
                        RegisterScreen(
                            navController,
                            tag,
                            pv,
                            financialOperationsViewModel,
                        )
                    }

                    composable(
                        BottomBarScreen.Grafico.route
                    ) {
                        ChartScreen(
                            pv,
                            financialOperationsViewModel,
                            Tags.REVENUE.tag,
                            navController
                        )
                    }

                    composable(
                        BottomBarScreen.Grafico.route + "/{tag}",
                        arguments = listOf(navArgument(name = "tag") { type = NavType.StringType })
                    ) { backStackEntry ->
                        val tag = backStackEntry.arguments?.getString("tag")

                        ChartScreen(
                            pv,
                            financialOperationsViewModel,
                            tag,
                            navController
                        )
                    }

                    composable(BottomBarScreen.Extra.route) {
                        ExtrasScreen(pv, navController)
                    }

                }
            })
    }
}

