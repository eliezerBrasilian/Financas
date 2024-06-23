package com.ifinancas.ui.screens.home

import android.content.Intent
import android.util.Log
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.Card
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
import com.ifinancas.R
import com.ifinancas.data.enums.MenuItem
import com.ifinancas.data.enums.Tags
import com.ifinancas.data.gitignore.appGooglePlayUri
import com.ifinancas.data.gitignore.tiktokInviteLink
import com.ifinancas.ui.components.BannerAdd
import com.ifinancas.ui.components.CardFinanceItem
import com.ifinancas.ui.components.GraficoGeralCard
import com.ifinancas.ui.components.HomeBlueTop
import com.ifinancas.ui.components.HomePopUpMenu
import com.ifinancas.ui.components.MonthListPopUpDialog
import com.ifinancas.ui.components.PopUpAddRegisterDialog
import com.ifinancas.ui.components.PopUpOferta
import com.ifinancas.ui.components.ViewSobreposta
import com.ifinancas.ui.theme.BACKGROUNDCARDSOBREPOSTO
import com.ifinancas.ui.theme.BACKGROUNDHOME
import com.ifinancas.ui.viewModel.DateTimeViewModel
import com.ifinancas.ui.viewModel.FinancialOperationsViewModel
import com.ifinancas.ui.viewModel.PopUpHomeViewModel
import com.ifinancas.ui.viewModel.PopUpOfertaViewModel
import com.ifinancas.ui.viewModel.UserViewModel
import com.ifinancas.utils.AppUtils.Companion.AppTag

@Composable
fun Home(
    nav: NavHostController = rememberNavController(),
    popUpHomeViewModel: PopUpHomeViewModel = viewModel(),
    financialOperationsViewModel: FinancialOperationsViewModel,
    userViewModel: UserViewModel,
    pv: PaddingValues,
    popUpOfertaViewModel: PopUpOfertaViewModel
) {
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
    val context = LocalContext.current

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
                uid.toString(),
                monthSelected
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

    if (popUpOfertaVisible) {
        PopUpOferta(
            text = "Acessar TikToK",
            question = "Ganhe 6 reais agora, entrando no TikTok clicando no botão abaixo",
            link = tiktokInviteLink,
            onDismissRequest = { popUpOfertaViewModel.turnOffVisibility() })
    }

    Surface(
        modifier = Modifier
            .padding(pv)
            .fillMaxSize()
    ) {
        Box(
            modifier = Modifier
                .fillMaxSize()
        ) {
            Column(
                Modifier
                    .background(BACKGROUNDHOME)
                    .fillMaxSize()
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
                    toogleBalanceVisibility
                )
                ViewSobreposta {
                    Card(
                        modifier = Modifier.fillMaxWidth(0.95f),
                        shape = RoundedCornerShape(12.dp),
                        elevation = 10.dp,
                        backgroundColor = BACKGROUNDCARDSOBREPOSTO
                    ) {
                        Box(modifier = Modifier.padding(10.dp)) {
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.SpaceAround
                            ) {
                                CardFinanceItem(
                                    iconeImage = R.drawable.receita,
                                    text = "Receitas",
                                    valor = totalRevenues,
                                    tag = Tags.REVENUE.tag,
                                    nav = nav,
                                    balanceIsVisible
                                )
                                CardFinanceItem(
                                    iconeImage = R.drawable.despesa,
                                    text = "Despesas",
                                    valor = totalExpenses,
                                    tag = Tags.EXPENSE.tag,
                                    nav = nav,
                                    balanceIsVisible
                                )
                                CardFinanceItem(
                                    iconeImage = R.drawable.reserva,
                                    text = "Reservas",
                                    valor = totalReservations,
                                    tag = Tags.RESERVATION.tag,
                                    nav = nav,
                                    balanceIsVisible
                                )
                            }
                        }
                    }
                }
                BannerAdd(bannerSize = AdSize.BANNER)
                GraficoGeralCard(nav)
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

