package com.ifinancas.ui.screens.transactionsHistory

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.ExperimentalMaterialApi
import androidx.compose.material.ModalBottomSheetLayout
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.livedata.observeAsState
import androidx.compose.runtime.mutableDoubleStateOf
import androidx.compose.runtime.mutableStateListOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import com.ifinancas.data.customremembers.rememberCustomModalBottomSheetState
import com.ifinancas.data.dataclass.Register
import com.ifinancas.data.enums.Tags
import com.ifinancas.ui.components.PopUpDeleteRegister
import com.ifinancas.ui.components.TransactionHistoryOverlayView
import com.ifinancas.ui.components.TransactionsHistoryTop
import com.ifinancas.ui.theme.MAINPURPLE
import com.ifinancas.ui.viewModel.DateTimeViewModel
import com.ifinancas.ui.viewModel.FinancialOperationsViewModel
import com.ifinancas.ui.viewModel.UserViewModel
import com.ifinancas.utils.showInterstitial
import java.util.Date

@OptIn(ExperimentalMaterialApi::class)
@Composable
fun TransactionsHistory(
    pv: PaddingValues,
    financialOperationsViewModel: FinancialOperationsViewModel,
) {

    val userViewModel: UserViewModel = hiltViewModel()
    val uid by userViewModel.uid.observeAsState(initial = "")
    val dateTimeViewModel: DateTimeViewModel = hiltViewModel()

    val sortRegistersList = remember {
        mutableStateListOf<Register>()
    }
    var movimentacaoTotalEfetuada by remember {
        mutableDoubleStateOf(0.00)
    }

    var popUpDeleteRegisterIsVisible by remember {
        mutableStateOf(false)
    }
    var date by remember {
        mutableStateOf(Date())
    }

    val decrementMonth = {
        date = dateTimeViewModel.decrementMonth(date)
    }

    val incrementMonth = {
        date = dateTimeViewModel.incrementMonth(date)
    }

    var registerEscolhidoParaDeletar by remember { mutableStateOf<Register?>(null) }

    var registerChoosedId by remember {
        mutableStateOf("")
    }

    val handleDeleteRegister: (register: Register) -> Unit = {
        registerChoosedId = it.id
        registerEscolhidoParaDeletar = it
        popUpDeleteRegisterIsVisible = !popUpDeleteRegisterIsVisible
    }

    val sheetState = rememberCustomModalBottomSheetState()

    LaunchedEffect(uid, date) {
        val registers = financialOperationsViewModel.loadRegistersFromDateDescendly(
            dateTimeViewModel.getMonthAndYear(date), uid.toString()
        ).await()

        sortRegistersList.clear()
        sortRegistersList.addAll(registers)

        var movimentacaoTotalAux = 0.0
        registers.forEach {
            movimentacaoTotalAux += it.amount
        }
        movimentacaoTotalEfetuada = movimentacaoTotalAux
    }

    val onDismissRequestOpoUp = {
        popUpDeleteRegisterIsVisible = !popUpDeleteRegisterIsVisible
    }

    val context = LocalContext.current

    val delete = {
        if (registerEscolhidoParaDeletar != null) {
            financialOperationsViewModel.deleteRegister(registerChoosedId, onSuccessDelete = {

                sortRegistersList.removeIf { it.id == registerEscolhidoParaDeletar!!.id }

                if (registerEscolhidoParaDeletar!!.tag == Tags.EXPENSE.tag || registerEscolhidoParaDeletar!!.tag == Tags.RESERVATION.tag) {
                    movimentacaoTotalEfetuada += registerEscolhidoParaDeletar!!.amount
                } else {
                    movimentacaoTotalEfetuada -= registerEscolhidoParaDeletar!!.amount
                }

                popUpDeleteRegisterIsVisible = !popUpDeleteRegisterIsVisible
                showInterstitial(context)
            })
        }
    }

    if (popUpDeleteRegisterIsVisible) {
        PopUpDeleteRegister(
            onDismissRequest = onDismissRequestOpoUp,
            delete = delete,
            financialOperationsViewModel = financialOperationsViewModel
        )
    }

    ModalBottomSheetLayout(
        scrimColor = Color.Unspecified,
        sheetContent = {
            TransactionHistoryOverlayView(
                sortRegistersList,
                date,
                incrementMonth,
                decrementMonth,
                handleDeleteRegister
            )
        },
        sheetState = sheetState,
        sheetShape = RoundedCornerShape(topStart = 20.dp, topEnd = 20.dp),
        modifier = Modifier
            .fillMaxSize()
            .padding(pv)
            .background(MAINPURPLE)
    ) {

        Column {
            Column(modifier = Modifier.padding(10.dp)) {
                TransactionsHistoryTop(movimentacaoTotalEfetuada)
            }
        }
    }
}

