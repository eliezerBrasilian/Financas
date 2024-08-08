package com.ifinancas.ui.screens

import android.content.Intent
import android.util.Log
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.Surface
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.livedata.observeAsState
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.LocalUriHandler
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavHostController
import androidx.navigation.compose.rememberNavController
import com.google.android.gms.ads.AdSize
import com.ifinancas.data.enums.MenuItem
import com.ifinancas.data.gitignore.appGooglePlayUri
import com.ifinancas.ui.components.BackgroundImage
import com.ifinancas.ui.components.BannerAdd
import com.ifinancas.ui.components.GraficoGeralCard
import com.ifinancas.ui.components.HomeBlueTop
import com.ifinancas.ui.components.HomePopUpMenu
import com.ifinancas.ui.components.MonthListPopUpDialog
import com.ifinancas.ui.components.PopUpAddRegisterDialog
import com.ifinancas.ui.viewModel.DateTimeViewModel
import com.ifinancas.ui.viewModel.FinancialOperationsViewModel
import com.ifinancas.ui.viewModel.PopUpHomeViewModel
import com.ifinancas.ui.viewModel.PopUpOfertaViewModel
import com.ifinancas.ui.viewModel.ShopThemeViewModel
import com.ifinancas.ui.viewModel.UserViewModel
import com.ifinancas.utils.AppUtils.Companion.AppTag

@Composable
fun Home(
    nav: NavHostController = rememberNavController(),
    popUpHomeViewModel: PopUpHomeViewModel = viewModel(),
    financialOperationsViewModel: FinancialOperationsViewModel,
    userViewModel: UserViewModel,
    pv: PaddingValues,
    popUpOfertaViewModel: PopUpOfertaViewModel,
    shopThemeViewModel: ShopThemeViewModel
) {

    val appTheme by shopThemeViewModel.appTheme.collectAsState()

    val visibilityState by popUpHomeViewModel.visible.collectAsState()
    val dateTimeViewModel: DateTimeViewModel = hiltViewModel()
    val givenMonthYear = dateTimeViewModel.getMonthName()

    val uid by userViewModel.uid.observeAsState(initial = "")

    var monthListVisible by remember {
        mutableStateOf(false)
    }

    var menuListVisibile by remember {
        mutableStateOf(false)
    }

    var monthSelected by remember {
        mutableStateOf(givenMonthYear)
    }
    var balanceIsVisible by remember {
        mutableStateOf(true)
    }
    val context = LocalContext.current
    val totalRevenues by financialOperationsViewModel.totalInRevenues.collectAsState(0.00)

    val totalExpenses by financialOperationsViewModel.totalInExpense.collectAsState(0.00)

    val totalReservations by financialOperationsViewModel.totalInReservations.collectAsState(0.00)

    val toogleMonthListVisibility = {
        monthListVisible = !monthListVisible
    }
    val toogleMenuListVisibility = {
        menuListVisibile = !menuListVisibile
    }

    val toogleBalanceVisibility = {
        balanceIsVisible = !balanceIsVisible
    }
    val onChangeMonthItem: (month: String) -> Unit = {
        monthSelected = it
        financialOperationsViewModel.canLoadBalance()
        toogleMonthListVisibility()
    }

    val uriHandler = LocalUriHandler.current


    val onChangeMenuItem: (menuItem: MenuItem) -> Unit = {
        if (it.route.isNotEmpty()) {
            nav.navigate(it.route)
        } else {
            if (it.title == MenuItem.Avaliar.title) {
                uriHandler.openUri(appGooglePlayUri)
            } else if (it.title == MenuItem.Compartilhar.title) {
                val customSharePhraseContent = "Baixe já o Finanças :\n\n $appGooglePlayUri"
                val sendIntent: Intent = Intent().apply {
                    action = Intent.ACTION_SEND
                    putExtra(Intent.EXTRA_TEXT, customSharePhraseContent)
                    type = "text/plain"
                }
                val shareIntent = Intent.createChooser(sendIntent, null)
                context.startActivity(shareIntent)
            }
        }
    }

    val financialLoadedState by financialOperationsViewModel.loadedState.collectAsState(false)

    LaunchedEffect(financialLoadedState, monthSelected, uid) {
        Log.d(AppTag, "financialLoadedState: $financialLoadedState")
        if (!uid.isNullOrEmpty() && financialLoadedState) {
            Log.d(AppTag, "estou aqui----(TRUE)")
            Log.d(AppTag, "uid: $uid")
            Log.d(AppTag, "givenMonthYear: $monthSelected")

            financialOperationsViewModel.getTotalBalance(
                uid.toString(), monthSelected
            )
        }
        Log.d(AppTag, "estou aqui----(FALSE)")
    }

    if (visibilityState) PopUpAddRegisterDialog(
        onDismissRequest = {
            popUpHomeViewModel.removeVisibility()
        }, nav
    )

    val popUpOfertaVisible by popUpOfertaViewModel.visible.collectAsState()

    /*if (popUpOfertaVisible) {
        PopUpOferta(
            text = "Acessar TikToK",
            question = "Ganhe 6 reais agora, entrando no TikTok clicando no botão abaixo",
            link = tiktokInviteLink,
            onDismissRequest = { popUpOfertaViewModel.turnOffVisibility() })
    }*/

    Surface(
        modifier = Modifier
            .padding(pv)
            .fillMaxSize()
    ) {
        appTheme?.let {
            BackgroundImage(imageResource = it.homeBackgroundResource) {
                Column(
                    Modifier
                        .fillMaxSize()
                        .verticalScroll(rememberScrollState())
                ) {
                    HomeBlueTop(
                        nav,
                        toogleMonthListVisibility,
                        toogleMenuListVisibility,
                        monthListVisible,
                        menuListVisibile,
                        financialOperationsViewModel,
                        monthSelected,
                        userViewModel,
                        balanceIsVisible,
                        toogleBalanceVisibility,
                        appTheme
                    )
                    com.ifinancas.ui.components.HomeCardsList(
                        totalRevenues,
                        nav,
                        balanceIsVisible,
                        totalExpenses,
                        totalReservations,
                        appTheme
                    )
                    BannerAdd(bannerSize = AdSize.BANNER)
//                PatrocinadoCard(
//                    imageResource = R.drawable.hostinger,
//                    title = "Contratar plano na Hostinger",
//                    description = "Ganhe 25% de desconto na sua primeira compra",
//                    buttonText = "Contratar",
//                    link = hostingerReferralLink,
//                    isVerified = true
//                )
                    GraficoGeralCard(nav)
                    Spacer(modifier = Modifier.height(10.dp))
                }
                if (menuListVisibile) HomePopUpMenu(
                    onChangeMenuItem = onChangeMenuItem,
                )
                if (monthListVisible) {
                    MonthListPopUpDialog(
                        toogleMonthListVisibility,
                        monthSelected,
                        onChangeMonthItem,
                        monthListVisible
                    )
                }
            }
        }
    }
}
