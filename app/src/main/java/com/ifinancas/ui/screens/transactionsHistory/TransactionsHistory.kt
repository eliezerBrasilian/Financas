package com.ifinancas.ui.screens.transactionsHistory

import android.util.Log
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
import com.ifinancas.ui.components.TransactionHistoryOverlayView
import com.ifinancas.ui.components.TransactionsHistoryTop
import com.ifinancas.ui.theme.MAINPURPLE
import com.ifinancas.ui.viewModel.DateTimeViewModel
import com.ifinancas.ui.viewModel.FinancialOperationsViewModel
import com.ifinancas.ui.viewModel.UserViewModel
import com.ifinancas.utils.AppTag
import java.util.Date

@OptIn(ExperimentalMaterialApi::class)
@Composable
fun TransactionsHistory(
    pv: PaddingValues,
    financialOperationsViewModel: FinancialOperationsViewModel
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

    val context = LocalContext.current

    var date by remember {
        mutableStateOf(Date())
    }

    val decrementMonth = {
        date = dateTimeViewModel.decrementMonth(date)
    }

    val incrementMonth = {
        date = dateTimeViewModel.incrementMonth(date)
    }


    val sheetState = rememberCustomModalBottomSheetState()

    LaunchedEffect(uid, date) {
        val registers = financialOperationsViewModel.loadRegistersFromDateDescendly(
            dateTimeViewModel.getMonthAndYear(date), uid.toString()
        ).await()

        sortRegistersList.clear()
        sortRegistersList.addAll(registers)
        Log.d(AppTag, "registers: $registers")

        var movimentacaoTotalAux = 0.0
        registers.forEach {
            movimentacaoTotalAux += it.amount
        }
        movimentacaoTotalEfetuada = movimentacaoTotalAux
    }

    ModalBottomSheetLayout(
        scrimColor = Color.Unspecified,
        sheetContent = {
            TransactionHistoryOverlayView(sortRegistersList, date, incrementMonth, decrementMonth)
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

