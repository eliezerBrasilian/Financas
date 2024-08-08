package com.ifinancas

import android.os.Build
import android.os.Bundle
import android.util.Log
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.viewModels
import androidx.annotation.RequiresApi
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Surface
import androidx.compose.ui.Modifier
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavHostController
import androidx.navigation.compose.rememberNavController
import com.adapty.Adapty
import com.adapty.models.AdaptyConfig
import com.google.android.gms.tasks.OnCompleteListener
import com.google.firebase.messaging.FirebaseMessaging
import com.ifinancas.data.gitignore.adaptyId
import com.ifinancas.navigation.MainAppNavigation
import com.ifinancas.navigation.NavigationBarColor
import com.ifinancas.ui.screens.Home
import com.ifinancas.ui.screens.ShopScreen
import com.ifinancas.ui.screens.signUp.SignUpViewModel
import com.ifinancas.ui.theme.IFinançasTheme
import com.ifinancas.ui.viewModel.AuthViewModel
import com.ifinancas.ui.viewModel.FinancialOperationsViewModel
import com.ifinancas.ui.viewModel.PopUpHomeViewModel
import com.ifinancas.ui.viewModel.PopUpOfertaViewModel
import com.ifinancas.ui.viewModel.ShopThemeViewModel
import com.ifinancas.ui.viewModel.UserViewModel
import com.ifinancas.utils.AppUtils.Companion.AppTag
import com.ifinancas.utils.loadInterstitial
import com.ifinancas.utils.removeInterstitial
import dagger.hilt.android.AndroidEntryPoint

@AndroidEntryPoint
class MainActivity : ComponentActivity() {
    private val authViewModel: AuthViewModel by viewModels()
    private val financialOperationsViewModel: FinancialOperationsViewModel by viewModels()
    private val userViewModel: UserViewModel by viewModels()

    @RequiresApi(Build.VERSION_CODES.O)
    override fun onCreate(savedInstanceState: Bundle?) {
        loadInterstitial(this)

        FirebaseMessaging.getInstance().token.addOnCompleteListener(OnCompleteListener { task ->
            if (!task.isSuccessful) {
                Log.w(AppTag, "Fetching FCM registration token failed", task.exception)
                return@OnCompleteListener
            }
            val token = task.result
            Log.d(AppTag, token.toString())
        })

        super.onCreate(savedInstanceState)
        Adapty.activate(
            applicationContext,
            AdaptyConfig.Builder(adaptyId)
                .build()
        )

        setContent {
            IFinançasTheme {
                val navController: NavHostController = rememberNavController()
                val popUpHomeViewModel: PopUpHomeViewModel = viewModel()
                val popUpOfertaViewModel: PopUpOfertaViewModel = viewModel()
                val shopTheme: ShopThemeViewModel = viewModel()
                val signUpViewModel: SignUpViewModel = viewModel()

                NavigationBarColor()

                MainAppNavigation(
                    navController = navController,
                    authViewModel = authViewModel,
                    popUpHomeViewModel = popUpHomeViewModel,
                    financialOperationsViewModel = financialOperationsViewModel,
                    userViewModel = userViewModel,
                    popUpOfertaViewModel = popUpOfertaViewModel,
                    shopThemeViewModel = shopTheme,
                    signUpViewModel = signUpViewModel
                )
            }
        }
    }

    override fun onDestroy() {
        removeInterstitial()
        super.onDestroy()
    }
}



