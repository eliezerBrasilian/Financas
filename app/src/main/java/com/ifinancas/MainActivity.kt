package com.ifinancas

import android.os.Build
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.viewModels
import androidx.annotation.RequiresApi
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavHostController
import androidx.navigation.compose.rememberNavController
import com.ifinancas.components.NavigationBarColor
import com.ifinancas.navigation.MainAppNavigation
import com.ifinancas.ui.theme.IFinançasTheme
import com.ifinancas.ui.viewModel.AuthViewModel
import com.ifinancas.ui.viewModel.FinancialOperationsViewModel
import com.ifinancas.ui.viewModel.InterstitialAdsViewModel
import com.ifinancas.ui.viewModel.PopUpHomeViewModel
import com.ifinancas.ui.viewModel.UserViewModel
import com.ifinancas.utils.loadInterstitial
import com.ifinancas.utils.removeInterstitial
import dagger.hilt.android.AndroidEntryPoint

@AndroidEntryPoint
class MainActivity : ComponentActivity() {

    private val authViewModel: AuthViewModel by viewModels()
    private val financialOperationsViewModel:FinancialOperationsViewModel by viewModels()
    private val userViewModel:UserViewModel by viewModels()

    @RequiresApi(Build.VERSION_CODES.O)
    override fun onCreate(savedInstanceState: Bundle?) {
        loadInterstitial(this)
        super.onCreate(savedInstanceState)
        setContent {
            IFinançasTheme {
                val navController: NavHostController = rememberNavController()
                val popUpHomeViewModel: PopUpHomeViewModel = viewModel()

                NavigationBarColor()
                MainAppNavigation(
                    navController = navController,
                    authViewModel = authViewModel,
                    popUpHomeViewModel = popUpHomeViewModel,
                    financialOperationsViewModel = financialOperationsViewModel,
                    userViewModel = userViewModel,

                )
            }
        }
    }

    override fun onDestroy() {
        removeInterstitial()
        super.onDestroy()
    }
}



